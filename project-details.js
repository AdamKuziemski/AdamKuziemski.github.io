class ProjectDetailsComponent {
  /** @private {HTMLButtonElement[]} */
  #detailElements = [...document.querySelectorAll('details')];

  /** @private {boolean[]} */
  #openedState = [];

  constructor() {
    this.saveState();
  }

  openAll() {
    this.#detailElements.forEach(elem => {
      elem.open = true;
    });
  }

  collapseAll() {
    this.#detailElements.forEach(elem => {
      elem.open = false;
    });
  }

  restoreState() {
    this.#detailElements.forEach((elem, i) => {
      elem.open = this.#openedState[i];
    });
  }

  saveState() {
    this.#openedState = this.#detailElements.map(({ open }) => open);
  }
}
