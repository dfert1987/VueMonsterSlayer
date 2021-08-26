function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
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
        image: './question.jpeg'
      },
        {
          name: 'Kindergarten Teacher',
          class: 'LaoWai',
          attack: 'Bu Yao!',
          special: 'Play Hangman!',
          heal: 'Drink Beer!',
          image: './laowai.png'
        },
        {
          name: 'Dada DJ',
          class: 'LaoWai',
          attack: 'Bathroom Bump!',
          special: 'Drum n Bass!',
          heal: 'Do Shot!',
          image: './dada.jpeg'
        },
        {
          name: 'Wide Body',
          class: 'LaoWai',
          attack: 'Poop!',
          special: 'Spelling Snakes!',
          heal: 'Big Mac For No Reason!',
          image: './wb.png'
        },
        {
          name: 'Nigerian Bro',
          class: 'LaoWai',
          attack: 'Sup Bro, you good?',
          special: 'Bag',
          heal: 'Re-up',
          image: './richy.jpeg'
        },
        {
          name: 'Water Man',
          class: 'Delivery',
          attack: 'Jug Drop Off!',
          special: 'Wreckless Driving!',
          heal: 'Refill',
          image: './water.jpeg'
        },
        {
          name: 'Jinshisong',
          class: 'Delivery',
          attack: 'Delivery Fee!',
          special: 'Wrong Order!',
          heal: 'Gets Paid!',
          image: './jinshisong.jpeg'
        },
        {
          name: 'JianBing Queen',
          class: 'Vendor',
          attack: 'Scallions!',
          special: 'La Jiao!',
          heal: 'Weixin Zhifu!',
          image: './jian.jpg'
        },
      ],
      char: {
        name: '???',
        class: '???',
        attack: '',
        special: '',
        heal: '',
        image: './question.jpeg'
      },
      index: 0,
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
      console.log(this.currentRound);
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
    getPlayerName() {},
  },
});

app.mount('#game');
