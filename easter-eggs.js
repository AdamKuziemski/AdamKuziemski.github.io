// There are no Easter Eggs in this file.
// Go away.





























































































































function placeEggs() {
  document.addEventListener('keyup', checkKonamiCode);
  lambert();
  matrix();
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
  const hideoOverlay = document.createElement('div');
  hideoOverlay.innerText = 'HIDEO';
  hideoOverlay.classList.add('hideo', 'not-printed');
  document.body.appendChild(hideoOverlay);

  setTimeout(() => {
    document.body.removeChild(hideoOverlay);
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

function matrix() {
  const neo = document.getElementById('follow-the-white-rabbit');
  const search = setInterval(async () => {
    if (neo.style.display === 'none') {
      return;
    }

    clearInterval(search);

    await typeText(neo, 'Wake up, Neo...');
    await typeText(neo, 'The Matrix has you...');
    await typeText(neo, 'Follow the white rabbit.');

    neo.innerText = 'Knock, knock, Neo.';
    pickUpEgg('trinityHelp');

    setTimeout(() => neo.style.display = 'none', 5000);
  }, 500);
}

async function typeText(element, text) {
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

function pickUpEgg(name) {
  easterEggChecklist[name] = true;

  if (Object.values(easterEggChecklist).every(egg => egg)) {
    alert(`Wow, look at all these eggs!\nNow if only I could get you kids to pick up litter this efficiently,\nwe'd have the cleanest town this side of Gem Sea! *chuckle*\n\n\nNot this time, Abigail...`);
  }
}

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const easterEggChecklist = {
  limerick: false,
  kojima: false,
  trinityHelp: false
};
