class DisplayQuestionListFromLocalStorageView {
  displayQuestionListFromLocalStorageHandler(handler) {
    window.addEventListener('load', function () {
      // execute the handler function when the page is load
      handler();
    });
  }
}

export default new DisplayQuestionListFromLocalStorageView();
