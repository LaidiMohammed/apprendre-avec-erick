// Tab Switching
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabName = btn.dataset.tab
    // Hide all tabs
    document.querySelectorAll(".tab-content").forEach((tab) => {
      tab.classList.remove("active")
    })
    // Remove active class from all buttons
    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.classList.remove("active")
    })
    // Show selected tab
    document.getElementById(tabName).classList.add("active")
    btn.classList.add("active")
  })
})

// Toggle Password Visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  input.type = input.type === "password" ? "text" : "password"
}

// Login Form Validation
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault()
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value
  const rememberMe = document.getElementById("rememberMe").checked
  const captcha = document.getElementById("captcha").checked
  let isValid = true

  // Email validation
  if (!email || !isValidEmail(email)) {
    document.getElementById("loginEmailError").textContent = "Veuillez entrer un email valide"
    isValid = false
  } else {
    document.getElementById("loginEmailError").textContent = ""
  }

  // Password validation
  if (!password || password.length < 6) {
    document.getElementById("loginPasswordError").textContent = "Le mot de passe doit avoir au moins 6 caracteres"
    isValid = false
  } else {
    document.getElementById("loginPasswordError").textContent = ""
  }

  // Captcha validation
  if (!captcha) {
    document.getElementById("captchaError").textContent = "Veuillez cocher Je ne suis pas un robot"
    isValid = false
  } else {
    document.getElementById("captchaError").textContent = ""
  }

  if (isValid) {
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email)
    }
    const loginMessage = "Bienvenue! Vous etes connecte avec " + email
    showSuccessModal(loginMessage)
    document.getElementById("loginForm").reset()
  }
})

// Register Form Real-time Validation
document.getElementById("firstName").addEventListener("blur", validateFirstName)
document.getElementById("lastName").addEventListener("blur", validateLastName)
document.getElementById("age").addEventListener("input", validateAge)
document.getElementById("regEmail").addEventListener("blur", validateRegEmail)
document.getElementById("regPassword").addEventListener("input", validatePassword)
document.getElementById("regPasswordConfirm").addEventListener("blur", validatePasswordConfirm)

function validateFirstName() {
  const input = document.getElementById("firstName")
  const error = document.getElementById("firstNameError")
  const success = document.getElementById("firstNameSuccess")
  if (input.value.trim().length < 2) {
    error.textContent = "Le prenom doit avoir au moins 2 caracteres"
    input.classList.remove("success")
    input.classList.add("error")
    success.textContent = ""
    return false
  } else {
    error.textContent = ""
    input.classList.remove("error")
    input.classList.add("success")
    success.textContent = "Prenom accepte"
    return true
  }
}

function validateLastName() {
  const input = document.getElementById("lastName")
  const error = document.getElementById("lastNameError")
  const success = document.getElementById("lastNameSuccess")
  if (input.value.trim().length < 2) {
    error.textContent = "Le nom doit avoir au moins 2 caracteres"
    input.classList.remove("success")
    input.classList.add("error")
    success.textContent = ""
    return false
  } else {
    error.textContent = ""
    input.classList.remove("error")
    input.classList.add("success")
    success.textContent = "Nom accepte"
    return true
  }
}

function validateAge() {
  const input = document.getElementById("age")
  const error = document.getElementById("ageError")
  const success = document.getElementById("ageSuccess")
  const ageValue = Number.parseInt(input.value, 10)
  if (isNaN(ageValue) || ageValue < 5 || ageValue > 13) {
    error.textContent = "Tu dois avoir entre 5 et 13 ans pour rejoindre Eric"
    input.classList.remove("success")
    input.classList.add("error")
    success.textContent = ""
    return false
  } else {
    error.textContent = ""
    input.classList.remove("error")
    input.classList.add("success")
    success.textContent = "Tu as " + ageValue + " ans - Bienvenue"
    return true
  }
}

