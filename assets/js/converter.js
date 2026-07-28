(function () {
  "use strict";

  const currencies = {
    EUR: { symbol: "€", names: { en: "Euro", ru: "Евро" }, shortNames: { en: "Euro", ru: "Евро" } },
    USD: { symbol: "$", names: { en: "US Dollar", ru: "Доллар США" }, shortNames: { en: "Dollar", ru: "Доллар" } },
    GBP: { symbol: "£", names: { en: "British Pound", ru: "Британский фунт" }, shortNames: { en: "Pound", ru: "Фунт" } },
    JPY: { symbol: "¥", names: { en: "Japanese Yen", ru: "Японская иена" }, shortNames: { en: "Yen", ru: "Иена" } },
    CHF: { symbol: "Fr", names: { en: "Swiss Franc", ru: "Швейцарский франк" }, shortNames: { en: "Franc", ru: "Франк" } },
    CAD: { symbol: "$", names: { en: "Canadian Dollar", ru: "Канадский доллар" }, shortNames: { en: "Canadian Dollar", ru: "Канадский доллар" } },
    AUD: { symbol: "$", names: { en: "Australian Dollar", ru: "Австралийский доллар" }, shortNames: { en: "Australian Dollar", ru: "Австралийский доллар" } },
    NZD: { symbol: "$", names: { en: "New Zealand Dollar", ru: "Новозеландский доллар" }, shortNames: { en: "NZ Dollar", ru: "NZ доллар" } },
    CNY: { symbol: "¥", names: { en: "Chinese Yuan", ru: "Китайский юань" }, shortNames: { en: "Yuan", ru: "Юань" } },
    UZS: { symbol: "so'm", names: { en: "Uzbekistani Som", ru: "Узбекский сум" }, shortNames: { en: "Som", ru: "Сум" } },
    RUB: { symbol: "₽", names: { en: "Russian Ruble", ru: "Российский рубль" }, shortNames: { en: "Ruble", ru: "Рубль" } },
    KZT: { symbol: "₸", names: { en: "Kazakhstani Tenge", ru: "Казахстанский тенге" }, shortNames: { en: "Tenge", ru: "Тенге" } },
    TRY: { symbol: "₺", names: { en: "Turkish Lira", ru: "Турецкая лира" }, shortNames: { en: "Lira", ru: "Лира" } },
    AED: { symbol: "د.إ", names: { en: "UAE Dirham", ru: "Дирхам ОАЭ" }, shortNames: { en: "Dirham", ru: "Дирхам" } },
    KRW: { symbol: "₩", names: { en: "South Korean Won", ru: "Южнокорейская вона" }, shortNames: { en: "Won", ru: "Вона" } },
    INR: { symbol: "₹", names: { en: "Indian Rupee", ru: "Индийская рупия" }, shortNames: { en: "Rupee", ru: "Рупия" } },
    BRL: { symbol: "R$", names: { en: "Brazilian Real", ru: "Бразильский реал" }, shortNames: { en: "Real", ru: "Реал" } },
    MXN: { symbol: "$", names: { en: "Mexican Peso", ru: "Мексиканское песо" }, shortNames: { en: "Peso", ru: "Песо" } },
    ZAR: { symbol: "R", names: { en: "South African Rand", ru: "Южноафриканский рэнд" }, shortNames: { en: "Rand", ru: "Рэнд" } },
    UAH: { symbol: "₴", names: { en: "Ukrainian Hryvnia", ru: "Украинская гривна" }, shortNames: { en: "Hryvnia", ru: "Гривна" } },
    MYR: { symbol: "RM", names: { en: "Malaysian Ringgit", ru: "Малайзийский ринггит" }, shortNames: { en: "Ringgit", ru: "Ринггит" } },
    ISK: { symbol: "kr", names: { en: "Icelandic Krona", ru: "Исландская крона" }, shortNames: { en: "Icelandic Krona", ru: "Исландская крона" } },
    KWD: { symbol: "د.ك", names: { en: "Kuwaiti Dinar", ru: "Кувейтский динар" }, shortNames: { en: "Dinar", ru: "Динар" } },
    EGP: { symbol: "£", names: { en: "Egyptian Pound", ru: "Египетский фунт" }, shortNames: { en: "Egyptian Pound", ru: "Египетский фунт" } },
    HKD: { symbol: "$", names: { en: "Hong Kong Dollar", ru: "Гонконгский доллар" }, shortNames: { en: "HK Dollar", ru: "HK доллар" } },
    SGD: { symbol: "$", names: { en: "Singapore Dollar", ru: "Сингапурский доллар" }, shortNames: { en: "Singapore Dollar", ru: "Сингапурский доллар" } },
    NOK: { symbol: "kr", names: { en: "Norwegian Krone", ru: "Норвежская крона" }, shortNames: { en: "Norwegian Krone", ru: "Норвежская крона" } },
    SEK: { symbol: "kr", names: { en: "Swedish Krona", ru: "Шведская крона" }, shortNames: { en: "Swedish Krona", ru: "Шведская крона" } },
    PLN: { symbol: "zł", names: { en: "Polish Zloty", ru: "Польский злотый" }, shortNames: { en: "Zloty", ru: "Злотый" } },
    CZK: { symbol: "Kč", names: { en: "Czech Koruna", ru: "Чешская крона" }, shortNames: { en: "Czech Koruna", ru: "Чешская крона" } },
    DKK: { symbol: "kr", names: { en: "Danish Krone", ru: "Датская крона" }, shortNames: { en: "Danish Krone", ru: "Датская крона" } }
  };
  const list = Object.keys(currencies);
  const quoteList = list.filter(code => code !== "EUR").join(",");
  const API_URL = `https://api.frankfurter.dev/v2/rates?base=EUR&quotes=${quoteList}`;
  const CACHE_KEY = "fx_rates_frankfurter_v2";
  const CHART_CACHE_KEY = "fx_chart_frankfurter_v2";
  const SETTINGS_KEY = "fx_settings_v2";
  const CHECK_INTERVAL = 30 * 60 * 1000;
  const messages = {
    en: {
      pageTitle: "Currency Converter",
      mainLabel: "Currency Converter",
      sectionLabel: "Currency conversion",
      language: "Language",
      sourceCurrency: "Source currency",
      targetCurrency: "Target currency",
      amount: "Amount",
      swap: "Swap currencies",
      copy: "Copy",
      copied: "Copied",
      copyError: "Error",
      loadingRate: "Loading rate...",
      fetchingRates: "Fetching reference rates",
      updatingRates: "Updating rates",
      unavailable: "Rate is unavailable",
      loadError: "Could not load rates",
      sourceFallback: "Frankfurter reference rates",
      sourceDate: date => `Frankfurter reference rates for ${date}`,
      savedData: text => `${text} · saved data`,
      settings: "Settings",
      closeSettings: "Close settings",
      theme: "Theme",
      lightTheme: "Light",
      darkTheme: "Dark",
      chartType: "Chart",
      lineChart: "Line",
      candleChart: "Candles",
      chartPeriod: "Period",
      chartPage: "Price chart",
      converterPage: "Converter",
      backToConverter: "Back to converter",
      chartTitle: "Price chart",
      chartSubtitle: "EUR against selected currency",
      chartCurrency: "Chart currency",
      chartRange: months => `${months} months`,
      chartLatest: "Latest",
      chartChange: "Change",
      chartLoading: "Loading chart...",
      chartUpdating: "Updating chart",
      chartUnavailable: "Chart is unavailable",
      chartTooltip: (date, value, currency) => `${date}: ${value} ${currency}`,
      candleTooltip: (range, open, high, low, close, currency) => `${range} · O ${open} ${currency} · H ${high} · L ${low} · C ${close}`,
      chartSource: date => `Frankfurter time series to ${date}`,
      chartSavedData: text => `${text} · saved data`
    },
    ru: {
      pageTitle: "Конвертер валют",
      mainLabel: "Конвертер валют",
      sectionLabel: "Конвертация валют",
      language: "Язык",
      sourceCurrency: "Исходная валюта",
      targetCurrency: "Целевая валюта",
      amount: "Сумма",
      swap: "Поменять валюты местами",
      copy: "Копировать",
      copied: "Скопировано",
      copyError: "Ошибка",
      loadingRate: "Загрузка курса...",
      fetchingRates: "Получаем справочные курсы",
      updatingRates: "Обновляем курсы",
      unavailable: "Курс пока недоступен",
      loadError: "Не удалось загрузить курсы",
      sourceFallback: "Справочные курсы Frankfurter",
      sourceDate: date => `Справочные курсы Frankfurter на ${date}`,
      savedData: text => `${text} · сохранённые данные`,
      settings: "Настройки",
      closeSettings: "Закрыть настройки",
      theme: "Тема",
      lightTheme: "Светлая",
      darkTheme: "Тёмная",
      chartType: "График",
      lineChart: "Линия",
      candleChart: "Свечи",
      chartPeriod: "Период",
      chartPage: "График курса",
      converterPage: "Конвертер",
      backToConverter: "Назад к конвертеру",
      chartTitle: "График курса",
      chartSubtitle: "EUR к выбранной валюте",
      chartCurrency: "Валюта графика",
      chartRange: months => `${months} мес.`,
      chartLatest: "Последний",
      chartChange: "Изменение",
      chartLoading: "Загрузка графика...",
      chartUpdating: "Обновляем график",
      chartUnavailable: "График пока недоступен",
      chartTooltip: (date, value, currency) => `${date}: ${value} ${currency}`,
      candleTooltip: (range, open, high, low, close, currency) => `${range} · О ${open} ${currency} · М ${high} · Н ${low} · З ${close}`,
      chartSource: date => `Динамика Frankfurter до ${date}`,
      chartSavedData: text => `${text} · сохранённые данные`
    }
  };
  const amountEl = document.getElementById("amount");
  const fromEl = document.getElementById("from");
  const toEl = document.getElementById("to");
  const fromSymbolEl = document.getElementById("fromSymbol");
  const toSymbolEl = document.getElementById("toSymbol");
  const resultEl = document.getElementById("result");
  const rateLineEl = document.getElementById("rateLine");
  const copyBtn = document.getElementById("copy");
  const copyText = document.getElementById("copyText");
  const swapBtn = document.getElementById("swap");
  const refreshBtn = document.getElementById("refresh");
  const statusEl = document.getElementById("status");
  const statusTextEl = document.getElementById("statusText");
  const settingsToggle = document.getElementById("settingsToggle");
  const settingsToggleText = document.getElementById("settingsToggleText");
  const settingsPanel = document.getElementById("settingsPanel");
  const themeSettingLabel = document.getElementById("themeSettingLabel");
  const chartTypeSettingLabel = document.getElementById("chartTypeSettingLabel");
  const chartPeriodSettingLabel = document.getElementById("chartPeriodSettingLabel");
  const chartPageButton = document.getElementById("chartPageButton");
  const chartPageButtonText = document.getElementById("chartPageButtonText");
  const converterPage = document.getElementById("converterPage");
  const chartPage = document.getElementById("chartPage");
  const chartBack = document.getElementById("chartBack");
  const chartCurrencyEl = document.getElementById("chartCurrency");
  const chartTitleEl = document.getElementById("chartTitle");
  const chartSubtitleEl = document.getElementById("chartSubtitle");
  const chartPairEl = document.getElementById("chartPair");
  const chartRangeEl = document.getElementById("chartRange");
  const chartLatestLabelEl = document.getElementById("chartLatestLabel");
  const chartChangeLabelEl = document.getElementById("chartChangeLabel");
  const chartLatestEl = document.getElementById("chartLatest");
  const chartChangeEl = document.getElementById("chartChange");
  const chartStatusEl = document.getElementById("chartStatus");
  const chartStatusTextEl = document.getElementById("chartStatusText");
  const chartRefreshBtn = document.getElementById("chartRefresh");
  const priceChartEl = document.getElementById("priceChart");
  const chartGridEl = document.getElementById("chartGrid");
  const chartLabelsEl = document.getElementById("chartLabels");
  const chartCandlesEl = document.getElementById("chartCandles");
  const chartAreaEl = document.getElementById("chartArea");
  const chartLineEl = document.getElementById("chartLine");
  const chartPointsEl = document.getElementById("chartPoints");
  const chartHoverEl = document.getElementById("chartHover");
  const chartHoverLineEl = document.getElementById("chartHoverLine");
  const chartHoverPointEl = document.getElementById("chartHoverPoint");
  const chartTooltipEl = document.getElementById("chartTooltip");
  const chartTooltipValueEl = document.getElementById("chartTooltipValue");
  const chartTooltipDateEl = document.getElementById("chartTooltipDate");
  const chartEmptyEl = document.getElementById("chartEmpty");
  const languageSwitch = document.querySelector(".language-switch");
  const languageButtons = Array.from(document.querySelectorAll("[data-language]"));
  const themeButtons = Array.from(document.querySelectorAll("[data-theme]"));
  const chartTypeButtons = Array.from(document.querySelectorAll("[data-chart-type]"));
  const chartPeriodButtons = Array.from(document.querySelectorAll("[data-chart-months]"));
  let rates = { EUR: 1 };
  let currentResult = null;
  let loading = false;
  const savedSettings = getSettings();
  let language = savedSettings?.language || "en";
  let theme = ["light", "dark"].includes(savedSettings?.theme) ? savedSettings.theme : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  let chartType = ["line", "candles"].includes(savedSettings?.chartType) ? savedSettings.chartType : "candles";
  let chartMonths = [3, 6, 12].includes(Number(savedSettings?.chartMonths)) ? Number(savedSettings.chartMonths) : 6;
  let currencyLabelMode = "name";
  let feedbackTimer;
  let swapTimeline;
  let activePage = "converter";
  let chartLoading = false;
  let chartPoints = [];
  let chartMappedPoints = [];
  let chartBounds = null;
  const customSelectControls = new Map();
  const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  async function initSpaceStars() {
    if (!window.tsParticles || !motionAllowed) return;
    const lowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    try {
      if (window.loadSlim) await window.loadSlim(window.tsParticles);
      await window.tsParticles.load({
        id: "spaceStars",
        options: {
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: lowPower ? 20 : 24,
          pauseOnBlur: true,
          pauseOnOutsideViewport: true,
          detectRetina: false,
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: { enable: true }
            },
            modes: {
              repulse: { distance: 70, duration: 0.25, factor: 1.2, speed: 0.35, maxSpeed: 2 }
            }
          },
          particles: {
            number: {
              value: lowPower ? 28 : 42,
              density: { enable: true, width: 1000, height: 1000 }
            },
            color: { value: ["#ffffff", "#b9d5ff", "#ccb9ff", "#86e9ff"] },
            shape: { type: ["circle", "star"] },
            opacity: {
              value: { min: 0.24, max: 0.86 },
              animation: { enable: true, speed: 0.12, sync: false, startValue: "random" }
            },
            size: { value: { min: 0.55, max: 2.1 } },
            move: {
              enable: true,
              speed: { min: 0.035, max: 0.12 },
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "out" }
            }
          },
          responsive: [
            {
              maxWidth: 600,
              options: {
                fpsLimit: 20,
                particles: { number: { value: 24 } }
              }
            }
          ]
        }
      });
    } catch (error) {
      if (window.console?.warn) window.console.warn("Could not start background particles", error);
    }
  }

  function initCursorLight() {
    const light = document.querySelector(".cursor-light");
    if (!light || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || !motionAllowed) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let frame = 0;
    const render = () => {
      light.style.transform = `translate3d(${Math.round(x - 210)}px, ${Math.round(y - 210)}px, 0)`;
      frame = 0;
    };
    document.addEventListener("pointermove", event => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(render);
    }, { passive: true });
    document.addEventListener("pointerleave", () => {
      light.style.opacity = "0.28";
    });
    document.addEventListener("pointerenter", () => {
      light.style.opacity = "0.72";
    });
  }

  function positionSelectMenu(control) {
    const rect = control.trigger.getBoundingClientRect();
    const width = Math.max(112, Math.round(rect.width));
    control.menu.style.width = `${width}px`;
    const menuHeight = control.menu.offsetHeight;
    const opensAbove = window.innerHeight - rect.bottom < menuHeight + 12 && rect.top > menuHeight + 12;
    const top = opensAbove ? rect.top - menuHeight - 8 : rect.bottom + 8;
    const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8);
    control.menu.style.top = `${Math.round(Math.max(8, top))}px`;
    control.menu.style.left = `${Math.round(left)}px`;
  }

  function syncCustomSelect(select) {
    const control = customSelectControls.get(select);
    if (!control) return;
    const label = getSelectLabel(select);
    control.value.textContent = formatCurrencyTrigger(select.value);
    control.trigger.setAttribute("aria-label", `${label}: ${formatCurrencyOption(select.value)}`);
    control.menu.setAttribute("aria-label", label);
    control.options.forEach(option => {
      option.setAttribute("aria-selected", String(option.dataset.value === select.value));
      option.querySelector(".select-option-code").textContent = option.dataset.value;
      option.querySelector(".select-option-name").textContent = getCurrencyName(option.dataset.value);
    });
  }

  function getSelectLabel(select) {
    if (select.id === "from") return messages[language].sourceCurrency;
    if (select.id === "to") return messages[language].targetCurrency;
    return messages[language].chartCurrency;
  }

  function getCurrencyName(code) {
    return currencies[code].names[language] || currencies[code].names.en;
  }

  function getCurrencyShortName(code) {
    return currencies[code].shortNames[language] || currencies[code].shortNames.en;
  }

  function formatCurrencyTrigger(code) {
    return currencyLabelMode === "name" ? getCurrencyShortName(code) : code;
  }

  function formatCurrencyOption(code) {
    return `${code} · ${getCurrencyName(code)}`;
  }

  function closeCustomSelect(control, returnFocus = false) {
    if (!control?.menu.classList.contains("open")) return;
    control.menu.classList.remove("open");
    control.trigger.setAttribute("aria-expanded", "false");
    if (returnFocus) control.trigger.focus();
  }

  function closeAllCustomSelects(except = null) {
    customSelectControls.forEach(control => {
      if (control !== except) closeCustomSelect(control);
    });
  }

  function isInsideSelectMenu(target) {
    return Array.from(customSelectControls.values()).some(control => control.menu.contains(target));
  }

  function openCustomSelect(control, focusSelected = false) {
    closeAllCustomSelects(control);
    syncCustomSelect(control.select);
    positionSelectMenu(control);
    control.menu.classList.add("open");
    control.trigger.setAttribute("aria-expanded", "true");
    updateCustomScrollbar(control);
    if (focusSelected) {
      const selected = control.options.find(option => option.dataset.value === control.select.value) || control.options[0];
      requestAnimationFrame(() => selected.focus());
    }
  }

  function enhanceSelect(select, codes = list) {
    if (customSelectControls.has(select)) return;
    const shell = select.closest(".select-shell");
    const trigger = document.createElement("button");
    const value = document.createElement("span");
    const chevron = document.createElement("span");
    const menu = document.createElement("div");
    const viewport = document.createElement("div");
    const scrollbar = document.createElement("div");
    const scrollbarThumb = document.createElement("div");
    const menuId = `menu-${select.id}`;
    trigger.type = "button";
    trigger.className = "select-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", menuId);
    value.className = "select-value";
    chevron.className = "custom-chevron";
    chevron.setAttribute("aria-hidden", "true");
    menu.className = "select-menu";
    menu.id = menuId;
    menu.setAttribute("role", "listbox");
    viewport.className = "select-menu-scroll";
    scrollbar.className = "select-menu-scrollbar";
    scrollbarThumb.className = "select-menu-scrollbar-thumb";
    scrollbar.setAttribute("aria-hidden", "true");
    scrollbar.appendChild(scrollbarThumb);
    trigger.append(value, chevron);
    const options = codes.map((code, index) => {
      const option = document.createElement("button");
      const codeText = document.createElement("span");
      const nameText = document.createElement("span");
      option.type = "button";
      option.className = "select-option";
      option.dataset.value = code;
      codeText.className = "select-option-code";
      nameText.className = "select-option-name";
      codeText.textContent = code;
      nameText.textContent = getCurrencyName(code);
      option.append(codeText, nameText);
      option.title = formatCurrencyOption(code);
      option.setAttribute("role", "option");
      option.addEventListener("click", () => {
        select.value = code;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        closeCustomSelect(customSelectControls.get(select), true);
      });
      option.addEventListener("keydown", event => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          const direction = event.key === "ArrowDown" ? 1 : -1;
          options[(index + direction + options.length) % options.length].focus();
        } else if (event.key === "Home" || event.key === "End") {
          event.preventDefault();
          options[event.key === "Home" ? 0 : options.length - 1].focus();
        } else if (event.key === "Escape") {
          event.preventDefault();
          closeCustomSelect(customSelectControls.get(select), true);
        } else if (event.key === "Tab") {
          closeCustomSelect(customSelectControls.get(select));
        }
      });
      viewport.appendChild(option);
      return option;
    });
    menu.append(viewport, scrollbar);
    const control = { select, shell, trigger, value, menu, viewport, scrollbar, scrollbarThumb, options };
    customSelectControls.set(select, control);
    select.classList.add("native-select");
    select.tabIndex = -1;
    select.setAttribute("aria-hidden", "true");
    shell.appendChild(trigger);
    document.body.appendChild(menu);
    viewport.addEventListener("wheel", event => event.stopPropagation(), { passive: true });
    viewport.addEventListener("touchmove", event => event.stopPropagation(), { passive: true });
    viewport.addEventListener("scroll", () => updateCustomScrollbar(control), { passive: true });
    trigger.addEventListener("click", () => {
      if (menu.classList.contains("open")) closeCustomSelect(control);
      else openCustomSelect(control);
    });
    trigger.addEventListener("keydown", event => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        openCustomSelect(control, true);
      } else if (event.key === "Escape") {
        closeCustomSelect(control);
      }
    });
    select.addEventListener("change", () => syncCustomSelect(select));
    syncCustomSelect(select);
  }

  function updateCustomScrollbar(control) {
    const { viewport, scrollbar, scrollbarThumb } = control;
    const maxScroll = viewport.scrollHeight - viewport.clientHeight;
    if (maxScroll <= 1) {
      scrollbar.hidden = true;
      return;
    }

    scrollbar.hidden = false;
    const trackHeight = scrollbar.clientHeight;
    const thumbHeight = Math.max(42, Math.round(trackHeight * viewport.clientHeight / viewport.scrollHeight));
    const thumbTop = Math.round((trackHeight - thumbHeight) * viewport.scrollTop / maxScroll);
    scrollbarThumb.style.height = `${thumbHeight}px`;
    scrollbarThumb.style.transform = `translateY(${thumbTop}px)`;
  }

  function initVisuals() {
    void initSpaceStars();
    initCursorLight();
    if (window.lucide) {
      window.lucide.createIcons({ attrs: { "stroke-width": 2.1 } });
    }
    if (!window.gsap || !motionAllowed) return;
    const timeline = window.gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => window.gsap.set([".app", ".money-card", ".select-shell", ".rate-line", ".copy-button", ".status"], { clearProps: "transform" })
    });
    timeline
      .fromTo(".app", { y: 24, scale: 0.97 }, { y: 0, scale: 1, duration: 0.72 })
      .fromTo(".money-card", { y: 18, scale: 0.985 }, { y: 0, scale: 1, duration: 0.56, stagger: 0.12 }, "-=0.48")
      .fromTo(".select-shell", { scale: 0.86 }, { scale: 1, duration: 0.46, stagger: 0.1, ease: "back.out(1.8)" }, "-=0.48")
      .fromTo([".rate-line", ".copy-button", ".status"], { y: 10 }, { y: 0, duration: 0.46, stagger: 0.07 }, "-=0.3");
  }

  function animateResult() {
    if (!window.gsap || !motionAllowed) return;
    window.gsap.fromTo(resultEl, { y: 6, scale: 0.985 }, { y: 0, scale: 1, duration: 0.28, ease: "power3.out", overwrite: "auto", onComplete: () => window.gsap.set(resultEl, { clearProps: "transform" }) });
  }

  function animateIcon(button, rotation = 180) {
    if (!window.gsap || !motionAllowed) return;
    const icon = button.querySelector("svg, [data-lucide]");
    if (!icon) return;
    window.gsap.fromTo(icon, { rotation: 0, scale: 0.82 }, { rotation, scale: 1, duration: 0.4, ease: "back.out(1.8)", overwrite: true, onComplete: () => window.gsap.set(icon, { clearProps: "transform" }) });
  }

  function animateSelection(select) {
    if (!window.gsap || !motionAllowed) return;
    const shell = select.closest(".select-shell");
    window.gsap.fromTo(shell, { scale: 0.9 }, { scale: 1, duration: 0.34, ease: "back.out(2)", overwrite: true, onComplete: () => window.gsap.set(shell, { clearProps: "transform" }) });
  }

  function swapCurrencies() {
    [fromEl.value, toEl.value] = [toEl.value, fromEl.value];
    syncCustomSelect(fromEl);
    syncCustomSelect(toEl);
    saveSettings();
    convert();
  }

  function animateSwap() {
    if (swapTimeline?.isActive()) return;
    animateIcon(swapBtn);
    if (!window.gsap || !motionAllowed) {
      swapCurrencies();
      return;
    }
    const cards = Array.from(document.querySelectorAll(".money-card"));
    swapBtn.disabled = true;
    swapBtn.setAttribute("aria-busy", "true");
    swapTimeline = window.gsap.timeline({
      onComplete: () => {
        window.gsap.set(cards, { clearProps: "transform,opacity" });
        swapBtn.disabled = false;
        swapBtn.removeAttribute("aria-busy");
      }
    })
      .to(cards, { scale: 0.985, duration: 0.12, ease: "power2.in", stagger: 0.025 }, 0)
      .add(swapCurrencies)
      .to(cards, { scale: 1, duration: 0.3, ease: "back.out(1.7)", stagger: 0.025 });
  }

  function createOptions() {
    const options = list.map(code => `<option value="${code}">${code}</option>`).join("");
    fromEl.innerHTML = options;
    toEl.innerHTML = options;
    chartCurrencyEl.innerHTML = list.filter(code => code !== "EUR").map(code => `<option value="${code}">${code}</option>`).join("");
    const saved = getSettings();
    fromEl.value = saved?.from && list.includes(saved.from) ? saved.from : "USD";
    toEl.value = saved?.to && list.includes(saved.to) ? saved.to : "EUR";
    chartCurrencyEl.value = saved?.chartCurrency && list.includes(saved.chartCurrency) && saved.chartCurrency !== "EUR" ? saved.chartCurrency : "USD";
    enhanceSelect(fromEl);
    enhanceSelect(toEl);
    enhanceSelect(chartCurrencyEl, list.filter(code => code !== "EUR"));
  }

  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY));
    } catch {
      return null;
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ from: fromEl.value, to: toEl.value, chartCurrency: chartCurrencyEl.value, language, theme, chartType, chartMonths }));
    } catch {
      return false;
    }
    return true;
  }

  function formatEditableAmount(value) {
    const clean = String(value).replace(/[^\d.,]/g, "");
    if (!clean) return "";
    const separatorIndex = Math.max(clean.lastIndexOf(","), clean.lastIndexOf("."));
    let integer = separatorIndex >= 0 ? clean.slice(0, separatorIndex).replace(/[.,]/g, "") : clean.replace(/[.,]/g, "");
    const decimal = separatorIndex >= 0 ? clean.slice(separatorIndex + 1).replace(/[.,]/g, "").slice(0, 6) : "";
    integer = integer.replace(/^0+(?=\d)/, "") || "0";
    const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return separatorIndex >= 0 ? `${grouped},${decimal}` : grouped;
  }

  function formatAmountField() {
    const raw = amountEl.value;
    const caret = amountEl.selectionStart ?? raw.length;
    const formatted = formatEditableAmount(raw);
    if (formatted === raw) return;
    const digitsBeforeCaret = raw.slice(0, caret).replace(/\D/g, "").length;
    amountEl.value = formatted;
    if (caret === raw.length) {
      amountEl.setSelectionRange(formatted.length, formatted.length);
      return;
    }
    let digitsSeen = 0;
    let nextCaret = 0;
    for (let index = 0; index < formatted.length; index += 1) {
      if (/\d/.test(formatted[index])) digitsSeen += 1;
      nextCaret = index + 1;
      if (digitsSeen >= digitsBeforeCaret) break;
    }
    amountEl.setSelectionRange(nextCaret, nextCaret);
  }

  function parseAmount(value) {
    let normalized = String(value).trim().replace(/[\s\u00A0\u202F]/g, "");
    if (!normalized) return null;
    normalized = normalized.replace(/[^\d.,-]/g, "");
    const lastComma = normalized.lastIndexOf(",");
    const lastDot = normalized.lastIndexOf(".");
    const decimalIndex = Math.max(lastComma, lastDot);
    if (decimalIndex >= 0) {
      const integer = normalized.slice(0, decimalIndex).replace(/[.,]/g, "");
      const decimal = normalized.slice(decimalIndex + 1).replace(/[.,]/g, "");
      normalized = `${integer}.${decimal}`;
    }
    const number = Number(normalized);
    return Number.isFinite(number) && number >= 0 ? number : null;
  }

  function formatNumber(value, maximumFractionDigits = 2, minimumFractionDigits = 2) {
    return new Intl.NumberFormat(language === "ru" ? "ru-RU" : "en-US", {
      minimumFractionDigits,
      maximumFractionDigits
    }).format(value);
  }

  function formatRate(value) {
    const abs = Math.abs(value);
    const digits = abs > 0 && abs < 0.01 ? 6 : abs < 1 ? 4 : 2;
    return formatNumber(value, digits, 0);
  }

  function convert() {
    const amount = parseAmount(amountEl.value);
    const from = fromEl.value;
    const to = toEl.value;
    fromSymbolEl.textContent = currencies[from].symbol;
    toSymbolEl.textContent = currencies[to].symbol;
    if (amount === null || !Number.isFinite(rates[from]) || !Number.isFinite(rates[to])) {
      currentResult = null;
      resultEl.textContent = "—";
      rateLineEl.textContent = amount === null ? "" : messages[language].unavailable;
      copyBtn.disabled = true;
      return;
    }
    const result = amount * rates[from] / rates[to];
    const unitRate = rates[from] / rates[to];
    currentResult = `${formatNumber(result)} ${to}`;
    resultEl.textContent = formatNumber(result);
    rateLineEl.textContent = `1 ${from} = ${formatRate(unitRate)} ${to}`;
    copyBtn.disabled = false;
    animateResult();
  }

  function getUpdateSlot() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}-${now.getHours() < 12 ? "AM" : "PM"}`;
  }

  function readCache(allowStale = false) {
    try {
      const cache = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (!cache || !cache.data || !cache.data.rates) return null;
      if (!list.every(code => Number.isFinite(cache.data.rates[code]))) return null;
      return allowStale || cache.slot === getUpdateSlot() ? cache : null;
    } catch {
      return null;
    }
  }

  function saveCache(data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), slot: getUpdateSlot(), data }));
    } catch {
      return false;
    }
    return true;
  }

  function formatSourceDate(value) {
    if (!value) return messages[language].sourceFallback;
    const parts = String(value).match(/(\d{4})-(\d{2})-(\d{2})/);
    if (!parts) return messages[language].sourceFallback;
    const date = language === "ru" ? `${parts[3]}.${parts[2]}.${parts[1]}` : `${parts[1]}-${parts[2]}-${parts[3]}`;
    return messages[language].sourceDate(date);
  }

  function setStatus(text, state = "ready") {
    statusTextEl.textContent = text;
    statusEl.className = `status ${state}`;
  }

  function setChartStatus(text, state = "ready") {
    chartStatusTextEl.textContent = text;
    chartStatusEl.className = `status chart-status ${state}`;
  }

  function getIsoDate(offsetDays = 0) {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().slice(0, 10);
  }

  function getIsoMonthDate(offsetMonths = 0) {
    const date = new Date();
    date.setMonth(date.getMonth() + offsetMonths);
    return date.toISOString().slice(0, 10);
  }

  function formatDisplayDate(value) {
    const parts = String(value || "").match(/(\d{4})-(\d{2})-(\d{2})/);
    if (!parts) return "";
    return language === "ru" ? `${parts[3]}.${parts[2]}.${parts[1]}` : `${parts[1]}-${parts[2]}-${parts[3]}`;
  }

  function formatChartTickDate(value) {
    const parts = String(value || "").match(/(\d{4})-(\d{2})-(\d{2})/);
    if (!parts) return "";
    return language === "ru" ? `${parts[3]}.${parts[2]}` : `${parts[2]}/${parts[3]}`;
  }

  function getChartCacheKey(currency, months = chartMonths) {
    return `${CHART_CACHE_KEY}_${currency}_${months}_${getIsoDate()}`;
  }

  function readChartCache(currency, months = chartMonths, allowStale = false) {
    try {
      const cache = JSON.parse(localStorage.getItem(getChartCacheKey(currency, months)));
      if (Array.isArray(cache?.points) && cache.points.length >= 2) return cache;
      if (!allowStale) return null;
      const prefix = `${CHART_CACHE_KEY}_${currency}_${months}_`;
      let latestCache = null;
      for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (!key?.startsWith(prefix)) continue;
        const item = JSON.parse(localStorage.getItem(key));
        if (!Array.isArray(item?.points) || item.points.length < 2) continue;
        if (!latestCache || Number(item.savedAt || 0) > Number(latestCache.savedAt || 0)) latestCache = item;
      }
      return latestCache;
    } catch {
      return null;
    }
  }

  function saveChartCache(currency, months, points) {
    try {
      localStorage.setItem(getChartCacheKey(currency, months), JSON.stringify({ points, savedAt: Date.now() }));
    } catch {
      return false;
    }
    return true;
  }

  function clearChart() {
    chartGridEl.replaceChildren();
    chartLabelsEl.replaceChildren();
    chartCandlesEl.replaceChildren();
    chartPointsEl.replaceChildren();
    chartAreaEl.setAttribute("d", "");
    chartLineEl.setAttribute("d", "");
    chartLatestEl.textContent = "—";
    chartChangeEl.textContent = "—";
    chartMappedPoints = [];
    chartBounds = null;
    hideChartTooltip();
  }

  function buildCandles(points) {
    const sortedPoints = points.slice().sort((a, b) => a.date.localeCompare(b.date));
    const bucketSize = chartMonths <= 3 ? 3 : chartMonths <= 6 ? 5 : 10;
    const buckets = [];
    for (let index = 0; index < sortedPoints.length; index += bucketSize) {
      buckets.push(sortedPoints.slice(index, index + bucketSize));
    }
    return buckets.map(bucket => {
      const sorted = bucket.slice().sort((a, b) => a.date.localeCompare(b.date));
      const values = sorted.map(point => point.value);
      return {
        date: sorted[sorted.length - 1].date,
        startDate: sorted[0].date,
        endDate: sorted[sorted.length - 1].date,
        open: sorted[0].value,
        high: Math.max(...values),
        low: Math.min(...values),
        close: sorted[sorted.length - 1].value
      };
    });
  }

  function parseChartRows(data, currency) {
    const rows = Array.isArray(data)
      ? data
      : Object.entries(data?.rates || {}).map(([date, ratesForDate]) => ({
        date,
        quote: currency,
        rate: ratesForDate?.[currency]
      }));
    return rows
      .filter(item => item.quote === currency && Number.isFinite(Number(item.rate)) && Number(item.rate) > 0)
      .map(item => ({ date: item.date, value: Number(item.rate) }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  async function fetchChartPoints(from, currency, signal) {
    const url = `https://api.frankfurter.dev/v2/rates?from=${from}&base=EUR&quotes=${currency}`;
    const response = await fetch(url, { signal, cache: "no-store" });
    if (!response.ok) throw new Error("HTTP error");
    const data = await response.json();
    const points = parseChartRows(data, currency);
    if (points.length < 2) throw new Error("Missing chart data");
    return points;
  }

  function drawChart(points) {
    clearChart();
    chartPoints = points;
    if (points.length < 2) {
      chartEmptyEl.hidden = false;
      chartEmptyEl.textContent = messages[language].chartUnavailable;
      return;
    }
    chartEmptyEl.hidden = true;
    const width = 520;
    const height = 260;
    const padding = { top: 24, right: 64, bottom: 42, left: 42 };
    const candleMode = chartType === "candles";
    const candles = buildCandles(points);
    const series = candleMode ? candles : points;
    if (series.length < 2) {
      chartEmptyEl.hidden = false;
      chartEmptyEl.textContent = messages[language].chartUnavailable;
      return;
    }
    const values = candleMode ? series.flatMap(point => [point.high, point.low]) : series.map(point => point.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || Math.max(max * 0.01, 0.01);
    const xStep = (width - padding.left - padding.right) / (series.length - 1);
    const toY = value => padding.top + (max - value) * (height - padding.top - padding.bottom) / range;
    const mapped = series.map((point, index) => candleMode ? {
      x: padding.left + index * xStep,
      y: toY(point.close),
      yOpen: toY(point.open),
      yClose: toY(point.close),
      yHigh: toY(point.high),
      yLow: toY(point.low),
      value: point.close,
      date: point.date,
      startDate: point.startDate,
      endDate: point.endDate,
      open: point.open,
      high: point.high,
      low: point.low,
      close: point.close
    } : {
      x: padding.left + index * xStep,
      y: toY(point.value),
      value: point.value,
      date: point.date
    });
    chartMappedPoints = mapped;
    chartBounds = { width, height, padding };
    const grid = document.createDocumentFragment();
    const labels = document.createDocumentFragment();
    for (let index = 0; index < 4; index += 1) {
      const ratio = index / 3;
      const y = padding.top + ratio * (height - padding.top - padding.bottom);
      const labelValue = max - ratio * range;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", padding.left);
      line.setAttribute("x2", width - padding.right);
      line.setAttribute("y1", y.toFixed(2));
      line.setAttribute("y2", y.toFixed(2));
      grid.appendChild(line);
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", width - padding.right + 12);
      label.setAttribute("y", (y + 4).toFixed(2));
      label.textContent = formatRate(labelValue);
      labels.appendChild(label);
    }
    const dateIndexes = [0, Math.floor((series.length - 1) / 2), series.length - 1];
    dateIndexes.forEach((pointIndex, labelIndex) => {
      const point = mapped[pointIndex];
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", point.x.toFixed(2));
      label.setAttribute("y", height - 10);
      label.setAttribute("text-anchor", labelIndex === 0 ? "start" : labelIndex === 2 ? "end" : "middle");
      label.textContent = formatChartTickDate(point.date);
      labels.appendChild(label);
    });
    chartGridEl.appendChild(grid);
    chartLabelsEl.appendChild(labels);
    if (candleMode) {
      const candleGroup = document.createDocumentFragment();
      const bodyWidth = Math.max(8, Math.min(13, xStep * 0.72));
      const minBodyHeight = 9;
      const minWickHeight = 20;
      mapped.forEach(point => {
        const rising = point.close >= point.open;
        const item = document.createElementNS("http://www.w3.org/2000/svg", "g");
        item.setAttribute("class", `chart-candle ${rising ? "up" : "down"}`);
        const rawBodyHeight = Math.abs(point.yClose - point.yOpen);
        const bodyHeight = Math.max(minBodyHeight, rawBodyHeight);
        const bodyCenter = (point.yOpen + point.yClose) / 2;
        const bodyY = Math.max(padding.top, Math.min(height - padding.bottom - bodyHeight, bodyCenter - bodyHeight / 2));
        const wickCenter = (point.yHigh + point.yLow) / 2;
        const wickTop = Math.max(padding.top, Math.min(point.yHigh, wickCenter - minWickHeight / 2, bodyY - 4));
        const wickBottom = Math.min(height - padding.bottom, Math.max(point.yLow, wickCenter + minWickHeight / 2, bodyY + bodyHeight + 4));
        const wick = document.createElementNS("http://www.w3.org/2000/svg", "line");
        wick.setAttribute("x1", point.x.toFixed(2));
        wick.setAttribute("x2", point.x.toFixed(2));
        wick.setAttribute("y1", wickTop.toFixed(2));
        wick.setAttribute("y2", wickBottom.toFixed(2));
        const body = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        body.setAttribute("x", (point.x - bodyWidth / 2).toFixed(2));
        body.setAttribute("y", bodyY.toFixed(2));
        body.setAttribute("width", bodyWidth.toFixed(2));
        body.setAttribute("height", bodyHeight.toFixed(2));
        body.setAttribute("rx", "2.5");
        item.append(wick, body);
        candleGroup.appendChild(item);
      });
      chartCandlesEl.appendChild(candleGroup);
    } else {
      const linePath = mapped.map((point, index) => `${index ? "L" : "M"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
      const areaPath = `${linePath} L ${mapped[mapped.length - 1].x.toFixed(2)} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;
      chartAreaEl.setAttribute("d", areaPath);
      chartLineEl.setAttribute("d", linePath);
      const visiblePoints = [mapped[0], mapped[Math.floor(mapped.length / 2)], mapped[mapped.length - 1]];
      const pointGroup = document.createDocumentFragment();
      visiblePoints.forEach(point => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", point.x.toFixed(2));
        circle.setAttribute("cy", point.y.toFixed(2));
        circle.setAttribute("r", "4.5");
        pointGroup.appendChild(circle);
      });
      chartPointsEl.appendChild(pointGroup);
    }
    const first = candleMode ? series[0].open : series[0].value;
    const latest = candleMode ? series[series.length - 1].close : series[series.length - 1].value;
    const change = (latest - first) / first * 100;
    chartLatestEl.textContent = formatRate(latest);
    chartChangeEl.textContent = `${change >= 0 ? "+" : ""}${formatNumber(change, 2, 2)}%`;
    chartChangeEl.classList.toggle("positive", change >= 0);
    chartChangeEl.classList.toggle("negative", change < 0);
  }

  function hideChartTooltip() {
    chartHoverEl.hidden = true;
    chartTooltipEl.hidden = true;
  }

  function updateChartTooltip(clientX) {
    if (!chartMappedPoints.length || !chartBounds) return;
    const rect = priceChartEl.getBoundingClientRect();
    const x = (clientX - rect.left) * chartBounds.width / rect.width;
    let nearest = chartMappedPoints[0];
    for (const point of chartMappedPoints) {
      if (Math.abs(point.x - x) < Math.abs(nearest.x - x)) nearest = point;
    }
    chartHoverEl.hidden = false;
    chartTooltipEl.hidden = false;
    chartHoverLineEl.setAttribute("x1", nearest.x.toFixed(2));
    chartHoverLineEl.setAttribute("x2", nearest.x.toFixed(2));
    chartHoverLineEl.setAttribute("y1", chartBounds.padding.top);
    chartHoverLineEl.setAttribute("y2", chartBounds.height - chartBounds.padding.bottom);
    chartHoverPointEl.setAttribute("cx", nearest.x.toFixed(2));
    chartHoverPointEl.setAttribute("cy", nearest.y.toFixed(2));
    if (nearest.close) {
      const range = nearest.startDate === nearest.endDate ? formatDisplayDate(nearest.date) : `${formatDisplayDate(nearest.startDate)}-${formatDisplayDate(nearest.endDate)}`;
      chartTooltipValueEl.textContent = `${formatRate(nearest.close)} ${chartCurrencyEl.value}`;
      chartTooltipDateEl.textContent = messages[language].candleTooltip(range, formatRate(nearest.open), formatRate(nearest.high), formatRate(nearest.low), formatRate(nearest.close), chartCurrencyEl.value);
    } else {
      chartTooltipValueEl.textContent = `${formatRate(nearest.value)} ${chartCurrencyEl.value}`;
      chartTooltipDateEl.textContent = formatDisplayDate(nearest.date);
    }
    const tooltipX = nearest.x * rect.width / chartBounds.width;
    const tooltipY = nearest.y * rect.height / chartBounds.height;
    const clampedX = Math.min(Math.max(14, tooltipX - 58), rect.width - 116);
    const clampedY = Math.max(14, tooltipY - 58);
    chartTooltipEl.style.transform = `translate3d(${Math.round(clampedX)}px, ${Math.round(clampedY)}px, 0)`;
  }

  function applyChart(points, stale = false) {
    const currency = chartCurrencyEl.value;
    const lastDate = points[points.length - 1]?.date || "";
    chartPairEl.textContent = `EUR / ${currency}`;
    chartRangeEl.textContent = messages[language].chartRange(chartMonths);
    drawChart(points);
    setChartStatus(stale ? messages[language].chartSavedData(messages[language].chartSource(formatDisplayDate(lastDate))) : messages[language].chartSource(formatDisplayDate(lastDate)), stale ? "warning" : "ready");
  }

  async function loadChart(force = false) {
    if (chartLoading) return;
    const currency = chartCurrencyEl.value;
    const months = chartMonths;
    const freshCache = readChartCache(currency, months);
    if (freshCache && !force) {
      applyChart(freshCache.points);
      return;
    }
    const staleCache = readChartCache(currency, months, true);
    if (staleCache && !force) applyChart(staleCache.points, true);
    chartLoading = true;
    chartRefreshBtn.disabled = true;
    chartRefreshBtn.classList.add("loading");
    chartEmptyEl.hidden = false;
    chartEmptyEl.textContent = messages[language].chartLoading;
    setChartStatus(messages[language].chartUpdating, "loading");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const from = getIsoMonthDate(-months);
      const points = await fetchChartPoints(from, currency, controller.signal);
      saveChartCache(currency, months, points);
      applyChart(points);
    } catch {
      if (staleCache) {
        applyChart(staleCache.points, true);
      } else {
        clearChart();
        chartEmptyEl.hidden = false;
        chartEmptyEl.textContent = messages[language].chartUnavailable;
        setChartStatus(messages[language].chartUnavailable, "error");
      }
    } finally {
      clearTimeout(timeout);
      chartLoading = false;
      chartRefreshBtn.disabled = false;
      chartRefreshBtn.classList.remove("loading");
    }
  }

  function applyCache(cache, stale = false) {
    rates = cache.data.rates;
    convert();
    const source = formatSourceDate(cache.data.date);
    setStatus(stale ? messages[language].savedData(source) : source, stale ? "warning" : "ready");
  }

  async function loadRates(force = false) {
    if (loading) return;
    const freshCache = readCache(false);
    if (freshCache && !force) {
      applyCache(freshCache);
      return;
    }
    const staleCache = readCache(true);
    if (staleCache && !force) applyCache(staleCache, true);
    loading = true;
    refreshBtn.disabled = true;
    refreshBtn.classList.add("loading");
    setStatus(messages[language].updatingRates, "loading");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(API_URL, { signal: controller.signal, cache: "no-store" });
      if (!response.ok) throw new Error("HTTP error");
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid response");
      const nextRates = { EUR: 1 };
      let sourceDate = "";
      for (const item of data) {
        if (!list.includes(item.quote) || item.quote === "EUR" || nextRates[item.quote]) continue;
        const rate = Number(item.rate);
        if (Number.isFinite(rate) && rate > 0) {
          nextRates[item.quote] = 1 / rate;
          sourceDate ||= item.date || "";
        }
      }
      if (!list.every(code => Number.isFinite(nextRates[code]))) throw new Error("Missing rate");
      rates = nextRates;
      saveCache({ rates, date: sourceDate });
      convert();
      setStatus(formatSourceDate(sourceDate));
    } catch {
      const fallbackCache = readCache(true);
      if (fallbackCache) {
        applyCache(fallbackCache, true);
      } else {
        rates = { EUR: 1 };
        convert();
        setStatus(messages[language].loadError, "error");
      }
    } finally {
      clearTimeout(timeout);
      loading = false;
      refreshBtn.disabled = false;
      refreshBtn.classList.remove("loading");
    }
  }

  async function copyTextValue(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    if (!copied) throw new Error("Copy failed");
  }

  function showCopyFeedback(kind) {
    clearTimeout(feedbackTimer);
    copyBtn.classList.remove("success", "error");
    if (kind === "success") {
      copyBtn.classList.add("success");
      copyText.textContent = messages[language].copied;
      if (window.gsap && motionAllowed) window.gsap.fromTo(copyBtn, { scale: 0.97 }, { scale: 1, duration: 0.34, ease: "back.out(2)", overwrite: true, onComplete: () => window.gsap.set(copyBtn, { clearProps: "transform" }) });
    } else {
      copyBtn.classList.add("error");
      copyText.textContent = messages[language].copyError;
    }
    feedbackTimer = setTimeout(() => {
      copyBtn.classList.remove("success", "error");
      copyText.textContent = messages[language].copy;
    }, 1600);
  }

  function syncLanguageButtons() {
    if (languageSwitch) languageSwitch.dataset.language = language;
    languageButtons.forEach(button => {
      const active = button.dataset.language === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function syncThemeButtons() {
    themeButtons.forEach(button => {
      const active = button.dataset.theme === theme;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    themeButtons[0]?.parentElement?.style.setProperty("--active-index", theme === "dark" ? 1 : 0);
  }

  function syncSegmentIndicators() {
    themeButtons[0]?.parentElement?.style.setProperty("--active-index", theme === "dark" ? 1 : 0);
    chartTypeButtons[0]?.parentElement?.style.setProperty("--active-index", chartType === "candles" ? 1 : 0);
    chartPeriodButtons[0]?.parentElement?.style.setProperty("--active-index", String(chartMonths === 12 ? 2 : chartMonths === 6 ? 1 : 0));
  }

  function syncChartSettingButtons() {
    chartTypeButtons.forEach(button => {
      const active = button.dataset.chartType === chartType;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    chartTypeButtons[0]?.parentElement?.style.setProperty("--active-index", chartType === "candles" ? 1 : 0);
    chartPeriodButtons.forEach(button => {
      const active = Number(button.dataset.chartMonths) === chartMonths;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    chartPeriodButtons[0]?.parentElement?.style.setProperty("--active-index", String(chartMonths === 12 ? 2 : chartMonths === 6 ? 1 : 0));
    syncSegmentIndicators();
  }

  function applyTheme() {
    document.documentElement.dataset.theme = theme;
  }

  function setSettingsOpen(open) {
    if (open) {
      settingsPanel.hidden = false;
      requestAnimationFrame(() => {
        settingsPanel.dataset.open = "true";
        syncSegmentIndicators();
      });
    } else {
      delete settingsPanel.dataset.open;
      window.setTimeout(() => {
        if (!settingsPanel.dataset.open) settingsPanel.hidden = true;
      }, 210);
    }
    settingsToggle.setAttribute("aria-expanded", String(open));
    settingsToggle.setAttribute("aria-label", open ? messages[language].closeSettings : messages[language].settings);
  }

  function syncPageButton() {
    const nextIsConverter = activePage === "chart";
    const icon = chartPageButton.querySelector("[data-lucide]");
    chartPageButtonText.textContent = messages[language][nextIsConverter ? "converterPage" : "chartPage"];
    chartPageButton.setAttribute("aria-label", chartPageButtonText.textContent);
    if (icon) {
      icon.dataset.lucide = nextIsConverter ? "calculator" : "line-chart";
      icon.textContent = nextIsConverter ? "⌁" : "↗";
    }
    if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 2.1 } });
  }

  function switchPage(nextPage) {
    if (activePage === nextPage) return;
    closeAllCustomSelects();
    setSettingsOpen(false);
    const next = nextPage === "chart" ? chartPage : converterPage;
    const current = activePage === "chart" ? chartPage : converterPage;
    activePage = nextPage;
    next.hidden = false;
    requestAnimationFrame(() => {
      current.classList.remove("active");
      current.hidden = true;
      next.classList.add("active");
      document.querySelector(".app")?.classList.toggle("chart-mode", nextPage === "chart");
      syncPageButton();
    });
    if (nextPage === "chart") loadChart();
  }

  function applyLanguage() {
    const text = messages[language];
    document.documentElement.lang = language;
    document.title = text.pageTitle;
    document.querySelector("main")?.setAttribute("aria-label", text.mainLabel);
    document.querySelector(".converter")?.setAttribute("aria-label", text.sectionLabel);
    document.querySelector(".language-switch")?.setAttribute("aria-label", text.language);
    settingsToggleText.textContent = text.settings;
    syncPageButton();
    settingsToggle.setAttribute("aria-label", settingsPanel.hidden ? text.settings : text.closeSettings);
    themeSettingLabel.textContent = text.theme;
    chartTypeSettingLabel.textContent = text.chartType;
    chartPeriodSettingLabel.textContent = text.chartPeriod;
    themeButtons.forEach(button => {
      const key = `${button.dataset.theme}Theme`;
      button.textContent = text[key];
    });
    chartTypeButtons.forEach(button => {
      button.textContent = button.dataset.chartType === "candles" ? text.candleChart : text.lineChart;
    });
    fromEl.setAttribute("aria-label", text.sourceCurrency);
    toEl.setAttribute("aria-label", text.targetCurrency);
    amountEl.setAttribute("aria-label", text.amount);
    swapBtn.setAttribute("aria-label", text.swap);
    swapBtn.title = text.swap;
    copyBtn.setAttribute("aria-label", text.copy);
    refreshBtn.setAttribute("aria-label", text.updatingRates);
    refreshBtn.title = text.updatingRates;
    chartBack.setAttribute("aria-label", text.backToConverter);
    chartCurrencyEl.setAttribute("aria-label", text.chartCurrency);
    chartTitleEl.textContent = text.chartTitle;
    chartSubtitleEl.textContent = text.chartSubtitle;
    chartRangeEl.textContent = text.chartRange(chartMonths);
    chartLatestLabelEl.textContent = text.chartLatest;
    chartChangeLabelEl.textContent = text.chartChange;
    chartRefreshBtn.setAttribute("aria-label", text.chartUpdating);
    chartRefreshBtn.title = text.chartUpdating;
    if (!copyBtn.classList.contains("success") && !copyBtn.classList.contains("error")) copyText.textContent = text.copy;
    syncLanguageButtons();
    syncThemeButtons();
    syncChartSettingButtons();
    requestAnimationFrame(syncSegmentIndicators);
    syncCustomSelect(fromEl);
    syncCustomSelect(toEl);
    syncCustomSelect(chartCurrencyEl);
    convert();
    if (chartPoints.length) applyChart(chartPoints);
    const freshCache = readCache(false);
    const staleCache = freshCache || readCache(true);
    if (staleCache) applyCache(staleCache, !freshCache);
    else setStatus(loading ? text.updatingRates : text.fetchingRates, loading ? "loading" : "ready");
  }

  amountEl.addEventListener("input", () => {
    formatAmountField();
    convert();
  });
  amountEl.addEventListener("focus", event => event.target.select());
  fromEl.addEventListener("change", () => {
    saveSettings();
    convert();
    animateSelection(fromEl);
  });
  toEl.addEventListener("change", () => {
    saveSettings();
    convert();
    animateSelection(toEl);
  });
  languageButtons.forEach(button => {
    button.addEventListener("click", () => {
      language = button.dataset.language === "ru" ? "ru" : "en";
      saveSettings();
      applyLanguage();
    });
  });
  themeButtons.forEach(button => {
    button.addEventListener("click", () => {
      theme = button.dataset.theme;
      saveSettings();
      applyTheme();
      syncThemeButtons();
    });
  });
  chartTypeButtons.forEach(button => {
    button.addEventListener("click", () => {
      chartType = button.dataset.chartType === "line" ? "line" : "candles";
      saveSettings();
      syncChartSettingButtons();
      if (chartPoints.length) applyChart(chartPoints);
    });
  });
  chartPeriodButtons.forEach(button => {
    button.addEventListener("click", () => {
      const nextMonths = Number(button.dataset.chartMonths);
      if (![3, 6, 12].includes(nextMonths) || nextMonths === chartMonths) return;
      chartMonths = nextMonths;
      saveSettings();
      syncChartSettingButtons();
      if (activePage === "chart") loadChart();
      else chartRangeEl.textContent = messages[language].chartRange(chartMonths);
    });
  });
  chartPageButton.addEventListener("click", () => switchPage(activePage === "chart" ? "converter" : "chart"));
  chartBack.addEventListener("click", () => switchPage("converter"));
  chartCurrencyEl.addEventListener("change", () => {
    saveSettings();
    syncCustomSelect(chartCurrencyEl);
    loadChart(true);
    animateSelection(chartCurrencyEl);
  });
  settingsToggle.addEventListener("click", () => {
    setSettingsOpen(settingsPanel.dataset.open !== "true");
  });
  swapBtn.addEventListener("click", animateSwap);
  refreshBtn.addEventListener("click", () => {
    animateIcon(refreshBtn, 360);
    loadRates(true);
  });
  chartRefreshBtn.addEventListener("click", () => {
    animateIcon(chartRefreshBtn, 360);
    loadChart(true);
  });
  priceChartEl.addEventListener("pointermove", event => {
    updateChartTooltip(event.clientX);
  });
  priceChartEl.addEventListener("pointerleave", hideChartTooltip);
  priceChartEl.addEventListener("pointerdown", event => {
    updateChartTooltip(event.clientX);
  });
  copyBtn.addEventListener("click", async () => {
    if (!currentResult) return;
    try {
      await copyTextValue(currentResult);
      showCopyFeedback("success");
    } catch {
      showCopyFeedback("error");
    }
  });
  document.addEventListener("pointerdown", event => {
    customSelectControls.forEach(control => {
      if (!control.shell.contains(event.target) && !control.menu.contains(event.target)) closeCustomSelect(control);
    });
  });
  window.addEventListener("resize", () => {
    closeAllCustomSelects();
    syncSegmentIndicators();
  }, { passive: true });
  window.addEventListener("scroll", event => {
    if (!isInsideSelectMenu(event.target)) closeAllCustomSelects();
  }, { passive: true, capture: true });

  initVisuals();
  createOptions();
  applyTheme();
  applyLanguage();
  loadRates();
  setInterval(() => {
    if (!readCache(false)) loadRates(true);
  }, CHECK_INTERVAL);
  setInterval(() => {
    if (activePage === "chart" && !readChartCache(chartCurrencyEl.value, chartMonths)) loadChart(true);
  }, CHECK_INTERVAL);
}());
