var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    s1moveleft_1: "res/S1MoveLeft/frame1.png",
        s1moveleft_2: "res/S1MoveLeft/frame2.png",
        s1moveleft_3: "res/S1MoveLeft/frame3.png",
        s1moveleft_4: "res/S1MoveLeft/frame4.png",
    s1moveright_1: "res/S1MoveRight/frame1.png",
        s1moveright_2: "res/S1MoveRight/frame2.png",
        s1moveright_3: "res/S1MoveRight/frame3.png",
        s1moveright_4: "res/S1MoveRight/frame4.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}