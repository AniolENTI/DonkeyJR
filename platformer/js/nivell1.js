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
        this.load.spritesheet('blue','spr_enemy_blue.png',
        {frameWidth:16,frameHeight:16});
        this.load.image('apple','spr_apple.png');
        this.load.spritesheet('donkey','spr_donkey_sr.png',
        {frameWidth:48,frameHeight:32});


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
        this.platforms = this.map.createLayer('layer_platforms','tileset_platform');
        this.ground = this.map.createLayer('layer_ground','tileset_ground');
        this.vines = this.map.createLayer('layer_vines','tileset_vine');
        this.water = this.map.createLayer('layer_water','tileset_water');

        //Defino con qué se colisiona
        this.map.setCollisionByExclusion(-1,true,true,'layer_platforms'); 
        this.map.setCollisionByExclusion(-1,true,true,'layer_ground');

        this.scoreText = this.add.text(gamePrefs.gameWidth - 70, 16, 'SCORE: 0', { fontSize: '15px', fill: '#FFF' });
        this.scoreText.setFont('PressStart2P-Regular');

        this.enemy = new enemyPrefab(this,55,55,200,'blue');
        this.hero = new heroPrefab(this,18,200,'hero');
        this.donkey = this.physics.add.sprite(40, 48, 'donkey');
        this.donkey.body.setAllowGravity(false);
        this.donkey.body.setImmovable(true);

        this.fruit = new fruitPrefab(this,65, 140,'apple');

        this.loadAnimations();

        this.donkey.anims.play('idle_dk');

        this.physics.add.collider(this.donkey, this.hero);
        this.physics.add.overlap(this.hero, this.fruit, this.addScore, null, this);


        this.cursors = this.input.keyboard.createCursorKeys();

        
        var vineTile = this.vines.getTileAtWorldXY(this.hero.x, this.hero.y);
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
            frames:this.anims.generateFrameNumbers('hero', {start:0, end: 2}),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create(
            {
                key: 'climb',
                frames:this.anims.generateFrameNumbers('hero', {start:5, end: 6}),
                frameRate: 10,
                repeat: -1
            });
        this.anims.create(
        {
                key: 'enemy_blue_h',
                frames:this.anims.generateFrameNumbers('blue', {start:0, end: 1}),
                frameRate: 10,
                repeat: -1
        });
        this.anims.create(
            {
                key:'idle_dk',
                frames:this.anims.generateFrameNumbers('donkey', {start:0, end:2}),
                frameRate: 3,
                repeat: -1
        });
        this.anims.create(
            {
                key:'free_dk',
                frames:this.anims.generateFrameNumbers('donkey', {start:4, end:5}),
                frameRate: 5,
                repeat: -1
        });
    }

    addScore(hero,fruit)
    {
        fruit.disableBody();

        this.score += 100;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    die()
    {
        this.scene.restart();
    }
    
    update()
    { 
        if(this.hero.y >= gamePrefs.gameHeight-16)
        {
            this.die();
        }

        this.vineTile = this.vines.getTileAtWorldXY(this.hero.x, this.hero.y);
        if(this.vineTile && this.vineTile.index > 0)
        {
            this.hero.climb();
        }
        else
        {
            this.hero.unClimb();
        }
    }
}