// ═══════════════════════════════════════
// LANTERN POSITION IN ORIGINAL IMAGE
// Set X and Y as % of the original image file (0 = left/top, 100 = right/bottom)
// The script auto-calculates the correct screen position for any monitor size.
// ═══════════════════════════════════════
const IMG_LANTERN_X = 12.3;   // ← adjust left/right
const IMG_LANTERN_Y = 58.5;   // ← adjust up/down

// Must match object-position values in hero.css
const OBJ_POS_X = 20;
const OBJ_POS_Y = 50;

function positionFire() {
  const fire = document.querySelector('.lantern-fire');
  const img  = document.querySelector('.hero-bg-img');
  if (!fire || !img || !img.naturalWidth) return;

  const cW = img.offsetWidth;
  const cH = img.offsetHeight;
  const iW = img.naturalWidth;
  const iH = img.naturalHeight;

  // object-fit: cover scale factor
  const scale = Math.max(cW / iW, cH / iH);
  const rW = iW * scale;
  const rH = iH * scale;

  // how much image overflows the container
  const overflowX = rW - cW;
  const overflowY = rH - cH;

  // offset applied by object-position
  const offsetX = overflowX * (OBJ_POS_X / 100);
  const offsetY = overflowY * (OBJ_POS_Y / 100);

  // lantern pixel position on screen
  const screenX = (IMG_LANTERN_X / 100) * iW * scale - offsetX;
  const screenY = (IMG_LANTERN_Y / 100) * iH * scale - offsetY;

  fire.style.left = (screenX / cW * 100) + '%';
  fire.style.top  = (screenY / cH * 100) + '%';
}

const img = document.querySelector('.hero-bg-img');
if (img) {
  if (img.complete && img.naturalWidth) {
    positionFire();
  } else {
    img.addEventListener('load', positionFire);
  }
  window.addEventListener('resize', positionFire);
}
