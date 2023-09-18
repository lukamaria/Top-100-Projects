export class View {
  _parentEl;
  _data;
  _quiz_section_1 = document.querySelector('.quiz__section--1');
  _quiz_section_2 = document.querySelector('.quiz__section--2');
  _quiz_section_3 = document.querySelector('.quiz__section--3');
  _quiz_section_4 = document.querySelector('.quiz__section--4');
  _error_message = document.querySelector('.main-error__container--1');
  _error_message_paragraph = document.querySelector(
    '.main-error__paragraph--1'
  );
  _btn_close = document.querySelector('#btn--close--1');
  _form_edit = document.querySelector('.form__edit');
  _form_input_group_1 = document.querySelector('.form__input-group--1');
  _warning_container = document.querySelector('.warning__container');
  _warning_message = document.querySelector('.warning__message');
  _quiz_current_question = document.querySelector('.quiz__current-question');

  constructor() {
    this._hide_error_message_onclick();
  }

  render(data) {
    this._data = data;
    const markup = this._generateHtml();
    this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  _hide_error_message_onclick() {
    this._btn_close.addEventListener(
      'click',
      this._hide_error_message.bind(this)
    );
  }

  _display_error_message() {
    this._error_message.classList.remove('hide-main-error');
  }

  _hide_error_message() {
    this._error_message.classList.add('hide-main-error');
  }

  _hide_warning_message() {
    this._warning_container.classList.add('hide-main-error');
  }

  _check_input_textarea_not_empty(message) {
    // display error message
    this._display_error_message();

    // change the text in error message
    this._error_message_paragraph.textContent = message;
  }
}
