/**
 * Created by Shanye on 9/9/2015.
 */
/*
var Player = cc.Sprite.extend ({
    ctor: function () {
        this.scheduleUpdate();

        this._super(res.s1moveleft_1);

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveleft_1_png, cc.rect(0, 0, 60, 100)), "s1moveleft1");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveleft_2_png, cc.rect(0, 0, 60, 100)), "s1moveleft2");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveleft_3_png, cc.rect(0, 0, 60, 100)), "s1moveleft3");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveleft_4_png, cc.rect(0, 0, 60, 100)), "s1moveleft4");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveright_1_png, cc.rect(0, 0, 60, 100)), "s1moveright1");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveright_2_png, cc.rect(0, 0, 60, 100)), "s1moveright2");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveright_3_png, cc.rect(0, 0, 60, 100)), "s1moveright3");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.s1moveright_4_png, cc.rect(0, 0, 60, 100)), "s1moveright4");

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


        return true;
    },

});
*/