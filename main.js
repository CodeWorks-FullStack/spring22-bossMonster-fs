let heroes = {
  terryTate: {
    name: "Triple T",
    health: 100,
    damage: 10,
    quantity: 0,
    img: 'https://f1.media.brightcove.com/8/694922499001/694922499001_4874436235001_4874324610001-vs.jpg?pubId=694922499001&videoId=4874324610001'
  },
  masterChief: {
    name: "The Chief",
    health: 100,
    damage: 15,
    quantity: 0,
    img: 'https://i0.wp.com/www.kakuchopurei.com/wp-content/uploads/2021/11/Become-Master-Chief-Halo-Infinite.jpg?fit=1920%2C1080&ssl=1'
  },
  harrington: {
    name: "Code Monkey",
    health: 100,
    damage: 1,
    quantity: 0,
    img: './harrisonheadshot.jpeg'
  }
}

let boss = {
  name: "jake",
  health: 100,
  damage: .5
}

function addHero(heroName) {
  let hero = heroes[heroName]
  hero.quantity++
  // console.log('hero obj', hero)
  attackBoss()
  setInterval(attackBoss, 2000)
}

function attackBoss() {
  for (let key in heroes) {
    let hero = heroes[key]
    if (boss.health > 0) {
      if (hero.quantity > 0) {
        boss.health -= (hero.damage * hero.quantity)
      }
    } else {
      console.log('da baws eeees ded')
    }
  }
  drawBossHealth()
  attackHeroes()
}

function attackHeroes() {
  // NOTE this is not necessary for the checkpoint!!!!
  let randomIndex = Math.floor(Math.random() * Object.keys(heroes).length)
  let keys = Object.values(heroes)
  let randomHero = keys[randomIndex]
  randomHero.health -= boss.health
  // Would need to make sure we are only redrawing heroes health bars, not entire templates
}

function drawHeroes() {
  let template = ''
  for (let key in heroes) {
    let hero = heroes[key]
    template += /*html*/ `
     <div class="col-md-4">
      <img
        src="${hero.img}"
        class="img-fluid" alt="">
      <div class="progress my-2">
        <div class="progress-bar" role="progressbar" style="width: ${hero.health}%;" aria-valuenow="25" aria-valuemin="0"
          aria-valuemax="100"></div>
      </div>
      <div class="d-flex justify-content-center mt-2">
        <button class="btn btn-danger" onclick="addHero('${key}')">${hero.name}</button>
      </div>
   </div>
     `
  }
  document.getElementById('heroes').innerHTML = template
}

function drawBossHealth() {
  let elem = document.getElementById('boss-health')
  console.log(elem);
  document.getElementById('boss-health').style = `width: ${boss.health}%`
  if (boss.health <= 0) {
    document.getElementById('boss').classList.add('bg-danger')
  }
}

drawHeroes()