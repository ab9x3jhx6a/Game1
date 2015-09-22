

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

        this.backgrounds = [];

        this.addChild(this.background);
        this.backgrounds.push(this.background);

        return true;
    },

    update:function(dt){
        this.MoveBackgrounds();


    },

    MoveBackgrounds:function(){
        var i;
        for(i=0;i<this.backgrounds.length;i++){
            this.backgrounds[i].setLocalZOrder(-4);
            this.backgrounds[i].x -= 2;
            if(this.backgrounds[i].x < -900){
                var n_background = new cc.Sprite(res.background1_png);
                n_background.setAnchorPoint(cc.p(0,0));
                n_background.x = 300;
                n_background.y = 0;
                this.removeChild(this.backgrounds[i]);
                this.backgrounds.splice(i, 1);
                this.backgrounds.push(n_background);
                this.addChild(n_background);
            }
        }
    }

});