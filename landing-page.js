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

const signupForm = document.querySelector("#signup-form");
const emailInput = document.querySelector("#email");
const formMessage = document.querySelector("#form-message");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (email === "") {
    formMessage.textContent = "Please enter your email address.";
    return;
  }

  formMessage.textContent =
    "Thank you! Your interest in StudyMachan has been recorded.";

  emailInput.value = "";
});