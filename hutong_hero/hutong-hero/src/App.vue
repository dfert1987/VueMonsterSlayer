<template>
  <body>
    <header>
      <h1 class="banner-title">Hutong Hero</h1>
    </header>
    <div class="main" id="game">
      <div class="char-container">
        <section id="monster" class="container">
          <div class="char-info">
            <h2 class="name">CPU: {{ enemy.name }}</h2>
            <h3 class="class-type">Class: {{ enemy.class }}</h3>
          </div>
          <img class="monster-image" :src="char.image" />
          <div class="bar-and-hp">
            <p class="hp-bar">HP</p>
            <div class="healthbar">
              <div class="healthbar__value" :style="monsterBarStyles"></div>
            </div>
          </div>
          <h4 class="hp-fraction">{{ getMonsterHealth() }}/100</h4>
        </section>
        <h2 class="versus">VS</h2>
        <section id="player" class="container">
          <div class="char-info">
            <h2 class="name">P1: {{ char.name }}</h2>
            <h3 class="class-type">Class: {{ char.class }}</h3>
          </div>
          <img class="player-image" v-bind:src="char.image" />
          <div class="bar-and-hp">
            <p class="hp-bar">HP</p>
            <div class="healthbar">
              <div class="healthbar__value" :style="playerBarStyles"></div>
            </div>
          </div>
          <h4 class="hp-fraction">{{ getPlayerHealth() }}/100</h4>
        </section>
      </div>
      <div class="enemy-p1-choose" v-if="!start">
        <div class="randomizer-container">
          <h2 class="enemy-title">Get an Enemy</h2>
          <button @click="getRandomNumber" class="randomizer">
            Randomizer
          </button>
        </div>
        <button
          :disabled="enemyIndex === 0 || index === 0"
          @click="start = true"
          class="start"
        >
          START
        </button>
        <div class="player-select">
          <h2 class="choose-char">Choose Your Hero!</h2>
          <div class="select-char-container">
            <button
              :disabled="index <= 1"
              @click="indexDown"
              class="left-arrow"
            >
              <img
                class="arrow"
                src="./assets/images/white-arrow-png-41962.png"
              />
            </button>
            <button
              :disabled="index === chars.length - 1"
              @click="indexUp"
              class="right-arrow"
            >
              <img
                class="arrow"
                src="./assets/images/white-arrow-png-41958.png"
              />
            </button>
          </div>
        </div>
      </div>
      <section class="container" v-if="winner">
        <h2>Game Over!</h2>
        <h3 v-if="winner === 'monster'">You Lost!</h3>
        <h3 v-else-if="winner === 'player'">You Won!</h3>
        <h3 v-else>Draw...</h3>
        <button @click="startGame">Start New Game</button>
      </section>
      <div v-if="start" class="control-and-log">
        <section id="log" class="container">
          <h2 class="battle-log">Battle Log</h2>
          <ul>
            <li v-for="logMessage in logMessages" :key="logMessage.id">
              <span
                :class="{
                  'log--player': logMessage.actionBy === 'player',
                  'log--monster': logMessage.actionBy === 'monster',
                }"
                >{{
                  logMessage.actionBy === 'player'
                    ? char.name
                    : 'Beijing-Bikini'
                }}</span
              >
              <span v-if="logMessage.actionType === 'heal'">
                heals himself using "{{ char.heal }}" for
                <span class="log--heal">
                  {{ logMessage.actionValue }} hp regeneration.</span
                >
              </span>
              <span
                v-else-if="
                  logMessage.actionType === 'attack' &&
                  logMessage.actionBy === 'player'
                "
              >
                attacks using "{{ char.attack }}" and deals
                <span class="log--damage"
                  >{{ logMessage.actionValue }} hp in damage.</span
                >
              </span>
              <span
                v-else-if="
                  logMessage.actionType === 'attack' &&
                  logMessage.actionBy === 'monster'
                "
              >
                attacks using {{ enemy.attack }} and deals
                <span class="log--damage"
                  >{{ logMessage.actionValue }} hp in damage.</span
                >
              </span>
              <span
                v-else-if="
                  logMessage.actionType === 'special' &&
                  logMessage.actionBy === 'monster'
                "
              >
                attacks using {{ enemy.special }} and deals
                <span class="log--damage"
                  >{{ logMessage.actionValue }} hp in damage.</span
                >
              </span>
              <span v-else>
                attacks using "{{ char.special }}" and deals
                <span class="log--damage"
                  >{{ logMessage.actionValue }} hp in damage.</span
                >
              </span>
            </li>
          </ul>
        </section>
        <section id="controls">
          <button
            class="control"
            :disabled="attacksAvailable === false"
            @click="attackMonster"
          >
            Basic: {{ char.attack }}
          </button>
          <button
            class="control"
            :disabled="specialAttackAvailable || attacksAvailable === false"
            @click="specialAttackMonster"
          >
            Special: {{ char.special }}
          </button>
          <button
            class="control"
            :disabled="attacksAvailable === false"
            @click="healPlayer"
          >
            HEAL: {{ char.heal }}
          </button>
          <button class="control" @click="surrender">SURRENDER</button>
        </section>
      </div>
    </div>
  </body>
