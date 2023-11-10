var gamePrefs=
{
    gameWidth:960,
    gameHeight:540,
    level1Width:1280, //40*32
    level1Height:800, //25+32
    HERO_SPEED:200,
    HERO_JUMP:450,
    HERO_GRAVITY:1000,
    ENEMY_SPEED: 100
}

var config = 
{
    type: Phaser.AUTO,
    width: gamePrefs.gameWidth,
    height: gamePrefs.gameHeight,
    scene:[level1], //array con las escenas
    render:
    {
        pixelArt:true
    },
    scale:
    {
        mode:Phaser.Scale.FIT,
        width:gamePrefs.gameWidth/2,
        height:gamePrefs.gameHeight/2,
        autoCenter:Phaser.Scale.CENTER_BOTH
    }
    ,
    physics:
    {
        default:'arcade',
        arcade:
        {
            gravity:{y:gamePrefs.HERO_GRAVITY},
            debug:true
        }
    },
    fps:
    {
        target:60,
        forceSetTimeOut:true
    }
};

var juego = new Phaser.Game(config);