/**
 * Created by Shanye on 9/17/2015.
 */
var TouchType = {
    DEFAULT: "DEFAULT",
    FOLLOW: "FOLLOW"
};

var DirectionType = {
    FOUR: "FOUR",
    EIGHT: "EIGHT",
    ALL: "ALL"
};

var Joystick = cc.Node.extend({
    _stick: null,       //joystick_png
    _stickBG: null,     //joystickbg_png
    _listener: null,    //listener
    _radius: 0,         //radius
    _angle: null,       //angle
    _radian: null,      //radian
    _target: null,      //target
    _speed: 0,          //speed0
    _speed1: 1,         //speed1(halfradius)
    _speed2: 2,         //speed2(fullradius)
    _touchType: null,   //touchtype
    _directionType: null,   //direction
    _opacity: 0,        //opacity
    callback: null,
    ctor: function(stickBG, stick, radius, touchType, directionType, target)
    {
        this._super();
        this._target = target;
        this._touchType = touchType;
        this._directionType = directionType;

        //create sprite for joystick
        this._createStickSprite(stickBG, stick, radius);

        //init
        this._initTouchEvent();
    },

    _createStickSprite: function(stickBG, stick, radius)
    {
        this._radius = radius;

        if(this._touchType == TouchType.FOLLOW)
            this.setVisible(false);

        //BG for joystick
        this._stickBG = new cc.Sprite(stickBG);
        this._stickBG.setPosition(cc.p(radius, radius));
        this.addChild(this._stickBG);

        //sprite for joystick
        this._stick = new cc.Sprite(stick);
        this._stick.setPosition(cc.p(radius, radius));
        this.addChild(this._stick);

        //scale the sprites
        var scale = radius / (this._stickBG.getContentSize().width / 2);
        this._stickBG.setScale(scale);
        this._stick.setScale(scale);

        //set content size
        this.setContentSize(this._stickBG.getBoundingBox());

        //set anchor
        this.setAnchorPoint(cc.p(0.5, 0.5));
    },

    _initTouchEvent: function()
    {
        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });

        //if exist same object, removed
        this.setUserObject(this._listener);

        //add listener
        cc.eventManager.addListener(this._listener, this._stickBG);
    },

    //calculate angle and return
    _getAngle: function(point)
    {
        var pos = this._stickBG.getPosition();
        this._angle = Math.atan2(point.y-pos.y, point.x-pos.x) * (180/cc.PI);
        return this._angle;
    },

    //calculate radian and return
    _getRadian: function(point)
    {
        this._radian = cc.PI / 180 * this._getAngle(point);
        return this._radian;
    },

    //calculate distance between points and return
    _getDistance: function(pos1, pos2)
    {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) +
            Math.pow(pos1.y - pos2.y, 2));
    },

    onTouchBegan: function(touch, event)
    {
        //listener target
        var target = event.getCurrentTarget();

        //if touch type == FOLLOW, set stick position to be touch position
        if(target.getParent()._touchType == TouchType.FOLLOW)
        {
            target.getParent().setPosition(touch.getLocation());
            target.getParent().setVisible(true);
            target.getParent().scheduleUpdate();
            return true;
        }
        else
        {
            //else set position to loc
            var touchPos = target.convertToNodeSpace(touch.getLocation());

            //distance to target
            var distance = target.getParent()._getDistance(touchPos, target);

            //radius
            var radius = target.getBoundingBox().width / 2;

            //if distance smaller than radius return true
            if(radius > distance)
            {
                target.getParent()._stick.setPosition(touchPos);
                target.getParent().scheduleUpdate();
                return true;
            }
        }
        return false;
    },

    onTouchMoved: function(touch, event)
    {
        var target = event.getCurrentTarget();

        var touchPos = target.convertToNodeSpace(touch.getLocation());

        var distance = target.getParent()._getDistance(touchPos, target);

        var radius = target.getBoundingBox().width / 2;

        if(radius > distance)
        {
            target.getParent()._stick.setPosition(touchPos);
        }
        else
        {
            var x = target.getPositionX() + Math.cos(target.getParent()._getRadian(touchPos)) * target.getParent()._radius;
            var y = target.getPositionY() + Math.sin(target.getParent()._getRadian(touchPos)) * target.getParent()._radius;
            target.getParent()._stick.setPosition(cc.p(x, y));
        }

        target.getParent()._getAngle(touchPos);

        target.getParent()._setSpeed(touchPos);

        //update the callback function
        target.getParent()._updateCallback();
    },

    onTouchEnded: function(touch, event)
    {
        var target = event.getCurrentTarget();

        if(target.getParent()._touchType == TouchType.FOLLOW)
            target.getParent().setVisible(false);

        //joystick reset position
        target.getParent()._stick.setPosition(target.getPosition());

        target.getParent().unscheduleUpdate();
    },

    _setSpeed: function(point)
    {
        //get touch distance to anchor
        var distance = this._getDistance(point, this._stickBG.getPosition());

        //if distance < radius...
        if(distance < this._radius)
        {
            this._speed = this._speed1;
        }
        else
        {
            this._speed = this._speed2;
        }
    },

    _updateCallback: function()
    {
        if(this.callback && typeof(this.callback) === "function")
        {
            this.callback();
        }
    },

    //update target loc
    update: function(dt)
    {
        switch (this._directionType)
        {
            case DirectionType.FOUR:
                this._fourDirectionsMove();
                break;
            case DirectionType.EIGHT:
                this._eightDirectionsMove();
                break;
            case DirectionType.ALL:
                this._allDirectionsMove();
                break;
            default :
                break;
        }
    },

    _fourDirectionsMove: function()
    {
        if(this._angle > 45 && this._angle < 135)
        {
            this._target.y += this._speed;
        }
        else if(this._angle > -135 && this._angle < -45)
        {
            this._target.y -= this._speed;
        }
        else if(this._angle < -135 && this._angle > -180 || this._angle > 135 && this._angle < 180)
        {
            this._target.x -= this._speed;
        }
        else if(this._angle < 0 && this._angle > -45 || this._angle > 0 && this._angle < 45)
        {
            this._target.x += this._speed;
        }
    },

    _eightDirectionsMove: function()
    {
        if(this._angle > 67.5 && this._angle < 112.5)
        {
            this._target.y += this._speed;
        }
        else if(this._angle > -112.5 && this._angle < -67.5)
        {
            this._target.y -= this._speed;
        }
        else if(this._angle < -157.5 && this._angle > -180 || this._angle > 157.5 && this._angle < 180)
        {
            this._target.x -= this._speed;
        }
        else if(this._angle < 0 && this._angle > -22.5 || this._angle > 0 && this._angle < 22.5)
        {
            this._target.x += this._speed;
        }
        else if(this._angle > 112.5 && this._angle < 157.5)
        {
            this._target.x -= this._speed / 1.414;
            this._target.y += this._speed / 1.414;
        }
        else if(this._angle > 22.5 && this._angle < 67.5)
        {
            this._target.x += this._speed / 1.414;
            this._target.y += this._speed / 1.414;
        }
        else if(this._angle > -157.5 && this._angle < -112.5)
        {
            this._target.x -= this._speed / 1.414;
            this._target.y -= this._speed / 1.414;
        }
        else if(this._angle > -67.5 && this._angle < -22.5)
        {
            this._target.x += this._speed / 1.414;
            this._target.y -= this._speed / 1.414;
        }
    },

    _allDirectionsMove: function()
    {
        this._target.x += Math.cos(this._angle * (Math.PI/180)) * this._speed;
        this._target.y += Math.sin(this._angle * (Math.PI/180)) * this._speed;
    },

    setOpacity: function(opacity)
    {
        this._opacity = opacity;
        this._stick.setOpacity(opacity);
        this._stickBG.setOpacity(opacity);
    },

    //set speed1
    setSpeedwithLevel1: function(speed)
    {
        this._speed1 = speed;
    },

    //set speed2
    setSpeedwithLevel2: function(speed)
    {
        if(this._speed1 < speed)
        {
            this._speed2 = speed;
        }
        else
        {
            this._speed2 = this._speed2;
        }
    },

    //enable or disable
    setEnable: function(enable)
    {
        if(this._listener != null)
        {
            if(enable)
            {
                cc.eventManager.addListener(this._listener, this._stickBG);
            }
            else
            {
                cc.eventManager.removeListener(this._listener);
            }
        }
    },

    getAngle: function()
    {
        return this._angle;
    },

    onExit: function()
    {
        this._super();
        //??????
        if(this._listener != null)
        {
            cc.eventManager.removeListener(this._listener);
        }
    }
});