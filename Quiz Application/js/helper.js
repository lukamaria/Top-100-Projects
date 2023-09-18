export const progressbar_width = function () {
  // select element
  const quiz_question_contents = Array.from(
    document.querySelectorAll('.quiz__question-content')
  );

  const progressbar = document.querySelector('.progressbar');

  const custom_progressbar = document.querySelector('.custom__progressbar');

  const quiz_current_question = document.querySelector(
    '.quiz__current-question'
  );

  // set the length of the quiz question contents into a variable
  const quiz_question_contents_length = quiz_question_contents.length;

  // set the display properties on all quiz question contents to none
  quiz_question_contents.forEach(
    question_content => (question_content.style.display = 'none')
  );

  // set display property of the first quiz question contents to block
  quiz_question_contents[0].style.display = 'block';

  // change the text of the quiz current question
  quiz_current_question.textContent = `
        1/${quiz_question_contents_length}
  `;

  // set the progressbar max property to quiz question contents length
  progressbar.max = quiz_question_contents_length;

  //
  const current_value = progressbar.value;

  const new_width = (current_value * 100) / quiz_question_contents_length;

  custom_progressbar.style.width = `${new_width}%`;
};
