const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        entry.target.style.transitionDelay = `${delay}s`;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((el) => observer.observe(el));

const typeTarget = document.querySelector(".type");
if (typeTarget) {
  const words = typeTarget.dataset.words.split(",");
  let wordIndex = 0;
  let letterIndex = 0;
  let deleting = false;

  const type = () => {
    const currentWord = words[wordIndex].trim();
    const visible = currentWord.slice(0, letterIndex);
    typeTarget.textContent = `${visible}${deleting ? "" : "|"}`;

    if (!deleting) {
      if (letterIndex < currentWord.length) {
        letterIndex += 1;
      } else {
        deleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else if (letterIndex > 0) {
      letterIndex -= 1;
    } else {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, deleting ? 45 : 80);
  };

  type();
}

const sections = document.querySelectorAll("main section");
const activateNav = () => {
  let current = "";
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      current = `#${section.id}`;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === current);
  });
};

window.addEventListener("scroll", activateNav, { passive: true });
activateNav();

const modal = document.querySelector("#project-modal");
const modalTitle = document.querySelector("#modal-title");
const modalRole = document.querySelector("#modal-role");
const modalDesc = document.querySelector("#modal-desc");
const modalPlatform = document.querySelector("#modal-platform");
const modalTech = document.querySelector("#modal-tech");
const modalLink = document.querySelector("#modal-link");
const modalLinkIos = document.querySelector("#modal-link-ios");
const projectCards = document.querySelectorAll(".project-card");
const modalCloseTargets = document.querySelectorAll("[data-close]");

const openModal = (card) => {
  if (!modal) return;
  const data = card.dataset;
  modalTitle.textContent = data.title || card.querySelector("h3")?.textContent || "";
  modalRole.textContent = data.role || "Project";
  modalDesc.textContent = data.desc || card.querySelector("p")?.textContent || "";
  modalPlatform.textContent = data.platform || "—";
  modalTech.textContent = data.tech || "—";
  if (data.link) {
    modalLink.href = data.link;
    modalLink.style.display = "inline-flex";
  } else {
    modalLink.removeAttribute("href");
    modalLink.style.display = "none";
  }
  if (data.linkIos) {
    modalLinkIos.href = data.linkIos;
    modalLinkIos.style.display = "inline-flex";
  } else {
    modalLinkIos.removeAttribute("href");
    modalLinkIos.style.display = "none";
  }
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

projectCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    const target = event.target;
    if (target.closest(".project-cta")) {
      openModal(card);
    }
  });
});

modalCloseTargets.forEach((el) => {
  el.addEventListener("click", closeModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("open")) {
    closeModal();
  }
});
