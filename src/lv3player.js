var PlayerLayer = cc.Layer.extend({

    sprite: null,

    ctor: function (mommy) {
        this._super();

        var size = cc.winSize;

        this.person = new cc.Sprite(res.run0_png);
        this.person.attr({
            x: size.width / 2,
            y: size.height / 3 + 10
        });

        this.person.scaleX *= -1;

        this.addChild(this.person, 3);

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.run0_png, cc.rect(0, 0, 21, 58)), "run0");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.run1_png, cc.rect(0, 0, 21, 58)), "run1");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.run2_png, cc.rect(0, 0, 23, 57)), "run2");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.run3_png, cc.rect(0, 0, 21, 58)), "run3");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.run4_png, cc.rect(0, 0, 21, 58)), "run4");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.run5_png, cc.rect(0, 0, 21, 58)), "run5");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.run6_png, cc.rect(0, 0, 23, 57)), "run6");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.run7_png, cc.rect(0, 0, 21, 58)), "run7");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.jump1_png, cc.rect(0, 0, 22, 52)), "jump1");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.jump2_png, cc.rect(0, 0, 23, 55)), "jump2");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.jump3_png, cc.rect(0, 0, 22, 50)), "jump3");

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame
        (res.slide_png, cc.rect(0, 0, 42, 28)), "slide");

        //load frames into a array
        var i,f;
        var runner=[];
        for (i=0; i<8;i++){
            f = cc.spriteFrameCache.getSpriteFrame("run"+i);
            runner.push(f);
        }

        var jumper=[];
        for (i=1; i<4; i++){
            f = cc.spriteFrameCache.getSpriteFrame("jump" + i);
            jumper.push(f);
        }

        //create the moveleft and moveright animation
        var runAnim = new cc.Animation(runner, 0.1);
        this.runningAction = new cc.RepeatForever(new cc.Animate(runAnim));
        this.runningAction.tag = 1;

        var jumpAnim = new cc.Animation(jumper, 0.35);
        this.jumpingAction = cc.Sequence.create(new cc.Animate(jumpAnim), cc.callFunc(resumerunning, this));

        this.person.runAction(this.runningAction);

        function resumerunning(target){
            target.stopActionByTag(1);
            target.runAction(target.getParent().runningAction);
        }

        var immune = false;
        var gothit = cc.Sequence.create(cc.callFunc(checkforgameover, this), cc.callFunc(immunity), cc.delayTime(2.4), cc.callFunc(immunity));
        var flashing = cc.Sequence.create(cc.fadeOut(0.2), cc.fadeIn(0.2),cc.fadeOut(0.2),cc.fadeIn(0.2),cc.fadeOut(0.2),cc.fadeIn(0.2),
                                          cc.fadeOut(0.2), cc.fadeIn(0.2),cc.fadeOut(0.2),cc.fadeIn(0.2),cc.fadeOut(0.2),cc.fadeIn(0.2));

        var position = 0;
        this.oops = function(){
            if (!immune) {
                this.person.runAction(cc.moveBy(1, cc.p(-20, 0)));
                this.person.runAction(flashing);
                this.person.runAction(gothit);
                position -= 1;
                cc.audioEngine.playEffect(res.pcgroan_sound, false);
            }
            successcount = 0;
        };

        function immunity(){
            immune = !immune;
        }

        function checkforgameover (obj){
            if (obj.x < (size.width / 2) - 40) {
                obj.sprite = new cc.Sprite(res.failscreen_png);
                obj.sprite.attr({
                    x: size.width / 2,
                    y: size.height / 2,
                    scale: 1.2
                });
                mommy.addChild(obj.sprite, 10);
                mommy.game_overf();
                // add the label as a child to this layer
                obj.getParent().pause();
                mommy.obstacles.pause();
                cc.audioEngine.stopMusic();
                cc.audioEngine.playEffect(res.yelling_sound, false);
                cc.audioEngine.playEffect(res.fail_sound, false);
            }
        }

        var successmove = cc.Sequence.create(cc.moveBy(1, cc.p(20,0)));

        var successcount = 0;
        this.succeeded = function(){
            successcount += 1;
            if (successcount >= 10 && position < 0){
                successcount = 0;
                this.person.runAction(successmove);
                position += 1;
            }
            if (successcount >= 10 && position == 0){
                successcount = 0;
            }
        };

        this.checkforwin = function(){
            this.sprite = new cc.Sprite(res.winscreen_png);
            this.sprite.attr({
                x: size.width / 2,
                y: size.height / 2,
                scale: 1.2
            });
            mommy.addChild(this.sprite, 10);
            // add the label as a child to this layer
            this.getParent().pause();
            mommy.obstacles.pause();
            cc.audioEngine.stopMusic();
            cc.audioEngine.playEffect(res.win_sound, false);
        };


        var jumpup = cc.moveBy(0.5, cc.p(0, 100)).easing(cc.easeOut(2));
        var jumpdown = cc.moveBy(0.5, cc.p(0, -100)).easing(cc.easeIn(2));
        var isJumping = false;

        this.jumper = cc.Sequence.create(cc.callFunc(grounded),jumpup, jumpdown, cc.callFunc(grounded));

        function grounded(){
            isJumping = !isJumping;
        }

        this.crouchdown = cc.Sequence.create(cc.moveBy(0.1,cc.p(0 ,-20)), cc.callFunc(croucher));
        this.crouchup = cc.Sequence.create(cc.moveBy(0.1,cc.p(0, 20)), cc.callFunc(croucher));
        var isCrouching = false;

        function croucher(){
            isCrouching = !isCrouching;
        }


        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    var target = event.getCurrentTarget();
                    if (key == cc.KEY.w) {
                        if (isJumping == false && isCrouching == false) {
                            target.person.stopActionByTag(1);
                            target.person.runAction(target.jumper);
                            target.person.runAction(target.jumpingAction);
                        }
                    }
                    if (key == cc.KEY.s){
                        if (isCrouching == false && isJumping == false){
                            target.person.stopActionByTag(1);
                            target.person.runAction(target.crouchdown);
                            target.person.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("slide"));
                        }
                    }
                }
            }, this);
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyReleased: function (key, event) {
                    var target = event.getCurrentTarget();
                    if (key == cc.KEY.s){
                        if (isCrouching == true){
                            target.person.runAction(target.crouchup);
                            resumerunning(target.person);
                        }
                    }
                }
            }, this);

        }

        return true;

    },

    update: function(dt){
        return true;
    }
});

