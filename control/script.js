const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let improvement = 0;

let lastX = 0;
let lastY = 0;

/*start*/
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  improvement += 0.05;
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  let x = e.offsetX;
  let y = e.offsetY;

  /*smoothing*/
  let smoothX = lastX + (x - lastX) * 0.2;
  let smoothY = lastY + (y - lastY) * 0.2;

  let speed = Math.abs(e.movementX) + Math.abs(e.movementY);

  let wobble = (1 - improvement) * 1.5;

  let finalX = smoothX + (Math.random() - 0.5) * wobble;
  let finalY = smoothY + (Math.random() - 0.5) * wobble;

  /*line*/
  let baseWidth = 4;
  let lineWidth = Math.max(1, baseWidth - speed * 0.2);

  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  /*ink transparency*/
  ctx.globalAlpha = Math.max(0.3, 1 - speed * 0.03);

  ctx.strokeStyle = "black";

  ctx.lineTo(finalX, finalY);
  ctx.stroke();

  lastX = smoothX;
  lastY = smoothY;
});

/*clear*/
window.addEventListener("keydown", (e) => {
  if (e.key === "c") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

/*fading*/
function fadeCanvas() {
  ctx.fillStyle = "rgba(255,253,248,0.02)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(fadeCanvas);
}
fadeCanvas();