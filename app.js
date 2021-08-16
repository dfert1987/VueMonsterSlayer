
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
      return {
        playerHealth: 100,
        monsterHealth: 100,
        currentRound: 0
      };
    },
    computed: {
        monsterBarStyles() {
            return {width: this.monsterHealth + '%'}; 
        },
        playerBarStyles() {
            return {width: this.playerHealth + '%'};
        },
        specialAttackAvailable() {
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        attackMonster() {
            this.currentRound ++;
            const attackValue = getRandomNumber(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomNumber(8, 15);
            this.playerHealth -= attackValue;
        },
        specialAttackMonster() {            
            this.currentRound ++;
            const attackValue = getRandomNumber(10, 25);
            this.monsterHealthe -= attackValue;
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomNumber(8, 20);
            if (this.playerHealth = healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
        }
    },
});

app.mount('#game');