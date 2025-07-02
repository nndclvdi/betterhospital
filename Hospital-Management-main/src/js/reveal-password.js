const passwordInput = document.getElementById('passwordInput');
const toggleBtn = document.getElementById('togglePassword');

toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';

    // Optional: Swap icon
    // toggleBtn.querySelector('img').src = isPassword
    //     ? 'assets/images/icons/eye-open.svg'
    //     : 'assets/images/icons/eye-grey.svg';
});