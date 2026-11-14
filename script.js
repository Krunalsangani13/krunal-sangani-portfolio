
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const toast = document.querySelector("#toast");
const yearElement = document.querySelector("#year");

// Mobile navigation
if (menuToggle && navLinks) {
  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Automatically update copyright year
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Toast notification
let toastTimer;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(toastTimer);

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

// Copy contact details
document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy");

    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      showToast("Copied to clipboard");
    } catch (error) {
      showToast(value);
    }
  });
});
// Email button: open Gmail in browser on desktop, mail app on phones
const emailBtn = document.querySelector("#emailMeBtn");

if (emailBtn) {
  emailBtn.addEventListener("click", (event) => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // On phones, mailto: works fine, so leave it alone
    if (isMobile) return;

    event.preventDefault();

    const to = "khsangani3344@gmail.com";
    const subject = encodeURIComponent("Opportunity for Krunal Sangani");
    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1&to=" +
      to +
      "&su=" +
      subject;

    const win = window.open(gmailUrl, "_blank", "noopener");

    // If the popup was blocked, copy the email so the visitor can still reach you
    if (!win) {
      navigator.clipboard
        .writeText(to)
        .then(() => showToast("Email copied: " + to))
        .catch(() => showToast(to));
    }
  });
}