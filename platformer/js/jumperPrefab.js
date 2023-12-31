class jumperPrefab extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY,_spriteTag='jumper')
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.scene = _scene;
        this.anims.play(_spriteTag,true);
        this.direccion = 1;
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED*this.direccion);
        this.setColliders();        
    }

    setColliders()
    {
        this.scene.physics.add.overlap
        (
            this.scene.hero,
            this,
            this.hitHero,
            null,
            this
        );

        this.scene.physics.add.collider
        (
            this,
            this.scene.walls
        );
    }

    preUpdate(time,delta)
    {
        if(this.body.blocked.right ||this.body.blocked.left)
        {
            this.direccion *= -1;
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED*this.direccion);
            this.flipX = !this.flipX;
        }
        
        super.preUpdate(time, delta);
    }
}