// There are no Easter Eggs in this file.
// Go away.





























































const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
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
  setTimeout(() => hideoOverlay.style.display = 'none', 5_000);
}