</template>

<script>
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export default {
  data() {
    return {
      start: false,
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      message: '',
      logMessages: [],
      attacksAvailable: true,
      chars: [
        {
          name: '???',
          class: '???',
          attack: '',
          special: '',
          heal: '',
          image: '.question.jpeg',
        },
        {
          name: 'Kindergarten Teacher',
          class: 'LaoWai',
          attack: 'Bu Yao!',
          special: 'Play Hangman!',
          heal: 'Drink Beer!',
          image: './assets/images/laowai.png',
        },
        {
          name: 'Dada DJ',
          class: 'LaoWai',
          attack: 'Bathroom Bump!',
          special: 'Drum n Bass!',
          heal: 'Do Shot!',
          image: './assets/images/dada.jpeg',
        },
        {
          name: 'Wide Body',
          class: 'LaoWai',
          attack: 'Poop!',
          special: 'Spelling Snakes!',
          heal: 'Big Mac For No Reason!',
          image: './assets/images/wb.png',
        },
        {
          name: 'Nigerian Bro',
          class: 'LaoWai',
          attack: 'Sup Bro, you good?',
          special: 'Bag',
          heal: 'Re-up',
          image: './assets/images/richy.jpeg',
        },
        {
          name: 'Water Man',
          class: 'Driver',
          attack: 'Jug Drop Off!',
          special: 'Wreckless Driving!',
          heal: 'Refill',
          image: './assets/images/water.jpeg',
        },
        {
          name: 'Jinshisong',
          class: 'Driver',
          attack: 'Delivery Fee!',
          special: 'Wrong Order!',
          heal: 'Gets Paid!',
          image: './assets/images/jinshisong.jpeg',
        },
        {
          name: 'JianBing Queen',
          class: 'Vendor',
          attack: 'Scallions!',
          special: 'La Jiao!',
          heal: 'Weixin Zhifu!',
          image: require('./assets/images/jian.jpg'),
        },
      ],
      char: {
        name: '???',
        class: '???',
        attack: '',
        special: '',
        heal: '',
        image: require('./assets/images/question.jpeg'),
      },
      enemies: [
        {
          name: '???',
          class: '???',
          attack: '',
          special: '',
          heal: '',
          image: './assets/images/question.jpeg',
        },
        {
          name: 'Taxi Shifu',
          class: 'Driver',
          attack: 'Honk!',
          special: 'Qu Nar?!',
          heal: 'Cigarette Break!',
          image: './assets/images/taxi.jpeg',
        },
        {
          name: 'Squatter',
          class: 'Beijinger',
          attack: 'Smoke',
          special: 'Loogie',
          heal: 'Phone game!',
          image: './assets/images/squatter.jpeg',
        },
        {
          name: 'Yellow Weasel',
          class: 'Animal',
          attack: 'Scurry',
          special: 'Scavange',
          heal: 'Eats trash!',
          image: './assets/images/weasel.jpeg',
        },
        {
          name: 'Houh Hai Swimmer',
          class: 'Beijinger',
          attack: 'Splash',
          special: 'Breast Stroke',
          heal: 'Dry off!',
          image: './assets/images/swimmer.jpeg',
        },
        {
          name: 'Sleepy BaoAn',
          class: 'Authority',
          attack: 'Doze!',
          special: 'Snore!',
          heal: 'Dream!',
          image: './assets/images/baoan.jpeg',
        },
        {
          name: 'Beijing Bikini',
          class: 'LaoRen',
          attack: 'Belly rub!',
          special: 'Baijiu Burp!',
          heal: 'Rolls Shirt!',
          image: './assets/images/baoan.jpeg',
        },
        {
          name: 'Birdman',
          class: 'LaoRen',
          attack: 'Chirp!',
          special: 'Cage Bash!',
          heal: 'Cover Cage',
          image: './assets/images/birdman.jpeg',
        },
        {
          name: 'Bundled Baby',
          class: 'XiaoPengyou',
          attack: 'Bundle!',
          special: 'Stumble!',
          heal: 'Extra Bundle!',
          image: './assets/images/bundledbaby.jpeg',
        },
        {
          name: 'Butt Baby',
          class: 'XiaoPengyou',
          attack: 'Windswept buns!',
          special: 'Street Poop!',
          heal: 'Cry for ayi!',
          image: './assets/images/buttbaby.jpeg',
        },
        {
          name: 'Chuanr Man',
          class: 'Vendor',
          attack: 'Bu La!',
          special: 'La!',
          heal: 'Warm Yanjing!',
          image: './assets/images/chuanr.jpeg',
        },
        {
          name: 'Dancing Couple',
          class: 'LaoRen',
          attack: 'Spin!',
          special: 'Dip!',
          heal: 'Change Song!',
          image: './assets/images/dancecouple.jpeg',
        },
        {
          name: 'E-bike Family',
          class: 'Driver',
          attack: 'Swerve!',
          special: 'Wreckless Driving!',
          heal: 'Add Passenger!',
          image: './assets/images/ebike.jpeg',
        },
        {
          name: 'Erhu Player',
          class: 'LaoRen',
          attack: 'Bow Bash!',
          special: 'Sad Song!',
          heal: 'Re-String!',
          image: './assets/images/erhu.jpeg',
        },
        {
          name: 'Fancy Poodle',
          class: 'Animal',
          attack: 'Yap!',
          special: 'Nip!',
          heal: 'New Hair Cut!',
          image: './assets/images/fancypoodle.jpeg',
        },
        {
          name: 'HouHai Fisherman',
          class: 'LaoRen',
          attack: 'Rod Bash!',
          special: 'Long Cast!',
          heal: 'Catches fish!',
          image: './assets/images/fisher.jpeg',
        },
        {
          name: 'Dirty Poodle',
          class: 'Animal',
          attack: 'Fleas!',
          special: 'Mange!',
          heal: 'Eat Trash!',
          image: './assets/images/hutongdog.jpeg',
        },
        {
          name: 'Small Hutong Dog',
          class: 'Animal',
          attack: 'Pant!',
          special: 'Annoying Bark!',
          heal: 'Get Pet!',
          image: './assets/images/hutongdog2.jpeg',
        },
        {
          name: 'Gamer',
          class: 'XiaoPengyo',
          attack: 'Controller Bash!',
          special: 'High Score!',
          heal: 'Level Up!',
          image: './assets/images/gamer.jpeg',
        },
        {
          name: 'Kite LaoRen',
          class: 'LaoRen',
          attack: 'String Tangle!',
          special: 'Heavy Gust!',
          heal: 'Reel In!',
          image: './assets/images/kite.jpeg',
        },
        {
          name: 'Malatang Lady',
          class: 'Vendor',
          attack: 'BuShufu!',
          special: 'LaDuzi!',
          heal: 'Fresh Oil!',
          image: './assets/images/malatang.jpeg',
        },
        {
          name: 'Middle School Gang',
          class: 'XiaoPengyou',
          attack: 'Memorize!',
          special: 'Embarass!',
          heal: 'Weekend!',
          image: './assets/images/middleschoolers.jpeg',
        },
        {
          name: 'Yonghegong Monk',
          class: 'Beijinger',
          attack: 'Burn Incense!',
          special: 'Meditate!',
          heal: 'Vegetarian Meal!',
          image: './assets/images/ebike.jpeg',
        },
        {
          name: 'Scorpion Vendor',
          class: 'Vendor',
          attack: 'Gross Out!',
          special: 'La Duzi!',
          heal: 'Fresh Oil!',
          image: './assets/images/scorpion.jpeg',
        },
        {
          name: 'Selfy Stick',
          class: 'Beijinger',
          attack: 'Stick Bash!',
          special: 'Take Selfy!',
          heal: 'Post to WeChat!',
          image: './assets/images/selfy.jpeg',
        },
        {
          name: 'Hawhtorne Snack Vendor',
          class: 'Vendor',
          attack: 'Skewer Bash!',
          special: 'Sticks to teeth!',
          heal: 'Spring Festival Sales Spike!',
          image: './assets/images/snack.jpeg',
        },
        {
          name: 'Little Emperor',
          class: 'XiaoPeng',
          attack: 'Pout!',
          special: 'Tantrum!',
          heal: 'Gets what he wants!',
          image: './assets/images/spoiled.jpeg',
        },
        {
          name: 'Street Barber',
          class: 'Beijinger',
          attack: 'Trim!',
          special: 'Long Pinky Nail!',
          heal: 'Sweep Hair!',
          image: './assets/images/streehair.jpeg',
        },
        {
          name: 'Tai Chi LaoRen',
          class: 'LaoRen',
          attack: 'Slow Strike!',
          special: 'Body Control!',
          heal: 'Grow Whispy Beard',
          image: './asets/images/taichi.jpeg',
        },
        {
          name: 'Tuk Tuk',
          class: 'Driver',
          attack: 'Hello, Pengyou!',
          special: 'Haggle!',
          heal: 'Cigarette Break!',
          image: './assets/images/ebike.jpeg',
        },
        {
          name: 'Wudaoying Wedding Photo Couple',
          class: 'Beijinger',
          attack: 'Cute Pose!',
          special: 'Photo Filter!',
          heal: 'Honeymoon!',
          image: './assets/images/wedding.jpg',
        },
        {
          name: 'Bank of China Teller',
          class: 'Authority',
          attack: 'Paperwork!',
          special: 'Long Wait!',
          heal: 'Deposit!',
          image: './assets/images/teller.jpeg',
        },
        {
          name: 'Sprout Head',
          class: 'XiaoPengyou',
          attack: 'Peace Sign Pic!',
          special: 'Pouty Face!',
          heal: 'Social Media!',
          image: './assets/images/Sprout.jpeg',
        },
        {
          name: 'National Police',
          class: 'Authority',
          attack: 'Scowl!',
          special: 'March!',
          heal: 'Reload!',
          image: './assets/images/nationalpolice.jpeg',
        },
        {
          name: 'Police',
          class: 'Authority',
          attack: 'Mase!',
          special: 'Pee Test!',
          heal: 'Bribe!',
          image: './assets/images/chinesepolice.jpg',
        },
        {
          name: 'Zhang Mama',
          class: 'Authority',
          attack: 'Boss Bitch!',
          special: 'La Duzi!',
          heal: 'More Peppers!',
          image: './assets/images/ebike.jpeg',
        },
        {
          name: 'Morgan Short',
          class: 'LaoWai',
          attack: 'Rage!',
          special: 'Coke Fiend!',
          heal: 'DJ at Temple!',
          image: './assets/images/morgan.jpeg',
        },
        {
          name: 'Black Cab',
          class: 'Driver',
          attack: 'Overcharge!',
          special: 'Counterfeit hundo!',
          heal: 'Cigarette Break!',
          image: './assets/images/morgan.jpeg',
        },
      ],
      index: 0,
      enemyIndex: 0,
      enemy: {
        name: '???',
        class: '???',
        attack: '',
        special: '',
        heal: '',
        image: require('./assets/images/question.jpeg'),
      },
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return {width: '0%'};
      }
      return {width: this.monsterHealth + '%'};
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return {width: '0%'};
      }
      return {width: this.playerHealth + '%'};
    },
    specialAttackAvailable() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'player';
      }
    },
    index(value) {
      this.char = this.chars[value];
    },
    enemyIndex(value) {
      this.enemy = this.enemies[value];
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomNumber(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attacksAvailable = false;
      setTimeout(() => {
        this.attackPlayer();
      }, 3000);
    },
    attackPlayer() {
      const attackValue = getRandomNumber(8, 15);
      const specialValue = getRandomNumber(10, 18);
      if (this.currentRound % 3 !== 0) {
        this.playerHealth -= attackValue;
        this.addLogMessage('monster', 'attack', attackValue);
        this.attacksAvailable = true;
      }
      if (this.currentRound % 3 === 0) {
        this.playerHealth -= specialValue;
        this.addLogMessage('monster', 'special', specialValue);
        this.attacksAvailable = true;
      }
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomNumber(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'special', attackValue);
      this.attacksAvailable = false;
      setTimeout(() => {
        this.attackPlayer();
      }, 3000);
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomNumber(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attacksAvailable = false;
      setTimeout(() => {
        this.attackPlayer();
      }, 3000);
    },
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
    },
    surrender() {
      this.winner = 'monster';
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
      if (this.logMessages.length > 6) {
        this.logMessages.pop();
      }
    },
    getPlayerHealth() {
      if (this.playerHealth > 0) {
        return this.playerHealth;
      } else {
        return 0;
      }
    },
    getMonsterHealth() {
      if (this.monsterHealth > 0) {
        return this.monsterHealth;
      } else {
        return 0;
      }
    },
    indexDown() {
      if (this.index > 0) {
        this.index--;
      }
    },
    indexUp() {
      if (this.index < this.chars.length - 1) {
        this.index++;
      }
    },
    getRandomNumber() {
      this.enemyIndex = Math.floor(
        Math.random() * (this.enemies.length - 2) + 1
      );
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-image: url('assets/images/hutong.jpeg');
  background-repeat: no-repeat;
  background-position: center;
}

.main {
  height: 90vh;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  background-color: #de2910;
  border-bottom: 2px #ffde00;
  color: #ffde00;
  text-align: center;
}

.banner-title {
  font-family: 'Gang of Three';
  font-size: 5em;
  margin-bottom: 0;
  margin-top: 0;
  text-shadow: 2px 2px 5px black;
}

section {
  width: 90%;
  max-width: 40rem;
  margin: auto;
}

.healthbar {
  width: 100%;
  height: 20px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #fde5e5;
}

.healthbar__value {
  background-color: #00a876;
  width: 100%;
  height: 100%;
}

.container {
  text-align: center;
  padding: 0.5rem;
  font-size: 19px;
  font-weight: bold;
  margin: 1rem auto;
  box-shadow: 2px 2px 5px;
  border-radius: 12px;
  background-image: url('assets/images/bricks.jpeg');
  border-width: 4px;
  border-color: black;
}

#monster h2,
#player h2 {
  margin-bottom: 0;
  margin: 0.25rem;
  text-align: left;
}

#controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.name {
  font-size: 35px;
}

button {
  font: inherit;
  border: 1px solid #de2910;
  background-color: #de2910;
  color: #ffde00;
  font-family: 'Gang of Three';
  font-size: 20px;
  padding: 1rem 2rem;
  border-radius: 12px;
  margin: 1rem;
  width: 12rem;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
  transition: ease-in 500ms;
}

button:focus {
  outline: none;
}

button:hover,
button:active {
  background-color: #ffde00;
  border-color: #ffde00;
  color: #de2910;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.26);
}

button:disabled {
  background-color: #ccc;
  border-color: #ccc;
  box-shadow: none;
  color: black;
  cursor: not-allowed;
}

#log ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

#log li {
  margin: 0.5rem 0;
}

.log--player {
  color: #ffde00;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 1px 1px black;
}

.log--monster {
  color: #de2910;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px black;
}

.log--damage {
  color: red;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px black;
}

.log--heal {
  color: green;
  font-size: 20px;
  font-weight: bold;
}

.hp-bar {
  font-size: 20px;
  font-weight: bold;
  margin-right: 0.5em;
  margin-top: 0.55em;
}

.bar-and-hp {
  display: flex;
  flex-direction: row;
}

.hp-fraction {
  font-size: 30px;
  margin: 0;
  text-align: right;
}

