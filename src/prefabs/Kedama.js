

class Kedama extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.isEmeny = true;
        this.isDrop = false;
        this.kind = 'k'
        this.body.setSize(45, 45, true); // Adjust hitbox size
        this.body.setOffset(0, 5);  
    }

    update() {
        this.x -= emenySpeed;
        
        
        if (this && this.x < -100) {
            this.destroy();
        }
        if (this && this.y > boardheigh + 60) {
            this.destroy();
        }
        if(this.isDrop){
            this.y += 3;
        }
    }
    dropOff(){
        this.isDrop = true
        this.setTexture('KedamaHit');
        
        this.scene.tweens.add({
            targets: this,
            angle: -360, 
            duration: 700, 
            ease: 'Linear',
            repeat: -1, 
            onComplete: () => {
                this.destroy(); // Remove the object after animation
            }
        });

    }
    

    reset(){
        this.x = game.config.width
    }
    
}