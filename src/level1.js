
var count=0;
var boss_anger=0;
var papers_dropped=0;
var num=0;
var paper_speed = 2.5;
var lose_game=false;
var size = cc.winSize;


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
var WatchLayer = cc.Layer.extend({
    ctor:function(mommy){
        this._super();

        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
        cc.eventManager.addListener({
       event: cc.EventListener.KEYBOARD,
       onKeyPressed: function (key, event) {
        
           var label = event.getCurrentTarget();
           if (key == cc.KEY.enter && lose_game == true){
            lose_game=false;
            boss_anger=0;
            count=0;
               mommy.reset();
           }
       }
   }, this);
}
    }

});

var L1PlayerLayer = cc.Layer.extend({
    spriteSheet:null,
    runningAction:null,
    sprite:null,

    ctor:function () {
    this._super();

        this.wintimer = 0;

    cc.audioEngine.playMusic(res.scene1, true);


    this.desk = new cc.Sprite(res.lv1_desk_png);
        this.desk.attr({
            x: cc.winSize.width / 2,
            y:cc.winSize.height -390,
            
        });
        this.addChild(this.desk, 2);

    this.boss = cc.Sprite.create(res.bni1_png);        
    this.boss.attr({
        x: cc.winSize.width / 2,
        y: cc.winSize.height -360,
        
    });
    this.addChild(this.boss, 1);
//////////////////////////////////////////////////////////////////////////////////////
    cc.spriteFrameCache.addSpriteFrames(res.BossNormIdle_plist);
    var bniTexture = cc.textureCache.addImage(res.BossNormIdle_png),
        bniImages  = cc.SpriteBatchNode.create(bniTexture);
    this.addChild(bniImages);

    
    var animFramesBni = [];
    for (var i = 1; i < 3; i++) {
        var str = "bni" + i + ".png";
        var spriteFrameBni = cc.spriteFrameCache.getSpriteFrame(str);
        var animFrameBni = new cc.AnimationFrame();
        animFrameBni.initWithSpriteFrame(spriteFrameBni, 1, null);
        animFramesBni.push(animFrameBni);
    }
    
    var animationBni = cc.Animation.create(animFramesBni, 0.50);
    this.animateBni = cc.Animate.create(animationBni); 
//////////////////////////////////////////////////////////////////////////////////////
    cc.spriteFrameCache.addSpriteFrames(res.BossNormThrow_plist);
    var bntTexture = cc.textureCache.addImage(res.BossNormThrow_png),
        bntImages  = cc.SpriteBatchNode.create(bntTexture);
    this.addChild(bntImages);

   
    var animFramesBnt = [];
    for (var i = 1; i < 3; i++) {
        var str = "bnt" + i + ".png";
        var spriteFrameBnt = cc.spriteFrameCache.getSpriteFrame(str);
        var animFrameBnt = new cc.AnimationFrame();
        animFrameBnt.initWithSpriteFrame(spriteFrameBnt, 1, null);
        animFramesBnt.push(animFrameBnt);
    }
    
    var animationBnt = cc.Animation.create(animFramesBnt, 0.8);
     this.animateBnt = cc.Animate.create(animationBnt); 
/////////////////////////////////////////////////////////////////////////////
cc.spriteFrameCache.addSpriteFrames(res.BossAng1Idle_plist);
    var ba1iTexture = cc.textureCache.addImage(res.BossAng1Idle_png),
        ba1iImages  = cc.SpriteBatchNode.create(ba1iTexture);
    this.addChild(ba1iImages);

   
    var animFramesBa1i = [];
    for (var i = 1; i < 3; i++) {
        var str = "ba1i" + i + ".png";
        var spriteFrameBa1i = cc.spriteFrameCache.getSpriteFrame(str);
        var animFrameBa1i = new cc.AnimationFrame();
        animFrameBa1i.initWithSpriteFrame(spriteFrameBa1i, 1, null);
        animFramesBa1i.push(animFrameBa1i);
    }
    
    var animationBa1i = cc.Animation.create(animFramesBa1i, 0.5);
     this.animateBa1i = cc.Animate.create(animationBa1i); 
/////////////////////////////////////////////////////////////////////////////////
cc.spriteFrameCache.addSpriteFrames(res.BossAng1Throw_plist);
    var ba1tTexture = cc.textureCache.addImage(res.BossAng1Throw_png),
        ba1tImages  = cc.SpriteBatchNode.create(ba1tTexture);
    this.addChild(ba1tImages);

    
    var animFramesBa1t = [];
    for (var i = 1; i < 3; i++) {
        var str = "ba1t" + i + ".png";
        var spriteFrameBa1t = cc.spriteFrameCache.getSpriteFrame(str);
        var animFrameBa1t = new cc.AnimationFrame();
        animFrameBa1t.initWithSpriteFrame(spriteFrameBa1t, 1, null);
        animFramesBa1t.push(animFrameBa1t);
    }
    
    var animationBa1t = cc.Animation.create(animFramesBa1t, 0.8);
    this.animateBa1t= cc.Animate.create(animationBa1i); 
/////////////////////////////////////////////////////////////////////////////////
cc.spriteFrameCache.addSpriteFrames(res.BossAng2Idle_plist);
    var ba2iTexture = cc.textureCache.addImage(res.BossAng2Idle_png),
        ba2iImages  = cc.SpriteBatchNode.create(ba2iTexture);
    this.addChild(ba2iImages);

   
    var animFramesBa2i = [];
    for (var i = 1; i < 3; i++) {
        var str = "ba2i" + i + ".png";
        var spriteFrameBa2i = cc.spriteFrameCache.getSpriteFrame(str);
        var animFrameBa2i = new cc.AnimationFrame();
        animFrameBa2i.initWithSpriteFrame(spriteFrameBa2i, 1, null);
        animFramesBa2i.push(animFrameBa2i);
    }
    
    var animationBa2i = cc.Animation.create(animFramesBa2i, 0.5);
    this.animateBa2i = cc.Animate.create(animationBa2i); 
/////////////////////////////////////////////////////////////////////////////////
cc.spriteFrameCache.addSpriteFrames(res.BossAng2Throw_plist);
    var ba2tTexture = cc.textureCache.addImage(res.BossAng2Throw_png),
        ba2tImages  = cc.SpriteBatchNode.create(ba2tTexture);
    this.addChild(ba2tImages);

    
    var animFramesBa2t = [];
    for (var i = 1; i < 3; i++) {
        var str = "ba2t" + i + ".png";
        var spriteFrameBa2t = cc.spriteFrameCache.getSpriteFrame(str);
        var animFrameBa2t = new cc.AnimationFrame();
        animFrameBa2t.initWithSpriteFrame(spriteFrameBa2t, 1, null);
        animFramesBa2t.push(animFrameBa2t);
    }
    
    var animationBa2t = cc.Animation.create(animFramesBa2t, 0.8);
     this.animateBa2t = cc.Animate.create(animationBa2t); 
/////////////////////////////////////////////////////////////////////////////////
cc.spriteFrameCache.addSpriteFrames(res.BossAng3Idle_plist);
    var ba3iTexture = cc.textureCache.addImage(res.BossAng3Idle_png),
        ba3iImages  = cc.SpriteBatchNode.create(ba3iTexture);
    this.addChild(ba3iImages);

    
    var animFramesBa3i = [];
    for (var i = 1; i < 3; i++) {
        var str = "ba3i" + i + ".png";
        var spriteFrameBa3i = new cc.spriteFrameCache.getSpriteFrame(str);
        var animFrameBa3i = new cc.AnimationFrame();
        animFrameBa3i.initWithSpriteFrame(spriteFrameBa3i, 1, null);
        animFramesBa3i.push(animFrameBa3i);
    }
    
    var animationBa3i = new cc.Animation(animFramesBa3i, 0.5);
    this.animateBa3i = new cc.Animate.(animationBa3i);
/////////////////////////////////////////////////////////////////////////////////
cc.spriteFrameCache.addSpriteFrames(res.BossAng3Throw_plist);
    var ba3tTexture = cc.textureCache.addImage(res.BossAng3Throw_png),
        ba3tImages  = cc.SpriteBatchNode.create(ba3tTexture);
    this.addChild(ba3tImages);

   
    var animFramesBa3t = [];
    for (var i = 1; i < 3; i++) {
        var str = "ba3t" + i + ".png";
        var spriteFrameBa3t = cc.spriteFrameCache.getSpriteFrame(str);
        var animFrameBa3t = new cc.AnimationFrame();
        animFrameBa3t.initWithSpriteFrame(spriteFrameBa3t, 1, null);
        animFramesBa3t.push(animFrameBa3t);
    }
    
    var animationBa3t = cc.Animation.create(animFramesBa3t, 0.8);
    this.animateBa3t = cc.Animate.create(animationBa3t); 
/////////////////////////////////////////////////////////////////////////////////

    this.sprite = new cc.Sprite(res.lv1_background_png);
        this.sprite.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2
            
        });
        this.addChild(this.sprite, 0);

    this.bgframe = new cc.Sprite(res.frame_png);
        this.bgframe.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2
            
        });
        this.addChild(this.bgframe, 4);
   
   this.mini = cc.winSize.width/2-190;
    this.maxi = cc.winSize.width/2+190;
    this.low = cc.winSize.height/2-110;

   
    
    this.papers = [];
    for (var b=0;b<15;b++){
        
        this.paper = new cc.Sprite(res.paperFalling_png);
        this.papers.push(this.paper);      
        this.paper.attr({
            x: this.getRandomInt(this.mini,this.maxi),
            y: cc.winSize.height-200
        });

        this.addChild(this.paper, 3);

    }
   

    this.person = new cc.Sprite.(res.rest_png);
    this.person.attr({
        x: cc.winSize.width / 2,
        y: cc.winSize.height -400
        
    });
    this.addChild(this.person, 3);

    cc.spriteFrameCache.addSpriteFrames(res.left_plist);
    var leftTexture = cc.textureCache.addImage(res.left_png),
        leftImages  = new cc.SpriteBatchNode.(leftTexture);
    this.addChild(leftImages);

   
    var animFramesLeft = [];
    for (var i = 0; i < 4; i++) {
        var str = "left" + i + ".png";
        var spriteFrameLeft = cc.spriteFrameCache.getSpriteFrame(str);
        var animFrameLeft = new cc.AnimationFrame();
        animFrameLeft.initWithSpriteFrame(spriteFrameLeft, 1, null);
        animFramesLeft.push(animFrameLeft);
    }
    
    var animationLeft = cc.Animation.create(animFramesLeft, 0.08);
    var animateLeft = cc.Animate.create(animationLeft); 

    

