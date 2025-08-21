"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// modal variables
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal content variables
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalProjectImg = document.querySelector("[data-modal-project-img]");

// modal toggle function
const modalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// testimonials variables and functionality
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");

// add click event to all testimonials items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    // Hide project image for testimonials
    modalProjectImg.style.display = "none";
    modalImg.style.display = "block";

    modalContainer.classList.remove("is-portfolio");
    modalProjectImg.style.width = "";
    modalProjectImg.style.height = "";
    modalProjectImg.style.maxWidth = "";
    modalProjectImg.style.maxHeight = "";
    modalProjectImg.style.objectFit = "";
    modalProjectImg.style.borderRadius = "";

    modalFunc();
  });
}

// portfolio variables and functionality
const portfolioItems = document.querySelectorAll("[data-portfolio-item]");

// add click event to all portfolio items
for (let i = 0; i < portfolioItems.length; i++) {
  portfolioItems[i].addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link behavior

    const projectImg = this.querySelector("[data-portfolio-img]");
    const projectTitle = this.querySelector("[data-portfolio-title]");
    const projectCategory = this.querySelector("[data-portfolio-category]");

    const videoId = projectImg.dataset.videoId;

    if (videoId) {
      // If it's a video, embed iframe
      modalProjectImg.style.display = "none";
      modalImg.style.display = "none";

      // Create iframe dynamically
      const iframe = document.createElement("iframe");
      iframe.width = "500";
      iframe.height = "300";
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.frameBorder = "0";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;

      // Clear any old iframe first
      const wrapper = document.querySelector(".modal-img-wrapper");
      wrapper.innerHTML = "";
      wrapper.appendChild(iframe);
    } else {
      // Show project image for portfolio
      modalProjectImg.src = projectImg.src;
      modalProjectImg.alt = projectImg.alt;
      modalProjectImg.style.display = "block";
      modalImg.style.display = "none";
    }

    modalProjectImg.style.width = "min(500px, 90vw)";
    modalProjectImg.style.height = "min(500px, 90vw)";
    modalProjectImg.style.maxWidth = "none";
    modalProjectImg.style.maxHeight = "none";
    modalProjectImg.style.objectFit = "contain";
    modalProjectImg.style.borderRadius = "16px";

    modalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", modalFunc);
overlay.addEventListener("click", modalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    // let selectedValue = this.innerText.toLowerCase();
    let selectedValue = this.innerText.trim().toLowerCase();
    if (!selectedValue) return;
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (
      selectedValue ===
      (filterItems[i].dataset.category || "").trim().toLowerCase()
    ) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}
