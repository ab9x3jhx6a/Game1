

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();



        //add background
        var bglayer = new BackgroundLayer();
        bglayer.setGlobalZOrder(0);
        this.addChild(bglayer);

        //add gamelayer
        var gamelayer = new GameLayer();
        gamelayer.setGlobalZOrder(1);
        this.addChild(gamelayer);
    }
});