///////////////////////////////////////////////////////////////////////////////


    cc.spriteFrameCache.addSpriteFrames(res.right_plist);
    var rightTexture = cc.textureCache.addImage(res.right_png),
        rightImages  = new cc.SpriteBatchNode(rightTexture);
    this.addChild(rightImages);

    var animFramesRight= [];
    for (var i = 0; i < 4; i++) {
        var str = "right" + i + ".png";
        var spriteFrameRight = cc.spriteFrameCache.getSpriteFrame(str);
        var animFrameRight = new cc.AnimationFrame();
        animFrameRight.initWithSpriteFrame(spriteFrameRight, 1, null);
        animFramesRight.push(animFrameRight);
    }

    var animationRight = new cc.Animation(animFramesRight, 0.08);
    var animateRight   = new cc.Animate(animationRight);


     cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                var target = event.getCurrentTarget();
                
                if (keyCode == cc.KEY.left && target.getPosition().x-15>cc.winSize.width/2-190) {
                    cc.log("left");
                    if (count==0){
                        target.runAction(
                            animateLeft
                            )
                    }
                    target.runAction(
                        target.setPosition(target.getPosition().x - 20, target.getPosition().y)
                    )
                    
                    ++count;
                    
                }
                if (keyCode == cc.KEY.right && target.getPosition().x+15<cc.winSize.width/2+190) {
                    cc.log("right");
                    if (count==0){
                        target.runAction(
                            animateRight
                            )
                    }
                    target.runAction(
                        target.setPosition(target.getPosition().x + 20, target.getPosition().y)
                    )
                     

                   ++count;
                }
            },
            
            onKeyReleased: function(keyCode,event){
                var target = event.getCurrentTarget();
                count=0;
                    target.stopAllActions()
                         
            }  

         }, this.person);

    if (papers_dropped==0){
        this.BossThrow();
    }
   this.scheduleUpdate();
   this.schedule(this.functionCallback,paper_speed);
   
        return true;
    },

