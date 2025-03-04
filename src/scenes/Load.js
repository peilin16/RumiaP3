class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }
    preload() {
        //rumia load
        this.load.image('rumiaStart', './assets/img/rumia1.png');
        this.load.image('rumiafly1', './assets/img/rumia-fly1.png');
        this.load.image('rumiafly2', './assets/img/rumia-fly2.png');
        this.load.image('rumiafly3', './assets/img/rumia-fly3.png');
        //hit
        this.load.image('rumiaflyhit', './assets/img/rumia-fly-hit.png');
        //defence
        this.load.image('rumiaDefence1', './assets/img/rumia-defence1.png');
        this.load.image('rumiaDefence2', './assets/img/rumia-defence2.png');
        this.load.image('rumiaDefence3', './assets/img/rumia-defence3.png');
        this.load.image('rumiaDefence4', './assets/img/rumia-defence4.png');
        this.load.image('rumiaDefence5', './assets/img/rumia-defence5.png');
        // background load
        this.load.image('backgroundtop', './assets/img/background.png');
        this.load.image('backgrounddown', './assets/img/background-down.png');
        //state assets load
        this.load.image('tree1', './assets/img/tree1.png');
        this.load.image('snow1', './assets/img/snow1.png');
        this.load.image('snow2', './assets/img/snow2.png');
        this.load.image('snow3', './assets/img/snow3.png');

        //pill load
        this.load.image('Kedama', './assets/img/Pill.png');
        this.load.image('KedamaHit', './assets/img/Pill-hit.png');
        //Daiyousei load
        this.load.image('DaiyouseiNothing1', './assets/img/Daiyousei-nothing1.png');
        this.load.image('DaiyouseiNothing2', './assets/img/Daiyousei-nothing2.png');
        this.load.image('DaiyouseiScore1', './assets/img/Daiyousei-score1.png');
        this.load.image('DaiyouseiScore2', './assets/img/Daiyousei-score2.png');
        //flower fairy load
        this.load.image('sunflowerFairy1', './assets/img/sunflowerFairy1.png');
        this.load.image('sunflowerFairy2', './assets/img/sunflowerFairy2.png');
        this.load.image('sunflowerFairy3', './assets/img/sunflowerFairy3.png');
        this.load.image('sunflowerFairyHit', './assets/img/sunflowerFairy-hit1.png');
        
        //s load
        this.load.image('test',  'https://labs.phaser.io/assets/sprites/phaser3-logo.png');

        
        this.load.audio('hitHurt1', './assets/audio/hitHurt1.wav')
        this.load.audio('hitHurt2', './assets/audio/hitHurt2.wav')
        this.load.audio('hitHurt3', './assets/audio/hitHurt3.wav')
        this.load.audio('pickUp1', './assets/audio/pickupCoin.wav')
        this.load.audio('background', './assets/audio/background1.wav')
    }
    create() {
        //alert('aaa')
        // check for local storage browser support
        // create anims rumia fly


        
        
        this.scene.start('titleScene');
    }
    update(){

    }
}