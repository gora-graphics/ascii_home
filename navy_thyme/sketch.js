let img;
let asciiArt = "";
let geometricIcons = ['Ñ', '¤', '♥', '►', '◄', '▲', '█', 'Æ'];
let boxDrawingChars = ['┌', '┐', '┘', '└', '─', '│', '├', '┤', '┬', '┴', '┼'];
let icons;

function preload() {
  img = loadImage('img868.png'); // Load the image
}

function setup() {
  createCanvas(798, 554);
  icons = geometricIcons.concat(boxDrawingChars);
  img.resize(width, height);
}

function draw() {
  background(0);
  if (img) {
    let gridSize = 4;
    asciiArt = "";
    img.loadPixels();
    for (let y = 0; y < img.height; y += gridSize) {
      for (let x = 0; x < img.width; x += gridSize) {
        let pixelIndex = (x + y * img.width) * 4;
        let brightness = img.pixels[pixelIndex + 1]; // Green channel for brightness
        let charIndex = int(map(brightness, 0, 255, 0, icons.length - 1));
        asciiArt += icons[charIndex];
      }
      asciiArt += '\n';
    }

    let charX = floor(mouseX / gridSize);
    let charY = floor(mouseY / gridSize);
    let clusterSize = 15; // Increased size of the pixel cluster around the mouse pointer

    let rows = asciiArt.split('\n');
    for (let y = 0; y < rows.length; y++) {
      for (let x = 0; x < rows[y].length; x++) {
        let charBrightness = map(findIconBrightness(rows[y].charAt(x)), 0, icons.length - 1, 8, 32);
        textSize(charBrightness); // Adjust text size based on brightness

        if (dist(x, y, charX, charY) < clusterSize) {
          // Show the actual pixel color instead of ASCII
          let pixelIndex = (x * gridSize + y * gridSize * img.width) * 4;
          fill(img.pixels[pixelIndex], img.pixels[pixelIndex + 1], img.pixels[pixelIndex + 2]);
          noStroke();
          rect(x * gridSize, y * gridSize, gridSize, gridSize);
        } else {
          fill(255);
          text(rows[y].charAt(x), x * gridSize, y * gridSize);
        }
      }
    }
  }
}

function findIconBrightness(c) {
  for (let i = 0; i < icons.length; i++) {
    if (icons[i] === c) {
      return i;
    }
  }
  return 0;
}
