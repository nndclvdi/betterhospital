document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("File-Input");
    const thumbnail = document.getElementById("Thumbnail");
    const changePhoto = document.getElementById("Change-Photo");
    const addPhoto = document.getElementById("Add-Photo");
    const submitBtn = document.getElementById("Submit-Btn");

    changePhoto.addEventListener("click", () => {
        fileInput.click();
    });

    addPhoto.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
    
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
    
            reader.onload = (e) => {
                thumbnail.src = e.target.result;
                submitBtn.disabled = false;
                if(thumbnail.classList.contains("hidden")){
                    changePhoto.classList.toggle("hidden");
                    thumbnail.classList.toggle("hidden");
                }
                if(!addPhoto.classList.contains("hidden")){
                    addPhoto.classList.add("hidden");
                }
            };
    
            reader.readAsDataURL(file);
        } else {
            // fallback to default
            thumbnail.src = "";
            thumbnail.classList.toggle("hidden");
            submitBtn.disabled = true;
            changePhoto.classList.toggle("hidden");
            addPhoto.classList.remove("hidden");
        }
    });
});