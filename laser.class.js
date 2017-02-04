class Laser extends SpaceThing {
  constructor(shipPosition, angle) {
    super()
    this.position = createVector(shipPosition.x, shipPosition.y)
    this.velocity = p5.Vector.fromAngle(angle)
    this.velocity.mult(10)
  }

  update() {
    this.position.add(this.velocity)
  }

  render() {
    push()
    stroke(255)
    strokeWeight(4)
    point(this.position.x, this.position.y)
    pop()
  }

  offscreen() {
    if(this.position.x > width || this.position.x < 0) {
      return true
    }
    if(this.position.y > height || this.position.y < 0) {
      return true
    }

    return false
  }
}
