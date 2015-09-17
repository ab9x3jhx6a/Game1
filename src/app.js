

var GameLayer = cc.Layer.extend({
    ctor:function(){

        this._super();

        var size = cc.winSize;

        var s1background = new cc.Sprite(res.s1background);
        this.addChild(s1background);

        s1background.x = size.width/2;
        s1background.y = size.height/2;
    }
})