ToTwo:function (){
    //cc.director.popScene();
    var level2 = new SceneTwo();
    cc.director.pushScene(new cc.TransitionFade(3,level2));
},
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
update:function(dt){
    this.CheckCollisions();
},

functionCallback:function(dt){
    this.PaperFall(dt);
},

    CheckCollisions:function(){

        var size = cc.winSize;
        
    for (var w=0;w<15;w++){
        if (cc.rectIntersectsRect(this.person.getBoundingBox(),this.papers[w].getBoundingBox())){
            cc.log("caught");
            cc.audioEngine.playEffect(res.paper_catch);
           
            this.papers[w].stopAllActions();
            this.papers[w].setPosition(this.getRandomInt(this.mini,this.maxi),cc.winSize.height-200);
           
        }
        if (this.papers[w].getPosition().y<this.low){
           
            cc.log("missed");
            this.papers[w].stopAllActions();
            this.papers[w].setPosition(this.getRandomInt(this.mini,this.maxi),cc.winSize.height-200);    
            
            ++boss_anger;
            
            if (boss_anger==4){
            lose_game=true;
            
            cc.audioEngine.stopMusic();
            cc.audioEngine.playEffect(res.fail);
            //this.pause();
            this.fail = new cc.Sprite(res.failscreen_png);
                this.fail.attr({
                    x: cc.winSize.width /2,
                    y: cc.winSize.height /2
                });
            this.addChild(this.fail, 7);
            //this.resume();
            }
            else{
            cc.audioEngine.playEffect(res.boss_anger);
            this.BossAnger();
            }
        }
    }
},

