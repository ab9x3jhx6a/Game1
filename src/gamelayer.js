/**
 * Created by Shanye on 9/20/2015.
 */

var GameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this.scheduleUpdate();

        this._super();

        //sound
        cc.audioEngine.playMusic(res.scene2_ogg, true);


        // add background
        /*this.background = new cc.Sprite(res.background1_png);
        this.background.setAnchorPoint(cc.p(0,0));
        this.background.x = 0;
        this.background.y = 0;
        this.addChild(this.background);*/

        // add player
        this.player = new Player();
        this.addChild(this.player);
        this.player.setAnchorPoint(cc.p(0,0));
        this.player.x = 600;
        this.player.y = 0;
        this.player.setScale(1.5);
        this.player.setLocalZOrder(2);
        //player stats
        this.playerhealth = 50;
        this.playerscore = 0;

        // add joystick
        this.joystick = new Joystick(res.JoystickBG_png, res.Joystick_png, 50, TouchType.FOLLOW, DirectionType.EIGHT, this.player);
        this.joystick.setScale(0.5);
        this.joystick.setOpacity(100);

        this.addChild(this.joystick,0,101);

        //default animation
        this.player.runAction((this.player.rightAction));

        this.direction = true; //false == left, true == right
        this.changed = false;

        // add enemy
        this.enemy = new Enemy();
        this.addChild(this.enemy);
        this.enemy.setAnchorPoint(cc.p(0,0));
        this.enemy.x = 0;
        this.enemy.y = 0;
        this.enemy.setLocalZOrder(2);
        this.enemy.setScale(1.2);

        //objects
        this.bullets = [];
        this.objects = [];//barrels and crates

        //timers
        this.gap = 0;//timer for shooting
        this.retarget = 0;
        this.randomretarget = Math.random() * 3; //timer for enemy to retarget the player
        this.randomshoot = Math.random() * 5 + 1;//create a random timer for gap between each shot

            //desk
        this.randomdesk = (Math.random() * 10) + 3.5;
        this.deskgenerate = 0;//timer for generate desks
            //clock
        this.randomclock = Math.random() * 15 + 5;
        this.clockgenerate = 0;
            //others
        this.lightgenerate = 0;
        this.framegenerate = 0;
        this.doorgenerate = 0;

        return true;
    },

    update:function (dt) {

        //updates for player
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

        //updates for enemy
        //this.EnemyDodgeObject();
        this.flybullets();

        this.gap += dt;

        if(this.gap > this.randomshoot){
            this.randomshoot = Math.random() * 5 + 1;
            this.ShootBullet();
            this.gap = 0;
        }

        this.retarget += dt;
        if(this.retarget >= this.randomretarget){

            var i,j;
            if(this.player.y > this.enemy.y){
                var dur0 = Math.random()*(this.player.y - this.enemy.y)/10;
                for(i=0; i<dur0;i++){
                    this.enemy.y += 2;
                }
            }
            else{
                var dur1 = Math.random()*(this.enemy.y - this.player.y)/10;
                for(j=0; j<dur1; j++){
                    this.enemy.y -= 2;
                }
            }
            this.retarget = 0;
            this.randomretarget = Math.random()*3;
        }

        //update for generate objects
            //desk
        this.deskgenerate += dt;

        if(this.deskgenerate > this.randomdesk){
            this.GenerateDesk();
            this.deskgenerate = 0;
            this.randomdesk = (Math.random() * 10) + 7;
        }

            //clock
        this.clockgenerate += dt;
        if(this.clockgenerate > this.randomclock){
            this.GenerateClock();
            this.randomclock = Math.random() * 15 + 5;
            this.clockgenerate = 0;
        }

            //lights
        this.lightgenerate += dt;
        if(this.lightgenerate > 31){//31
            this.lightgenerate = 0;
            this.GenerateLight();
        }
            //doors
        this.doorgenerate += dt;
        if(this.doorgenerate > 49){//49
            this.doorgenerate = 0;
            this.GenerateDoor();
        }
            //frames
        this.framegenerate += dt;
        if(this.framegenerate > 73){//73
            this.framegenerate = 0;
            this.GenerateFrame();
        }

        this.MoveObjects();
        this.DetectObjectCollision();
    },

    GenerateLight:function(){
        var n_object = new cc.Sprite(res.light_png);
        n_object.setAnchorPoint(cc.p(0,0));
        n_object.x = 900;
        n_object.y = 310;
        n_object.setScale(0.7);
        n_object.setLocalZOrder(0);

        this.addChild(n_object);
        this.objects.push(n_object);
    },

    GenerateDoor:function(){
        var n_object = new cc.Sprite(res.door_png);
        n_object.setAnchorPoint(cc.p(0,0));
        n_object.x = 900;
        n_object.y = 145;
        n_object.setScale(0.8);
        n_object.setLocalZOrder(0);

        this.addChild(n_object);
        this.objects.push(n_object);
    },

    GenerateFrame:function(){
        var n_object = new cc.Sprite(res.goldenframe_png);
        n_object.setAnchorPoint(cc.p(0,0));
        n_object.x = 900;
        n_object.y = 215;
        n_object.setScale(0.8);
        n_object.setLocalZOrder(0);

        this.addChild(n_object);
        this.objects.push(n_object);
    },

    GenerateClock:function(){
        var n_object = new cc.Sprite(res.clock_png);
        n_object.setAnchorPoint(cc.p(0,0));
        n_object.x = 900;
        n_object.y = Math.random()*20 + 85;
        n_object.setScale(0.7);
        n_object.setLocalZOrder(1);

        this.addChild(n_object);
        this.objects.push(n_object);
    },

    GenerateDesk:function(){
        var n_object = new cc.Sprite(res.desk_png);
        n_object.setAnchorPoint(cc.p(0,0));
        n_object.x = 900;
        n_object.y = Math.random()*60;
        n_object.setScale(0.7);
        n_object.setLocalZOrder(0);

        this.addChild(n_object);
        this.objects.push(n_object);
    },

    EnemyDodgeObject:function(){
        var i;
        for(i=0; i<this.objects.length;i++){
            if(this.enemy.y+10 > this.objects[i].y && this.enemy.y < this.objects[i].y + 35){
                this.MoveEnemy();
            }
        }
    },

    MoveEnemy:function(){
        var dy = Math.random() * 20;
        if(dy>10){
            this.enemy.y += 20-dy;
        }
        else{
            this.enemy.y -= dy;
        }
    },

    MoveObjects:function() {
        var i;
        for(i=0; i<this.objects.length;i++){
            this.objects[i].x -= 2;
            if(this.objects[i].x < -200){
                this.removeChild((this.objects[i]));
                this.objects.splice(i,1);
            }
        }
    },

    DetectObjectCollision:function(){
        var i;
        for(i=0; i<this.objects.length;i++){
            //change z order first
            if(this.player.y>=this.objects[i].y + 5){
                this.objects[i].setLocalZOrder(3);
            }
            if(this.player.y<=this.objects[i].y){
                this.objects[i].setLocalZOrder(1);
            }
            //z order for enemy
            if(this.objects[i].x <= 180) {
                if (this.enemy.y >= this.objects[i].y + 5) {
                    this.objects[i].setLocalZOrder(3);
                }
                if (this.enemy.y <= this.objects[i].y) {
                    this.objects[i].setLocalZOrder(1);
                }
            }
            //collision detection x axis for player
            if(this.player.y < this.objects[i].y  + 25 && this.player.y > this.objects[i].y){
                if(this.player.x < this.objects[i].x && this.player.x + 55 > this.objects[i].x){
                    this.player.x = this.objects[i].x-45;
                }
            }
            //y axis detection makes the gameplay annoying, so i took it off.
        }
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
        var minx = 180;
        var miny = 5;
        var maxx = 700;
        var maxy = 125;
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
    },

    ShootBullet:function(){
        //create a new bullet
        var n_bullet = new Bullet();
        n_bullet.x = this.enemy.x+115;
        n_bullet.y = this.enemy.y+70;

        this.bullets.push(n_bullet);
        this.addChild(n_bullet);

        this.enemy.runAction((this.enemy.shootAct));
    },

    flybullets:function(){
        var i;
        for(i=0;i<this.bullets.length;i++){
            this.bullets[i].x += 4;
            if(this.bullets[i].x >= 900){
                this.removeChild(this.bullets[i]);
                this.bullets.splice(i,1);
            }
        }
    }

});