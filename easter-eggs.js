// There are no Easter Eggs in this file.
// Go away.





























































































































class Incubator {
  #easterEggChecklist = {
    limerick: false,
    kojima: false,
    krieg: false,
    trinityHelp: false,
  };
  #konami = [];

  #neo = document.getElementById('follow-the-white-rabbit');

  placeEggs() {
    document.addEventListener('keyup', (event) => this.#checkKonamiCode(event));
    document.getElementById('conductor').addEventListener('click', () => {
      this.#pickUpEgg('krieg');
    });

    this.#lambert();
    this.#matrix();
  }

  #pickUpEgg(name) {
    this.#easterEggChecklist[name] = true;

    if (Object.values(this.#easterEggChecklist).every(egg => egg)) {
      alert(`Wow, look at all these eggs!\nNow if only I could get you kids to pick up litter this efficiently,\nwe'd have the cleanest town this side of Gem Sea! *chuckle*\n\n\nNot this time, Abigail...`);
    }
  }

  #checkKonamiCode(event) {
    const { key, target } = event;

    if (target.tagName.toLowerCase() !== 'body') {
      return;
    }

    if (this.#isNextKonamiKey(key)) {
      this.#konami.push(key);
    } else {
      this.#konami = [];
    }

    if (this.#isKonamiCodeComplete()) {
      alert('You have unlocked a secret. Congratulations.');
      setTimeout(() => this.#hideo(), 60_000);
      this.#konami = [];
    }

    event.preventDefault();
  }

  #isNextKonamiKey(key) {
    return this.#konami.length < konamiCode.length && key === konamiCode[this.#konami.length];
  }

  #isKonamiCodeComplete() {
    return this.#konami.length === konamiCode.length && this.#konami.every((key, i) => key === konamiCode[i]);
  }

  #hideo() {
    const hideoOverlay = document.createElement('div');
    hideoOverlay.innerText = 'HIDEO';
    hideoOverlay.classList.add('hideo', 'not-printed');
    document.body.appendChild(hideoOverlay);

    setTimeout(() => {
      document.body.removeChild(hideoOverlay);
      this.#pickUpEgg('kojima');
    }, 5_000);
  }

  #lambert() {
    console.log('Chcesz usłyszeć fraszkę?');
    Object.defineProperty(window, 'Pewnie', {
      get: () => {
        this.#pickUpEgg('limerick');
        return 'Lambert, Lambert, ty chuju.';
      }
    });
  }

  #matrix() {
    const search = setInterval(async () => {
      if (this.#neo.style.display === 'none') {
        return;
      }

      clearInterval(search);

      await this.#typeText(this.#neo, 'Wake up, Neo...');
      await this.#typeText(this.#neo, 'The Matrix has you...');
      await this.#typeText(this.#neo, 'Follow the white rabbit.');

      this.#neo.innerText = 'Knock, knock, Neo.';
      this.#pickUpEgg('trinityHelp');

      setTimeout(() => this.#neo.style.display = 'none', 5000);
    }, 500);
  }

  async #typeText(element, text) {
    return new Promise(resolve => {
      let index = 0;

      const typing = setInterval(() => {
        if (index === text.length) {
          clearInterval(typing);
          setTimeout(resolve, 3000);
          return;
        }

        element.innerText = text.substr(0, ++index);
      }, 150);
    });
  }
}

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
