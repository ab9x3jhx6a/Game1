/**
 * Created by Shanye on 9/9/2015.
 */

var Player = cc.Sprite.extend ( {
    ctor: function() {
        this._super(res.s1moveleft_1);

        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame
        (res.s1moveleft_1, cc.rect(0,0,60,100)), "s1moveleft1");

        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame
        (res.s1moveleft_2, cc.rect(0,0,60,100)), "s1moveleft2");

        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame
        (res.s1moveleft_3, cc.rect(0,0,60,100)), "s1moveleft3");

        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame
        (res.s1moveleft_4, cc.rect(0,0,60,100)), "s1moveleft4");

        cc.eventManager.addListener(
            cc.EventListner.create ({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: this.onTouchBegan,
                onTouchBegan: this.onTouchEnded
            }), this);
        )
        return true;
    },

    onTouchBegan:function(touch, event) {
        cc.log("touch begin")
    }
})