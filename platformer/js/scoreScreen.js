class scoreScreen extends Phaser.Scene
{
    score = 0;

    constructor()
    {
        super({key:'scoreScreen'});

        
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("0000"); 
        this.load.setPath('assets/sprites');
        this.load.spritesheet('donkey','spr_donkey_sr.png',
        {frameWidth:48,frameHeight:32});

        this.load.setPath('assets/sounds');
        this.load.audio('bgm','bgm_score.wav');

        this.load.setPath('assets/fonts');
        this.load.bitmapFont('titleFont','titleFont.png','titleFont.xml'); 
        this.scoreText;
    }

    create(data)
    { 
        console.log('init', data);
        this.score = data.score;
        
        //Pinta assets en pantalla
        this.scoreText = this.add.bitmapText(gamePrefs.gameWidth/2 ,16,'titleFont',`FINAL SCORE:${this.score}`,8);
        
        this.donkey = this.physics.add.sprite(gamePrefs.gameWidth/2, gamePrefs.gameHeight/2, 'donkey');
        this.donkey.body.setAllowGravity(false);
        this.donkey.body.setImmovable(true);
        
        this.loadAnimations();
        this.loadSounds();

        this.donkey.anims.play('free_dk');
    }
    
    loadSounds()
    {
        this.bgm = this.sound.add('bgm');

        this.bgm.play();
    }
    
    loadAnimations()
    {
        this.anims.create(
            {
                key:'free_dk',
                frames:this.anims.generateFrameNumbers('donkey', {start:4, end:5}),
                frameRate: 5,
                repeat: -1
        });
    }

    endGame()
    {
        this.victorySound.play();
        this.add.tween(
            {
                targets:this.donkey,
                duration: 1000,
                x: this.donkey.x-125,
                onComplete: this.changeScene()
            }
        );
        this.mario.flipX = true;
        this.add.tween(
            {
                targets:this.mario,
                duration: 1000,
                x: this.mario.x-125
            }
        );
    }
}