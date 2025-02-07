class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        
        //level = 0;
        
        this.startfield = this.add.tileSprite(0, 0, boardwidth, boardheigh, 'backgroundtop').setOrigin(0, 0);
        this.backgroundforest = this.add.tileSprite(0, 420, boardwidth, boardheigh, 'backgrounddown').setOrigin(0, 0);

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
       
        
        // Spawn trees at intervals
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                console.log("Spawning tree...");
                let tree1 = new Tree1(this, 1000, 500, 'tree1');
                console.log(tree1);
                this.trees.add(tree1);
            },
            callbackScope: this,
            loop: true
        });
        


        // Collision detection between Rumia and Trees
        this.physics.add.collider(this.rumia, this.trees, this.handleTreeCollision, null, this);
        this.input.enableDebug(this.rumia, 0xff00ff);


        //Text
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.Rumiahealth = this.add.text(180, 20, this.rumia.healthly, this.scoreConfig).setOrigin(0.5)
       // this.physics.add.collider(this.rumia, this.physics.world.bounds); // Collision with world bounds
   
        
        // define keys    
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.moveSpeed = 3.5;

        //this.rumia.play('rumiaFly'); // Play the 'rumiaFly' animation
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
        


        // Enter Key Pressed - Example Action (Jump or Dash)
        this.playerMoving()
    }

    getRamdon(lowerbound,upperbound){

    }
    playerMoving(){
        // Remove obstacles when they leave the screen
        if (this.keyA.isDown && this.rumia.x > 32) {
            //alert('aaa')
            this.rumia.x -= this.moveSpeed
        }
        if (this.keyS.isDown && this.rumia.y < 480) {
            this.rumia.y += this.moveSpeed
        }
        if (this.keyW.isDown && this.rumia.y > 0) {
            this.rumia.y -= this.moveSpeed
        }
        if (this.keyD.isDown && this.rumia.x < 950) {
            this.rumia.x += this.moveSpeed
        }
            // Prevent character from going outside the board
       
    }
    handleTreeCollision(rumia, tree) {
        //tree.destroy(); // Remove tree
        //alert('aaa')
        if(!rumia.isHit){
            rumia.isHit = true;
            rumia.healthly--; // Reduce health
            this.Rumiahealth.setText(rumia.healthly);
            // Change texture to "hit" texture
            rumia.setTexture('rumiaflyhit');
             // Flash effect
            this.tweens.add({
                targets: rumia,
                alpha: 0.2, // Reduce visibility
                yoyo: true, // Bring back to normal
                repeat: 8, // Flash 8 times (4 seconds total)
                duration: 250, // Each flash lasts 250ms
                onComplete: () => {
                    //rumia.setTexture('rumiafly1');
                    rumia.alpha = 1; // Reset visibility
                    rumia.isHit = false; // Make attackable again
                }
            });
        }
        rumia.isHit = true;
    }
    levelBump() {
        // increment level (ie, score)
       
    }

    
}