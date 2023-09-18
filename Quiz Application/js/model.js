export const state = {
  fullname: {
    firstname: '',
    lastname: '',
  },
  question: JSON.parse(localStorage.getItem('question')) || [],
  questionObject: '',
  results: JSON.parse(localStorage.getItem('results')) || [],
};

// store the question array into local storage
export const save_questions_to_local_storage = function () {
  localStorage.setItem('question', JSON.stringify(state.question));
};

// store the result array into local storage
export const save_result_to_local_storage = function () {
  localStorage.setItem('results', JSON.stringify(state.results));
};

export const question_object = function (id, text_area_element) {
  // 1) get the object that has the same id with the id parameter
  const question = state.question.find(question => question.id === id);

  // 2) set the question  text_area_value to the value of the text_area_element
  text_area_element.value = question.text_area_value;

  // 3) set the question to the state.questionObject
  state.questionObject = question;
};

// update question object
export const update_question_object = function (
  text_area_value,
  correct_answer,
  input_value_array
) {
  // 1) pass all the parameters to questionObject
  state.questionObject.text_area_value = text_area_value;
  state.questionObject.correct_answer = correct_answer;
  state.questionObject.options = input_value_array;

  // 2) find the object the meet the condition
  const question = state.question.find(
    question => question.id === state.questionObject.id
  );

  // 3) set the question value to the state.questionObject value
  question.text_area_value = state.questionObject.text_area_value;
  question.correct_answer = state.questionObject.correct_answer;
  question.options = state.questionObject.options;

  // 4) state the question array to local storage when updated
  save_questions_to_local_storage();
};

// delete questionObject from state.question
export const delete_question_object = function (text_area_value) {
  // 1) retrieve the index of the object that meet the condition
  const index = state.question.findIndex(
    question => question.text_area_value === text_area_value
  );

  // 2) delete the question object that has the same index value
  state.question.splice(index, 1);

  // 3) save the state.question array to local storage
  save_questions_to_local_storage();
};

// clear the question list
export const clear_question_list = function () {
  // 1) empty the state.question array
  state.question.splice(0);

  // 2) save the state.question array to local storage
  save_questions_to_local_storage();
};

// get the current question object
export const current_question_object = function (question_heading) {
  // 1) get the object the meet the condition
  const question = state.question.find(
    question => question.text_area_value === question_heading
  );

  // 2) return the object when the function is called
  return question;
};

// delete the result object
export const delete_result_object = function (id) {
  // 1) get the index of the object that meet the condition
  const resultIndex = state.results.findIndex(result => result.id === id);

  // 2) delete the object at the resultIndex position
  state.results.splice(resultIndex, 1);

  // 3) save the state.result array to local storage
  save_result_to_local_storage();
};

// clear result list
export const clear_result_list = function () {
  // 1) empty state.result array
  state.results.splice(0);

  // 2) save state.result array to local storage
  save_result_to_local_storage();
};
