const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/finaldestination.jpg'
})

/*const shop = new Sprite({
  position: {
    x: 600,
    y: 128
  },
  imageSrc: './img/shop.png',
  scale: 2.75,
  framesMax: 6
})*/

const player = new Fighter({
  position: {
    x: 200,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  direction: 'right',
  imageSrc: './img/samuraiMack/samuraiMack/PikachuIdle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idleLeft: {
      imageSrc: './img/samuraiMack/samuraiMack/PikachuIdle2.png',
      framesMax: 8
    },
    runLeft: {
      imageSrc: './img/samuraiMack/samuraiMack/PikachuRun2.png',
      framesMax: 4
    },
    jumpLeft: {
      imageSrc: './img/samuraiMack/samuraiMack/PikachuJump2.png',
      framesMax: 1
    },
    fallLeft: {
      imageSrc: './img/samuraiMack/samuraiMack/PikachuFall2.png',
      framesMax: 1
    },
    attack1Left: {
      imageSrc: './img/samuraiMack/samuraiMack/PikachuAttack12.png',
      framesMax: 6
    },
    takeHitLeft: {
      imageSrc: './img/samuraiMack/samuraiMack/Pikachu Take Hit2.png',
      framesMax: 4
    },
    deathLeft: {
      imageSrc: './img/samuraiMack/samuraiMack/PikachuDeath2.png',
      framesMax: 6
    },
    idleRight: {
      imageSrc: './img/samuraiMack/samuraiMack/PikachuIdle.png',
      framesMax: 8
    },
    runRight: {
      imageSrc: './img/samuraiMack/samuraiMack/PikachuRun.png',
      framesMax: 4
    },
    jumpRight: {
      imageSrc: './img/samuraiMack/samuraiMack/PikachuJump.png',
      framesMax: 1
    },
    fallRight: {
      imageSrc: './img/samuraiMack/samuraiMack/PikachuFall.png',
      framesMax: 1
    },
    attack1Right: {
      imageSrc: './img/samuraiMack/samuraiMack/PikachuAttack1.png',
      framesMax: 6
    },
    takeHitRight: {
      imageSrc: './img/samuraiMack/samuraiMack/Pikachu Take Hit.png',
      framesMax: 4
    },
    deathRight: {
      imageSrc: './img/samuraiMack/samuraiMack/PikachuDeath.png',
      framesMax: 6
    }
  },
  attackBox: {
    offset: {
      x: 50,
      y: 90
    },
    width: 30,
    height: 40
  }
})

const enemy = new Fighter({
  position: {
    x: 750,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  direction: 'left',
  imageSrc: './img/kenji/Kenji/HisokaIdle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idleLeft: {
      imageSrc: './img/kenji/kenji/HisokaIdle.png',
      framesMax: 4
    },
    runLeft: {
      imageSrc: './img/kenji/kenji/HisokaRun.png',
      framesMax: 6
    },
    jumpLeft: {
      imageSrc: './img/kenji/kenji/HisokaJump.png',
      framesMax: 2
    },
    fallLeft: {
      imageSrc: './img/kenji/kenji/HisokaFall.png',
      framesMax: 2
    },
    attack1Left: {
      imageSrc: './img/kenji/kenji/HisokaAttack1.png',
      framesMax: 4
    },
    takeHitLeft: {
      imageSrc: './img/kenji/kenji/Hisoka Take hit.png',
      framesMax: 3
    },
    deathLeft: {
      imageSrc: './img/kenji/kenji/HisokaDeath.png',
      framesMax: 7
    },
    idleRight: {
      imageSrc: './img/kenji/kenji/HisokaIdle2.png',
      framesMax: 4
    },
    runRight: {
      imageSrc: './img/kenji/kenji/HisokaRun2.png',
      framesMax: 6
    },
    jumpRight: {
      imageSrc: './img/kenji/kenji/HisokaJump2.png',
      framesMax: 2
    },
    fallRight: {
      imageSrc: './img/kenji/kenji/HisokaFall2.png',
      framesMax: 2
    },
    attack1Right: {
      imageSrc: './img/kenji/kenji/HisokaAttack12.png',
      framesMax: 4
    },
    takeHitRight: {
      imageSrc: './img/kenji/kenji/Hisoka Take hit2.png',
      framesMax: 3
    },
    deathRight: {
      imageSrc: './img/kenji/kenji/HisokaDeath2.png',
      framesMax: 7
    }
  },
  attackBox: {
    offset: {
      x: -55,
      y: 50
    },
    width: 55,
    height: 100
  }
})

console.log(player)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  //shop.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  // player movement

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  // jumping
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
    enemy.switchSprite('run')
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
    enemy.switchSprite('run')
  } else {
    enemy.switchSprite('idle')
  }

  // jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
  }

  // detect for collision & enemy gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    (player.framesCurrent === 3 ||
     player.framesCurrent === 4)
  ) {
    enemy.takeHit()
    player.isAttacking = false

    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })
  }

  // if player misses
  if (player.isAttacking && (player.framesCurrent === 3 || player.framesCurrent === 4)) {
    player.isAttacking = false
  }

  // this is where our player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit()
    enemy.isAttacking = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  // if player misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}

animate()

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.direction = 'right'
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.direction = 'left'
        player.lastKey = 'a'
        break
      case 'w':
        if(player.velocity.y === 0){
          player.velocity.y = -20
        }
        break
      case ' ':
        player.attack()
        break
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.direction = 'right'
        enemy.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.direction = 'left'
        enemy.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        if (enemy.velocity.y === 0) {
          enemy.velocity.y = -20
        }
        break
      case 'ArrowDown':
        enemy.attack()

        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

  // enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})