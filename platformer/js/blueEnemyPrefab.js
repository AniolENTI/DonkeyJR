class blueEnemyPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _patrolStartX, _patrolEndX, _spriteTag) {
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.anims.play('enemy_blue_h', true);
        this.scene = _scene;
        this.enemy = this;
        this.direction = 1;
        this.patrolStartX = _patrolStartX;
        this.patrolEndX = _patrolEndX;
        this.isClimbing = false;
        this.isAbovePlatform = false;
        this.climbDelay = 0;
        this.climbDelayMax = 1;  
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direction);
        this.flipX = !this.flipX;
        this.setColliders();
    }

    setColliders() {
        this.scene.physics.world.addCollider
        (
            this.enemy, 
            this.scene.ground, 
            this.onGroundCollision,
            null,
            this
        );
        this.platformCollider = this.scene.physics.world.addCollider
        (
            this.enemy, 
            this.scene.platforms
        );
    }

    onGroundCollision(enemy, ground) 
    {
        this.deActivate();
    }

    howItPatrols() {
        return this.x < this.patrolStartX || this.x > this.patrolEndX || this.body.blocked.left;
    }

    reset(_posX,_posY)
    {
        this.body.reset(_posX,_posY);
        this.active = true;
    }

    deActivate()
    {
        this.setActive(false);
        this.x=-200;
    }

    startClimbing() {
        if (!this.isClimbing) {
            
        this.isClimbing = true;
        this.isAbovePlatform = false;         
        this.scene.physics.world.removeCollider(this.platformCollider);
        this.setPosition(this.x, this.y + 20); 
        this.body.setAllowGravity(false);
        this.body.setVelocity(0, gamePrefs.ENEMY_CLIMB_SPEED);
        this.anims.play('enemy_blue_h', false);
        this.anims.play('enemy_blue_v', true);
        }
    }

    stopClimbing() {
        if (this.isClimbing) {
            this.isClimbing = false;            
            //this.platformCollider = this.scene.physics.add.collider(this.enemy, this.scene.platforms);
            //this.body.setAllowGravity(true);
            this.body.setVelocity(0, gamePrefs.ENEMY_CLIMB_SPEED);
        }
    }

    preUpdate(time, delta) {
        
        if (this.isClimbing) {
            const isAboveVine = this.scene.vines.getTileAtWorldXY(this.x, this.y + this.height);
            if (isAboveVine) {
                const vineTile = this.scene.vines.getTileAtWorldXY(this.x, this.y + this.height);
                if (vineTile) {
                    const vineWorldPos = this.scene.vines.tileToWorldXY(vineTile.x, vineTile.y);
                    this.x = vineWorldPos.x + this.width / 2;
                }
            } else {
                this.stopClimbing();
            }
        } else {
            const isAboveVine = this.scene.vines.getTileAtWorldXY(this.x, this.y + this.height);
            const isAbovePlatform = this.scene.platforms.getTileAtWorldXY(this.x, this.y + this.height);
    
            if (this.howItPatrols()) {
                this.direction *= -1;
                this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direction);
                this.flipX = !this.flipX;
            }
    
            if (this.climbDelay <= 0) {
                if (isAboveVine && Phaser.Math.Between(0, 100) < 5) {
                    this.startClimbing();
                } else if (isAbovePlatform && this.isAbovePlatform) {
                    
                    this.isAbovePlatform = false;
                    this.body.setVelocityY(gamePrefs.ENEMY_CLIMB_SPEED);
                }   
                
                this.climbDelay = this.climbDelayMax;
            } else {                
                this.climbDelay -= 1;
            }
        }
    
        super.preUpdate(time, delta);
    }
    
    
    
}
