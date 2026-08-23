// Tab switcher logic
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTab = button.dataset.tab;

    tabButtons.forEach((tabButton) => {
      tabButton.classList.remove("active");
    });

    tabPanels.forEach((panel) => {
      panel.classList.remove("active");
    });

    button.classList.add("active");

    const selectedPanel = document.querySelector(
      `.tab-panel[data-panel="${selectedTab}"]`
    );

    if (selectedPanel) {
      selectedPanel.classList.add("active");
    }
  });
});

// Slide Drawer Logic for Log in and Contact Us
const openSlideBtn = document.getElementById("open-slide-btn");
const closeSlideBtn = document.getElementById("close-slide-btn");
const slideDrawer = document.getElementById("slide-drawer");
const slideDrawerBackdrop = document.getElementById("slide-drawer-backdrop");
const slideNavLinks = document.querySelectorAll(".slide-nav-link");

function openSlideDrawer() {
  if (!slideDrawer || !slideDrawerBackdrop) return;
  slideDrawerBackdrop.classList.remove("opacity-0", "pointer-events-none");
  slideDrawerBackdrop.classList.add("opacity-100", "pointer-events-auto");
  slideDrawer.classList.remove("translate-x-full");
  slideDrawer.classList.add("translate-x-0");
  document.body.style.overflow = "hidden";
}

function closeSlideDrawer() {
  if (!slideDrawer || !slideDrawerBackdrop) return;
  slideDrawerBackdrop.classList.remove("opacity-100", "pointer-events-auto");
  slideDrawerBackdrop.classList.add("opacity-0", "pointer-events-none");
  slideDrawer.classList.remove("translate-x-0");
  slideDrawer.classList.add("translate-x-full");
  document.body.style.overflow = "";
}

if (openSlideBtn) {
  openSlideBtn.addEventListener("click", openSlideDrawer);
}

if (closeSlideBtn) {
  closeSlideBtn.addEventListener("click", closeSlideDrawer);
}

if (slideDrawerBackdrop) {
  slideDrawerBackdrop.addEventListener("click", closeSlideDrawer);
}

// Close drawer on pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && slideDrawer && !slideDrawer.classList.contains("translate-x-full")) {
    closeSlideDrawer();
  }
});

// Close drawer when a navigation link inside the drawer is clicked
slideNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeSlideDrawer();
  });
});

