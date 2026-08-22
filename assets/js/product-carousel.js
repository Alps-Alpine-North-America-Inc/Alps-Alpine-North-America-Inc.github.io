document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll("[data-carousel]");

  carousels.forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    const thumbnails = Array.from(carousel.querySelectorAll("[data-carousel-thumb]"));
    const previousButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");

    if (slides.length <= 1) {
      return;
    }

    let activeIndex = slides.findIndex((slide) => !slide.hasAttribute("hidden"));

    if (activeIndex < 0) {
      activeIndex = 0;
    }

    const setActiveSlide = (nextIndex) => {
      const normalizedIndex = (nextIndex + slides.length) % slides.length;

      slides.forEach((slide, index) => {
        const isActive = index === normalizedIndex;

        slide.hidden = !isActive;
        slide.classList.toggle("is-active", isActive);
      });

      thumbnails.forEach((thumbnail, index) => {
        const isActive = index === normalizedIndex;

        thumbnail.classList.toggle("is-active", isActive);
        thumbnail.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      const activeThumbnail = thumbnails[normalizedIndex];

      activeThumbnail?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });

      activeIndex = normalizedIndex;
    };

    previousButton?.addEventListener("click", () => {
      setActiveSlide(activeIndex - 1);
    });

    nextButton?.addEventListener("click", () => {
      setActiveSlide(activeIndex + 1);
    });

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        setActiveSlide(index);
      });
    });

    setActiveSlide(activeIndex);
  });
});
