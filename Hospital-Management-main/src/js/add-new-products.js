document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("File-Input");
    const thumbnail = document.getElementById("Thumbnail");
    const addPhotoBtn = document.getElementById("Add-Photo");
  
    const defaultImage = thumbnail.getAttribute("data-default");
  
    addPhotoBtn.addEventListener("click", () => {
      fileInput.click();
    });
  
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
  
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          thumbnail.src = e.target.result;
          addPhotoBtn.textContent = "Change Photo";
        };
  
        reader.readAsDataURL(file);
      } else {
        // fallback to default
        thumbnail.src = defaultImage;
        addPhotoBtn.textContent = "Add Photo";
      }
    });
});
  