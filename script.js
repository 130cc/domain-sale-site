
const translations = {
  fa: {
    pageTitle: "این دامنه برای فروش است",
    descriptionMeta: "این نام دامنه اینترنتی برای واگذاری در دسترس است. برای اطلاعات بیشتر با مالک تماس بگیرید.",
    eyebrow: "یک فرصت دیجیتال ارزشمند",
    title: "این دامنه برای فروش است",
    description: "این نام دامنه برای واگذاری در دسترس است. برای کسب اطلاعات بیشتر با ما تماس بگیرید.",
    contact: "اطلاعات تماس",
    "phone-label": "تلفن:",
    "email-label": "ایمیل:",
    "whatsapp-label": "واتساپ:",
    "whatsapp-link": "تماس از طریق واتساپ",
    footer: "تمام حقوق محفوظ است."
  },

  en: {
    pageTitle: "This Domain Is For Sale",
    descriptionMeta: "This domain name is available for sale. Contact the owner for more information.",
    eyebrow: "A Valuable Digital Asset",
    title: "This Domain Is For Sale",
    description: "This domain name is available for acquisition. Contact us for more information.",
    contact: "Contact Information",
    "phone-label": "Phone:",
    "email-label": "Email:",
    "whatsapp-label": "WhatsApp:",
    "whatsapp-link": "Contact via WhatsApp",
    footer: "All rights reserved."
  },

  ar: {
    pageTitle: "هذا النطاق معروض للبيع",
    descriptionMeta: "اسم النطاق هذا متاح للبيع. يرجى التواصل مع المالك لمزيد من المعلومات.",
    eyebrow: "أصل رقمي قيّم",
    title: "هذا النطاق معروض للبيع",
    description: "اسم النطاق هذا متاح للبيع. يرجى التواصل معنا لمزيد من المعلومات.",
    contact: "معلومات الاتصال",
    "phone-label": "الهاتف:",
    "email-label": "البريد الإلكتروني:",
    "whatsapp-label": "واتساب:",
    "whatsapp-link": "التواصل عبر واتساب",
    footer: "جميع الحقوق محفوظة."
  }
};

const languageButtons = document.querySelectorAll("[data-lang]");

function getDomainName() {
  const hostname = window.location.hostname
    .replace(/^www\./i, "")
    .toLowerCase();

  if (
    hostname === "" ||
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  ) {
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

  languageButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.lang === selectedLanguage)
    );
  });

  try {
    localStorage.setItem("domainSaleLanguage", selectedLanguage);
  } catch {
    // Language switching still works without local storage.
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
    // Persian is the default language.
  }

  setLanguage(initialLanguage);
}

initializeSite();
