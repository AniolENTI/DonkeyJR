class enemyPrefab extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY,_patrol,_spriteTag)
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.anims.play('enemy_blue_h',true);
        this.scene = _scene;
        this.enemy = this;
        this.direction = 1;
        this.patrol = _patrol;
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED*this.direccion);
        this.setColliders();
    }

    setColliders()
    {
        this.scene.physics.add.collider
        (
            this.scene.hero,
            this.enemy,
            this.scene.die,
            null,
            this.scene.hero
        );

        this.scene.physics.add.collider
        (
            this.enemy,
            this.scene.walls
        );
    }

    howItPatrols()
    {
        return (this.body.blocked.right ||(this.body.position.x > this.patrol))
    }

    preUpdate(time,delta)
    {
        if(this.howItPatrols())
        {
            this.direction *= -1;
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED*this.direction);
            this.flipX = !this.flipX;
        }
        
        super.preUpdate(time, delta);
    }

}  
