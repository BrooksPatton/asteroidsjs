class SpaceThing {
  constructor() {
    this.position
    this.rotation = 0
  }

  edges() {
    if(this.position.x > width + this.radius) {
      this.position.x = -this.rotation
    }
    else if(this.position.x < -this.rotation) {
      this.position.x = width + this.rotation
    }

    if(this.position.y > height + this.radius) {
      this.position.y = -this.rotation
    }
    else if(this.position.y < -this.rotation) {
      this.position.y = height + this.rotation
    }
  }

  hits(thing) {
    const distance = dist(this.position.x, this.position.y, thing.position.x, thing.position.y)

    return distance < thing.radius + (thing.radius * 0.5)
  }
}
