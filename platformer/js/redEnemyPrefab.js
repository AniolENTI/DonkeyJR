class redEnemyPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _patrolStartX, _patrolEndX, _spriteTag) {
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.anims.play('enemy_red_h', true);  
        this.scene = _scene;
        this.enemy = this;
        this.direction = 1;
        this.patrolStartX = _patrolStartX;
        this.patrolEndX = _patrolEndX;
        this.isClimbing = false;
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
      /*  this.scene.physics.add.overlap(
            this.scene.hero,
            this.enemy,
            this.onHeroCollision,
            null,
            this.scene
        );*/
    }

    onHeroCollision(hero, enemy) {
        this.scene.die();
    }

    onGroundCollision(enemy, ground) {
        this.deActivate();
    }

    howItPatrols() {
        return this.x < this.patrolStartX || this.x > this.patrolEndX || this.body.blocked.left;
    }

    reset(_posX, _posY) {
        this.body.reset(_posX, _posY);
        this.active = true;
    }

    deActivate() {
        this.setActive(false);
        this.x = -200;
    }

    startClimbing() {
        if (!this.isClimbing) {
            this.isClimbing = true;
            this.scene.physics.world.removeCollider(this.platformCollider);
            this.body.setAllowGravity(false);
            this.anims.play('enemy_red_h', false);  
            this.anims.play('enemy_red_v', true);  
        }
    }

    stopClimbing() {
        if (this.isClimbing) {
            this.isClimbing = false;
            this.body.setVelocity(0, gamePrefs.ENEMY_CLIMB_SPEED);
        }
    }

    preUpdate(time, delta) {
        if (this.isClimbing) {
            const isAboveVine = this.scene.vines.getTileAtWorldXY(this.x, this.y - 1);
            const isBelowVine = this.scene.vines.getTileAtWorldXY(this.x, this.y + this.height + 1);
    
            if (isAboveVine || isBelowVine) {
                const vineTile = isAboveVine || isBelowVine;  
    
                const vineWorldPos = this.scene.vines.tileToWorldXY(vineTile.x, vineTile.y);
                this.x = vineWorldPos.x + this.width / 2;
    
                const climbDirection = isAboveVine ? -1 : 1;
                this.body.setVelocity(0, gamePrefs.ENEMY_CLIMB_SPEED * climbDirection);
    
                if (isBelowVine) {
                    this.body.setVelocity(0, -gamePrefs.ENEMY_CLIMB_SPEED * climbDirection);
                }
            } else {
                this.stopClimbing();
            }
        } else {
            const isAboveVine = this.scene.vines.getTileAtWorldXY(this.x, this.y + this.height);
            const isBelowVine = this.scene.vines.getTileAtWorldXY(this.x, this.y - 1);
            const isAbovePlatform = this.scene.platforms.getTileAtWorldXY(this.x, this.y + this.height);
    
            if (this.howItPatrols()) {
                this.direction *= -1;
                this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direction);
                this.flipX = !this.flipX;
            }
    
            if (this.climbDelay <= 0) {
                if (isAboveVine && Phaser.Math.Between(0, 100) < 5) {
                    this.startClimbing();
                } else if (isBelowVine && Phaser.Math.Between(0, 100) < 5) {
                    this.startClimbing(true); 
                } else if (isAbovePlatform && !this.isAbovePlatform) {
                    this.isAbovePlatform = true;  
                }
    
                this.climbDelay = this.climbDelayMax;
            } else {
                this.climbDelay -= 1;
            }
        }
    
        super.preUpdate(time, delta);
    }
    
    
}