import View from './View';
import icons from '../../img/icons.svg';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found!';
  _sucessMessage = 'Sucessfull!';

  _generateMarkUp() {
    // comming from the
    //  model=>controller=>view(parent)=>resultView
    console.log(this._data);
    return this._data.map(val => this._generateMarkUpPreview(val)).join('');
  }
  _generateMarkUpPreview(results) {
    return `
      <li class="preview">
            <a class="preview__link preview__link--active" href="#${results.id}">
              <figure class="preview__fig">
                <img src="${results.image}" alt="${results.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${results.title}</h4>
                <p class="preview__publisher">${results.publisher}</p>
              </div>
            </a>
          </li>
    `;
  }
}
export default new ResultsView();
