class searchView {
  _parentElement = document.querySelector('.search');
  getQuery() {
    // 1> get teh query ans store
    const query = this._parentElement.querySelector('.search__field').value;
    //clear the input field
    this._clearInputField();
    return query;
  }
  //  publisher
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault;
      handler();
    });
  }

  _clearInputField() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}
export default new searchView();
