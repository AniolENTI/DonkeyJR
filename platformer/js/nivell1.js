class nivell1 extends Phaser.Scene
{
    constructor()
    {
        super({key:'nivell1'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("0000"); 
        this.load.setPath('assets/sprites');

        this.load.spritesheet('hero','hero.png',
        {frameWidth:32,frameHeight:32});
        this.load.spritesheet('jumper','jumper.png',
        {frameWidth:32,frameHeight:32});

        this.load.setPath('assets/tilesets');
        this.load.image('tileset_platform','tileset_platform.png');
        this.load.image('tileset_ground','tileset_ground.png');
        this.load.image('tileset_vine','tileset_vine.png');
        this.load.image('tileset_water','tileset_water.png');
        
        this.load.setPath('assets/sounds');
        
        this.load.setPath('assets/maps');
        this.load.tilemapTiledJSON('nivell1','nivell1.json');
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

        //Defino con qué se colisiona en la layer_walls
        //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
        //Ponemos -1, ya que phaser lo interpreta como un 0 en el json 
        this.map.setCollisionByExclusion(-1,true,true,'layer_platforms'); 
        this.map.setCollisionByExclusion(-1,true,true,'layer_ground');

        this.hero = new heroPrefab(this,65,100);

        this.loadAnimations();

        this.jumper = new jumperPrefab(this,240,304);       

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
    { 

    }
}