(() => {
  const preferenceKey = "aana_dev_hub_language";
  const guideJapanese = {
    "/getting_started/dual-magnetic-module/": {
      intro: "Alps Alpine デュアルスイッチ磁気センサーボード（Qwiic）は、北極、南極、または磁極が検出されない状態を報告します。Qwiic Connect Systemを介してI2C通信を行い、Alps Alpine SenseKit Arduinoライブラリの<code>SenseKitDualSwitchingMagneticSensor</code>クラスに対応しています。",
      "software-intro": "<p>このリポジトリをArduinoライブラリとしてインストールし、<strong>File &gt; Examples &gt; Alps Alpine SenseKit &gt; DualSwitchingMagneticSensor</strong> を開きます。ボードとシリアルポートを選択してスケッチをアップロードし、9600 baudでシリアルモニターを開きます。</p><p>リンク先のサンプルは<code>begin()</code>と<code>isConnected()</code>を呼び出して開始します。整形済みの磁極検出結果と2つの生スイッチ状態を出力します。以下の短縮スケッチは整形済み読み取りの流れを示します。</p>",
      "functions-summary": "以下は、デュアルスイッチ磁気センサーボード（Qwiic）で使用できる関数と、その機能および使用方法の説明です。",
      "functions-table": "<tr><td><code>begin()</code></td><td>選択したI2Cバスを初期化します。</td></tr><tr><td><code>isConnected()</code></td><td>想定したセンサーボードが応答していることを確認します。</td></tr><tr><td><code>getFormattedValues(&amp;pole)</code></td><td><code>NoPoleDetected</code>、<code>SouthPoleDetected</code>、または<code>NorthPoleDetected</code>を読み取ります。</td></tr><tr><td><code>getRawValues(&amp;values)</code></td><td>南極・北極それぞれのスイッチ出力を読み取ります。</td></tr><tr><td><code>getDetectedMagneticPole()</code></td><td>整形済みの磁極値を直接返します。</td></tr>",
      "functions-note": "<p>生のスイッチ出力はアクティブローです。<code>SwitchDetected</code>（<code>0</code>）は対応する磁極をスイッチが検出していることを示し、<code>SwitchNotDetected</code>（<code>1</code>）は検出していないことを示します。出力を使用する前に、必ず<code>getFormattedValues()</code>または<code>getRawValues()</code>の<code>bool</code>結果を確認してください。</p>",
      "constructor-lead": "デフォルト以外のアドレスまたはI2Cバスを選択するには、コンストラクターに渡します。",
      troubleshooting: "<li><code>isConnected()</code>が失敗する場合は、Qwiicケーブルの向き、電源、SDA、SCL接続を確認し、選択したI2Cアドレスを検証してください。</li><li>磁極が検出されない場合は、磁石を近づけて反対側の磁極面でも試してください。磁場の強さと向きが結果に影響します。</li><li>生のスイッチ状態が逆に見える場合は、アクティブローであることを確認してください。</li>"
    },
    "/getting_started/force-sensor-module/": {
      intro: "Alps Alpine 荷重センサーボード（Qwiic）は、校正済みの荷重（ニュートン）と、その基礎となる増幅差動電圧を報告します。Qwiic Connect Systemを介してI2C通信を行い、Alps Alpine SenseKit Arduinoライブラリの<code>SenseKitForceSensor</code>クラスに対応しています。このクラスはゼロ点校正およびスパン校正も提供します。",
      "software-intro": "<p>このリポジトリをArduinoライブラリとしてインストールし、<strong>File &gt; Examples &gt; Alps Alpine SenseKit &gt; ForceSensor</strong> を開きます。ボードとシリアルポートを選択してスケッチをアップロードし、9600 baudでシリアルモニターを開きます。</p><p>基本サンプルは<code>begin()</code>と<code>isConnected()</code>を呼び出して開始します。整形済みの荷重（ニュートン）と生のアンプ電圧を出力します。以下の短縮スケッチは整形済み読み取りの流れを示します。</p><p>対話式のゼロ点・スパン校正を行うには、<strong>File &gt; Examples &gt; Alps Alpine SenseKit &gt; ForceSensorCalibration</strong> を開きます。このサンプルでは既知の質量（グラム）を入力し、ニュートンへ変換して校正値を出力します。</p>",
      "functions-summary": "以下は、荷重センサーボード（Qwiic）で使用できる関数と、その機能および使用方法の説明です。",
      "functions-table": "<tr><td><code>getFormattedValues(&amp;forceN)</code></td><td>校正済みの荷重をニュートン単位で読み取ります。</td></tr><tr><td><code>getRawValues(&amp;voltageV)</code></td><td>ゼロオフセット補正後のアンプ電圧を読み取ります。</td></tr><tr><td><code>performZeroCalibration()</code></td><td>無負荷時の基準値を設定し、スパン校正をクリアします。</td></tr><tr><td><code>performSpanCalibration(knownForceN)</code></td><td>既知の正の荷重を用いて荷重スケールを設定します。</td></tr><tr><td><code>getCalibrationValues(&amp;values)</code></td><td>傾き、オフセット、ゼロ基準、およびスパン校正の有効状態を読み取ります。</td></tr><tr><td><code>setCalibrationValues(values)</code></td><td>以前に保存した有効な校正値を適用します。</td></tr>",
      "functions-note": "<p>すべての読み取りまたは操作の戻り値を確認してください。ゼロ点、スパン、または校正値設定の操作後は、次の要求を行う前に<code>getDataReady()</code>が<code>0x01</code>を返すまで待ちます。</p>",
      calibration: "<p>センサーに荷重をかけず静止させた状態でゼロ点校正を実行します。<code>getDataReady()</code>が<code>0x01</code>を返すまで待機してから、安定した既知の荷重を加え、<code>performSpanCalibration(knownForceN)</code>を呼び出します。推奨するスパン校正荷重は7～10N（約714～1020g）です。グラム単位の質量は次の式でニュートンへ変換できます。</p><pre><code data-language=\"cpp\">float knownForceN = massGrams * 0.00980665f;</code></pre><p>ゼロ点校正を実行するとスパン校正はクリアされます。校正値は電源断後に保持されないため、<code>getCalibrationValues()</code>で外部に保存し、起動後に<code>setCalibrationValues()</code>で復元してください。</p>",
      troubleshooting: "<li>センサーが見つからない場合は、ケーブル、I2C配線、電源、およびアドレス（デフォルトは<code>0x74</code>）を確認してください。</li><li>無負荷時の読み取りがゼロでない場合は、すべての荷重を取り除き、センサーを静止させてからゼロ点校正を再実行してください。</li><li>校正済みの荷重が不正確な場合は、スパン校正の前にゼロ点校正を再実行し、安定した既知の荷重を使用してください。</li><li>再起動後に校正が消える場合は、アプリケーションで<code>CalibrationValues</code>を保存し、<code>setCalibrationValues()</code>で復元してください。</li>"
    },
    "/getting_started/resistive-position-sensor-module/": {
      intro: "Alps Alpine 抵抗式ポジションセンサーボード（Qwiic）は、角度位置を報告します。Qwiic Connect Systemを介してI2C通信を行い、Alps Alpine SenseKit Arduinoライブラリの<code>SenseKitResistivePositionSensor</code>クラスに対応しています。このクラスは両方の実装バリエーションに対応しており、RDC9は0～260度、RD6は0～320度を報告します。",
      "software-intro": "<p>このリポジトリをArduinoライブラリとしてインストールし、RDC9実装の場合は<strong>File &gt; Examples &gt; Alps Alpine SenseKit &gt; ResistivePositionSensorVariantA</strong>、RD6実装の場合は<strong>ResistivePositionSensorVariantB</strong>を開きます。ボードとシリアルポートを選択してスケッチをアップロードし、9600 baudでシリアルモニターを開きます。</p><p>どちらのサンプルも<code>begin()</code>と<code>isConnected()</code>を呼び出して開始します。整形済みの角度と生の12ビット位置値を出力し、実装バリエーションに対応した生値から角度への変換を示します。RDC9サンプルは0～260度、RD6サンプルは0～320度の範囲を示します。以下の短縮スケッチはRDC9の整形済み読み取りの流れを示します。</p>",
      "functions-summary": "以下は、抵抗式ポジションセンサーボード（Qwiic）で使用できる関数と、その機能および使用方法の説明です。",
      "functions-table": "<tr><td><code>getFormattedValues(&amp;angleDegrees)</code></td><td>ボードで計算した角度を整数の度単位で読み取ります。</td></tr><tr><td><code>getRawValues(&amp;position)</code></td><td>0～4095の12ビット生位置値を読み取ります。</td></tr><tr><td><code>getAngle()</code></td><td>整形済みの角度を直接返します。</td></tr><tr><td><code>getRawPosition()</code></td><td>生の位置値を直接返します。</td></tr><tr><td><code>getVariant()</code></td><td>コンストラクターで設定されたバリエーションを返します。</td></tr>",
      "functions-note": "<p>出力を使用する前に、<code>getFormattedValues()</code>および<code>getRawValues()</code>のBoolean結果を確認してください。コンポーネントの通常の機械的可動範囲外では、予期しない読み取り値になる場合があります。</p>",
      "constructor-lead": "RD6実装では、代わりに<code>SenseKitResistivePositionSensor::VariantB</code>を指定してクラスを生成します。デフォルト以外のアドレスを使用する場合は、バリエーションとアドレスを指定してください。",
      troubleshooting: "<li><code>isConnected()</code>が失敗する場合は、ケーブル、I2C配線、電源、選択したボード実装、およびアドレスを確認してください。</li><li>角度範囲が正しくない場合は、選択したRDC9またはRD6の実装が搭載ボードと一致していることを確認してください。</li><li>読み取り値が不安定な場合は、機械的な結合を確認し、アクチュエーターを規定の可動範囲内で使用してください。</li>"
    },
    "/getting_started/thumbpointer-module/": {
      intro: "Alps Alpine ThumbPointer HMIボード（Qwiic）は、統合プッシュスイッチを備えた2軸の親指操作コントロールです。<code>SenseKitThumbPointer</code>は、正規化されたX/Y位置、スイッチ状態、生の12ビットアナログ読み取り値を返し、中心校正機能を提供します。",
      "software-intro": "<p>このリポジトリをArduinoライブラリとしてインストールし、<strong>File &gt; Examples &gt; Alps Alpine SenseKit &gt; ThumbPointer</strong> を開きます。ボードとシリアルポートを選択してスケッチをアップロードし、9600 baudでシリアルモニターを開きます。</p><p>基本サンプルは<code>begin()</code>と<code>isConnected()</code>を呼び出して開始します。整形済みのX/Y位置とスイッチ状態に加え、生の12ビットX/Y読み取り値とアクティブローの生スイッチ状態を出力します。以下の短縮スケッチは整形済み読み取りの流れを示します。</p><p>起動時にニュートラルな機械中心を設定する必要がある場合は、<strong>File &gt; Examples &gt; Alps Alpine SenseKit &gt; ThumbPointerCalibration</strong> を開きます。このサンプルは中心校正を要求し、ボードが準備完了を報告するまで待機してから、校正済みの整形X/Y位置を出力します。</p>",
      "functions-summary": "以下は、ThumbPointer HMIボード（Qwiic）で使用できる関数と、その機能および使用方法の説明です。",
      "functions-table": "<tr><td><code>getFormattedValues(&amp;values)</code></td><td>-1～1の正規化X/Y値とアクティブハイのスイッチ状態を読み取ります。</td></tr><tr><td><code>getRawValues(&amp;values)</code></td><td>0～4095の生X/Y値とアクティブローの生スイッチ状態を読み取ります。</td></tr><tr><td><code>performBuiltInCalibration()</code></td><td>現在の機械中心を整形位置のゼロとして設定します。</td></tr><tr><td><code>getFormattedXPosition() / getFormattedYPosition()</code></td><td>整形済みの軸値を直接読み取ります。</td></tr><tr><td><code>getRawXPosition() / getRawYPosition()</code></td><td>生の軸値を直接読み取ります。</td></tr>",
      "functions-note": "<p>整形済みデータでは<code>0</code>が中心であり、押下時のスイッチは<code>SwitchPressed</code>（<code>1</code>）です。生のスイッチはアクティブローで、<code>0</code>は押下、<code>1</code>は未押下を意味します。出力を使用する前に、<code>get...Values()</code>関数のBoolean戻り値を必ず確認してください。</p>",
      calibration: "<p>コントロールを機械的中心で触れずに保ち、<code>performBuiltInCalibration()</code>を呼び出します。読み取りを要求する前に、<code>getDataReady()</code>が<code>0x01</code>を返すまで待機してください。中心校正は電源投入時にクリアされるため、アプリケーションで必要な場合はシステム起動時に繰り返してください。</p>",
      troubleshooting: "<li>ボードが見つからない場合は、Qwiic/I2C接続、電源、および選択したアドレスを確認してください。</li><li>中心の読み取り値がずれている場合は、コントロールを機械的中心で触れずに保って中心校正を実行してください。</li><li>押下状態が反転して見える場合は、アクティブハイの整形済みスイッチとアクティブローの生スイッチを区別してください。</li>"
    }
  };
  const japanese = {
    "North America": "北米",
    "Development Hub": "開発ハブ",
    "Alps Alpine Development Hub home": "Alps Alpine Development Hub ホーム",
    "Alps Alpine logo": "Alps Alpineロゴ",
    "Primary navigation": "主要ナビゲーション",
    "Home": "ホーム",
    "Products": "製品",
    "About": "会社情報",
    "Contact": "お問い合わせ",
    "GitHub": "GitHub",
    "Company Website": "企業サイト",
    "Alps Alpine North America, Inc.": "アルプスアルパイン ノースアメリカ株式会社",
    "Copyright (c) 2026 Alps Alpine North America, Inc.": "Copyright (c) 2026 Alps Alpine North America, Inc.",
    "Development Initiative": "開発イニシアチブ",
    "Innovating Value for Humans and Society on a Brighter Planet": "人々と社会に、より明るい未来のための価値を創造します",
    "Company Overview": "企業概要",
    "Engineering development building blocks for connected products.": "コネクテッド製品のためのエンジニアリング開発基盤。",
    "Alps Alpine North America's goal is to provide access to development resources designed to simplify prototyping, accelerate validation, and support a smoother path from concept to connected product integration.": "アルプスアルパイン ノースアメリカは、試作を簡素化し、検証を加速し、構想からコネクテッド製品の統合までを円滑に進めるための開発リソースを提供します。",
    "Customer enablement starts with clearer access to tools and examples.": "ツールとサンプルへの分かりやすいアクセスから、お客様の開発支援を始めます。",
    "Provide customers with a clearer path to the tools, examples, and guidance they need to begin development faster. This space highlights resources that reduce setup friction, simplify proof-of-concept work, and support more confident experimentation with Alps Alpine connected product solutions.": "開発開始に必要なツール、サンプル、ガイダンスへ、お客様がより明確にアクセスできるようにします。ここでは、セットアップの負担を減らし、概念実証を簡素化し、アルプスアルパインのコネクテッド製品ソリューションを安心して評価できるリソースを紹介します。",
    "Development Products": "開発製品",
    "Access tools, modules, and examples that support faster evaluation and integration.": "評価と統合をより迅速に進めるためのツール、モジュール、サンプルにアクセスできます。",
    "About Us": "会社情報",
    "Learn how Alps Alpine supports connected product development through engineering expertise and innovation.": "アルプスアルパインがエンジニアリングの専門性とイノベーションを通じてコネクテッド製品の開発を支援する方法をご紹介します。",
    "Contact Us": "お問い合わせ",
    "Reach out to discuss resources, technical questions, or project support.": "リソース、技術的なご質問、プロジェクト支援についてお問い合わせください。",
    "Evaluation Made Simple": "評価をよりシンプルに",
    "Through development kits and a growing series of available component boards, it is now quicker and easier than ever to evaluate Alps Alpine components. These solutions are designed to be user-friendly, require minimal technical setup, and are supported by open-source resources to help make evaluation and integration faster, smoother, and more accessible.": "開発キットと拡充を続けるコンポーネントボードにより、アルプスアルパイン製品の評価をこれまで以上に迅速かつ容易に行えます。これらのソリューションは使いやすさを重視し、技術的なセットアップを最小限に抑え、オープンソースのリソースによって評価と統合をより速く、円滑で、利用しやすいものにします。",
    "Featured Development Platforms": "注目の開発プラットフォーム",
    "Alps Alpine Valley - Development Kit": "Alps Alpine Valley 開発キット",
    "Starter Platform": "スタータープラットフォーム",
    "Fast Integration/Evaluation": "迅速な統合・評価",
    "Open-Source": "オープンソース",
    "The Alps Alpine Valley Development Kit provides both hardware and software to help users quickly connect, evaluate, and integrate a variety of Alps Alpine components into their current system or setup. The kit includes interface options that simplify component and device connections, while the graphical user interface allows users to instantly visualize component outputs in a clear and useful way.": "Alps Alpine Valley 開発キットは、さまざまなアルプスアルパイン製品を現在のシステムや環境へ迅速に接続、評価、統合するためのハードウェアとソフトウェアを提供します。コンポーネントおよびデバイスの接続を簡素化するインターフェースを備え、グラフィカルユーザーインターフェースによりコンポーネントの出力を分かりやすく可視化できます。",
    "This kit helps users determine whether a particular sensor, or a group of sensors, will meet their application needs while also supporting a smoother path from evaluation to integration.": "このキットは、特定のセンサーまたは複数のセンサーがアプリケーション要件を満たすかを判断し、評価から統合までの移行を円滑に進めることを支援します。",
    "View Product Page": "製品ページを見る",
    "Sensor & HMI Board Library": "センサー・HMIボードライブラリ",
    "Alps Alpine Sensor & HMI Boards - w/ Qwiic": "Alps Alpine センサー・HMIボード - Qwiic対応",
    "The Alps Alpine sensor & HMI boards, with Qwiic Connectors, provide a streamlined path to evaluation through standardized I²C connections, open-source libraries (coming soon), and supporting documentation to help make integration faster and smoother. We are continuing to develop additional sensor & HMI boards featuring Alps Alpine components to support easier integration and faster evaluation of our components and devices.": "Qwiicコネクターを備えたアルプスアルパインのセンサー・HMIボードは、標準化されたI²C接続、オープンソースライブラリ（近日公開）、関連ドキュメントにより、評価への道筋を簡素化します。アルプスアルパイン製コンポーネントを搭載したセンサー・HMIボードを継続的に開発し、より容易な統合と迅速な評価を支援します。",
    "Collaborative Platform Support": "協業プラットフォーム支援",
    "Cirque Corporation": "Cirque Corporation",
    "About Cirque": "Cirqueについて",
    "Alps Alpine Group": "アルプスアルパイングループ",
    "Capacitive Touch Collaboration": "静電容量式タッチの協業",
    "Cirque Corporation is part of the Alps Alpine Group and is known for capacitive touch technologies that support modern human-machine interface development. Through collaboration across the group, we are working to support Cirque capacitive touch modules within Alps Alpine Valley development platforms so customers can evaluate more interface options within a consistent development workflow.": "Cirque Corporationはアルプスアルパイングループの一員であり、現代的なヒューマンマシンインターフェース開発を支える静電容量式タッチ技術で知られています。グループ内の協業を通じて、Alps Alpine Valley開発プラットフォーム上でCirqueの静電容量式タッチモジュールをサポートし、一貫した開発ワークフローでより多くのインターフェースを評価できるよう取り組んでいます。",
    "Developer Resources": "開発者向けリソース",
    "Explore Cirque Development Resources": "Cirqueの開発者向けリソースを見る",
    "Access Cirque developer resources for documentation, tooling, and supporting information related to their touch modules and platform enablement.": "Cirqueのタッチモジュールおよびプラットフォーム開発に関するドキュメント、ツール、関連情報にアクセスできます。",
    "Contact Alps Alpine North America for development and product support.": "開発および製品サポートについて、アルプスアルパイン ノースアメリカへお問い合わせください。",
    "Abstract company-themed artwork for the About Us page": "会社情報ページの抽象的な企業テーマ画像",
    "Contact support illustration with communication and helpdesk elements": "コミュニケーションとヘルプデスクを表現したお問い合わせサポートのイラスト",
    "Engineering components, sensing, connectivity, and mobility solutions for North America.": "北米市場向けの電子部品、センシング、コネクティビティ、モビリティソリューション。",
    "Alps Alpine North America is part of the global Alps Alpine Group and supports a broad set of markets including automotive, consumer appliances, mobile devices, and industrial equipment.": "アルプスアルパイン ノースアメリカは、グローバルなアルプスアルパイングループの一員です。自動車、家電、モバイル機器、産業機器など、幅広い市場を支援しています。",
    "Company Direction": "企業の方向性",
    "Alps Alpine presents its broader company mission around creating value for people and society on a brighter planet, with a vision centered on shaping a future where technology extends your senses.": "アルプスアルパインは、人々と社会に価値を創造することを企業使命として掲げ、テクノロジーが人の感覚を拡張する未来を目指しています。",
    "Business Areas": "事業領域",
    "Components": "コンポーネント",
    "Sensor and Communication": "センサー・コミュニケーション",
    "Mobility": "モビリティ",
    "Emerging IoT and data-driven solutions": "IoTおよびデータ活用ソリューション",
    "North America Presence": "北米での展開",
    "The North America information page lists offices and facilities including Santa Clara, Auburn Hills, McAllen, Dublin, Redmond, and Torrance, giving the organization a broad engineering and customer-support footprint.": "北米の情報ページでは、サンタクララ、オーバーンヒルズ、マッカレン、ダブリン、レドモンド、トーランスを含む拠点を紹介しており、幅広いエンジニアリングおよびカスタマーサポート体制を示しています。",
    "Who We Are": "私たちについて",
    "Technology development backed by a larger product and systems organization.": "製品・システム組織の基盤に支えられたテクノロジー開発。",
    "Across the Alps Alpine business, the public company overview emphasizes products and services spanning touch and operation, sensing and communications, and mobility-focused systems. That larger company context is what this site is meant to support: giving customers and developers a clearer path into the tools, kits, modules, and software resources connected to those technologies.": "アルプスアルパインは、タッチ・操作、センシング・コミュニケーション、モビリティ関連システムにわたる製品とサービスを展開しています。本サイトは、その技術に関連するツール、キット、モジュール、ソフトウェアリソースへ、お客様と開発者がより明確にアクセスできるよう支援します。",
    "Rather than acting only as a repository landing page, this website is intended to be a development-facing front door for evaluating products, exploring technical examples, and finding the right starting points for integration work.": "本サイトは単なるリポジトリの入口ではなく、製品の評価、技術サンプルの探索、統合作業の適切な出発点を見つけるための開発者向け窓口です。",
    "Automotive": "自動車",
    "HMI": "HMI",
    "Sensors": "センサー",
    "Connectivity": "コネクティビティ",
    "Development Resources": "開発リソース",
    "Public development materials can include firmware and SDKs for embedded platforms, integration examples for components and evaluation kits, Swift-based and cross-platform UI tools, and protocol or communication libraries.": "公開開発資料には、組込みプラットフォーム用のファームウェアとSDK、コンポーネントおよび評価キット向けの統合サンプル、SwiftベースまたはクロスプラットフォームのUIツール、プロトコル・通信ライブラリなどが含まれます。",
    "GitHub logo": "GitHubロゴ",
    "Public AANA GitHub": "AANA公開GitHub",
    "Check out the public Alps Alpine North America GitHub organization for examples, development resources, and supporting materials that help customers explore available tools, modules, and software more effectively.": "公開されているAlps Alpine North AmericaのGitHub組織では、利用可能なツール、モジュール、ソフトウェアをより効果的に検討するためのサンプル、開発リソース、関連資料をご確認いただけます。",
    "How This Site Helps": "本サイトの役割",
    "This site gives customers and developers a central place to explore Alps Alpine development products, review supporting technical resources, and find practical starting points for evaluation, prototyping, and integration work.": "本サイトは、アルプスアルパインの開発製品の探索、技術リソースの確認、評価・試作・統合作業に向けた実用的な出発点の発見を行える、共通の窓口です。",
    "Visit North America Site": "北米サイトを見る",
    "View GitHub Organization": "GitHub組織を見る",
    "Inquiry Form": "お問い合わせフォーム",
    "Submit product questions, collaboration requests, or general support inquiries.": "製品に関するご質問、協業のご相談、一般的なサポートについてお問い合わせください。",
    "For open-source code-related issues on a public GitHub repository, please submit the issue to the corresponding repository.": "公開GitHubリポジトリ上のオープンソースコードに関する問題は、該当するリポジトリにIssueを登録してください。",
    "Alps Alpine GitHub Organization": "Alps Alpine GitHub組織",
    "For all other support requests, please fill out the contact form, and a support representative will get back to you shortly.": "その他のサポートについては、お問い合わせフォームにご記入ください。担当者より折り返しご連絡します。",
    "Support Type": "サポート種別",
    "Select support type": "サポート種別を選択",
    "Developer Support": "開発サポート",
    "Parts Inquiry": "部品に関するお問い合わせ",
    "General Questions": "一般的なご質問",
    "Warranty Support": "保証サポート",
    "Name": "お名前",
    "Email": "メールアドレス",
    "Brief Description": "概要",
    "Message": "メッセージ",
    "Your name": "お名前",
    "Short summary of your request": "お問い合わせ内容の概要",
    "Tell us how we can help.": "お問い合わせ内容をご記入ください。",
    "Send Inquiry": "お問い合わせを送信",
    "Getting Started": "はじめに",
    "Alps Alpine Valley Development Kit / Bundles": "Alps Alpine Valley 開発キット／バンドル",
    "Guide Directory for Kits, Boards, and Future Setup Resources.": "キット、ボード、今後のセットアップリソースのガイド一覧。",
    "Product Guides & Links": "製品ガイドとリンク",
    "Navigate to your specific product to find helpful setup guides and linked resources that can assist with getting started and continued product use.": "対象製品を選択すると、導入時および継続的な製品利用に役立つセットアップガイドと関連リソースを確認できます。",
    "Open Getting Started Guide": "導入ガイドを開く",
    "Product Page": "製品ページ",
    "Back to Products": "製品一覧に戻る",
    "Development Product": "開発製品",
    "Part Number:": "部品番号:",
    "Coming Soon for Purchase": "購入準備中",
    "Helpful Documents & Links": "参考ドキュメントとリンク",
    "Learn More": "詳細を見る",
    "Bundle Options": "バンドルオプション",
    "Included in Development Bundles": "開発バンドルに含まれる製品",
    "Overview": "概要",
    "Features & Specs": "特長と仕様",
    "PC Application": "PCアプリケーション",
    "Documentation": "ドキュメント",
    "What's Included": "同梱内容",
    "Purchase Board": "ボードを購入",
    "Sections": "セクション",
    "Introduction": "はじめに",
    "Required Materials": "必要なもの",
    "Hardware Overview": "ハードウェア概要",
    "Hardware Hookup": "ハードウェア接続",
    "Software Setup & Programming": "ソフトウェアセットアップとプログラミング",
    "Example Code": "サンプルコード",
    "Troubleshooting": "トラブルシューティング",
    "Resources & Going Further": "リソースと次のステップ",
    "Setup Prep": "セットアップ準備",
    "Board Summary": "ボード概要",
    "Board Features": "ボードの機能",
    "Connections": "接続",
    "Firmware": "ファームウェア",
    "Reference": "リファレンス",
    "Support": "サポート",
    "Links": "リンク",
    "Hookup Guide Wishlist": "接続ガイドの必要品リスト",
    "To follow along with this tutorial, you will need the materials listed below. Depending on the equipment you already have, you may not need every item. Review the guide and adjust your list as needed before getting started.": "このチュートリアルを進めるには、以下の材料が必要です。すでにお持ちの機材によっては、すべての項目が必要ではない場合があります。開始前にガイドを確認し、必要に応じてリストを調整してください。",
    "The primary Alps Alpine Sensor/HMI board used throughout this hookup guide.": "この接続ガイド全体で使用する主要なAlps Alpine センサー/HMIボードです。",
    "Qwiic Cable - 300 mm (or comparable)": "Qwiicケーブル - 300 mm（または同等品）",
    "The Alps Alpine Sensor/HMI Board suite enables fast, flexible prototyping with the Alps Alpine Valley Development Board. For custom applications, the boards can also be easily integrated with a wide range of existing microcontrollers over I²C, with an easy-to-use open-source Arduino library available to simplify development.": "Alps Alpine センサー/HMIボードシリーズは、Alps Alpine Valley 開発ボードを使用して迅速かつ柔軟な試作を実現します。カスタムアプリケーション向けには、使いやすいオープンソースArduinoライブラリにより、幅広い既存マイクロコントローラーへI²C経由で簡単に統合できます。",
    "Recommended evaluation platform for quick Sensor/HMI board bring-up, interface testing, and future PEAK workflow support.": "センサー/HMIボードの迅速な立ち上げ、インターフェーステスト、将来のPEAKワークフロー対応に推奨される評価プラットフォームです。",
    "Since the Sensor/HMI Board only requires I²C communication, it can be integrated with a wide range of development platforms. The Arduino UNO R4 WiFi is one option for building a custom solution with the Alps Alpine Arduino library, but other Arduino-compatible boards can also be used with a built-in Qwiic connector or by breaking out the Qwiic connection to standard I²C pins.": "センサー/HMIボードはI²C通信のみを必要とするため、幅広い開発プラットフォームに統合できます。Arduino UNO R4 WiFiはAlps Alpine Arduinoライブラリを使用したカスタムソリューションの一例です。Qwiicコネクターを内蔵した他のArduino互換ボード、またはQwiic接続を標準I²Cピンへ引き出したボードも使用できます。",
    "Suggested Reading": "参考情報",
    "If you are not already familiar with the Qwiic ecosystem, we recommend reviewing the overview before moving into board hookup and software setup.": "Qwiicエコシステムにまだ慣れていない場合は、ボード接続とソフトウェアセットアップへ進む前に概要を確認することをおすすめします。",
    "Qwiic Connect System": "Qwiic Connect System",
    "Alps Alpine Valley Development Board": "Alps Alpine Valley 開発ボード",
    "Existing MCU Platform": "既存MCUプラットフォーム",
    "OR": "または",
    "Pins (SWD Programming)": "ピン（SWDプログラミング）",
    "Qwiic Connectors": "Qwiicコネクター",
    "I2C Jumpers": "I2Cジャンパー",
    "I2C Address Pads": "I2Cアドレスパッド",
    "Power LED": "電源LED",
    "Board Dimensions": "ボード寸法",
    "This board is built around its primary Alps Alpine component and includes supporting features that are important during setup and development. The sections below identify the key board elements, connections, and configuration points to be aware of before bringing the board into your project.": "このボードは主要なAlps Alpineコンポーネントを中心に構成され、セットアップおよび開発時に重要となる補助機能を搭載しています。以下のセクションでは、プロジェクトへ導入する前に確認すべき主要なボード要素、接続、および設定ポイントを説明します。",
    "These pins provide Serial Wire Debug (SWD) access for advanced users who need to reflash or modify the firmware running on the board's onboard STM32 microcontroller. They are not required for normal Qwiic operation.": "これらのピンは、ボード搭載STM32マイクロコントローラーで動作するファームウェアの書き換えや変更が必要な上級ユーザー向けに、Serial Wire Debug（SWD）アクセスを提供します。通常のQwiic動作には必要ありません。",
    "3.3 V power reference for the programming connection.": "プログラミング接続用の3.3V電源基準です。",
    "Common ground reference.": "共通グランド基準です。",
    "Serial Wire Debug clock signal.": "Serial Wire Debugクロック信号です。",
    "Serial Wire Debug data signal.": "Serial Wire Debugデータ信号です。",
    "Microcontroller reset signal.": "マイクロコントローラーのリセット信号です。",
    "The 3V3 pin is not regulated. Use only a 3.3 V supply; applying a different voltage may damage onboard components. Reflashing or modifying the preinstalled firmware is an advanced operation performed at your own risk and may prevent the board from working with prebuilt tools or demo applications until compatible firmware is restored.": "3V3ピンは安定化されていません。3.3V電源のみを使用してください。異なる電圧を加えると、搭載コンポーネントが損傷するおそれがあります。プリインストールされたファームウェアの書き換えや変更は、自己責任で行う上級者向けの操作です。互換ファームウェアを復元するまで、事前に用意されたツールやデモアプリケーションでボードが動作しなくなる場合があります。",
    "Each board includes two standard Qwiic connectors that provide power and I2C connectivity. Both connectors share the same bus, allowing compatible Qwiic devices to be daisy chained together.": "各ボードには、電源とI2C接続を提供する標準Qwiicコネクターが2つ搭載されています。両方のコネクターは同じバスを共有しているため、互換性のあるQwiicデバイスをデイジーチェーン接続できます。",
    "The two cuttable traces control the board's internal I2C pull-up resistors. By default, each outer pad is bridged to its center pad, enabling pull-ups on the SDA and SCL lines. Cutting the copper trace between an outer pad and its center pad removes the pull-up for that respective I2C line.": "2つのカット可能なパターンは、ボード内部のI2Cプルアップ抵抗を制御します。デフォルトでは各外側パッドが中央パッドに接続され、SDAおよびSCLラインのプルアップが有効です。外側パッドと中央パッドの間の銅箔パターンをカットすると、対応するI2Cラインのプルアップが無効になります。",
    "Each board supports four assigned I2C addresses, selected with the two solder-jumper pads labeled ADDR1 and ADDR0. The default address is selected out of the box with both pads open. Soldering a pad sets its corresponding binary value to 1, allowing multiple identical boards to share one bus when each uses a different address selection.": "各ボードは4つの割り当て済みI2Cアドレスに対応しており、ADDR1とADDR0と表示された2つのはんだジャンパーパッドで選択します。出荷時は両方のパッドがオープンで、デフォルトアドレスが選択されています。パッドをはんだ付けすると対応するバイナリ値が1になり、異なるアドレスを選択することで複数の同一ボードを1つのバスで使用できます。",
    "Each board includes a red power-indicator LED that illuminates when the 3.3 V rail is powered. Use it as a quick confirmation that the board is receiving power before continuing with I2C communication or software setup.": "各ボードには、3.3Vレールに電源が供給されると点灯する赤色の電源表示LEDが搭載されています。I2C通信またはソフトウェアセットアップを続ける前に、ボードが給電されていることを素早く確認できます。",
    "Default": "デフォルト",
    "Alternate 1": "代替1",
    "Alternate 2": "代替2",
    "Alternate 3": "代替3",
    "Address Selection": "アドレス選択",
    "Alps Alpine Valley Board Hookup": "Alps Alpine Valleyボード接続",
    "Custom Solution Hookup": "カスタムソリューション接続",
    "Choose the hookup path that best fits your development workflow. The Alps Alpine Valley Development Kit provides a streamlined platform for evaluating Sensor/HMI boards, while a custom solution lets you connect the board to your own I2C-capable microcontroller and system architecture.": "開発ワークフローに最適な接続方法を選択してください。Alps Alpine Valley 開発キットはセンサー/HMIボードを評価するための効率的なプラットフォームを提供し、カスタムソリューションではI2C対応マイクロコントローラーおよび独自のシステム構成にボードを接続できます。",
    "Use this block to describe the recommended hookup path when pairing the Sensor/HMI board with the Alps Alpine Valley Development Kit. This is a good place for setup notes, connection order, and any validation steps that should happen before moving into software setup.": "このブロックでは、センサー/HMIボードをAlps Alpine Valley 開発キットと組み合わせる際の推奨接続方法を説明します。セットアップに関する注意、接続順序、ソフトウェアセットアップへ進む前に実施すべき検証手順を記載します。",
    "Use this block to describe the alternative hookup path for a custom controller or embedded design. This is the right place for notes about external I2C hosts, logic-level compatibility, power-supply expectations, and any differences compared with the Valley Development Kit flow.": "このブロックでは、カスタムコントローラーまたは組込み設計向けの代替接続方法を説明します。外部I2Cホスト、ロジックレベルの互換性、電源要件、Valley 開発キットの手順との差異に関する注意を記載します。",
    "Note:": "注記:",
    "This code/library has been written and tested on Arduino IDE version 2.3.10.": "このコード／ライブラリはArduino IDE バージョン2.3.10で作成・テストされています。",
    "If this is your first time using Arduino, please review our tutorial on": "Arduinoを初めて使用する場合は、以下のチュートリアルをご確認ください：",
    "installing the Arduino IDE": "Arduino IDEのインストール",
    ". If you have not previously installed an Arduino library, please check out our": "。Arduinoライブラリをこれまでにインストールしたことがない場合は、以下もご確認ください：",
    "installation guide": "インストールガイド",
    "Check GitHub Repository": "GitHubリポジトリを見る",
    "Arduino Library Functions": "Arduinoライブラリ関数",
    "Function": "関数",
    "Description": "説明",
    "Component Calibration": "コンポーネントのキャリブレーション",
    "If you wish to use or learn the I2C message formats directly, you can follow the document below.": "I2Cメッセージ形式を直接使用または確認する場合は、以下のドキュメントをご覧ください。",
    "View I2C Message Format Interface Document": "I2Cメッセージ形式インターフェースドキュメントを見る",
    "Copy Code": "コードをコピー",
    "Need Support:": "サポートが必要な場合:",
    "If you need technical support, additional information, or something is not working as expected, please head to the": "技術サポートや追加情報が必要な場合、または期待どおりに動作しない場合は、",
    "contact page": "お問い合わせページ",
    "and submit a support request.": "からサポートリクエストを送信してください。",
    "If bugs or issues are found in open-source repository resources, please submit an issue on the corresponding": "オープンソースリポジトリのリソースで不具合や問題が見つかった場合は、該当する",
    "GitHub repository": "GitHubリポジトリ",
    ".": "。",
    "Available": "利用可能",
    "Coming Soon": "近日公開",
    "Product Overview": "製品概要",
    "Getting Started / Setup Guide": "導入・セットアップガイド",
    "Product Document": "製品ドキュメント",
    "Download the Valley Development Kit getting-started and setup guide.": "Valley開発キットの導入・セットアップガイドをダウンロードします。",
    "Valley Development Kit getting-started and setup guide": "Valley開発キット導入・セットアップガイド",
    "Schematic": "回路図",
    "3D-Printed Knob STL": "3Dプリント用ノブSTL",
    "3D-Printed Rotary Knob STL": "3Dプリント用ロータリーノブSTL",
    "3D Print File": "3Dプリントファイル",
    "Download the STL file for the ThumbPointer™ knob accessory.": "ThumbPointer™ノブアクセサリー用のSTLファイルをダウンロードします。",
    "Download the STL file for the resistive position sensor rotary knob accessory.": "抵抗式ポジションセンサー用ロータリーノブアクセサリーのSTLファイルをダウンロードします。",
    "KiCad Files": "KiCadファイル",
    "Board Files (ZIP)": "ボードファイル（ZIP）",
    "KiCad PCB": "KiCad PCB",
    "Download the open-source KiCad PCB design release, including schematic, manufacturing, mechanical, and viewable files.": "回路図、製造用データ、機械データ、閲覧用ファイルを含むオープンソースのKiCad PCB設計リリースをダウンロードします。",
    "Board design files will be provided in a future release.": "ボード設計ファイルは今後のリリースで提供予定です。",
    "A board-dimensions drawing will be added when the image is available.": "ボード寸法図は画像の準備ができ次第追加されます。",
    "View board specifications, supported component details, and purchasing information.": "ボード仕様、対応コンポーネントの詳細、購入情報を確認できます。",
    "View board specifications, component variants, and purchasing information.": "ボード仕様、コンポーネントのバリエーション、購入情報を確認できます。",
    "Browse the Alps Alpine public repositories for Arduino libraries and example projects.": "Arduinoライブラリおよびサンプルプロジェクトについて、Alps Alpineの公開リポジトリをご覧ください。",
    "Page not found.": "ページが見つかりません。",
    "The requested page could not be found. Use the navigation above to return to the main site sections.": "指定されたページは見つかりませんでした。上部のナビゲーションから主要なサイトセクションへ戻ってください。",
    "Dual Switching Magnetic Sensor Board (Qwiic)": "デュアルスイッチ磁気センサーボード（Qwiic）",
    "ThumbPointer™ HMI Board (Qwiic)": "ThumbPointer™ HMIボード（Qwiic）",
    "Force Sensor Board (Qwiic)": "荷重センサーボード（Qwiic）",
    "Resistive Position Sensor Board (Qwiic)": "抵抗式ポジションセンサーボード（Qwiic）",
    "Resistive Position Sensor Board (Qwiic) - (RDC9 & RD6 Variants)": "抵抗式ポジションセンサーボード（Qwiic）-（RDC9・RD6バリエーション）",
    "Sensor Development Kit": "センサー開発キット",
    "HMI Development Kit": "HMI開発キット",
    "Development Kit": "開発キット",
    "Component Development Board (Qwiic)": "コンポーネント開発ボード（Qwiic）",
    "COMPONENT DEVELOPMENT BOARD (Qwiic)": "コンポーネント開発ボード（Qwiic）",
    "Sensor board for detecting different magnetic poles by utilizing Alps Alpine's HGDEDM013A component.": "アルプスアルパインのHGDEDM013Aを使用し、異なる磁極を検出するためのセンサーボードです。",
    "ThumbPointer™ HMI board using the Alps Alpine RKJXV122400R to provide (x,y) pointer coordinates and integrated button press state.": "アルプスアルパインRKJXV122400Rを使用し、（X、Y）ポインター座標と統合されたボタン押下状態を提供するThumbPointer™ HMIボードです。",
    "Sensor board using the Alps Alpine HSFPAR304A force sensor to provide load-detection values across a 0 to 13N force range.": "アルプスアルパインHSFPAR304A荷重センサーを使用し、0～13Nの荷重範囲で検出値を提供するセンサーボードです。",
    "Sensor board containing either the Alps Alpine RDC9010007 (Variant RDC9) or the Alps Alpine RD6R1A0008 (Variant RD6) resistive position sensor to read out value for determining an angle value.": "アルプスアルパインRDC9010007（RDC9バリエーション）またはRD6R1A0008（RD6バリエーション）の抵抗式ポジションセンサーを搭載し、角度の算出に用いる値を読み出すセンサーボードです。",
    "Capacitive-touch HMI board with a touch slider, four touch buttons, and a touch trackpad for X/Y position and touch-state data. Includes Qwiic-style and ribbon-cable connectors with I2C communication.": "タッチスライダー、4つのタッチボタン、X/Y位置およびタッチ状態データ用のタッチトラックパッドを備えた静電容量式タッチHMIボードです。I2C通信対応のQwiicスタイルおよびリボンケーブル用コネクターを搭載しています。",
    "Square capacitive touchpad module that reports X/Y position data over I2C. A ribbon-cable connector supports integration into custom development platforms.": "I2C経由でX/Y位置データを出力する正方形の静電容量式タッチパッドモジュールです。リボンケーブルコネクターにより、カスタム開発プラットフォームへ統合できます。",
    "Circular capacitive touchpad module that reports X/Y position data over I2C. Its ribbon-cable connector supports compact touch-interface integration.": "I2C経由でX/Y位置データを出力する円形の静電容量式タッチパッドモジュールです。リボンケーブルコネクターにより、コンパクトなタッチインターフェースへ統合できます。",
    "The Alps Alpine Valley Development Kit is a modular evaluation/development platform for quickly connecting, configuring, and testing Alps Alpine sensor and HMI technologies. Paired with provided tools and resources, it enables real-time data visualization and faster prototyping.": "Alps Alpine Valley 開発キットは、アルプスアルパインのセンサーおよびHMI技術を迅速に接続、設定、テストするためのモジュール型評価・開発プラットフォームです。提供されるツールとリソースを組み合わせることで、リアルタイムデータの可視化と迅速な試作を実現します。",
    "Sensor development board, featuring Qwiic-style interface, built around the Alps Alpine HGDEDM013A dual switching magnetic sensor for compact magnetic state and pole-detection applications.": "Qwiicスタイルのインターフェースを備え、コンパクトな磁気状態・磁極検出アプリケーション向けのアルプスアルパインHGDEDM013Aデュアルスイッチ磁気センサーを中心に構成された開発ボードです。",
    "Force-sensing development board, featuring Qwiic-style interface, built around Alps Alpine's HSFPAR304A for analog load detection (provided over I²C interface) across a wider 0 to 13N force range.": "Qwiicスタイルのインターフェースを備え、0～13Nの広い荷重範囲でアナログ荷重検出（I²Cインターフェース経由で提供）を行うアルプスアルパインHSFPAR304Aを中心に構成された荷重検出開発ボードです。",
    "Rotary position-sensing development board, featuring Qwiic-style interface, built around using either the Alps Alpine RDC9010007 (Variant RDC9) or the Alps Alpine RD6R1A0008 (Variant RD6) for angular sensing and position feedback.": "Qwiicスタイルのインターフェースを備え、角度検出および位置フィードバック向けにアルプスアルパインRDC9010007（RDC9バリエーション）またはRD6R1A0008（RD6バリエーション）を使用する回転位置検出開発ボードです。",
    "HMI development board, featuring Qwiic-style interface, built using the Alps Alpine RKJXV122400R ThumbPointer™ to deliver X/Y directional input and center-push button interaction.": "Qwiicスタイルのインターフェースを備え、アルプスアルパインRKJXV122400R ThumbPointer™を使用してX/Y方向入力とセンタープッシュボタン操作を提供するHMI開発ボードです。",
    "A bundled evaluation package for exploring Alps Alpine magnetic, force, and resistive position sensing boards through a shared Qwiic-style development workflow.": "共通のQwiicスタイル開発ワークフローを通じて、アルプスアルパインの磁気、荷重、抵抗式位置検出ボードを評価するためのバンドル評価パッケージです。",
    "A bundled evaluation package for prototyping physical controls, position-sensing interfaces, and haptic feedback with Alps Alpine development modules.": "アルプスアルパインの開発モジュールを用いて、物理的な操作系、位置検出インターフェース、触覚フィードバックを試作するためのバンドル評価パッケージです。",
    "This guide walks through connecting the Dual Switching Magnetic Sensor Board, confirming I2C communication, and running a first pole-detection example. Use it as a starting point for evaluating the board and integrating it into a Qwiic-based prototype.": "このガイドでは、デュアルスイッチ磁気センサーボードの接続、I2C通信の確認、最初の磁極検出サンプルの実行について説明します。ボードの評価とQwiicベースの試作機への統合を始める際にご利用ください。",
    "This guide walks through connecting the Force Sensor Board, confirming I2C communication, and running a first measurement example. Use it as a starting point for evaluating force input and integrating the board into a Qwiic-based prototype.": "このガイドでは、荷重センサーボードの接続、I2C通信の確認、最初の測定サンプルの実行について説明します。荷重入力の評価とQwiicベースの試作機への統合を始める際にご利用ください。",
    "This guide walks through connecting the Resistive Position Sensor Board, confirming I2C communication, and running a first position-readout example. Use it as a starting point for evaluating position sensing in a Qwiic-based prototype.": "このガイドでは、抵抗式ポジションセンサーボードの接続、I2C通信の確認、最初の位置読み出しサンプルの実行について説明します。Qwiicベースの試作機で位置検出を評価する際にご利用ください。",
    "This guide walks through connecting the ThumbPointer HMI Board, confirming I2C communication, and running a first input example. Use it as a starting point for evaluating directional and button input in a Qwiic-based prototype.": "このガイドでは、ThumbPointer HMIボードの接続、I2C通信の確認、最初の入力サンプルの実行について説明します。Qwiicベースの試作機で方向入力とボタン入力を評価する際にご利用ください。",
    "This guide walks through preparing the Alps Alpine Valley Development Kit for development, including hardware connection, software setup, and first-use validation. Use it as the foundation for evaluating and integrating supported Alps Alpine development products.": "このガイドでは、ハードウェア接続、ソフトウェア設定、初回動作確認を含む、Alps Alpine Valley 開発キットの開発準備について説明します。対応するアルプスアルパイン開発製品の評価と統合の基盤としてご利用ください。"
  };

  const protectedTags = new Set(["CODE", "PRE", "SCRIPT", "STYLE", "NOSCRIPT", "SVG"]);

  function normalize(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function readCookie(name) {
    const prefix = `${name}=`;
    return document.cookie.split(";").map((item) => item.trim()).find((item) => item.startsWith(prefix))?.slice(prefix.length);
  }

  function saveLanguage(language) {
    document.cookie = `${preferenceKey}=${language}; max-age=31536000; path=/; SameSite=Lax`;
    localStorage.setItem(preferenceKey, language);
  }

  function translateNode(node) {
    if (protectedTags.has(node.parentElement?.tagName)) return;
    const value = normalize(node.nodeValue);
    const replacement = japanese[value];
    if (!replacement) return;

    const leading = node.nodeValue.match(/^\s*/)?.[0] ?? "";
    const trailing = node.nodeValue.match(/\s*$/)?.[0] ?? "";
    node.nodeValue = `${leading}${replacement}${trailing}`;
  }

  function translateAttributes() {
    document.querySelectorAll("[placeholder], [aria-label], [alt], [title]").forEach((element) => {
      ["placeholder", "aria-label", "alt", "title"].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (value && japanese[value]) element.setAttribute(attribute, japanese[value]);
      });
    });
  }

  function applyGuideJapanese() {
    const translations = guideJapanese[window.location.pathname];
    if (!translations) return;

    Object.entries(translations).forEach(([key, content]) => {
      document.querySelectorAll(`[data-guide-localized="${key}"]`).forEach((element) => {
        element.innerHTML = content;
      });
    });
  }

  function applyJapanese() {
    document.documentElement.lang = "ja";
    document.body.dataset.language = "ja";
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(translateNode);
    translateAttributes();
    applyGuideJapanese();
  }

  function updateMenu(language) {
    document.querySelectorAll("[data-language-current]").forEach((element) => {
      element.textContent = language === "ja" ? "日本語" : "English";
    });
    document.querySelectorAll("[data-language-option]").forEach((option) => {
      option.setAttribute("aria-current", String(option.dataset.languageOption === language));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = readCookie(preferenceKey) || localStorage.getItem(preferenceKey) || "en";
    const language = savedLanguage === "ja" ? "ja" : "en";
    if (language === "ja") applyJapanese();
    updateMenu(language);

    document.querySelectorAll("[data-language-switcher]").forEach((switcher) => {
      const toggle = switcher.querySelector("[data-language-toggle]");
      const menu = switcher.querySelector("[data-language-menu]");

      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        menu.hidden = expanded;
      });

      switcher.querySelectorAll("[data-language-option]").forEach((option) => {
        option.addEventListener("click", () => {
          const selectedLanguage = option.dataset.languageOption;
          saveLanguage(selectedLanguage);
          if (selectedLanguage === "en") {
            window.location.reload();
            return;
          }
          applyJapanese();
          updateMenu("ja");
          toggle.setAttribute("aria-expanded", "false");
          menu.hidden = true;
        });
      });
    });
  });
})();
