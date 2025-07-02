document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("File-Input");
  const thumbnail = document.getElementById("Thumbnail");
  const changeBtn = document.getElementById("Change-Photo");

  const originalSrc = thumbnail.getAttribute("data-original");

  // Handle "Change Photo" click
  changeBtn.addEventListener("click", () => {
    fileInput.click();
  });

  // Preview new image OR revert to original if cancelled
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        thumbnail.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      // Cancelled or invalid file → revert
      thumbnail.src = originalSrc;
    }
  });
});
