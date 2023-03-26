class searchView {
  #parentElement = document.querySelector('.search');
  getQuery() {
    // 1> get teh query ans store
    const query = this.#parentElement.querySelector('.search__field').value;
    //clear the input field
    this.#clearInputField();
    return query;
  }
  //  publisher
  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault;
      handler();
    });
  }

  #clearInputField() {
    this.#parentElement.querySelector('.search__field').value = '';
  }
}
export default new searchView();
