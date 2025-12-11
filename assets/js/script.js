document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const isActive = navMenu.classList.contains("active");

      navMenu.classList.toggle("active");

      if (!isActive) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }

      const spans = navToggle.querySelectorAll("span");
      if (navMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(-45deg) translate(-6px, 6px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(45deg) translate(-6px, -6px)";
      } else {
        spans[0].style.transform = "";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "";
      }
    });

    document.addEventListener("click", function (event) {
      const isClickInsideMenu = navMenu.contains(event.target);
      const isClickOnToggle = navToggle.contains(event.target);

      if (
        !isClickInsideMenu &&
        !isClickOnToggle &&
        navMenu.classList.contains("active")
      ) {
        navMenu.classList.remove("active");
        body.style.overflow = "";

        const spans = navToggle.querySelectorAll("span");
        spans[0].style.transform = "";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "";
      }
    });

    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        body.style.overflow = "";

        const spans = navToggle.querySelectorAll("span");
        spans[0].style.transform = "";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "";
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 992 && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        body.style.overflow = "";

        const spans = navToggle.querySelectorAll("span");
        spans[0].style.transform = "";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "";
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        body.style.overflow = "";

        const spans = navToggle.querySelectorAll("span");
        spans[0].style.transform = "";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "";
      }
    });
  }

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#" || href === "javascript:void(0)") {
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    ".area-card, .feature-item, .benefit-card, .milestone-card, " +
      ".strategy-block, .skill-card, .rhyme-card, .activity-card, " +
      ".routine-card, .resource-card"
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  const style = document.createElement("style");
  style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
  document.head.appendChild(style);

  const timelineButtons = document.querySelectorAll(".timeline-btn");
  const milestoneCards = document.querySelectorAll(".milestone-card");

  if (timelineButtons.length > 0 && milestoneCards.length > 0) {
    function showMilestone(ageGroup) {
      timelineButtons.forEach((btn) => btn.classList.remove("active"));

      milestoneCards.forEach((card) => {
        card.classList.remove("active");
        card.style.display = "none";
      });

      const selectedCard = document.querySelector(
        `.milestone-card[data-age="${ageGroup}"]`
      );
      if (selectedCard) {
        selectedCard.style.display = "block";

        setTimeout(() => {
          selectedCard.classList.add("active");
        }, 10);

        setTimeout(() => {
          selectedCard.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }, 100);
      }

      const activeButton = document.querySelector(
        `.timeline-btn[data-age="${ageGroup}"]`
      );
      if (activeButton) {
        activeButton.classList.add("active");
      }
    }

    timelineButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const ageGroup = this.getAttribute("data-age");
        showMilestone(ageGroup);
      });
    });

    const defaultActive = document.querySelector(".milestone-card.active");
    if (defaultActive) {
      const ageGroup = defaultActive.getAttribute("data-age");
      showMilestone(ageGroup);
    } else if (milestoneCards.length > 0) {
      const firstAge = milestoneCards[0].getAttribute("data-age");
      showMilestone(firstAge);
    }
  }

  const tabButtons = document.querySelectorAll("[data-tab-target]");
  const tabContents = document.querySelectorAll("[data-tab-content]");

  if (tabButtons.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const target = this.getAttribute("data-tab-target");

        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));

        this.classList.add("active");
        const targetContent = document.querySelector(
          `[data-tab-content="${target}"]`
        );
        if (targetContent) {
          targetContent.classList.add("active");
        }
      });
    });
  }

  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const accordionItem = this.parentElement;
      const content = accordionItem.querySelector(".accordion-content");

      accordionItem.classList.toggle("active");

      if (accordionItem.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = "0";
      }
    });
  });

  const modalTriggers = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");
  const modalCloses = document.querySelectorAll(".modal-close");

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      const modalId = this.getAttribute("data-modal");
      const modal = document.getElementById(modalId);

      if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  modalCloses.forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      const modal = this.closest(".modal");
      if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal.active");
      if (activeModal) {
        activeModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    }
  });

  const zoomableImages = document.querySelectorAll(".zoomable");

  zoomableImages.forEach((img) => {
    img.addEventListener("click", function () {
      this.classList.toggle("zoomed");
    });
  });

  function updateScrollProgress() {
    const scrollProgress = document.querySelector(".scroll-progress");

    if (scrollProgress) {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;

      scrollProgress.style.width = progress + "%";
    }
  }

  if (!document.querySelector(".scroll-progress")) {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
    document.body.prepend(progressBar);
  }

  window.addEventListener("scroll", updateScrollProgress);
  updateScrollProgress();

  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = "↑";
  backToTopBtn.className = "back-to-top";
  backToTopBtn.setAttribute("aria-label", "Back to top");
  backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    `;

  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopBtn.style.opacity = "1";
      backToTopBtn.style.visibility = "visible";
    } else {
      backToTopBtn.style.opacity = "0";
      backToTopBtn.style.visibility = "hidden";
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  backToTopBtn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
    this.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.3)";
  });

  backToTopBtn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.2)";
  });

  const counters = document.querySelectorAll(".counter");

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute("data-target"));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target;
              }
            };

            updateCounter();
            counterObserver.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  const tooltipTriggers = document.querySelectorAll("[data-tooltip]");

  tooltipTriggers.forEach((trigger) => {
    const tooltipText = trigger.getAttribute("data-tooltip");

    trigger.addEventListener("mouseenter", function (e) {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = tooltipText;
      tooltip.style.cssText = `
                position: absolute;
                background: var(--text-dark);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 10000;
                pointer-events: none;
                white-space: nowrap;
            `;

      document.body.appendChild(tooltip);

      const rect = trigger.getBoundingClientRect();
      tooltip.style.left =
        rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px";

      trigger._tooltip = tooltip;
    });

    trigger.addEventListener("mouseleave", function () {
      if (this._tooltip) {
        this._tooltip.remove();
        this._tooltip = null;
      }
    });
  });

  const forms = document.querySelectorAll("form[data-validate]");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;
      const inputs = form.querySelectorAll(
        "input[required], textarea[required]"
      );

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add("error");

          let errorMsg = input.nextElementSibling;
          if (!errorMsg || !errorMsg.classList.contains("error-message")) {
            errorMsg = document.createElement("span");
            errorMsg.className = "error-message";
            errorMsg.textContent = "This field is required";
            errorMsg.style.color = "red";
            errorMsg.style.fontSize = "14px";
            input.parentNode.insertBefore(errorMsg, input.nextSibling);
          }
        } else {
          input.classList.remove("error");
          const errorMsg = input.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains("error-message")) {
            errorMsg.remove();
          }
        }
      });

      if (isValid) {
        form.submit();
      }
    });
  });

  const lazyImages = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute("data-src");
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  } else {
    lazyImages.forEach((img) => {
      img.src = img.getAttribute("data-src");
      img.removeAttribute("data-src");
    });
  }

  const printButtons = document.querySelectorAll(".print-btn");

  printButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      window.print();
    });
  });

  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetId = this.getAttribute("data-copy-target");
      const target = document.getElementById(targetId);

      if (target) {
        const text = target.textContent || target.innerText;

        navigator.clipboard.writeText(text).then(() => {
          const originalText = this.textContent;
          this.textContent = "Copied!";

          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        });
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const activeMenu = document.querySelector(".nav-menu.active");
      if (activeMenu) {
        activeMenu.classList.remove("active");
      }
    }
  });

  console.log(
    "%c🌱 GLA - Grow Learn Adopt",
    "color: #FF6B9D; font-size: 24px; font-weight: bold;"
  );
  console.log(
    "%cWelcome to our educational website!",
    "color: #4ECDC4; font-size: 16px;"
  );
  console.log(
    "%cSupporting families in nurturing early language and communication skills.",
    "color: #546E7A; font-size: 14px;"
  );

  console.log("✓ All interactive features loaded successfully");
});

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
