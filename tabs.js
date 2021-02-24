class Point2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class TabComponent {
  constructor() {
    /** @private {number} */
    this.currentlyOpenTab = 0;
    /** @private {number} */
    this.currentlyFocusedTab = 0;
    /** @private {Point2d} */
    this.swipeStart = new Point2d(0, 0);
    /** @private {Point2d} */
    this.swipePosition = new Point2d(0, 0);
    /** @private {number} */
    this.swipeThreshold = 50;

    /** @private {HTMLMainElement} */
    this.tabsContainer = document.getElementById('tab-container');
    /** @private {HTMLNavElement} */
    this.tabBar = document.getElementById('tab-bar');
    /** @private {HTMLButtonElement[]} */
    this.tabs = [...document.getElementsByClassName('tab')];
    /** @private {HTMLDivElement[]} */
    this.content = [...document.getElementsByClassName('tab-body')];

    this.tabsContainer.addEventListener('touchstart', (event) => this.startSwipe(event), { passive: true });
    this.tabsContainer.addEventListener('touchmove', (event) => this.moveSwipe(event), { passive: true });
    this.tabsContainer.addEventListener('touchend', () => this.endSwipe(), { passive: true });
    this.tabsContainer.addEventListener('scroll', () => this.hideOrDisplayScrollShadow());

    this.tabBar.addEventListener('keydown', (event) => this.moveTabFocus(event));

    this.tabs.forEach(tab => tab.addEventListener('click', (event) => this.openClicked(event)));

    this.openTab(this.resolveStartingTabIndex());
  }

  /**
   * Opens a tab at the given index.
   * If the index is out of bounds, does nothing.
   * 
   * @param {number} index of the chosen tab
   */
  openTab(index) {
    if (this.doesNotHaveTab(index)) {
      return;
    }

    this.setIndicator(index);
    this.displayChild(index);

    this.tabsContainer.scrollTop = 0;
    this.hideOrDisplayScrollShadow();

    this.currentlyOpenTab = index;
    this.currentlyFocusedTab = index;
  };

  /**
   * Returns to tab display mode after printing.
   */
  displayTabs() {
    this.openTab(this.currentlyOpenTab);
  }

  /**
   * @private
   * Saves the start position of the swipe event.
   * Resets current swipe position.
   * 
   * @param {TouchEvent} event 
   */
  startSwipe(event) {
    this.swipeStart.x = event.touches[0].pageX;
    this.swipeStart.y = event.touches[0].pageY;
    this.swipePosition.x = 0;
    this.swipePosition.y = 0;
  }

  /**
   * @private
   * Saves the current position of the swipe event.
   * 
   * @param {TouchEvent} event 
   */
  moveSwipe(event) {
    this.swipePosition.x = event.touches[0].pageX;
    this.swipePosition.y = event.touches[0].pageY;
  }

  /**
   * @private
   * Calculates the direction of the swipe and opens the appropriate tab.
   */
  endSwipe() {
    if (this.didNotSwipe() || this.isVerticalSwipe()) {
      return;
    }

    if (this.isRightSwipe() && !this.isFirstTabOpen()) {
      this.openTab(this.currentlyOpenTab - 1);
    } else if (this.isLeftSwipe() && !this.isLastTabOpen()) {
      this.openTab(this.currentlyOpenTab + 1);
    }
  }

  /**
   * @private
   * @returns {boolean} whether a swiped distance and direction was enough to trigger a right swipe
   */
  isRightSwipe() {
    return this.getSwipeDistance() < -this.swipeThreshold;
  }

  /**
   * @private
   * @returns {boolean} whether a swiped distance and direction was enough to trigger a left swipe
   */
  isLeftSwipe() {
    return this.getSwipeDistance() > this.swipeThreshold;
  }

  /**
   * @private
   * @param {'x' | 'y'} axis to calculate distance on
   * @returns {number} calculated swipe distance if axis is correct, otherwise zero
   */
  getSwipeDistance(axis = 'x') {
    return axis === 'x' || axis === 'y' ? this.swipeStart[axis] - this.swipePosition[axis] : 0;
  }

  /**
   * @private
   * @returns {boolean} whether a touchmove event was triggered to overwrite the swipe position
   */
  didNotSwipe() {
    return this.swipePosition.x === 0;
  }

  /**
   * @private
   * @returns {boolean} whether a swipe direction was horizontal
   */
  isVerticalSwipe() {
    return this.getSwipeDistance('y') < -this.swipeThreshold || this.getSwipeDistance('y') > this.swipeThreshold;
  }

  /**
   * @private
   * @returns {boolean} whether currently open tab is the first one
   */
  isFirstTabOpen() {
    return this.currentlyOpenTab === 0;
  }

  /**
   * @private
   * @returns {boolean} whether currently open tab is the last one
   */
  isLastTabOpen() {
    return this.currentlyOpenTab === this.tabs.length - 1;
  }

  /**
   * @private
   * Sets a tab indicator on a tab with given index
   * 
   * @param {number} index of the tab to indicate
   */
  setIndicator(index) {
    this.tabs.forEach(tab => tab.setAttribute('aria-selected', false));
    this.tabs[index].setAttribute('aria-selected', true);
  }

  /**
   * @private
   * Opens a tab at the given index
   *      
   * @param {number} index of the tab to display
   */
  displayChild(index) {
    this.content.forEach(tab => {
      tab.setAttribute('hidden', true);
      tab.classList.remove('animate-left');
      tab.classList.remove('animate-right');
    });

    this.content[index].removeAttribute('hidden');
    this.content[index].className += this.resolveTabAnimationClass(index);
  }

  /**
   * @private
   * Handles focus navigation using arrow keys, Home and End
   * 
   * @param {KeyboardEvent} event
   */
  moveTabFocus(event) {
    const handledKeys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!handledKeys.includes(event.key)) {
      return;
    }

    this.tabs[this.currentlyFocusedTab].setAttribute('tabindex', -1);
    if (event.key === 'ArrowRight') {
      this.currentlyFocusedTab++;
      this.wrapAroundFocus();
    } else if (event.key === 'ArrowLeft') {
      this.currentlyFocusedTab--;
      this.wrapAroundFocus();
    } else if (event.key === 'Home') {
      this.currentlyFocusedTab = 0;
    } else if (event.key === 'End') {
      this.currentlyFocusedTab = this.tabs.length - 1;
    }

    this.tabs[this.currentlyFocusedTab].setAttribute('tabindex', 0);
    this.tabs[this.currentlyFocusedTab].focus();
    event.preventDefault();
  }

  /**
   * @private
   * Hides/displays inset shadows on top/bottom according to scroll position
   */
  hideOrDisplayScrollShadow() {
    if (this.isScrolledToTop()) {
      this.removeShadow();
    } else {
      this.addShadow();
    }
  }

  /**
   * @private
   * @returns {boolean} whether the tabs container is scrolled to top 
   */
  isScrolledToTop() {
    return this.tabsContainer.scrollTop === 0;
  }

  /**
   * @private
   * Adds a shadow to the tabs container
   */
  addShadow() {
    this.tabsContainer.classList.add('tab-scrolled-top');
  }

  /**
   * @private
   * Removes shadow from the tabs container
   */
  removeShadow() {
    this.tabsContainer.classList.remove('tab-scrolled-top');
  }

  /**
   * @private
   * Opens the tab that raised the click event.
   * 
   * @param {MouseEvent} event coming from the clicked tab
   */
  openClicked(event) {
    this.openTab(this.tabs.findIndex(tab => tab.innerText === event.target.innerText));
  }

  /**
   * @private
   * Wraps tab focus after an arrow key has been pressed.
   */
  wrapAroundFocus() {
    if (this.currentlyFocusedTab >= this.tabs.length) {
      this.currentlyFocusedTab = 0;
    }

    if (this.currentlyFocusedTab < 0) {
      this.currentlyFocusedTab = this.tabs.length - 1;
    }
  }

  /**
   * @private
   * Resolves an animation type to use after a tab changes
   * 
   * @param {number} index of the tab to animate
   * @returns {string} css class to add to the element
   */
  resolveTabAnimationClass(index) {
    if (index > this.currentlyOpenTab) {
      return ' animate-right';
    } else if (index < this.currentlyOpenTab) {
      return ' animate-left';
    } else {
      return '';
    }
  };

  /**
   * @private
   * Resolves an index of a tab that should open in the beginning
   * Defaults to 0 if there is no tab parameter in the url
   * Tab parameter can be a number or a string
   * @returns {number} index of the starting tab
   */
  resolveStartingTabIndex() {
    const tab = (new URL(document.location)).searchParams.get('tab');
    if (tab === null) {
      return 0;
    }

    const index = isNaN(tab) ? this.findTabWithMatchingLabel(tab) : parseInt(tab, 10);
    return this.doesNotHaveTab(index) ? 0 : index;
  }

  /**
   * @private
   * Finds an index of a tab whose inner text matches given label (case insensitive)
   * @param {string} label of the tab to open
   * @returns {number} index of the found tab or -1 if nothing was found
   */
  findTabWithMatchingLabel(label) {
    return this.tabs.findIndex((tab) => tab.innerText.toLocaleLowerCase() === label.toLocaleLowerCase());
  }

  /**
   * @private
   * @param {number} index to check
   * @returns {boolean} true if the given index is not a valid tab index
   */
  doesNotHaveTab(index) {
    return index < 0 || index >= this.tabs.length;
  }
}
