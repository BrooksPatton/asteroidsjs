class Asteroid extends SpaceThing {
  constructor(position, radius = random(15, 50)) {
    super()
    if(position) {
      this.position = position.copy()
    } else {
      this.position = createVector(random(width), random(height))
    }
    this.radius = radius
    this.total = floor(random(5, 15))
    this.offset = []
    this.velocity = p5.Vector.random2D()

    for(let i = 0; i < this.total; i++) {
      this.offset.push(random(-this.radius * 0.5, this.radius))
    }

  }

  render() {
    push()
    stroke(255)
    noFill()
    translate(this.position.x, this.position.y)
    beginShape()
    for(let i = 0; i < this.total; i++) {
      const angle = map(i, 0, this.total, 0, TWO_PI)
      const radius = this.radius + this.offset[i]
      const x = radius * cos(angle)
      const y = radius * sin(angle)
      vertex(x, y)
    }
    endShape(CLOSE)
    pop()
  }

  update() {
    this.position.add(this.velocity)
  }

  breakup() {
    const newAsteroids = []

      newAsteroids.push(new Asteroid(this.position, this.radius / 2))
      newAsteroids.push(new Asteroid(this.position, this.radius / 2))

    return newAsteroids
  }
}
