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
        this.isClimbing = false;
        this.hero.body.setSize(16,16);
    }

    setColliders()
    {
        this.scene.physics.add.collider
        (
            this.hero,
            this.scene.platforms            
        );
        this.scene.physics.add.collider
        (
            this.hero,
            this.scene.ground            
        );
        this.scene.physics.add.collider
        (
            this.hero,
            this.scene.ground
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
          && Phaser.Input.Keyboard.DownDuration(this.cursors.space,250)
          && !this.isClimbing)
        {
            this.hero.body.setVelocityY(-gamePrefs.HERO_JUMP);
        }

        if(!this.hero.body.onFloor()
            && !this.isClimbing)
        {
            this.hero.anims.stop().setFrame(4);
        }

        super.preUpdate(time, delta);

        if(this.cursors.up.isDown
            && this.hero.isClimbing)
        {
            this.hero.body.setVelocityY(-gamePrefs.HERO_CLIMB)
            this.hero.anims.play('climb', true);
        }

        if(this.cursors.down.isDown
            && this.hero.isClimbing)
        {
            this.hero.body.setVelocityY(gamePrefs.HERO_CLIMB)
            this.hero.anims.play('climb', true);
        }
    }

    climb()
    {
        this.isClimbing = true;
    }

    unClimb()
    {
        this.isClimbing = false;
    }
}