class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        
        //level = 0;
        
        this.startfield = this.add.tileSprite(0, 0, boardwidth, boardheigh, 'backgroundtop').setOrigin(0, 0);
        this.backgroundforest = this.add.tileSprite(0, 420, boardwidth, boardheigh, 'backgrounddown').setOrigin(0, 0);


        // define keys    
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        


        // Create the animation for Rumia=
        this.rumia = new Rumia(this, 50, 100, 'rumiafly1').setOrigin(0.5, 0)

    
        //var anims = this.rumia.getAnimationList();


        // Tree Group
        //this.tree1 = new Tree1(this, 1000, 220, 'tree1');
        // Initialize the tree group
        this.trees = this.physics.add.group();


        //this.rumia.setInteractive();
       // this.physics.add.collider(this.rumia, this.tree, this.hitBrick, null, this);
        //  Toggle to view the hit area
        this.FairyGroup = this.physics.add.group();
        this.time.addEvent({
            delay: 4000,
            callback: () => {
               let randomY = Phaser.Math.Between(60, boardheigh - 60);
               let fairy = new Fairy(this, 1000, randomY, 'sunflowerFairy1');
                
                this.FairyGroup.add(fairy);
                
            },
            callbackScope: this,
            loop: true
        });
        // this.physics.add.collider(this.rumia, this.physics.world.bounds); // Collision with world bounds
        this.time.addEvent({
            delay: 15000,
            callback:this.levelBump,
            callbackScope: this,
            loop: true
        });

        
        // Spawn trees at intervals
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                //console.log("Spawning tree...");
                let tree1 = new Tree1(this, 1000, 500, 'tree1');
                console.log(tree1);
                this.trees.add(tree1);
            },
            callbackScope: this,
            loop: true
        });
        
        // Group to store Kedama enemies
        this.kedamaGroup = this.physics.add.group();
        this.time.addEvent({
            delay: 3000, // 3 seconds
            callback: this.spawnKedama,
            callbackScope: this,
            loop: true
        });

        // Create a physics group for Daiyousei
        this.daiyouseiGroup = this.physics.add.group();  

        // Spawn Daiyousei every 12 seconds
        this.time.addEvent({
            delay: 12000,
            callback: () => {
                let randomY = Phaser.Math.Between(100, boardheigh - 160);
                let daiyousei = new Daiyousei(this, 1000, randomY, 'DaiyouseiScore1');
                this.daiyouseiGroup.add(daiyousei);  
            },
            callbackScope: this,
            loop: true
        });

         
        this.physics.add.collider(this.rumia, this.daiyouseiGroup, this.handleCollision, null, this);


 
        this.physics.add.collider(this.rumia, this.kedamaGroup, this.handleCollision, null, this);
 
        this.physics.add.collider(this.rumia, this.FairyGroup, this.handleCollision, null, this);

        // Collision detection between Rumia and Trees
        this.physics.add.collider(this.rumia, this.trees, this.handleCollision, null, this);


        this.input.enableDebug(this.rumia, 0xff00ff);


        //Text
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            //backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.RumiahealthText = this.add.text(50, 20, '[H]:'+this.rumia.healthly, this.scoreConfig).setOrigin(0.5)
        this.CurrentScoreText = this.add.text(50, 40, '[P]:'+ score, this.scoreConfig).setOrigin(0.5)
       
        
    }

    // create new barriers and add them to existing barrier group
    

    update() {
        this.backgroundforest.tilePositionX += 2; // Adjust speed as needed
        this.rumia.update();


        this.trees.children.iterate(tree => {
            if (tree && typeof tree.update === 'function') {
                tree.update(); // Safely update each tree
            }
        });
        

        this.kedamaGroup.children.iterate(kedama => {
            if (kedama && typeof kedama.update === 'function') {
                kedama.update(); // Safely update each tree
            }
        });

        this.FairyGroup.children.iterate(fairy => {
            if (fairy && typeof fairy.update === 'function') {
                fairy.update(); // Safely update each tree
            }
        });

        this.daiyouseiGroup.children.iterate(daiyousei => {
            if (daiyousei && typeof daiyousei.update === 'function') {
                daiyousei.update(); // Safely update each tree
            }
        });

    }

    gameOver(){
        this.scene.start('titleScene');
    }
    getAudio(require){
        if (require === 'p') {
            return this.sound.add('pickUp1'); // ✅ Return pickup sound
        } 
        else if (require === 'h') {
            let hitSounds = ['hitHurt1', 'hitHurt2', 'hitHurt3'];
            let randomSound = Phaser.Math.RND.pick(hitSounds); // ✅ Random selection
            return this.sound.add(randomSound);
        } 
        return null; // If invalid input

    }    

    spawnKedama() {
        let count = Phaser.Math.Between(2, 4); // Random number of enemies
        let positionList = [];
        for (let i = 0; i < count; i++) {
            let attempts = 10; 
            let randomY;
            do {
                randomY = Phaser.Math.Between(60, boardheigh - 60);
                attempts--;
            } while (!this.isPositionValid(randomY, positionList) && attempts > 0)
            positionList.push(randomY)
            let kedama = new Kedama(this, game.config.width, randomY, 'Kedama');
            this.kedamaGroup.add(kedama);
        }
    }
    
    isPositionValid(newY, positionList) {
        for (let y of positionList) {
            if (Math.abs(y - newY) < 50) {
                return false; // Too close to an existing enemy
            }
        }
        return true; // Valid position
    }



    handleCollision(rumia, obj) {
        //tree.destroy(); // Remove tree
        //alert('aaa')
        if(!rumia.isDrop){
            if(!obj.isEmeny){
                if(obj.isTouch == false){
                    let pickUpSound = this.getAudio('p');
                    if (pickUpSound) pickUpSound.play();
                }
                obj.behavior(rumia);
                obj.dropOff();

                this.RumiahealthText.setText('[H]:'+rumia.healthly);
                this.CurrentScoreText.setText('[P]:'+score);


            }else if(!rumia.isHit){
                rumia.isHit = true;
                rumia.healthly--; // Reduce health
                score -= 5
                rumia.setTexture('rumiaflyhit');

                let hitSound = this.getAudio('h');
                if (hitSound) hitSound.play();

                
                if(rumia.healthly < 0){
                    rumia.dropOff();
                    this.time.delayedCall(3000, () => {
                        this.gameOver();
                    }, [], this);            
                    //this.gameOver();
                }

                this.RumiahealthText.setText('[H]:'+rumia.healthly);
                this.CurrentScoreText.setText('[P]:'+score);
                // Change texture to "hit" texture
                rumia.anims.stop(); 
                
                // Flash effect
                obj.dropOff()
                this.tweens.add({
                    targets: rumia,
                    alpha: 0.2, // Reduce visibility
                    yoyo: true, // Bring back to normal
                    repeat: 6, // Flash 8 times (3 seconds total)
                    duration: 250, // Each flash lasts 250ms
                    onComplete: () => {
                        rumia.setTexture('rumiafly1');
                        rumia.play('rumiaFly');
                        rumia.alpha = 1; // Reset visibility
                        rumia.isHit = false; // Make attackable again
                    }
                });
            }

        }
        
        //rumia.isHit = true;
    }
    levelBump() {
        // increment level (ie, score)
        emenySpeed = emenySpeed + 0.5;
    }

    
}