.monster-image {
  border-radius: 5px;
  height: 200px;
  box-shadow: 2px 2px 5px;
}

.player-image {
  border-radius: 5px;
  height: 200px;
  box-shadow: 2px 2px 5px;
}

.char-container {
  display: flex;
  flex-direction: row;
}

#log ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

#log li {
  margin: 0.5rem 0;
}

.log--player {
  color: #ffde00;
}

.log--monster {
  color: #de2910;
}

.log--damage {
  color: red;
}

.log--heal {
  color: green;
}

.control-and-log {
  display: flex;
  flex-direction: row;
  margin-bottom: 2em;
}

.text-container {
  font-size: 25px;
  margin-left: 2.5em;
}

.char-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.class-type {
  margin: 0;
  margin-left: 0.25em;
  font-size: 25px;
}

.versus {
  font-size: 35px;
  margin-top: 8em;
  font-family: 'Gang of Three';
  color: yellow;
  text-shadow: 2px 2px black;
}
.choose-char {
  margin-bottom: 0;
  font-family: 'Gang of Three';
  text-shadow: 2px 2px black;
  color: #ffde00;
  font-size: 35px;
  text-align: center;
}

.select-char-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.left-arrow {
  padding: 0;
  width: 100px;
}

.right-arrow {
  padding: 0;
  width: 100px;
}

.arrow {
  color: white;
  height: 50px;
  margin: 0;
}

.choose-character-container {
  display: flex;
  flex-direction: column;
}

.p-select {
  display: flex;
  flex-direction: column;
  margin-left: 3em;
}

.enemy-title {
  margin-bottom: 0;
  text-align: center;
  color: #ffde00;
  font-size: 35px;
  text-shadow: 2px 2px 4px black;
  font-family: 'Gang of Three';
}

.enemy-p1-choose {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.start {
  margin-left: 2em;
  position: relative;
  left: 2em;
  margin-top: 4em;
  padding: 0;
  height: 3em;
}

.control:disabled {
  text-shadow: 0;
}

.battle-log {
  font-family: 'Gang of Three';
  color: #ffde00;
  text-shadow: 2px 2px black;
}


</style>
