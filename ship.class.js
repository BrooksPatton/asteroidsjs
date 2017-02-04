class Ship extends SpaceThing {
  constructor() {
    super()
    this.position = createVector(width / 2, height / 2)
    this.radius = 20
    this.heading = 0
    this.rotation = 0
    this.velocity = createVector(1, 0)
    this.boosting = false

  }

  render() {
    push()
    translate(this.position.x, this.position.y)
    rotate(this.heading + PI / 2)
    fill(0)
    stroke(255)
    triangle(-this.radius, this.radius, this.radius, this.radius, 0, -this.radius)
    pop()
  }

  turn() {
    this.heading += this.rotation
  }

  setRotation(angle) {
    this.rotation = angle
  }

  update() {
    this.position.add(this.velocity)
  }

  boost() {
    if(this.boosting) {
      const force = p5.Vector.fromAngle(this.heading)
      force.mult(0.1)
      this.velocity.add(force)
    }
  }

  setBooster(isOn) {
    this.boosting = !!isOn
  }

  applyFriction() {
    this.velocity.mult(0.99)
  }

  getPosition() {
    return this.position
  }

  getHeading() {
    return this.heading
  }
}
