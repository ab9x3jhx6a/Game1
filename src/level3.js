var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function (mommy) {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        this.size = cc.winSize;

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.level3_png);
        this.sprite.attr({
            x: this.size.width / 2,
            y: this.size.height / 2,
            scale: 0.2
        });
        this.addChild(this.sprite, 0);

        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    var label = event.getCurrentTarget();
                    if (key == cc.KEY.enter && mommy.game_over == true){
                        mommy.reset();
                    }
                }
            }, this);
        }

        cc.audioEngine.playMusic(res.level3_sound, true);

        var longone = cc.callFunc(spawnbuilding, this, 0);
        var largeone = cc.callFunc(spawnbuilding, this, 1);
        var smallone = cc.callFunc(spawnbuilding, this, 2);
        var cloudone = cc.callFunc(spawnbuilding, this, 3);
        var cloudtwo = cc.callFunc(spawnbuilding, this, 4);

        function spawnbuilding (spawner, type) {
            var newbuilding = new Building(type);
            spawner.addChild(newbuilding, 1);
        }

        this.BUILDINGS = cc.Sequence.create(cc.delayTime(1.5),longone, cc.delayTime(1.8), largeone, cc.delayTime(1.3), smallone);

        this.CLOUDS = cc.Sequence.create(cc.delayTime(1), cloudone, cc.delayTime(6), cloudtwo, cc.delayTime(4), cloudtwo,
                                         cc.delayTime(4), cloudone, cc.delayTime(2), cloudtwo, cc.delayTime(6.2), cloudone);

        this.runAction(cc.repeatForever(this.BUILDINGS));
        this.runAction(cc.repeatForever(this.CLOUDS));

        return true;
    }
});

var ObstacleLayer = cc.Layer.extend({
    sprite:null,
    ctor:function (mommy) {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.size = cc.winSize;

        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    var label = event.getCurrentTarget();
                    if (key == cc.KEY.space) {
                        var newbox = new Obstacle(mommy, 0);
                        label.addChild(newbox,0);
                    }
                    if(key == cc.KEY.backslash){
                        var newbox = new Obstacle(mommy, 1);
                        label.addChild(newbox,0);
                    }
                    if(key == cc.KEY.comma){
                        var newbox = new Obstacle(mommy, 2);
                        label.addChild(newbox,0);
                    }
                }
            }, this);
        }

        this.leftblock = new cc.Sprite(res.blockout_png);
        this.leftblock.attr({
            x: this.size.width / 2 - 652,
            y: this.size.height / 2,
            scale: 0.2
        });
        this.addChild(this.leftblock, 5);

        this.rightblock = new cc.Sprite(res.blockout_png);
        this.rightblock.attr({
            x: this.size.width / 2 + 652,
            y: this.size.height / 2,
            scale: 0.2
        });
        this.addChild(this.rightblock, 5);

        this.checkforwinner = function(){
            mommy.playerlayer.player.checkforwin();
        };

        var singlejump = new cc.callFunc(spawnbox, this, 0);
        var singlecrouch = new cc.callFunc(spawnbox, this, 1);
        var doublejump = new cc.Sequence(cc.callFunc(spawnbox, this, 0), cc.delayTime(0.3), cc.callFunc(spawnbox, this, 0));
        var doublecrouch = new cc.Sequence(cc.callFunc(spawnbox, this, 1), cc.delayTime(0.5), cc.callFunc(spawnbox, this, 1));
        var jumpcrouch = new cc.Sequence(cc.callFunc(spawnbox, this, 0), cc.delayTime(1.3), cc.callFunc(spawnbox, this, 1));
        var crouchjump = new cc.Sequence(cc.callFunc(spawnbox, this, 0), cc.delayTime(1.3), cc.callFunc(spawnbox, this, 1));
        var triplejump = new cc.Sequence(cc.callFunc(spawnbox, this, 0), cc.delayTime(0.2), cc.callFunc(spawnbox, this, 0), cc.delayTime(0.2), cc.callFunc(spawnbox, this, 0));
        var singleboth = new cc.callFunc(spawnbox, this, 2);
        var bothjump = new cc.Sequence(cc.callFunc(spawnbox, this, 2), cc.delayTime(0.3), cc.callFunc(spawnbox, this, 0));
        var jumpboth = new cc.Sequence(cc.callFunc(spawnbox, this, 0), cc.delayTime(0.3), cc.callFunc(spawnbox, this, 2));
        var crouchboth = new cc.Sequence(cc.callFunc(spawnbox, this, 1), cc.delayTime(0.3), cc.callFunc(spawnbox, this, 2));
        var bothcrouch = new cc.Sequence(cc.callFunc(spawnbox, this, 2), cc.delayTime(0.3), cc.callFunc(spawnbox, this, 1));
        var tripleboth = new cc.Sequence(cc.callFunc(spawnbox, this, 2), cc.delayTime(0.2), cc.callFunc(spawnbox, this, 2), cc.delayTime(0.2), cc.callFunc(spawnbox, this, 2));



        this.BOXES = cc.Sequence.create(cc.delayTime(2), singlejump, cc.delayTime(2.3) ,singlecrouch, cc.delayTime(2), doublejump,
                                        cc.delayTime(3.6), doublecrouch, cc.delayTime(2.2), jumpcrouch, cc.delayTime(2.5), crouchjump,
                                        cc.delayTime(2), triplejump, cc.delayTime(2.1), singleboth, cc.delayTime(2.4), bothjump,
                                        cc.delayTime(2.5), jumpboth, cc.delayTime(2.8), crouchboth, cc.delayTime(3.2), bothcrouch,
                                        cc.delayTime(2.1), tripleboth, cc.delayTime(2),doublejump, cc.delayTime(2),crouchjump,
                                        cc.delayTime(2),bothcrouch, cc.delayTime(2),triplejump, cc.delayTime(2),jumpboth,
                                        cc.delayTime(2),singlejump, cc.delayTime(2),doublecrouch, cc.delayTime(2),singleboth,
                                        cc.delayTime(2),doublejump, cc.delayTime(2.5),crouchboth, cc.delayTime(2),singlecrouch,
                                        cc.delayTime(2),triplejump, cc.delayTime(1.7),doublecrouch, cc.delayTime(2),jumpboth,
                                        cc.delayTime(2),jumpboth, cc.delayTime(2.3),tripleboth, cc.delayTime(2),triplejump,
                                        cc.delayTime(5), cc.callFunc(this.checkforwinner));

        function spawnbox (spawner, type){
            var newbox = new Obstacle(mommy, type);
            spawner.addChild(newbox,0);
        }

        this.runAction(this.BOXES);

        return true;
    }
});

var PlayerLayer2 = cc.Layer.extend({
    sprite:null,
    ctor:function(mommy){
        this._super();
        this.player = new PlayerLayer(mommy);
        this.addChild(this.player, 0);
    }
});


