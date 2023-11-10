class fruitPrefab extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.allowGravity = false;
        this.scene = _scene;
    }

    disableBody()
    {
        this.active = false;
        this.x = -100;
    }
    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
}