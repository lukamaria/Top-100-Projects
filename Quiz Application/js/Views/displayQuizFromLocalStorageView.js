class DisplayQuizFromLocalStorageView {
  displayQuizFromLocalStorageHandler(handler) {
    window.addEventListener('load', function () {
      // execute the handler function when the page load
      handler();
    });
  }
}

export default new DisplayQuizFromLocalStorageView();
