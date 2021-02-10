// There are no Easter Eggs in this file.
// Go away.





























































function placeEggs() {
  document.addEventListener('keyup', checkKonamiCode);
	lambert();
}

let konami = [];

function checkKonamiCode(event) {
  const { key, target } = event;

  if (target.tagName.toLowerCase() !== 'body') {
    return;
  }

  if (isNextKonamiKey(key)) {
    konami.push(key);
  } else {
    konami = [];
  }

  if (isKonamiCodeComplete()) {
    alert('You have unlocked a secret. Congratulations.');
    setTimeout(hideo, 60_000);
    konami = [];
  }

  event.preventDefault();
}

function isNextKonamiKey(key) {
  return konami.length < konamiCode.length && key === konamiCode[konami.length]
}

function isKonamiCodeComplete() {
  return konami.length === konamiCode.length && konami.every((key, i) => key === konamiCode[i]);
}

function hideo() {
  const hideoOverlay = document.getElementById('hideo');
  hideoOverlay.style.display = 'block';

  setTimeout(() => {
    hideoOverlay.style.display = 'none';
    pickUpEgg('kojima');
  }, 5_000);
}

function lambert() {
  console.log('Chcesz usłyszeć fraszkę?');
  Object.defineProperty(window, 'Pewnie', {
    get: () => {
      pickUpEgg('limerick');
      return 'Lambert, Lambert, ty chuju.';
    }
  });
}

function pickUpEgg(name) {
  easterEggChecklist[name] = true;

  if (Object.values(easterEggChecklist).every(egg => egg)) {
    alert(`Wow, look at all these eggs!\nNow if only I could get you kids to pick up litter this efficiently,\nwe'd have the cleanest town this side of Gem Sea! *chuckle*\n\n\nNot this time, Abigail...`);
  }
}

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const easterEggChecklist = {
  limerick: false,
  kojima: false
};
