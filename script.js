function updateLength() {
    document.getElementById('char-length').innerText = document.getElementById('length').value;
}

function generatePassword() {
    const length = document.getElementById('length').value;
    let charset = "";
    if (document.getElementById('uppercase').checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById('lowercase').checked) charset += "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById('numbers').checked) charset += "0123456789";
    if (document.getElementById('symbols').checked) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
        document.getElementById('password').value = "";
        document.getElementById('feedback').innerText = "Please select at least one option.";
        return;
    }

    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    document.getElementById('password').value = password;
    document.getElementById('feedback').innerText = "";

    // Update strength
    updateStrength(password);
}

function updateStrength(password) {
    let strength = "Weak";
    const length = password.length;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+~`|}{[\]:;?><,./-]/.test(password);

    if (length >= 12 && hasUpper && hasLower && hasNumbers && hasSymbols) {
        strength = "Strong";
    } else if (length >= 8 && ((hasUpper && hasLower) || (hasNumbers && hasSymbols))) {
        strength = "Moderate";
    }

    document.getElementById('strength').innerText = strength;
}

function copyToClipboard() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    passwordField.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(passwordField.value).then(() => {
        document.getElementById('feedback').innerText = "Password copied to clipboard!";
        setTimeout(() => {
            document.getElementById('feedback').innerText = "";
        }, 2000); // Clear feedback after 2 seconds
    }).catch(err => {
        document.getElementById('feedback').innerText = "Failed to copy password.";
    });
}