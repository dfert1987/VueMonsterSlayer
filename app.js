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
          image: './images/question.jpeg',
        },
        {
          name: 'Kindergarten Teacher',
          class: 'LaoWai',
          attack: 'Bu Yao!',
          special: 'Play Hangman!',
          heal: 'Drink Beer!',
          image: './images/laowai.png',
        },
        {
          name: 'Dada DJ',
          class: 'LaoWai',
          attack: 'Bathroom Bump!',
          special: 'Drum n Bass!',
          heal: 'Do Shot!',
          image: './images/dada.jpeg',
        },
        {
          name: 'Wide Body',
          class: 'LaoWai',
          attack: 'Poop!',
          special: 'Spelling Snakes!',
          heal: 'Big Mac For No Reason!',
          image: './images/wb.png',
        },
        {
          name: 'Nigerian Bro',
          class: 'LaoWai',
          attack: 'Sup Bro, you good?',
          special: 'Bag',
          heal: 'Re-up',
          image: './images/richy.jpeg',
        },
        {
          name: 'Water Man',
          class: 'Driver',
          attack: 'Jug Drop Off!',
          special: 'Wreckless Driving!',
          heal: 'Refill',
          image: './images/water.jpeg',
        },
        {
          name: 'Jinshisong',
          class: 'Driver',
          attack: 'Delivery Fee!',
          special: 'Wrong Order!',
          heal: 'Gets Paid!',
          image: './images/jinshisong.jpeg',
        },
        {
          name: 'JianBing Queen',
          class: 'Vendor',
          attack: 'Scallions!',
          special: 'La Jiao!',
          heal: 'Weixin Zhifu!',
          image: './images/jian.jpg',
        },
      ],
      char: {
        name: '???',
        class: '???',
        attack: '',
        special: '',
        heal: '',
        image: './images/question.jpeg',
      },
      enemies: [
        {
          name: '???',
          class: '???',
          attack: '',
          special: '',
          heal: '',
          image: './images/question.jpeg',
        },
        {
          name: 'Taxi Shifu',
          class: 'Driver',
          attack: 'Honk!',
          special: 'Qu Nar?!',
          heal: 'Cigarette Break!',
          image: './images/taxi.jpeg',
        },
        {
          name: 'Squatter',
          class: 'Beijinger',
          attack: 'Smoke',
          special: 'Loogie',
          heal: 'Phone game!',
          image: './images/squatter.jpeg',
        },
        {
          name: 'Yellow Weasel',
          class: 'Animal',
          attack: 'Scurry',
          special: 'Scavange',
          heal: 'Eats trash!',
          image: './images/weasel.jpeg',
        },
        {
          name: 'Houh Hai Swimmer',
          class: 'Beijinger',
          attack: 'Splash',
          special: 'Breast Stroke',
          heal: 'Dry off!',
          image: './images/swimmer.jpeg',
        },
        {
          name: 'Sleepy BaoAn',
          class: 'Authority',
          attack: 'Doze!',
          special: 'Snore!',
          heal: 'Dream!',
          image: './images/baoan.jpeg',
        },
        {
          name: 'Beijing Bikini',
          class: 'LaoRen',
          attack: 'Belly rub!',
          special: 'Baijiu Burp!',
          heal: 'Rolls Shirt!',
          image: './images/baoan.jpeg',
        },
        {
          name: 'Birdman',
          class: 'LaoRen',
          attack: 'Chirp!',
          special: 'Cage Bash!',
          heal: 'Cover Cage',
          image: './images/birdman.jpeg',
        },
        {
          name: 'Bundled Baby',
          class: 'XiaoPengyou',
          attack: 'Bundle!',
          special: 'Stumble!',
          heal: 'Extra Bundle!',
          image: './images/bundledbaby.jpeg',
        },
        {
          name: 'Butt Baby',
          class: 'XiaoPengyou',
          attack: 'Windswept buns!',
          special: 'Street Poop!',
          heal: 'Cry for ayi!',
          image: './images/buttbaby.jpeg',
        },
        {
          name: 'Chuanr Man',
          class: 'Vendor',
          attack: 'Bu La!',
          special: 'La!',
          heal: 'Warm Yanjing!',
          image: './images/chuanr.jpeg',
        },
        {
          name: 'Dancing Couple',
          class: 'LaoRen',
          attack: 'Spin!',
          special: 'Dip!',
          heal: 'Change Song!',
          image: './images/dancecouple.jpeg',
        },
        {
          name: 'E-bike Family',
          class: 'Driver',
          attack: 'Swerve!',
          special: 'Wreckless Driving!',
          heal: 'Add Passenger!',
          image: './images/ebike.jpeg',
        },
        {
          name: 'Erhu Player',
          class: 'LaoRen',
          attack: 'Bow Bash!',
          special: 'Sad Song!',
          heal: 'Re-String!',
          image: './images/erhu.jpeg',
        },
        {
          name: 'Fancy Poodle',
          class: 'Animal',
          attack: 'Yap!',
          special: 'Nip!',
          heal: 'New Hair Cut!',
          image: './images/fancypoodle.jpeg',
        },
        {
          name: 'HouHai Fisherman',
          class: 'LaoRen',
          attack: 'Rod Bash!',
          special: 'Long Cast!',
          heal: 'Catches fish!',
          image: './images/fisher.jpeg',
        },
        {
          name: 'Dirty Poodle',
          class: 'Animal',
          attack: 'Fleas!',
          special: 'Mange!',
          heal: 'Eat Trash!',
          image: './images/hutongdog.jpeg',
        },
        {
          name: 'Small Hutong Dog',
          class: 'Animal',
          attack: 'Pant!',
          special: 'Annoying Bark!',
          heal: 'Get Pet!',
          image: './images/hutongdog2.jpeg',
        },
        {
          name: 'Gamer',
          class: 'XiaoPengyo',
          attack: 'Controller Bash!',
          special: 'High Score!',
          heal: 'Level Up!',
          image: './images/gamer.jpeg',
        },
        {
          name: 'Kite LaoRen',
          class: 'LaoRen',
          attack: 'String Tangle!',
          special: 'Heavy Gust!',
          heal: 'Reel In!',
          image: './images/kite.jpeg',
        },
        {
          name: 'Malatang Lady',
          class: 'Vendor',
          attack: 'BuShufu!',
          special: 'LaDuzi!',
          heal: 'Fresh Oil!',
          image: './images/malatang.jpeg',
        },{
          name: 'Middle School Gang',
          class: 'XiaoPengyou',
          attack: 'Memorize!',
          special: 'Embarass!',
          heal: 'Weekend!',
          image: './images/middleschoolers.jpeg',
        },{
          name: 'Yonghegong Monk',
          class: 'Beijinger',
          attack: 'Burn Incense!',
          special: 'Meditate!',
          heal: 'Vegetarian Meal!',
          image: './images/ebike.jpeg',
        },{
          name: 'Scorpion Vendor',
          class: 'Vendor',
          attack: 'Gross Out!',
          special: 'La Duzi!',
          heal: 'Fresh Oil!',
          image: './images/scorpion.jpeg',
        },{
          name: 'Selfy Stick',
          class: 'Beijinger',
          attack: 'Stick Bash!',
          special: 'Take Selfy!',
          heal: 'Post to WeChat!',
          image: './images/selfy.jpeg',
        },
        {
          name: 'Hawhtorne Snack Vendor',
          class: 'Vendor',
          attack: 'Skewer Bash!',
          special: 'Sticks to teeth!',
          heal: 'Spring Festival Sales Spike!',
          image: './images/snack.jpeg',
        },
        {
          name: 'Little Emperor',
          class: 'XiaoPeng',
          attack: 'Pout!',
          special: 'Tantrum!',
          heal: 'Gets what he wants!',
          image: './images/spoiled.jpeg',
        },{
          name: 'Street Barber',
          class: 'Beijinger',
          attack: 'Trim!',
          special: 'Long Pinky Nail!',
          heal: 'Sweep Hair!',
          image: './images/streehair.jpeg',
        },
        {
          name: 'Tai Chi LaoRen',
          class: 'LaoRen',
          attack: 'Slow Strike!',
          special: 'Body Control!',
          heal: 'Grow Whispy Beard',
          image: './images/taichi.jpeg',
        },
        {
          name: 'Tuk Tuk',
          class: 'Driver',
          attack: 'Hello, Pengyou!',
          special: 'Haggle!',
          heal: 'Cigarette Break!',
          image: './images/ebike.jpeg',
        },
        {
          name: 'Wudaoying Wedding Photo Couple',
          class: 'Beijinger',
          attack: 'Cute Pose!',
          special: 'Photo Filter!',
          heal: 'Honeymoon!',
          image: './images/ebike.jpeg',
        },
        {
          name: 'Bank of China Teller',
          class: 'Authority',
          attack: 'Paperwork!',
          special: 'Long Wait!',
          heal: 'Deposit!',
          image: './images/teller.jpeg',
        },
        {
          name: 'Sprout Head',
          class: 'XiaoPengyou',
          attack: 'Peace Sign Pic!',
          special: 'Pouty Face!',
          heal: 'Social Media!',
          image: './images/Sprout.jpeg',
        },
        {
          name: 'National Police',
          class: 'Authority',
          attack: 'Scowl!',
          special: 'March!',
          heal: 'Reload!',
          image: './images/nationalpolice.jpeg',
        },
        {
          name: 'Police',
          class: 'Authority',
          attack: 'Mase!',
          special: 'Pee Test!',
          heal: 'Bribe!',
          image: './images/ebike.jpeg',
        },
        {
          name: 'Zhang Mama',
          class: 'Authority',
          attack: 'Boss Bitch!',
          special: 'La Duzi!',
          heal: 'More Peppers!',
          image: './images/ebike.jpeg',
        },
        {
          name: 'Morgan Short',
          class: 'LaoWai',
          attack: 'Rage!',
          special: 'Coke Fiend!',
          heal: 'DJ at Temple!',
          image: './images/morgan.jpeg',
        },
        {
          name: 'Black Cab',
          class: 'Driver',
          attack: 'Overcharge!',
          special: 'Counterfeit hundo!',
          heal: 'Cigarette Break!',
          image: './images/morgan.jpeg',
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
        image: './images/question.jpeg',
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
    getRandomNumber() {
      this.enemyIndex = Math.floor(
        Math.random() * (this.enemies.length - 2) + 1
      );
      console.log(this.enemyIndex);
      console.log(this.enemy);
    },
  },
});

app.mount('#game');
