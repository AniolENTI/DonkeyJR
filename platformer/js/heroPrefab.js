class heroPrefab extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY,_spriteTag)
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.scene = _scene;
        this.hero = this;
        this.setColliders();
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    setColliders()
    {
        this.scene.physics.add.collider
        (
            this.hero,
            this.scene.walls
        );
    }

    preUpdate(time,delta)
    {
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
            this.hero.anims.stop().setFrame(4);
        }

        if(this.hero.body._posY < 16)
        {
            //gamePrefs.scene.reset();
        }
        
        super.preUpdate(time, delta);
    }
}