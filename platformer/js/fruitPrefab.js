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
        
        this.collected = false;
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

    disableBody() {
        if (!this.collected) { 
            this.collected = true; 
            this.scene.tweens.add({
                targets: this.fruit,
                y: this.fruit.y + 200,
                duration: 1500,
                ease: 'Linear',
                onComplete: () => {
                    this.scene.addScore();
                    this.fruit.setActive(false); 
                },
            });
        }
    }
    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
}