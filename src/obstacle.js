var Obstacle = cc.Sprite.extend({

    sprite: null,

    ctor: function (mommy, type) {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        if (type == 0) {
            this.image = new cc.Sprite(res.box_png);
            this.image.attr({
                x: size.width + 20,
                y: size.height / 3 - 10,
                scale: 1
            });
        }
        else if (type == 1){
            this.image = new cc.Sprite(res.balcony_png);
            this.image.attr({
                x: size.width + 20,
                y: size.height / 3 + 40,
                scale: 0.3
            });
            this.visual = new cc.Sprite(res.balcony_shadow_png);
            this.visual.attr({
                x: size.width + 20,
                y: size.height / 3 + 40,
                scale: 0.3
            });
        }
        else{
            this.image = new cc.Sprite(res.post_png);
            this.image.attr({
                x: size.width + 20,
                y: size.height / 3 + 30
            });
            this.visual = new cc.Sprite(res.post_shadow_png);
            this.visual.attr({
                x: size.width + 20,
                y: size.height / 3 + 30
            });
        }

        this.setTag(1);

        this.addChild(this.image, 1);
        if (type > 0){
            this.addChild(this.visual, 0);
        }

        var mover = new cc.moveBy(3.5, cc.p(-size.width - 40, 0));
        var mover2 = new cc.moveBy(3.5, cc.p(-size.width - 40, 0));

        this.movement = new cc.Sequence(mover, cc.removeSelf(true));
        this.movement2 = new cc.Sequence(mover2, cc.removeSelf(true));

        this.image.runAction(this.movement);
        if (type > 0){
            this.visual.runAction(this.movement2);
        }

        this.player = mommy.playerlayer.player.person;
        this.playerlayer = mommy.playerlayer.player;

        this.scheduleUpdate();

        return true;

    },

    update: function (dt){
        if (this.getChildrenCount() == 0){
            this.runAction(cc.removeSelf(true));
            this.playerlayer.succeeded();
        }
        if (cc.rectIntersectsRect(this.image.getBoundingBox(), this.player.getBoundingBox())) {
            this.image.runAction(cc.removeSelf(true));
            this.runAction(cc.removeSelf(true));
            this.playerlayer.oops();
            cc.audioEngine.playEffect(res.objecthit_sound, false);
        }
    }
});

