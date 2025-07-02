document.addEventListener("DOMContentLoaded", () => {
    // Open modal
    document.querySelectorAll("[data-modal]").forEach(trigger => {
      trigger.addEventListener("click", () => {
        const targetId = trigger.getAttribute("data-modal");
        const modal = document.getElementById(targetId);
        if (modal) {
          modal.classList.remove("hidden");
          document.body.classList.add("overflow-hidden");
        }
      });
    });
  
    // Close modal
    document.querySelectorAll("[data-close-modal]").forEach(closeBtn => {
      closeBtn.addEventListener("click", () => {
        const modal = closeBtn.closest(".modal");
        if (modal) {
          modal.classList.add("hidden");
          document.body.classList.remove("overflow-hidden");
        }
      });
    });
  });
  