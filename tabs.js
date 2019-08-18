class TabComponent {
    currentlyOpenTab = 0;
    tabSwipeStart = 0;
    tabSwipePosition = 0;

    tabs = [];
    content = [];

    constructor() {
        const tabsContainer = document.getElementById('tabs');
	    tabsContainer.addEventListener('touchstart', (event) => this.startSwipe(event), {passive: true});
	    tabsContainer.addEventListener('touchmove', (event) => this.moveSwipe(event), {passive: true});
        tabsContainer.addEventListener('touchend', () => this.endSwipe(), {passive: true});
        
        this.tabs = [...document.getElementsByClassName('tab')];
        this.tabs.forEach(tab => tab.addEventListener('click', (event) => this.openClicked(event)));

        this.content = [...document.getElementsByClassName('tab-body')];

        this.openTab(0);
    }

    openTab(newIndex) {
        this.tabs.forEach(tab => tab.className = tab.className.replace(' tab-open', ''));
        this.tabs[newIndex].className += ' tab-open';
    
        this.content.forEach((tab, i) => {
            tab.style.display = i === newIndex ? 'block' : 'none';
            tab.className = tab.className.replace(' animate-left', '').replace(' animate-right', '');
        });
        this.content[newIndex].className += this.getTabAnimation(newIndex);
    
        this.currentlyOpenTab = newIndex;
    };
    
    getTabAnimation(newIndex) {
        if (newIndex > this.currentlyOpenTab) {
            return ' animate-right';
        } else if (newIndex < this.currentlyOpenTab) {
            return ' animate-left';
        } else {
            return '';
        }
    };
    
    startSwipe(event) {
        this.tabSwipeStart = event.touches[0].pageX;
        this.tabSwipePosition = 0;
    }
    
    moveSwipe(event) {
        this.tabSwipePosition = event.touches[0].pageX;
    }
    
    endSwipe() {
        const tabSwipeThreshold = 30;
        const swipeChange = this.tabSwipeStart - this.tabSwipePosition;
        
        if (swipeChange < -tabSwipeThreshold && this.currentlyOpenTab > 0) {
            this.openTab(this.currentlyOpenTab - 1);
        } else if (swipeChange > tabSwipeThreshold && this.currentlyOpenTab < this.tabs.length - 1) {
            this.openTab(this.currentlyOpenTab + 1);
        }
    }
    
    openClicked(event) {
        this.openTab([...document.getElementsByClassName('tab')].findIndex(tab => tab.innerText === event.srcElement.innerText));
    }
}