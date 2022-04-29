class Sprite {
    constructor({
      position,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 }
    }) {
      this.position = position
      this.width = 50
      this.height = 150
      this.image = new Image()
      this.image.src = imageSrc
      this.scale = scale
      this.framesMax = framesMax
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.offset = offset
    }
  
    draw() {
      c.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.framesMax) * this.scale,
        this.image.height * this.scale
      )
    }
  
    animateFrames() {
      this.framesElapsed++
  
      if (this.framesElapsed % this.framesHold === 0) {
        if (this.framesCurrent < this.framesMax - 1) {
          this.framesCurrent++
        } else {
          this.framesCurrent = 0
        }
      }
    }
  
    update() {
      this.draw()
      this.animateFrames()
    }
  }
  
  class Fighter extends Sprite {
    constructor({
      position,
      velocity,
      color = 'red',
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
      direction = 'right',
      sprites,
      attackBox = { offset: {}, width: undefined, height: undefined }
    }) {
      super({
        position,
        imageSrc,
        scale,
        framesMax,
        offset
      })
  
      this.velocity = velocity
      this.direction = direction
      this.width = 50
      this.height = 150
      this.lastKey
      this.attackBox = {
        position: {
          x: this.position.x,
          y: this.position.y
        },
        offset: attackBox.offset,
        width: attackBox.width,
        height: attackBox.height
      }
      this.color = color
      this.isAttacking
      this.health = 100
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.sprites = sprites
      this.dead = false
  
      for (const sprite in this.sprites) {
        sprites[sprite].image = new Image()
        sprites[sprite].image.src = sprites[sprite].imageSrc
      }
    }
  
    update() {
      this.draw()
      if (!this.dead) this.animateFrames()
  
      // attack boxes
      this.attackBox.position.x = this.position.x + this.attackBox.offset.x
      this.attackBox.position.y = this.position.y + this.attackBox.offset.y
  
      // draw the attack box
      // c.fillRect(
      //   this.attackBox.position.x,
      //   this.attackBox.position.y,
      //   this.attackBox.width,
      //   this.attackBox.height
      // )
  
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
  
      // gravity function
      if (this.position.y + this.height + this.velocity.y >= canvas.height - 200) {
        this.velocity.y = 0
        this.position.y = 230
      } else this.velocity.y += gravity
    }
  
    attack() {
      this.switchSprite('attack1')
      this.isAttacking = true
    }
  
    takeHit() {
      this.health -= 20
  
      if (this.health <= 0) {
        this.switchSprite('death')
      } else this.switchSprite('takeHit')
    }
  
    switchSprite(sprite) {
      if(this.direction === 'left'){
        if (this.image === this.sprites.deathLeft.image) {
          if (this.framesCurrent === this.sprites.deathLeft.framesMax - 1)
            this.dead = true
          return
        }
    
        // overriding all other animations with the attack animation
        if (
          this.image === this.sprites.attack1Left.image &&
          this.framesCurrent < this.sprites.attack1Left.framesMax - 1
        )
          return
    
        // override when fighter gets hit
        if (
          this.image === this.sprites.takeHitLeft.image &&
          this.framesCurrent < this.sprites.takeHitLeft.framesMax - 1
        )
          return
    
        switch (sprite) {
          case 'idle':
            if (this.image !== this.sprites.idleLeft.image) {
              this.image = this.sprites.idleLeft.image
              this.framesMax = this.sprites.idleLeft.framesMax
              this.framesCurrent = 0
            }
            break
          case 'run':
            if (this.image !== this.sprites.runLeft.image) {
              this.image = this.sprites.runLeft.image
              this.framesMax = this.sprites.runLeft.framesMax
              this.framesCurrent = 0
            }
            break
          case 'jump':
            if (this.image !== this.sprites.jumpLeft.image) {
              this.image = this.sprites.jumpLeft.image
              this.framesMax = this.sprites.jumpLeft.framesMax
              this.framesCurrent = 0
            }
            break
    
          case 'fall':
            if (this.image !== this.sprites.fallLeft.image) {
              this.image = this.sprites.fallLeft.image
              this.framesMax = this.sprites.fallLeft.framesMax
              this.framesCurrent = 0
            }
            break
    
          case 'attack1':
            if (this.image !== this.sprites.attack1Left.image) {
              this.image = this.sprites.attack1Left.image
              this.framesMax = this.sprites.attack1Left.framesMax
              this.framesCurrent = 0
            }
            break
    
          case 'takeHit':
            if (this.image !== this.sprites.takeHitLeft.image) {
              this.image = this.sprites.takeHitLeft.image
              this.framesMax = this.sprites.takeHitLeft.framesMax
              this.framesCurrent = 0
            }
            break
    
          case 'death':
            if (this.image !== this.sprites.deathLeft.image) {
              this.image = this.sprites.deathLeft.image
              this.framesMax = this.sprites.deathLeft.framesMax
              this.framesCurrent = 0
            }
            break
        }
      }
      if(this.direction === 'right'){
        if (this.image === this.sprites.deathRight.image) {
          if (this.framesCurrent === this.sprites.deathRight.framesMax - 1)
            this.dead = true
          return
        }
    
        // overriding all other animations with the attack animation
        if (
          this.image === this.sprites.attack1Right.image &&
          this.framesCurrent < this.sprites.attack1Right.framesMax - 1
        )
          return
    
        // override when fighter gets hit
        if (
          this.image === this.sprites.takeHitRight.image &&
          this.framesCurrent < this.sprites.takeHitRight.framesMax - 1
        )
          return
    
        switch (sprite) {
          case 'idle':
            if (this.image !== this.sprites.idleRight.image) {
              this.image = this.sprites.idleRight.image
              this.framesMax = this.sprites.idleRight.framesMax
              this.framesCurrent = 0
            }
            break
          case 'run':
            if (this.image !== this.sprites.runRight.image) {
              this.image = this.sprites.runRight.image
              this.framesMax = this.sprites.runRight.framesMax
              this.framesCurrent = 0
            }
            break
          case 'jump':
            if (this.image !== this.sprites.jumpRight.image) {
              this.image = this.sprites.jumpRight.image
              this.framesMax = this.sprites.jumpRight.framesMax
              this.framesCurrent = 0
            }
            break
    
          case 'fall':
            if (this.image !== this.sprites.fallRight.image) {
              this.image = this.sprites.fallRight.image
              this.framesMax = this.sprites.fallRight.framesMax
              this.framesCurrent = 0
            }
            break
    
          case 'attack1':
            if (this.image !== this.sprites.attack1Right.image) {
              this.image = this.sprites.attack1Right.image
              this.framesMax = this.sprites.attack1Right.framesMax
              this.framesCurrent = 0
            }
            break
    
          case 'takeHit':
            if (this.image !== this.sprites.takeHitRight.image) {
              this.image = this.sprites.takeHitRight.image
              this.framesMax = this.sprites.takeHitRight.framesMax
              this.framesCurrent = 0
            }
            break
    
          case 'death':
            if (this.image !== this.sprites.deathRight.image) {
              this.image = this.sprites.deathRight.image
              this.framesMax = this.sprites.deathRight.framesMax
              this.framesCurrent = 0
            }
            break
        }
      }
    }
  }