

var Bullet = cc.Sprite.extend({
    ctor:function() {
        this._super(res.bullet0_png);

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.bullet0_png, cc.rect(0, 0, 26, 18)), "bullet0");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.bullet1_png, cc.rect(0, 0, 26, 18)), "bullet1");

        var i,f;
        var shoot=[];
        for (i=0; i<=1;i++){
            f = cc.spriteFrameCache.getSpriteFrame("bullet"+i);
            shoot.push(f);
        }

        var shootAni = new cc.Animation(shoot, 0.1);

        this.fly = new cc.repeatForever(new cc.Animate(shootAni));

        this.runAction(this.fly);
        return true;
    }

});
