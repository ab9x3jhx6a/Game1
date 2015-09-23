

/*var SceneOne = cc.Scene.extend({
    onEnter:function () {

        this._super();
        var Watch = new WatchLayer(this);
        this.addChild(Watch,0);
        var Player = new PlayerLayer(this);
        this.addChild(Player,0);

        this.reset = function(){
            this.removeAllChildren();
            var Watch = new WatchLayer(this);
            this.addChild(Watch,0);
            var Player = new PlayerLayer(this);
            this.addChild(Player,0);

        };

    }

});*/

var SceneTwo = cc.Scene.extend({
    onEnter:function () {
        this._super();

        //add background
        this.bglayer = new BackgroundLayer();
        this.bglayer.setGlobalZOrder(0);
        this.addChild(this.bglayer);

        //add gamelayer
        var gamelayer = new GameLayer();
        gamelayer.setGlobalZOrder(1);
        this.addChild(gamelayer);
    }
});

var SceneThree = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new HelloWorldLayer(this);
        this.addChild(layer, 0);
        this.obstacles = new ObstacleLayer(this);
        this.addChild(this.obstacles, 0);
        this.playerlayer = new PlayerLayer2(this);
        this.addChild(this.playerlayer, 1);
        this.game_over = false;

        this.game_overf = function(){
            this.game_over = true;
        };


        this.reset = function(){
            this.removeAllChildren();
            var layer = new HelloWorldLayer(this);
            this.addChild(layer, 0);
            this.obstacles = new ObstacleLayer(this);
            this.addChild(this.obstacles, 0);
            this.playerlayer = new PlayerLayer2(this);
            this.addChild(this.playerlayer, 1);
            this.game_over = false;
        };
    }
});

