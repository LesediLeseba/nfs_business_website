// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  // Safety check to ensure elements exist on the current page
  if (hamburger && navMenu) {
    // Toggle menu visibility and burger animation
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevents immediate closing if clicking the button
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking anywhere on the link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Optional: Close the menu if a user clicks outside of it on the page
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Active navigation highlight on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Target the form directly by its ID
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Change the button text to show the user it's processing
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Send data to EmailJS
    // NOTE: Replace 'contact_service' and 'contact_form' with your actual EmailJS Service ID and Template ID if you modified them in your dashboard!
    emailjs.sendForm("contact_service", "contact_form", this)
      .then(() => {
        console.log("SUCCESS!");
        alert("Thank you for your message. We will get back to you shortly.");
        this.reset(); // Clear the form fields upon success
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("Oops! Something went wrong while sending your message. Please try again later.");
      })
      .finally(() => {
        // Re-enable the button back to normal
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      });
  });
}
// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards and sections
document
  .querySelectorAll(".value-card, .service-card, .pricing-card, .contact-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Header shadow on scroll
