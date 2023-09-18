import * as model from './model.js';
import StartQuizExamView from './Views/startQuizExamView.js';
import AddInputView from './Views/addInputView.js';
import AddQuestionView from './Views/addQuestionView.js';
import AddQuestionToListView from './Views/addQuestionToListView.js';
import EditQuestionView from './Views/editQuestionView.js';
import UpdateQuestionView from './Views/updateQuestionView.js';
import DeleteQuestionFromListView from './Views/deleteQuestionFromListView.js';
import DisplayErrorMessageView from './Views/displayErrorMessageView.js';
import ClearQuestionListView from './Views/clearQuestionListView.js';
import LogoutAdminView from './Views/logoutAdminView.js';
import DisplayCurrentQuestionView from './Views/displayCurrentQuestionView.js';
import NavigateQuestionView from './Views/navigateQuestionView.js';
import LogoutScoreView from './Views/logoutScoreView.js';
import DeteleResultView from './Views/deteleResultView.js';
import ClearResultListView from './Views/clearResultListView.js';
import DisplayQuestionListFromLocalStorageView from './Views/displayQuestionListFromLocalStorageView.js';
import DisplayQuizFromLocalStorageView from './Views/displayQuizFromLocalStorageView.js';
import DisplayResultFromLocalStorageView from './Views/displayResultFromLocalStorageView.js';

// render the start quiz view
const render_quiz_exam = function (firstname, lastname) {
  // store the firstname value into the state.fullname property
  model.state.fullname.firstname = firstname;

  // store the lastname value into the state.fullname property
  model.state.fullname.lastname = lastname;
};

// render the question to the list
const render_question_to_list = function (objects_question) {
  // push the objects_question into question array
  model.state.question.push(objects_question);

  // execute render method on AddQuestionToListView
  AddQuestionToListView.render(model.state.question);

  // execute save question local storage function
  model.save_questions_to_local_storage();

  // execute render method on AddQuestionView
  AddQuestionView.render(model.state.question);
};

// render question object
const render_question_object = function (id, text_area_element) {
  // pass the parameters in question_object function
  model.question_object(id, text_area_element);

  // execute render method on EditQuestionView
  EditQuestionView.render(model.state.questionObject);
};

// render updated question
const render_updated_question = function (
  text_area_value,
  correct_answer,
  input_value_array
) {
  // pass parameters into update question object
  model.update_question_object(
    text_area_value,
    correct_answer,
    input_value_array
  );

  // execute render method on AddQuestionToListView
  AddQuestionToListView.render(model.state.question);

  // execute render method on AddQuestionView
  AddQuestionView.render(model.state.question);
};

// render delete question object
const render_delete_question_object = function (text_area_value) {
  // pass parameters into delete question object
  model.delete_question_object(text_area_value);

  // execute render method on AddQuestionToListView
  AddQuestionToListView.render(model.state.question);

  // execute render method on AddQuestionView
  AddQuestionView.render(model.state.question);
};

// render clear question list
const render_clear_question_list = function () {
  // execute clear question list function
  model.clear_question_list();

  // execute render method on AddQuestionToListView
  AddQuestionToListView.render(model.state.question);

  // execute render method on AddQuestionView
  AddQuestionView.render(model.state.question);
};

// render current question object
const render_current_question_object = function (
  question_heading,
  user_answer,
  error_container,
  error_message,
  error_emoji,
  error_content,
  quiz_option
) {
  // save the object into question object variable
  const questionObject = model.current_question_object(question_heading);

  // check if the correct_answer is equals to the questionObject.correct_answer
  if (user_answer === questionObject.correct_answer) {
    // remove invisible class from error container
    error_container.classList.remove('invisible');

    // change the class in error content
    error_content.className = 'error__content correct-answer-color';

    // change the error message text
    error_message.textContent = 'This is a correct answer';

    // change the error emoji
    error_emoji.textContent = '😁';

    // change the quiz option background color
    quiz_option.style.backgroundColor = '#008000';
  } else {
    // remove invisible class from error container
    error_container.classList.remove('invisible');

    // change the class in error content
    error_content.className = 'error__content error-color';

    // change the error message text
    error_message.textContent = 'This is a wrong answer';

    // change the error emoji
    error_emoji.textContent = '😞';

    // change the quiz option background color
    quiz_option.style.backgroundColor = '#ff0000';
  }
};

// render result object
const render_result_object = function ({ id, points }) {
  // push the object into results array
  model.state.results.push({
    id,
    firstname: model.state.fullname.firstname,
    lastname: model.state.fullname.lastname,
    points,
  });

  // execute render method on LogoutScoreView
  LogoutScoreView.render(model.state.results);

  // execute the save result local storage function
  model.save_result_to_local_storage();
};

// render delete result
const render_delete_result = function (id) {
  // pass the id parameter into delete result object
  model.delete_result_object(id);

  // execute render method on LogoutScoreView
  LogoutScoreView.render(model.state.results);
};

// render clear result list
const render_clear_result_list = function () {
  // execute clear result list
  model.clear_result_list();

  // execute render method on LogoutScoreView
  LogoutScoreView.render(model.state.results);
};

// render question list from local storage
const render_question_list_from_local_storage = function () {
  AddQuestionToListView.render(model.state.question);
};

// render quiz from local storage
const render_quiz_from_local_storage = function () {
  AddQuestionView.render(model.state.question);
};

// render results from local storage
const render_results_from_local_storage = function () {
  LogoutScoreView.render(model.state.results);
};

// this function get called when the page load
const init = function () {
  StartQuizExamView.checkFirstnameAndLastnameHandler(render_quiz_exam);

  AddQuestionView.addQuestionHandler(render_question_to_list);

  EditQuestionView.editQuestionHandler(render_question_object);

  UpdateQuestionView.updateQuestionHandler(render_updated_question);

  DeleteQuestionFromListView.deleteQuestionHandler(
    render_delete_question_object
  );

  ClearQuestionListView.clearQuestionListHandler(render_clear_question_list);

  DisplayCurrentQuestionView.renderCurrentQuestionHandler(
    render_current_question_object
  );

  LogoutScoreView.logoutScoreHandler(render_result_object);

  DeteleResultView.deleteResultHandler(render_delete_result);

  ClearResultListView.clearResultListHandler(render_clear_result_list);

  DisplayQuestionListFromLocalStorageView.displayQuestionListFromLocalStorageHandler(
    render_question_list_from_local_storage
  );

  DisplayQuizFromLocalStorageView.displayQuizFromLocalStorageHandler(
    render_quiz_from_local_storage
  );

  DisplayResultFromLocalStorageView.displayResultFromLocalStorageHandler(
    render_results_from_local_storage
  );
};

init();
