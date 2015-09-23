var Building = cc.Sprite.extend({

    sprite: null,

    ctor: function (type) {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;


        if (type == 0) {
            this.image = new cc.Sprite(res.long_building_png);
            this.image.attr({
                x: size.width + 300,
                y: size.height / 2 + 10,
                scale: 1
            });
        }
        else if (type == 1){
            this.image = new cc.Sprite(res.large_building_png);
            this.image.attr({
                x: size.width + 300,
                y: size.height / 2 + 25,
                scale: 1
            });
        }
        else if (type == 2){
            this.image = new cc.Sprite(res.small_building_png);
            this.image.attr({
                x: size.width + 300,
                y: size.height / 2 - 10,
                scale: 1
            });
        }
        else if (type == 3){
            this.image = new cc.Sprite(res.cloud1_png);
            this.image.attr({
                x: size.width + 300,
                y: size.height / 1.5,
                scale: 1
            });
        }
        else if (type == 4){
            this.image = new cc.Sprite(res.cloud2_png);
            this.image.attr({
                x: size.width + 300,
                y: size.height / 1.2,
                scale: 1
            });
        }

        this.setTag(1);

        if (type < 3) {
            this.addChild(this.image, 1);
        }
        else{
            this.addChild(this.image, 0);
        }
        var mover;


        if (type < 3) {
            mover = cc.moveBy(5.5, cc.p(-size.width - 500, 0));
        }
        else{
            mover = cc.moveBy(12, cc.p(-size.width - 500, 0));
        }

        this.movement = cc.Sequence.create(mover, cc.removeSelf(true));

        this.image.runAction(this.movement);

        return true;

    }
});