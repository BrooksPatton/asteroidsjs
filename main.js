let ship
let asteroids
let lasers
let playing = false
let lives = 1

function setup() {
  createCanvas(800, 600)
}

function draw() {
  background(0)
  if(playing && lives) {
    for(let i = lasers.length - 1; i >= 0; i--) {
      lasers[i].render()
      lasers[i].update()

      if(lasers[i].offscreen()) {
        lasers.splice(i, 1)
        continue
      }

      for(let j = asteroids.length - 1; j >= 0; j--) {
        if(lasers[i].hits(asteroids[j])) {
          if(asteroids[j].radius > 10) {
            const newAsteroids = asteroids[j].breakup()
            asteroids = asteroids.concat(newAsteroids)
          }

          asteroids.splice(j, 1)
          lasers.splice(i, 1)
          break;
        }
      }

    }

    asteroids.forEach(asteroid => {
      if(ship.hits(asteroid)) {
        endGame()
      }

      asteroid.render()
      asteroid.update()
      asteroid.edges()
    })

    ship.render()
    ship.turn()
    ship.update()
    ship.boost()
    ship.applyFriction()
    ship.edges()
  }
  else if(lives === 1) {
    textSize(32)
    fill(255)
    textAlign(CENTER)
    text('Welcome to Asteroids', 0, height * 0.5 - 16, width, height)

    textSize(16)
    textAlign(CENTER)
    text('Press return to start playing', 0, height * 0.5 + 32, width, height)
  }
  else {
    textSize(32)
    fill(255)
    textAlign(CENTER)
    text('Game Over', 0, height * 0.5 - 16, width, height)

    textSize(16)
    textAlign(CENTER)
    text('Press return to play again', 0, height * 0.5 + 32, width, height)
  }
}

function keyPressed() {
  if(key === ' ') {
    lasers.push(new Laser(ship.getPosition(), ship.getHeading()))
  }

  if(keyCode === RETURN && !playing) {
    resetGame()
  }

  if(keyCode === RIGHT_ARROW) {
    ship.setRotation(0.1)
  }
  else if(keyCode === LEFT_ARROW) {
    ship.setRotation(-0.1)
  }
  else if(keyCode === UP_ARROW) {
    ship.setBooster(true)
  }
}

function keyReleased() {
  if(keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
    ship.setRotation(0)
  }
  else if(keyCode === UP_ARROW) {
    ship.setBooster(false)
  }
}

function endGame() {
  playing = false
  lives = 0;
}

function resetGame() {
  asteroids = []
  lasers = []
  playing = true
  lives = 1
  ship = new Ship()
  const numberAsteroids = random(3, 10)
  for(let i = 0; i < numberAsteroids; i++){
    asteroids.push(new Asteroid())
  }
}
