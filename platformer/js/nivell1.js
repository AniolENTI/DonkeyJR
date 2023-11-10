class nivell1 extends Phaser.Scene
{
    
    score = 0;

    constructor()
    {
        super({key:'nivell1'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("0000"); 
        this.load.setPath('assets/sprites');

        this.load.spritesheet('hero','spr_donkey_jr.png',
        {frameWidth:32,frameHeight:16});
        this.load.image('apple','spr_apple.png');

        this.load.setPath('assets/tilesets');
        this.load.image('tileset_platform','tileset_platform.png');
        this.load.image('tileset_ground','tileset_ground.png');
        this.load.image('tileset_vine','tileset_vine.png');
        this.load.image('tileset_water','tileset_water.png');
        
        this.load.setPath('assets/sounds');
        
        this.load.setPath('assets/maps');
        this.load.tilemapTiledJSON('nivell1','nivell1.json');

        this.load.setPath('assets/fonts');

        this.scoreText;
    }

    create()
    { //Pinta assets en pantalla
        //Pintamos el nivel
        //Cargo el JSON
        this.map = this.add.tilemap('nivell1');
        //Cargo los tilesets
        this.map.addTilesetImage('tileset_platform');
        this.map.addTilesetImage('tileset_ground');
        this.map.addTilesetImage('tileset_vine');
        this.map.addTilesetImage('tileset_water');

        //Pinto las CAPAS/LAYERS
        this.walls = this.map.createLayer('layer_platforms','tileset_platform');
        this.ground = this.map.createLayer('layer_ground','tileset_ground');
        this.vines = this.map.createLayer('layer_vines','tileset_vine');
        this.water = this.map.createLayer('layer_water','tileset_water');

        //Defino con qué se colisiona
        this.map.setCollisionByExclusion(-1,true,true,'layer_platforms'); 
        this.map.setCollisionByExclusion(-1,true,true,'layer_ground');

        this.scoreText = this.add.text(gamePrefs.gameWidth - 70, 16, 'SCORE: 0', { fontSize: '15px', fill: '#FFF' });
        this.scoreText.setFont('PressStart2P-Regular');

        this.hero = new heroPrefab(this,65,100,'hero');

        this.fruit = new fruitPrefab(this,65, 140,'apple');

        this.loadAnimations();

        this.physics.add.overlap(this.hero, this.fruit, this.addScore, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    /*
    loadSounds()
    {
        
    }
    */
    loadAnimations()
    {        
        this.anims.create(
        {
            key: 'run',
            frames:this.anims.generateFrameNumbers('hero', {start:0, end: 3}),
            frameRate: 6,
            repeat: -1
        });
    }

    addScore(hero,fruit)
    {
        fruit.disableBody();

        this.score += 100;
        this.scoreText.setText(`Score: ${this.score}`);
    }
    
    update()
    { 
        
    }
}