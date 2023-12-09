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
        this.load.spritesheet('red','spr_enemy_red.png',
        {frameWidth:16,frameHeight:16});
        this.load.image('apple','spr_apple.png');
        this.load.spritesheet('donkey','spr_donkey_sr.png',
        {frameWidth:48,frameHeight:32});
        this.load.spritesheet('mario','spr_mario.png',
        {frameWidth:16,frameHeight:16});


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
        
        this.hero = new heroPrefab(this,18,200,'hero');
        
        this.donkey = this.physics.add.sprite(40, 48, 'donkey');
        this.donkey.body.setAllowGravity(false);
        this.donkey.body.setImmovable(true);
        
        this.mario = this.physics.add.sprite(72, 56, 'mario');
        this.mario.body.setAllowGravity(false);
        this.mario.body.setImmovable(true);
        
        this.fruit = new fruitPrefab(this,65, 140,'apple');
        
        this.loadPools();
        this.loadAnimations();
        //this.enemy = new enemyPrefab(this,100,55,100,200,'blue');

        this.donkey.anims.play('idle_dk');
        this.mario.anims.play('idle_mario');

        this.physics.add.collider(this.donkey, this.hero);
        this.physics.add.collider(this.mario, this.hero);
        this.physics.add.overlap(this.hero, this.fruit, this.addScore, null, this);


        this.cursors = this.input.keyboard.createCursorKeys();

        
        var vineTile = this.vines.getTileAtWorldXY(this.hero.x, this.hero.y);

        var rnd = Phaser.Math.Between(4,8);
        this.enemyTimer = this.time.addEvent
        (
            {
                delay: rnd * 1000, //ms
                callback: this.spawnEnemy,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );
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
                key: 'enemy_blue_v',
                frames:this.anims.generateFrameNumbers('blue', {start:2, end: 3}),
                frameRate: 10,
                repeat: -1
        });
        this.anims.create(
        {
                key: 'enemy_red_h',
                frames:this.anims.generateFrameNumbers('red', {start:0, end: 1}),
                frameRate: 10,
                repeat: -1
        });
        this.anims.create(
        {
                key: 'enemy_red_v',
                frames:this.anims.generateFrameNumbers('red', {start:2, end: 3}),
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
        this.anims.create(
            {
                key:'idle_mario',
                frames:this.anims.generateFrameNumbers('mario', {start:0, end:1}),
                frameRate: 2,
                repeat: -1
        });
    }

    loadPools()
    {
        this.blueEnemyPool = this.physics.add.group();
        this.redEnemyPool = this.physics.add.group();

    }

    spawnEnemy()
    {
        var rnd = Phaser.Math.Between(0,5);
        if(rnd < 2)
        {
            this.createBlueEnemy();
        }
        else{
            this.createRedEnemy();
        }
    }
    createBlueEnemy()
    {
        
        var _enemy = this.blueEnemyPool.getFirst(false);
        
        var posX = 100;
        var posY = 56;

        if(!_enemy)
        {
            
            _enemy = new blueEnemyPrefab(this,posX,posY,100,200,'blue');            
            //this.blueEnemyPool.add(_enemy);
        }else
        {
            _enemy.reset(posX,posY);
        }        
    }
    createRedEnemy()
    {
        
        var _enemy = this.redEnemyPool.getFirst(false);
        
        var posX = 100;
        var posY = 56;

        if(!_enemy)
        {
            
            _enemy = new redEnemyPrefab(this,posX,posY,100,200,'red');            
            //this.redEnemyPool.add(_enemy);
        }else
        {
            _enemy.reset(posX,posY);
        }        
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