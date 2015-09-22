/**
 * Created by Shanye on 9/9/2015.
 */

var Player = cc.Sprite.extend ({
    ctor: function () {

        this._super(res.s1moveleft1_png);

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveleft1_png, cc.rect(0, 0, 35, 60)), "s1moveleft1");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveleft2_png, cc.rect(0, 0, 35, 60)), "s1moveleft2");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveleft3_png, cc.rect(0, 0, 35, 60)), "s1moveleft3");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveleft4_png, cc.rect(0, 0, 35, 60)), "s1moveleft4");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveright1_png, cc.rect(0, 0, 35, 60)), "s1moveright1");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveright2_png, cc.rect(0, 0, 35, 60)), "s1moveright2");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveright3_png, cc.rect(0, 0, 35, 60)), "s1moveright3");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveright4_png, cc.rect(0, 0, 35, 60)), "s1moveright4");

        //load frames into a array
        var i,f;
            var moveleft=[];
            for (i=1; i<=4;i++){
                f = cc.spriteFrameCache.getSpriteFrame("s1moveleft"+i);
                moveleft.push(f);
            }

        var j,g;
            var moveright=[];
            for(j=1; j<=4;j++){
                g = cc.spriteFrameCache.getSpriteFrame("s1moveright"+j);
                moveright.push(g);
            }

        //create the moveleft and moveright animation
        this.clicked = false;
        var leftAnim = new cc.Animation(moveleft, 0.1);
        var rightAnim = new cc.Animation(moveright, 0.1);

        this.leftAction = new cc.RepeatForever(new cc.Animate(leftAnim));
        this.rightAction = new cc.RepeatForever(new cc.Animate(rightAnim));

        //this.runAction(this.rightAction);

        return true;
    }

});
