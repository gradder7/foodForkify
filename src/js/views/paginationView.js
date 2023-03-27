import icons from '../../img/icons.svg';
import View from './View';

export class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    // we will use event deligatin to listin the event rather than making the event seperately
    this._parentElement.addEventListener('click', e => {
      // its like qureryselector which search in up in tree
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);
      const gotoPage = +btn.dataset.goto;
      //   console.log(gotoPage);
      //   the handler will accept these value
      handler(gotoPage);
    });
  }
  _generateMarkUp() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    //page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return `
              <button data-goto="${
                currPage + 1
              }" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    //last page
    if (currPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          currPage - 1
        }"  class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
        </button>
        `;
    }

    //other page
    if (currPage < numPages) {
      return `
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
        </button>
        `;
    }
    //page 1, and there are no other pages
    return '';
  }
}
export default new PaginationView();
