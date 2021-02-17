var symbolSize = 24;
var streams = [];

function setup() {
  // put setup code here
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);
  var x = 0;
  for (var i = 0; i<= width / symbolSize; i++) {
    var hila = new Hila();
    hila.generateSymbols(
      x,
      random(-1000, 0)
    );
    streams.push(hila);
    x += symbolSize
  }
  textSize(symbolSize);
}

function draw() {
  // put drawing code here
  background(0, 120);
  streams.forEach(function(hila) {
    hila.render();
  });
}

function Caracter(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.switchInterval = round( random(2, 20));
  this.first = first;

  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0){
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96))
     );
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }
}

function Hila () {
  this.symbols = [];
  this.totalSymbols = round( random(5, 30));
  this.speed = random(5, 20);

  this.generateSymbols = function(x, y) {
    var first = round(random(0, 1)) == 1;
    for (var i =0; i <= this.totalSymbols; i++) {
      caracter = new Caracter(x, y, this.speed, first);
      caracter.setToRandomSymbol();
      this.symbols.push(caracter);
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(caracter) {
      if(caracter.first) {
        fill(180, 255, 180);
      } else {
        fill(0, 255, 70);
      }
      text(caracter.value, caracter.x, caracter.y);
      caracter.rain();
      caracter.setToRandomSymbol();
    });
  }
}
