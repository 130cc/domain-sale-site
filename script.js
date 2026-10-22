
const translations = {
  fa: {
    pageTitle: "این دامنه برای فروش است",
    descriptionMeta: "این نام دامنه اینترنتی برای واگذاری در دسترس است. برای اطلاعات بیشتر با مالک تماس بگیرید.",
    eyebrow: "یک فرصت دیجیتال ارزشمند",
    title: "این دامنه برای فروش است",
    description: "این نام دامنه برای واگذاری در دسترس است. برای کسب اطلاعات بیشتر با ما تماس بگیرید.",
    contact: "اطلاعات تماس",
    emailLabel: "ایمیل:",
    whatsappLabel: "واتساپ:",
    whatsappLink: "تماس از طریق واتساپ",
    footer: "تمام حقوق محفوظ است."
  },
  en: {
    pageTitle: "This Domain Is For Sale",
    descriptionMeta: "This domain name is available for sale. Contact the owner for more information.",
    eyebrow: "A Valuable Digital Asset",
    title: "This Domain Is For Sale",
    description: "This domain name is available for acquisition. Contact us for more information.",
    contact: "Contact Information",
    emailLabel: "Email:",
    whatsappLabel: "WhatsApp:",
    whatsappLink: "Contact via WhatsApp",
    footer: "All rights reserved."
  },
  ar: {
    pageTitle: "هذا النطاق معروض للبيع",
    descriptionMeta: "اسم النطاق هذا متاح للبيع. يرجى التواصل مع المالك لمزيد من المعلومات.",
    eyebrow: "أصل رقمي قيّم",
    title: "هذا النطاق معروض للبيع",
    description: "اسم النطاق هذا متاح للتنازل والبيع. يرجى التواصل معنا لمزيد من المعلومات.",
    contact: "معلومات الاتصال",
    emailLabel: "البريد الإلكتروني:",
    whatsappLabel: "واتساب:",
    whatsappLink: "التواصل عبر واتساب",
    footer: "جميع الحقوق محفوظة."
  }
};

const languageButtons = document.querySelectorAll("[data-lang]");

function getDomainName() {
  const hostname = window.location.hostname
    .replace(/^www\./i, "")
    .toLowerCase();

  const isLocalPreview =
    hostname === "" ||
    hostname === "localhost" ||
    hostname === "127.0.0.1";

  if (isLocalPreview) {
    return "yourdomain.ir";
  }

  return hostname;
}

function setLanguage(language) {
  const selectedLanguage = translations[language]
    ? language
    : "fa";

  const content = translations[selectedLanguage];

  document.documentElement.lang = selectedLanguage;
  document.documentElement.dir =
    selectedLanguage === "en" ? "ltr" : "rtl";

  document.body.dir =
    selectedLanguage === "en" ? "ltr" : "rtl";

  document.title = content.pageTitle;

  const descriptionMeta = document.querySelector(
    'meta[name="description"]'
  );

  if (descriptionMeta) {
    descriptionMeta.setAttribute(
      "content",
      content.descriptionMeta
    );
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;

    if (Object.prototype.hasOwnProperty.call(content, key)) {
      element.textContent = content[key];
    }
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === selectedLanguage;

    button.setAttribute("aria-pressed", String(active));
  });

  try {
    localStorage.setItem("domainSaleLanguage", selectedLanguage);
  } catch {
    // The site still works if browser storage is unavailable.
  }
}

function initializeSite() {
  const domainHeading = document.getElementById("domain-name");

  if (domainHeading) {
    domainHeading.textContent = getDomainName();
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
    });
  });

  let initialLanguage = "fa";

  try {
    const savedLanguage = localStorage.getItem("domainSaleLanguage");

    if (savedLanguage && translations[savedLanguage]) {
      initialLanguage = savedLanguage;
    }
  } catch {
    // Use Persian as the default language.
  }

  setLanguage(initialLanguage);
}

initializeSite();
