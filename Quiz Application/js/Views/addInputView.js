import { View } from './view.js';

class AddInputView extends View {
  _parentEl = document.querySelector('.form__input-group__content');
  #last_child_element = this._parentEl.lastElementChild;
  #last_child_input_element = this.#last_child_element.querySelector(
    '.form__input-question--1'
  );
  constructor() {
    super();
    this.render_input_add_question();
  }

  render_input_add_question() {
    this.#last_child_input_element.addEventListener(
      'focus',
      this._generateMarkupHtml.bind(this)
    );
  }
  _generateMarkupHtml() {
    // 1) create the element to be insert into dom
    const form_control_2 = document.createElement('div');
    const form_radio_group = document.createElement('label');
    const form_input_radio = document.createElement('input');
    const form_customize_radio = document.createElement('span');
    const form_input_question_1 = document.createElement('input');

    // 2) set attributes to element
    form_input_radio.setAttribute('type', 'radio');
    form_input_radio.setAttribute('name', 'radio');
    form_input_radio.setAttribute('value', '');
    form_input_question_1.setAttribute('id', 'form__input-add__question');

    // 3) add classes to element
    form_control_2.classList.add('form__control--2');
    form_radio_group.classList.add('form__radio-group');
    form_input_radio.classList.add('form__input-radio');
    form_customize_radio.classList.add('form__customize-radio');
    form_input_question_1.classList.add(
      'form__input-question',
      'form__input-question--1',
      'form__focus'
    );

    // 4) append the element to their parent element
    form_radio_group.append(form_input_radio);
    form_radio_group.append(form_customize_radio);

    form_control_2.append(form_radio_group);
    form_control_2.append(form_input_question_1);

    // 5) insert the element before the last child element
    this._parentEl.insertBefore(form_control_2, this.#last_child_element);
  }
}
export default new AddInputView();
