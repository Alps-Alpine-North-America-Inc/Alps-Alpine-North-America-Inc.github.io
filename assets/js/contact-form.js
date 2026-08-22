document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-contact-form-status]");
  const nameField = form?.querySelector('input[name="Name"]');
  const emailField = form?.querySelector('input[name="Email"]');
  const supportTypeField = form?.querySelector('select[name="Support Type"]');
  const briefDescriptionField = form?.querySelector('input[name="Brief Description"]');
  const ticketIdField = form?.querySelector('input[name="Ticket ID"]');
  const ticketSubmittedField = form?.querySelector('input[name="Ticket Submitted"]');
  const submitterTimeZoneField = form?.querySelector('input[name="Submitter Time Zone"]');
  const submitterLocalTimeField = form?.querySelector('input[name="Submitter Local Time"]');
  const replyToField = form?.querySelector('input[name="_replyto"]');
  const subjectField = form?.querySelector('input[name="_subject"]');
  const urlField = form?.querySelector('input[name="_url"]');
  const submitButton = form?.querySelector('button[type="submit"]');

  if (!form || !status) {
    return;
  }

  const setStatus = (message, state) => {
    status.textContent = message;
    status.dataset.state = state;
  };

  const normalizeMessage = (message) => {
    if (!message) {
      return "";
    }

    return String(message).replace(/\s+/g, " ").trim();
  };

  const buildSubject = () => {
    const supportType = normalizeMessage(supportTypeField?.value) || "General Questions";
    const briefDescription = normalizeMessage(briefDescriptionField?.value) || "New inquiry";

    return `[${supportType}] - ${briefDescription}`;
  };

  const compactTimestamp = (date) => {
    const year = String(date.getUTCFullYear());
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

    return `${year}${month}${day}T${hours}${minutes}${seconds}${milliseconds}Z`;
  };

  const displayTimestamp = (date, timeZone) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      timeZone,
      timeZoneName: "short"
    }).format(date);
  };

  const fallbackTicketHash = (seed) => {
    let hash = 2166136261;

    for (let index = 0; index < seed.length; index += 1) {
      hash ^= seed.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return Math.abs(hash >>> 0).toString(16).toUpperCase().padStart(8, "0");
  };

  const buildTicketMetadata = async () => {
    const now = new Date();
    const timestamp = compactTimestamp(now);
    const detroitTimeZone = "America/Detroit";
    const submitterTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Browser time zone unavailable";
    const name = normalizeMessage(nameField?.value);
    const email = normalizeMessage(emailField?.value).toLowerCase();
    const seed = [
      timestamp,
      String(Date.now()),
      String(performance.now()),
      name,
      email,
      String(Math.random())
    ].join("|");

    let hashValue = fallbackTicketHash(seed);

    if (window.crypto?.subtle && window.TextEncoder) {
      try {
        const encoded = new TextEncoder().encode(seed);
        const digest = await window.crypto.subtle.digest("SHA-256", encoded);
        hashValue = Array.from(new Uint8Array(digest))
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("")
          .slice(0, 16)
          .toUpperCase();
      } catch {
        hashValue = fallbackTicketHash(seed);
      }
    }

    return {
      ticketId: hashValue,
      submittedAt: `${displayTimestamp(now, detroitTimeZone)} (${detroitTimeZone})`,
      submitterTimeZone,
      submitterLocalTime: displayTimestamp(now, submitterTimeZone)
    };
  };

  const requiredFields = Array.from(form.querySelectorAll("[required]"));

  const updateSubmitState = () => {
    if (!submitButton) {
      return;
    }

    const allFilled = requiredFields.every((field) => normalizeMessage(field.value).length > 0);
    submitButton.disabled = !allFilled;
  };

  requiredFields.forEach((field) => {
    field.addEventListener("input", updateSubmitState);
    field.addEventListener("change", updateSubmitState);
  });

  updateSubmitState();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (ticketIdField || ticketSubmittedField || submitterTimeZoneField || submitterLocalTimeField) {
      const ticketMetadata = await buildTicketMetadata();

      if (ticketIdField) {
        ticketIdField.value = ticketMetadata.ticketId;
      }

      if (ticketSubmittedField) {
        ticketSubmittedField.value = ticketMetadata.submittedAt;
      }

      if (submitterTimeZoneField) {
        submitterTimeZoneField.value = ticketMetadata.submitterTimeZone;
      }

      if (submitterLocalTimeField) {
        submitterLocalTimeField.value = ticketMetadata.submitterLocalTime;
      }
    }

    if (replyToField) {
      replyToField.value = normalizeMessage(emailField?.value);
    }

    if (subjectField) {
      subjectField.value = buildSubject();
    }

    if (urlField) {
      urlField.value = window.location.href;
    }

    const formData = new FormData(form);

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    setStatus("Submitting your inquiry...", "pending");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      const data = await response.json().catch(() => ({}));
      const providerMessage = normalizeMessage(data.message);

      if (!response.ok || data.success === "false") {
        throw new Error(providerMessage || "Submission failed");
      }

      form.reset();
      setStatus("Inquiry sent successfully.", "success");
      updateSubmitState();
    } catch (error) {
      const message = normalizeMessage(error.message);

      if (message.toLowerCase().includes("activate form")) {
        setStatus("The FormSubmit endpoint still needs activation. Confirm the provider email once, then submit again.", "error");
      } else if (message) {
        setStatus(message, "error");
      } else {
        setStatus("The inquiry could not be sent right now. Please try again in a moment.", "error");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Inquiry";
      }
    }
  });
});
