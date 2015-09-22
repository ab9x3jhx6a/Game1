/**
 * Created by Shanye on 9/20/2015.
 */

var PlayerLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this.scheduleUpdate();

        // 1. super init first
        this._super();

        // add player
        this.player = new Player();
        this.addChild(this.player);
        this.player.x = 600;
        this.player.y = 100;
        this.player.setScale(1.5);

        // add joystick
        this.joystick = new Joystick(res.JoystickBG_png, res.Joystick_png, 50, TouchType.FOLLOW, DirectionType.EIGHT, this.player);
        this.joystick.setScale(0.5);
        this.joystick.setOpacity(100);

        this.addChild(this.joystick,0,101);

        //default animatino
        this.player.runAction((this.player.rightAction));

        this.direction = true; //false == left, true == right
        this.changed = false;

        return true;
    },

    update:function (dt) {
        this.CheckDirection();
        if(this.changed) {
            this.player.stopAllActions();
            if (this.direction) {
                this.player.runAction((this.player.rightAction));
            }
            else {
                this.player.runAction((this.player.leftAction));
            }
        }
        this.CheckCollisions();
    },

    CheckDirection:function() {
        //check joystick angle
        if((this.joystick._angle >=90 && this.joystick._angle < 180) || (this.joystick._angle <= -90 && this.joystick._angle > -180)) {
            if(this.direction){
                this.direction = false;
                this.changed = true;
            }
            else{
                this.changed = false;
            }
        }
        else {
            if(!this.direction){
                this.direction = true;
                this.changed = true;
            }
            else {
                this.changed = false;
            }
        }
    },

    CheckCollisions:function() {
        var minx = 120;
        var miny = 80;
        var maxx = 680;
        var maxy = 160;
        if(this.player.x < minx){
            this.player.x = minx;
        }
        if(this.player.x > maxx){
            this.player.x = maxx;
        }
        if(this.player.y  < miny){
            this.player.y = miny;
        }
        if(this.player.y  > maxy){
            this.player.y = maxy;
        }
    }

});