let pixels = 1000; // Total pixels
let soulsPerPixel = 180; // Souls per pixel
let livingPerPixel = 7.9; // Living persons per pixel
let currentSouls = 0; // Initial souls
let currentLiving = 0; // Initial living persons
let birthsPerSecond = 4; // Births per second
let deathsPerSecond = 1 / 3; // Deaths per second
let birthRate = birthsPerSecond / 60; // Births per frame
let deathRate = deathsPerSecond / 60; // Deaths per frame
let video;
let pinkDots = [];
let greenDots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create video capture
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide(); // Hide the video element
  
  // Calculate initial living persons
  currentLiving = livingPerPixel * pixels;
  
  // Initialize pink and green dots
  for (let i = 0; i < currentSouls; i++) {
    let x = random(width);
    let y = random(height);
    pinkDots.push(createVector(x, y));
  }
  for (let i = 0; i < currentLiving; i++) {
    let x = random(width);
    let y = random(height);
    greenDots.push(createVector(x, y));
  }
}

function draw() {
  background(255);
  
  // Display the video feed
  image(video, 0, 0, width, height);
  
  // Draw souls (pink)
  fill(255, 182, 193);
  noStroke();
  drawDots(pinkDots, 4);
  
  // Draw living persons (green)
  fill(144, 238, 144);
  noStroke();
  drawDots(greenDots, 4);
  
  // Simulate births and deaths
  for (let i = 0; i < pixels; i++) {
    if (random(1) < birthRate) {
      currentSouls++;
      pinkDots.push(createVector(random(width), random(height)));
    }
    if (random(1) < deathRate) {
      currentSouls--;
      pinkDots.pop();
    }
  }
  
  // Calculate living persons
  currentLiving = currentSouls / soulsPerPixel;
  
  // Draw deaths (blue)
  fill(0, 0, 255);
  noStroke();
  drawRandomDots(deathRate * pixels, 7);
  
  // Draw births (yellow)
  fill(255, 255, 0);
  noStroke();
  drawRandomDots(birthRate * pixels, 7);
}

function drawDots(dots, size) {
  for (let i = 0; i < dots.length; i++) {
    let dot = dots[i];
    ellipse(dot.x, dot.y, size, size);
  }
}

function drawRandomDots(numDots, size) {
  for (let i = 0; i < numDots; i++) {
    let x = random(width);
    let y = random(height);
    ellipse(x, y, size, size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

