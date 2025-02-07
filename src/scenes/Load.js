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
        // background load
        this.load.image('backgroundtop', './assets/img/background.png');
        this.load.image('backgrounddown', './assets/img/background-down.png');
        //emeny load
        this.load.image('tree1', './assets/img/tree1.png');
        //test load
        this.load.image('test',  'https://labs.phaser.io/assets/sprites/phaser3-logo.png');
    }
    create() {
        //alert('aaa')
        // check for local storage browser support
        // create anims rumia fly
        this.anims.create({
            key: 'rumiaFly',
            frames: [
                { key: 'rumiafly1' },
                { key: 'rumiafly2' },
                { key: 'rumiafly3' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });




        
        this.scene.start('playScene');
    }
    update(){

    }
}