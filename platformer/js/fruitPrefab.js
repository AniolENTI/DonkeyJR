class fruitPrefab extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_fruit)
    {
        super(_scene,_fruit.posX,_fruit.posY,_fruit.spriteTag);
        _scene.add.existing(this);        
        _scene.physics.world.enable(this);
        this.fruit = this;
        this.body.allowGravity = false;
        this.scene = _scene;
        this.setColliders();
    }

    setColliders()
    {
        this.scene.physics.add.overlap
        (
            this.scene.hero,
            this.fruit,
            this.disableBody,
            null,
            this
        );
    }

    disableBody()
    {
        this.scene.addScore();
       /* this.active = false;
        this.x = -100;*/
        this.fruit.destroy();
    }
    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
}