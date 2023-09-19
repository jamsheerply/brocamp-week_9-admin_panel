  // Show/hide password when "Show Password" checkbox is checked
  document.getElementById('showPassword').addEventListener('change', function () {
    const passwordInput = document.getElementById('password');
    const showPasswordBtn = document.getElementById('showPasswordBtn');

    if (this.checked) {
        passwordInput.type = 'text';
        showPasswordBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        showPasswordBtn.textContent = 'Show';
    }
});