var gamePrefs=
{
    gameWidth:256,
    gameHeight:240,
    HERO_SPEED:50,
    HERO_JUMP:150,
    HERO_CLIMB: 50,
    HERO_GRAVITY:400,
    ENEMY_SPEED: 45,
    ENEMY_CLIMB_SPEED: 35,
}

var config = 
{
    type: Phaser.AUTO,
    width: gamePrefs.gameWidth,
    height: gamePrefs.gameHeight,
    scene:[nivell1], //array con las escenas
    render:
    {
        pixelArt:true
    },
    scale:
    {
        mode:Phaser.Scale.FIT,
        width:gamePrefs.gameWidth,
        height:gamePrefs.gameHeight,
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