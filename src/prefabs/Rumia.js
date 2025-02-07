class Rumia extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        this.healthly = 3;
        this.undefence = false;
        this.isHit = false;
            // add object to existing scene
    
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(60, 75);  
        this.body.setOffset(20, 12);  


        this.play('rumiaFly'); // Play the 'rumiaFly' animation
        
        
    }
    update(){
        
    }



}