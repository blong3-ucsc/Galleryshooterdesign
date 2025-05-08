class galleryShooter extends Phaser.Scene {
    constructor () {
        super("galleryScene");

        this.my = {sprite: {}};
        // , text: {}
        this.playerSpeed = 3;     
        this.bulletSpeed = 5;     
        this.fireRate = 175;
        this.nextFireTime = 0;   
        this.my.sprite.bullet = [];   
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.atlasXML("spaceShooters", "spaceReduxSprites.png", "spaceReduxSprites.xml");
        this.load.atlasXML("airplanes", "shipSprites.png", "shipSprites.xml");
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
    }

    create() {
        let my = this.my;

        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        my.sprite.player = this.add.sprite(game.config.width/2, game.config.height - 40, "airplanes", "ship3.png");
        my.sprite.player.setScale(1.5);
    }

    update(time, delta) {
        let my = this.my;

        if (this.left.isDown) {
            if (my.sprite.player.x > (my.sprite.player.displayWidth/2)) {
                my.sprite.player.x -= this.playerSpeed;
            }
        }

        if (this.right.isDown) {
            if (my.sprite.player.x < (game.config.width - (my.sprite.player.displayWidth/2))) {
                my.sprite.player.x += this.playerSpeed;
            }
        }

        if (this.space.isDown) {
            if (time > this.nextFireTime) {
                this.nextFireTime = time + this.fireRate;
                my.sprite.bullet.push(this.add.sprite(
                    my.sprite.player.x, my.sprite.player.y-(my.sprite.player.displayHeight/2), "spaceShooters", "laserBlue01.png")
                );
            }
        }

        for (let bullet of my.sprite.bullet) {
            bullet.y -= this.bulletSpeed;
        }

        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));
        }
    }