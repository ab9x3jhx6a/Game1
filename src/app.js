

var GameLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        var size = cc.winSize;

        var s1background = new cc.Sprite(res.ActOne_Background_png);
        this.addChild(s1background);

        s1background.x = size.width/2;
        s1background.y = size.height/2;

       /* var joystick = new Joystick (res.JoystickBG_png, res.Joystick_png, 50, TouchType.DEFAULT, DirectionType.ALL, s1background);

        joystick.setPosition(cc.Point(100,100));
        joystick.setSpeedwithLevel1(1);
        joystick.setSpeedwithLevel2(2);

        joystick.callback = this.onCallback.bind(this);
        this.addChild(joystick,0,101);*/
    }
})