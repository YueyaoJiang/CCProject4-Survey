const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("startBtn");
const form = document.getElementById("quizForm");
const questions = document.querySelectorAll(".question");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const progressFill = document.getElementById("progress-fill");

let current = 0;
const total = questions.length;

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  form.style.display = "block";
  showQuestion(current);
});

function showQuestion(index) {
  questions.forEach((q, i) => {
    q.style.display = i === index ? "block" : "none";
  });

  const progressPercent = ((index + 1) / total) * 100;
  progressFill.style.width = `${progressPercent}%`;
  progressFill.textContent = `${index + 1} / ${total}`;

  if (index === total - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
  } else {
    nextBtn.style.display = "block";
    submitBtn.style.display = "none";
  }
}

nextBtn.addEventListener("click", () => {
  if (current < total - 1) {
    current++;
    showQuestion(current);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    if (data[key]) {
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]];
      }
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  localStorage.setItem("quizAnswers", JSON.stringify(data));

  
  form.style.display = "none";
  document.querySelector(".progress-bar").style.display = "none";

  const thankYouDiv = document.createElement("div");
  thankYouDiv.className = "thank-you";
  thankYouDiv.innerHTML = `
    <h2>Thank You!</h2>
    <p>Your responses have been submitted successfully.</p>
  `;
  document.body.appendChild(thankYouDiv);
});
