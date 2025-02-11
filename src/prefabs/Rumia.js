class Rumia extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        this.healthly = 3;
        this.isdefence = false;
        this.isSpecialanimePlaying = false;
        this.isHit = false;
            // add object to existing scene
        this.moveSpeed = 3.5;
        this.Speed = 3.5;
        this.isDrop = false

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(40, 55);  
        this.body.setOffset(30, 12);  
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

                // create anims rumia fly
        this.anims.create({
            key: 'rumiaDefenceStart',
            frames: [
                { key: 'rumiaDefence1' },
                { key: 'rumiaDefence2' },
                { key: 'rumiaDefence3' },
                { key: 'rumiaDefence4' },
                { key: 'rumiaDefence5' },
            ],
            frameRate: 15, // 10 frames per second
            repeat: 0 // Loop infinitely
        });

        this.anims.create({
            key: 'rumiaDefenceEnd',
            frames: [
                { key: 'rumiaDefence5' },
                { key: 'rumiaDefence4' },
                { key: 'rumiaDefence3' },
                { key: 'rumiaDefence2' },
                { key: 'rumiaDefence1' },
            ],
            frameRate: 15, // 10 frames per second
            repeat: 0 // Loop infinitely
        });

        this.play('rumiaFly'); // Play the 'rumiaFly' animation
        
        
    }
    update(){
        if(!this.isDrop){
            this.playerMoving();
        }else{
            this.y +=4
        }
        
        /*if(this.isdefence && !this.isSpecialanimePlaying){
            this.isdefence = false
            this.isSpecialanimePlaying = true;
            
        }*/
        
    }
    playerMoving(){
        // Remove obstacles when they leave the screen
        if (keyA.isDown && this.x > 32) {
            
            this.x -= this.moveSpeed
        }
        if (keyS.isDown && this.y < 480) {
            
            this.y += this.moveSpeed
        }
        
        if (keyW.isDown && this.y > 0) {
            this.y -= this.moveSpeed
        }
        if (keyD.isDown && this.x < 950) {
            this.x += this.moveSpeed
        }
        if (!keyShift.isDown) {
            this.moveSpeed = this.Speed
        }
        if (keyShift.isDown) {
            this.moveSpeed = this.Speed + 2
        }
        /*if (keyK.isDown && this.isdefence == false && this.isSpecialanimePlaying == false) {
            //code
            this.enterDefenseMode();
            
        }else if(!keyK.isDown && this.isdefence == true  && this.isSpecialanimePlaying == false){
            // 
             this.endDefenseMode();
         }*/
        
        
            // Prevent character from going outside the board
    }
    dropOff(){
        this.isDrop = true
        //this.setTexture('KedamaHit');
        
        this.scene.tweens.add({
            targets: this,
            angle: 360, 
            duration: 6500, 
            ease: 'Linear',
            repeat: -1, 
            onComplete: () => {
                this.destroy(); // Remove the object after animation
            }
        });

    }
    enterDefenseMode() {
        this.isdefence = true; // Set to defense mode
        this.anims.stop();
        this.anims.play('rumiaDefenceStart'); // Play defense start animation
        this.isSpecialanimePlaying = true 
        // After defenseStart finishes, freeze on rumiaDefence3
        this.once('animationcomplete', () => {
            this.setTexture('rumiaDefence5'); // Freeze on rumiaDefence5
            this.isSpecialanimePlaying = false; 
            //alert('aaa')
        });
    }
    
    endDefenseMode() {
        this.anims.play('rumiaDefenceEnd'); // Play defense exit animation
        this.isSpecialanimePlaying = true;
        //alert('aaa')
        this.once('animationcomplete', () => {
            this.setTexture('rumiafly1'); // Reset to normal state
            this.isSpecialanimePlaying = false;
            this.isdefence = false;
            this.play('rumiaFly');
            
        });
    }

}
