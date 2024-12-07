document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const isExpanded = question.getAttribute("aria-expanded") === "true";

      // 切換 aria-expanded 和顯示隱藏內容
      question.setAttribute("aria-expanded", !isExpanded);
      answer.hidden = isExpanded;
    });
  });
});
