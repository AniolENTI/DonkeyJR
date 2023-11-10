class level1 extends Phaser.Scene
{
    constructor()
    {
        super({key:'level1'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("112"); 
        this.load.setPath('assets/sprites');
        this.load.image('bg','bg_green_tile.png');
        this.load.image('puerta','spr_door_open_0.png');

        this.load.spritesheet('hero','hero.png',
        {frameWidth:32,frameHeight:32});
        this.load.spritesheet('jumper','jumper.png',
        {frameWidth:32,frameHeight:32});

        this.load.setPath('assets/tilesets');
        this.load.image('walls_tileset','tileset_walls.png');
        this.load.image('moss_tileset','tileset_moss.png');
        
        this.load.setPath('assets/sounds');
        
        this.load.setPath('assets/maps');
        this.load.tilemapTiledJSON('level1','level1.json');
    }

    create()
    { //Pinta assets en pantalla
        //Pintamos el fondo
        this.add.tileSprite(0,0,gamePrefs.level1Width,gamePrefs.level1Height,'bg')
        .setOrigin(0);

        //Pintamos el nivel
        //Cargo el JSON
        this.map = this.add.tilemap('level1');
        //Cargo los tilesets
        this.map.addTilesetImage('walls_tileset');
        this.map.addTilesetImage('moss_tileset');
        //Pinto las CAPAS/LAYERS
        this.walls = this.map.createLayer('layer_walls','walls_tileset');
        this.map.createLayer('layer_moss_up','moss_tileset');
        this.map.createLayer('layer_moss_left','moss_tileset');
        this.map.createLayer('layer_moss_right','moss_tileset');
        this.map.createLayer('layer_moss_bottom','moss_tileset');

        //Defino con qué se colisiona en la layer_walls
        //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
        //Ponemos -1, ya que phaser lo interpreta como un 0 en el json 
        this.map.setCollisionByExclusion(-1,true,true,'layer_walls'); 


        
        this.puerta = this.physics.add.sprite(65,268,'puerta');
        //this.puerta.body.allowGravity = false;
        this.puerta.body.setAllowGravity(false);
        this.puerta.body.setImmovable(true);

        //this.hero = this.physics.add.sprite(65,100,'hero');
        //this.hero = new heroPrefab(this,65,100,'hero');
        this.hero = new heroPrefab(this,65,100);

        this.loadAnimations();

        this.jumper = new jumperPrefab(this,240,304);

        

        this.cameras.main.startFollow(this.hero);
        this.cameras.main.setBounds(0,0,
            gamePrefs.level1Width,gamePrefs.level1Height);
        
        /*    
        this.physics.add.collider
        (
            this.hero,
            this.walls
        );
        */
        /*  
        this.physics.add.collider
        (
            this.puerta,
            this.walls
        );
        */  
        /*  
        this.physics.add.collider
        (
            this.hero,
            this.puerta
        );
        */

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
            frames:this.anims.generateFrameNumbers('hero', {start:2, end: 5}),
            frameRate: 10,
            repeat: -1
        }); 
        
        this.anims.create
        ({
            key:'jumper',
            frames:this.anims.generateFrameNumbers('jumper',{start:0,end:3}),
            frameRate:10,
            repeat:-1
        });
    }
    
    update()
    { //Actualiza whatever
        /*
        if(this.cursors.left.isDown)
        { //ME MUEVO A LA IZQUIERDA
            this.hero.body.setVelocityX(-gamePrefs.HERO_SPEED);
            this.hero.setFlipX(true);
            this.hero.anims.play('run',true);
        }else
        if(this.cursors.right.isDown)
        { //ME MUEVO A LA DERECHA
            this.hero.body.setVelocityX(gamePrefs.HERO_SPEED);
            this.hero.setFlipX(false);
            this.hero.anims.play('run',true);
        }else
        { //NO ME MUEVO AT ALL
            this.hero.body.setVelocityX(0);
            this.hero.anims.stop().setFrame(0);
        }    
        
        //SALTO
        if(this.cursors.space.isDown
          //&& this.hero.body.blocked.down
          && this.hero.body.onFloor()
          && Phaser.Input.Keyboard.DownDuration(this.cursors.space,250))
        {
            this.hero.body.setVelocityY(-gamePrefs.HERO_JUMP);
        }

        if(!this.hero.body.onFloor())
        {
            this.hero.anims.stop().setFrame(6);
        }
        */
    }
}