var res = {
    //backgrounds
    S1BG_png : "res/S1BG.png",
    S2BG_png : "res/S2BG.png",
    background_png : "res/background.png",
    background1_png : "res/background1.png",

    //joystick
    Joystick_png : "res/Joystick.png",
    JoystickBG_png : "res/JoystickBG.png",

    //character sheets
    s1moveleft1_png: "res/S1MoveLeft/frame1.png",
    s1moveleft2_png: "res/S1MoveLeft/frame2.png",
    s1moveleft3_png: "res/S1MoveLeft/frame3.png",
    s1moveleft4_png: "res/S1MoveLeft/frame4.png",
    s1moveright1_png: "res/S1MoveRight/frame1.png",
    s1moveright2_png: "res/S1MoveRight/frame2.png",
    s1moveright3_png: "res/S1MoveRight/frame3.png",
    s1moveright4_png: "res/S1MoveRight/frame4.png",

    //enemy sheets
    enemy0_png : "res/Enemy/enemy0.png",
    enemy1_png : "res/Enemy/enemy1.png",
    enemy2_png : "res/Enemy/enemy2.png",
    enemy3_png : "res/Enemy/enemy3.png",
    enemy4_png : "res/Enemy/enemy4.png",
    enemy5_png : "res/Enemy/enemy5.png",
    enemy6_png : "res/Enemy/enemy6.png",
    enemy7_png : "res/Enemy/enemy7.png",

    enemydie0_png : "res/Enemy/enemydie0.png",
    enemydie1_png : "res/Enemy/enemydie1.png",
    enemydie2_png : "res/Enemy/enemydie2.png",

    //objects
    crate_png : "res/object/crate.png",
    barrel_png : "res/object/barrel.png",
    bullet0_png: "res/object/bullet0.png",
    bullet1_png: "res/object/bullet1.png",
    bulletshadow_png: "res/object/bulletshadow.png",
    light_png: "res/object/light.png",
    clock_png: "res/object/grandfatherclock.png",
    desk_png: "res/object/desk.png",
    door_png: "res/object/door.png",
    goldenframe_png: "res/object/goldenframe.png",

    //sound
    scene2_ogg : "res/sound/BGM/scene2.ogg",
    gun_wav: "res/sound/scene2/gun.wav",
    gunfire_wav: "res/sound/scene2/gunfire.wav",
    step_wav: "res/sound/scene2/step.wav"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}