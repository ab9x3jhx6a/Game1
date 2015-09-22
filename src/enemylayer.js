/**
 * Created by Shanye on 9/20/2015.
 */

var EnemyLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this.scheduleUpdate();

        // super init first
        this._super();

        // add enemy
        this.enemy = new Enemy();
        this.addChild(this.enemy);
        this.enemy.x = 160;
        this.enemy.y = 100;
        this.enemy.setScale(1.2);

        this.bullets = [];

        //timer for shooting
        this.gap = 0;

        return true;
    },

    update:function(dt){
        this.flybullets();

        this.gap += dt;

        var randomshoot = Math.random() * 2 + 1;//create a random timer for gap between each shot

        if(this.gap > randomshoot){
            this.ShootBullet();
            this.gap = 0;
        }

    },

    ShootBullet:function(){
        //create a new bullet
        var n_bullet = new Bullet();
        n_bullet.x = this.enemy.x+60;
        n_bullet.y = this.enemy.y+15;

        this.bullets.push(n_bullet);
        this.addChild(n_bullet);

        this.enemy.runAction((this.enemy.shootAct));
    },

    flybullets:function(){
        var i;
        for(i=0;i<this.bullets.length;i++){
            this.bullets[i].x += 2;
            if(this.bullets[i].x >= 600){
                this.removeChild(this.bullets[i]);
                this.bullets.splice(i,1);
            }
        }
    }

});