BossAnger:function(){
    if (boss_anger==0){
        this.boss.stopAllActions();
        this.boss.runAction(this.animateBni).repeatForever();
    }
    else if (boss_anger==1){
        this.boss.stopAllActions();
        this.boss.runAction(this.animateBa1i).repeatForever();
    }
    else if (boss_anger==2){
        this.boss.stopAllActions();
        this.boss.runAction(this.animateBa2i).repeatForever();
    }
    else if (boss_anger==3){
        this.boss.stopAllActions();
        this.boss.runAction(this.animateBa3i).repeatForever();
    }
},

BossThrow:function(){
    if (boss_anger==0){
        cc.audioEngine.playEffect(res.boss_anger);
        var seq0 = cc.Sequence.create(this.animateBnt,cc.Repeat.create(this.animateBni,20));
        this.boss.stopAllActions();
        this.boss.runAction(seq0);
    }
    else if (boss_anger==1){
        var seq1 = cc.Sequence.create(this.animateBa1t, cc.Repeat.create(this.animateBa1i,20));
        this.boss.stopAllActions();
        this.boss.runAction(seq1);
    }
    else if (boss_anger==2){
        var seq2 = cc.Sequence.create(this.animateBa2t,cc.Repeat.create(this.animateBa2i,20));
        this.boss.stopAllActions();
        this.boss.runAction(seq2);
    }
    else if (boss_anger==3){
        var seq3 = cc.Sequence.create(this.animateBa3t,cc.Repeat.create(this.animateBa3i,20));
        this.boss.stopAllActions();
        this.boss.runAction(seq3);
    }
},

getRandomInt:function(mini,maxi) {
    return Math.floor(Math.random() * (maxi - mini + 1)) + mini;
},

PaperFall:function(dt){
    cc.log("num: ",num);
    if (boss_anger==4){
    
    papers_dropped=0;
    num=0;
    paper_speed = 2.5;
    }
    else{
    var fall = cc.MoveTo.create(4,cc.p(this.papers[num].getPosition().x,this.papers[num].getPosition().y-550));
    this.papers[num].runAction(fall);
    cc.audioEngine.playEffect(res.paper1);
    ++papers_dropped;
    ++num;
    if(num==15){
        num=0;
    }
    cc.log("papers dropped: ",papers_dropped);
    cc.log("paper speed: ",paper_speed);
    if (papers_dropped==10){
        this.BossThrow();
        paper_speed = paper_speed-.5;
        
    }
    if (papers_dropped == 20){
        this.BossThrow();
        paper_speed = paper_speed-.5;
        
    }
    if (papers_dropped == 30){
        this.BossThrow();
        paper_speed = paper_speed-.5;
        
    }

    if(papers_dropped == 1){
        cc.audioEngine.pauseMusic();
        cc.audioEngine.playEffect(res.victory);
        this.win = new cc.Sprite(res.cutscene1_png);
        //this.win.setAnchorPoint(new cc.p(0,0));
                this.win.attr({
                    x: cc.winSize.width/2 - 100,
                    y: cc.winSize.height/2 - 100
                });
        this.win.setScale(1);
        this.addChild(this.win, 5);

        //this.getParent().pause();
        this.ToTwo();
        //this.removeAllChildrenWithCleanup();
        //this.runAction(new cc.Sequence(cc.delayTime(3), cc.callFunc(this.ToTwo)));
    }
}
}
     
});


