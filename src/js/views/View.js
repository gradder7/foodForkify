import icons from '../../img/icons.svg';
// parent of all classes
export default class View {
  _data;
  render(data) {
    if(!data  || (Array.isArray(data) && data.length===0)) return this.renderError();
    this._data = data;
    const htmlInner = this._generateMarkUp();
    // clear the recipe container
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', htmlInner);
  }
  // clear inner html
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // spinner
  renderSpiner = () => {
    const htmlInner = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', htmlInner);
  };

  // display error message
  // setting the msg to the default one
  renderError(message = this._errorMessage) {
    const htmlInner = `<div class="error">
    <div>
              <svg>
              <use href="${icons}#icon-alert-triangle"></use>
              </svg>
              </div>
              <p>${message}</p>
              </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', htmlInner);
  }
  // sucess messages
  renderSucessMessage(message = this._sucessMessage) {
    const htmlInner = `<div class="message">
    <div>
    <svg>
                <use href="${icons}#icon-smile"></use>
                </svg>
                </div>
                <p>${message}</p>
                </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', htmlInner);
  }
}
