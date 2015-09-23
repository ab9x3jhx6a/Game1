

var BackgroundLayer = cc.Layer.extend({
    _sprite: null,
    ctor:function () {
        this.scheduleUpdate();
        /*var size = cc.winSize;

        this.sprite = new cc.Sprite(res.background1_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.8
        });*/

        this._super();

        this.background = new cc.Sprite(res.background1_png);
        this.background.setAnchorPoint(cc.p(0,0));
        this.background.x = 0;
        this.background.y = 0;

        this.background1 = new cc.Sprite(res.background1_png);
        this.background1.setAnchorPoint(cc.p(0,0));
        this.background1.x = 1250;
        this.background1.y = 0;

        this.backgrounds = [];

        this.addChild(this.background);
        this.addChild(this.background1);
        this.backgrounds.push(this.background);
        this.backgrounds.push(this.background1);

        return true;
    },

    update:function(dt){
        this.MoveBackgrounds();
    },

    MoveBackgrounds:function(){
        var i;
        this.backgrounds[0].setLocalZOrder(-4);
        this.backgrounds[1].setLocalZOrder(-4);
        this.backgrounds[0].x -= 2;
        this.backgrounds[1].x -= 2;
        if(this.backgrounds[0].x < -1249){
            var n_background = new cc.Sprite(res.background1_png);
            n_background.setAnchorPoint(cc.p(0,0));
            n_background.x = 1249;
            n_background.y = 0;
            this.removeChild(this.backgrounds[0]);
            this.backgrounds.splice(0, 1);
            this.backgrounds.push(n_background);
            this.addChild(n_background);
        }
    }

});