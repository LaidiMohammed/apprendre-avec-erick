const menuHamburger = document.querySelector(".menu-hambourger")
const navLinks = document.querySelector(".nav-links")

if (menuHamburger) {
  menuHamburger.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-menu")
  })
}

// Fermer le menu quand on clique sur un lien
document.querySelectorAll(".nav-link-btn").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("mobile-menu")
  })
})

// ========== PAGE INDICATOR (CERCLES À GAUCHE) ==========
const circles = document.querySelectorAll(".page-indicator .circle")
const sections = Array.from(document.querySelectorAll("section"))

function updateIndicator() {
  const scrollY = window.pageYOffset + 100
  let currentIndex = 0

  for (let i = 0; i < sections.length; i++) {
    if (scrollY >= sections[i].offsetTop) {
      currentIndex = i
    }
  }

  circles.forEach((circle, i) => {
    circle.classList.toggle("active", i === currentIndex)
  })
}

window.addEventListener("scroll", updateIndicator)
updateIndicator()

// Cliquer sur un cercle pour aller à la section
circles.forEach((circle, index) => {
  circle.addEventListener("click", () => {
    sections[index].scrollIntoView({ behavior: "smooth" })
  })
})

// ========== PARCOURS IMAGES (5 ÉTAPES) ==========
const etapes = ["etape1.jpg", "etape2.jpg", "etape3.jpg", "etape4.jpg", "etape5.jpg"]
let currentEtape = 0
const parcImage = document.getElementById("parc-image")
const btnLeft = document.getElementById("parc-left")
const btnRight = document.getElementById("parc-right")
const wrap = document.querySelector(".parc-image-wrap")

function showEtape(index) {
  currentEtape = (index + etapes.length) % etapes.length

  wrap.classList.add("fade-out")

  setTimeout(() => {
    parcImage.src = etapes[currentEtape]
    wrap.classList.remove("fade-out")
    wrap.classList.add("fade-in")

    setTimeout(() => {
      wrap.classList.remove("fade-in")
    }, 300)
  }, 200)
}

btnLeft.addEventListener("click", () => showEtape(currentEtape - 1))
btnRight.addEventListener("click", () => showEtape(currentEtape + 1))

// Support du swipe/touch sur mobile
let startX = 0
wrap.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX
})

wrap.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX
  const diff = endX - startX

  if (diff > 50) showEtape(currentEtape - 1)
  else if (diff < -50) showEtape(currentEtape + 1)
})

// Initialiser la première image
showEtape(0)

// ========== QUIZ ==========
const quizData = [
  {
    q: "Quel déchet va dans la poubelle jaune ?",
    correct: "Le plastique",
    options: ["Le verre", "Le plastique", "Les restes de repas"],
  },
  {
    q: "Que devient le papier recyclé ?",
    correct: "Du nouveau papier",
    options: ["Du plastique", "Du compost", "Du nouveau papier"],
  },
  {
    q: "Où jeter une bouteille en verre ?",
    correct: "Dans la poubelle verte",
    options: ["Dans la poubelle verte", "Dans la poubelle jaune", "Dans la poubelle bleue"],
  },
  {
    q: "Recycler permet de ?",
    correct: "Protéger la planète",
    options: ["Polluer plus", "Protéger la planète", "Faire du bruit"],
  },
  {
    q: "Quel est le symbole du recyclage ?",
    correct: "Les trois flèches",
    options: ["Un cercle rouge", "Les trois flèches", "Un carré bleu"],
  },
]

let currentQuestion = 0
const userAnswers = new Array(quizData.length).fill(null)

const qText = document.getElementById("question-text")
const qNum = document.getElementById("question-number")
const answersForm = document.getElementById("answers-form")
const prevBtn = document.getElementById("prev-btn")
const nextBtn = document.getElementById("next-btn")
const resultBox = document.getElementById("quiz-result")

function renderQuestion(index) {
  const data = quizData[index]
  qNum.textContent = `Question ${index + 1} / ${quizData.length}`
  qText.textContent = data.q

  answersForm.innerHTML = ""
  data.options.forEach((option, optIndex) => {
    const id = `q${index}_opt${optIndex}`
    const wrapper = document.createElement("div")
    wrapper.className = "answer-item"

    wrapper.innerHTML = `
      <input type="radio" id="${id}" name="answer" value="${option}">
      <label for="${id}">${option}</label>
    `

    answersForm.appendChild(wrapper)
  })

  // Restaurer la réponse précédente si elle existe
  if (userAnswers[index]) {
    const selector = `[name="answer"][value="${userAnswers[index]}"]`
    const checked = answersForm.querySelector(selector)
    if (checked) checked.checked = true
  }

  // Gérer les boutons
  prevBtn.style.visibility = index === 0 ? "hidden" : "visible"
  nextBtn.textContent = index === quizData.length - 1 ? "Terminer" : "Suivant"
  resultBox.innerHTML = ""
}

function saveAnswer() {
  const checked = answersForm.querySelector('input[name="answer"]:checked')
  userAnswers[currentQuestion] = checked ? checked.value : null
}

nextBtn.addEventListener("click", () => {
  saveAnswer()

  if (currentQuestion < quizData.length - 1) {
    currentQuestion++
    renderQuestion(currentQuestion)
  } else {
    // Calculer le score
    let score = 0
    for (let i = 0; i < quizData.length; i++) {
      if (userAnswers[i] === quizData[i].correct) score++
    }

    resultBox.innerHTML = `
      <strong>🎉 Ton score : ${score} / ${quizData.length}</strong><br>
      <small style="font-size: 0.9rem; margin-top: 10px;">Bien joué ! Tu en sais beaucoup sur le recyclage.</small>
    `

    nextBtn.textContent = "Recommencer"
    nextBtn.onclick = () => {
      currentQuestion = 0
      userAnswers.fill(null)
      renderQuestion(0)
      nextBtn.onclick = null
    }
  }
})

prevBtn.addEventListener("click", () => {
  saveAnswer()

  if (currentQuestion > 0) {
    currentQuestion--
    renderQuestion(currentQuestion)
  }
})

answersForm.addEventListener("change", () => {
  const checked = answersForm.querySelector('input[name="answer"]:checked')
  if (checked) userAnswers[currentQuestion] = checked.value
})

// Initialiser le quiz
renderQuestion(0)