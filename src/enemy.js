/**
 * Created by Shanye on 9/20/2015.
 */


var Enemy = cc.Sprite.extend({
    ctor:function(){
        this._super(res.enemy0_png);

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.enemy0_png, cc.rect(0, 0, 100, 100)), "enemy0");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.enemy1_png, cc.rect(0, 0, 100, 100)), "enemy1");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.enemy2_png, cc.rect(0, 0, 100, 100)), "enemy2");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.enemy3_png, cc.rect(0, 0, 100, 100)), "enemy3");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.enemy4_png, cc.rect(0, 0, 100, 100)), "enemy4");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.enemy5_png, cc.rect(0, 0, 100, 100)), "enemy5");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.enemy6_png, cc.rect(0, 0, 100, 100)), "enemy6");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.enemy7_png, cc.rect(0, 0, 100, 100)), "enemy7");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.enemydie0_png, cc.rect(0, 0, 100, 100)), "enemydie0");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.enemydie1_png, cc.rect(0, 0, 100, 100)), "enemydie1");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.enemydie2_png, cc.rect(0, 0, 100, 100)), "enemydie2");

        //load frames into a array
        var i,f;
        var shoot=[];
        for (i=0; i<=7;i++){
            f = cc.spriteFrameCache.getSpriteFrame("enemy"+i);
            shoot.push(f);
        }

        var j,g;
        var die=[];
        for(j=0; j<=2;j++){
            g = cc.spriteFrameCache.getSpriteFrame("enemydie"+j);
            die.push(g);
        }

        var shootAni = new cc.Animation(shoot, 0.1);
        var dieAni = new cc.Animation(die, 0.1);

        this.shootAct = new cc.Animate(shootAni);
        this.dieAct = new cc.Animate(dieAni);

        return true;


    }

})