function validateRegEmail() {
  const input = document.getElementById("regEmail")
  const error = document.getElementById("regEmailError")
  const success = document.getElementById("regEmailSuccess")
  if (!isValidEmail(input.value)) {
    error.textContent = "Veuillez entrer un email valide"
    input.classList.remove("success")
    input.classList.add("error")
    success.textContent = ""
    return false
  } else {
    error.textContent = ""
    input.classList.remove("error")
    input.classList.add("success")
    success.textContent = "Email valide"
    return true
  }
}

function validatePassword() {
  const input = document.getElementById("regPassword")
  const password = input.value
  // Check requirements
  const hasLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  // Update UI
  updateReqItem("reqLength", hasLength)
  updateReqItem("reqUppercase", hasUppercase)
  updateReqItem("reqLowercase", hasLowercase)
  updateReqItem("reqNumber", hasNumber)

  if (hasLength && hasUppercase && hasLowercase && hasNumber) {
    input.classList.remove("error")
    input.classList.add("success")
    document.getElementById("regPasswordError").textContent = ""
    return true
  } else {
    input.classList.remove("success")
    input.classList.add("error")
    return false
  }
}

function validatePasswordConfirm() {
  const password = document.getElementById("regPassword").value
  const confirm = document.getElementById("regPasswordConfirm").value
  const error = document.getElementById("regPasswordConfirmError")
  const input = document.getElementById("regPasswordConfirm")
  if (password !== confirm) {
    error.textContent = "Les mots de passe ne correspondent pas"
    input.classList.remove("success")
    input.classList.add("error")
    return false
  } else {
    error.textContent = ""
    input.classList.remove("error")
    input.classList.add("success")
    return true
  }
}

function updateReqItem(itemId, isComplete) {
  const item = document.getElementById(itemId)
  if (isComplete) {
    item.classList.add("complete")
    item.querySelector(".req-icon").textContent = "✓"
  } else {
    item.classList.remove("complete")
    item.querySelector(".req-icon").textContent = ""
  }
}

// Register Form Submission
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault()
  const firstName = validateFirstName()
  const lastName = validateLastName()
  const age = validateAge()
  const email = validateRegEmail()
  const password = validatePassword()
  const passwordConfirm = validatePasswordConfirm()
  const parentalConsent = document.getElementById("parentalConsent").checked
  const terms = document.getElementById("terms").checked
  const captcha = document.getElementById("regCaptcha").checked
  let isValid = firstName && lastName && age && email && password && passwordConfirm

  // Parental Consent
  if (!parentalConsent) {
    document.getElementById("parentalConsentError").textContent = "L autorisation parentale est requise"
    isValid = false
  } else {
    document.getElementById("parentalConsentError").textContent = ""
  }

  // Terms
  if (!terms) {
    document.getElementById("termsError").textContent = "Vous devez accepter les conditions d utilisation"
    isValid = false
  } else {
    document.getElementById("termsError").textContent = ""
  }

  // Captcha
  if (!captcha) {
    document.getElementById("regCaptchaError").textContent = "Veuillez cocher Je ne suis pas un robot"
    isValid = false
  } else {
    document.getElementById("regCaptchaError").textContent = ""
  }

  if (isValid) {
    const firstName_value = document.getElementById("firstName").value
    const successMsg =
      "Bienvenue " +
      firstName_value +
      "! Ton compte a ete cree avec succes. Prepare-toi a des aventures amusantes avec Eric"
    showSuccessModal(successMsg)
    document.getElementById("registerForm").reset()
  }
})

// Utility Functions
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function showSuccessModal(message) {
  document.getElementById("successMessage").textContent = message
  document.getElementById("successModal").classList.add("show")
}

function closeModal() {
  document.getElementById("successModal").classList.remove("show")
}

// Load remembered email
window.addEventListener("load", () => {
  const remembered = localStorage.getItem("rememberedEmail")
  if (remembered) {
    document.getElementById("loginEmail").value = remembered
    document.getElementById("rememberMe").checked = true
  }
})

// Close modal when clicking outside
document.getElementById("successModal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("successModal")) {
    closeModal()
  }
})
