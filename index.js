var canvas = document.getElementById("content");
var context = canvas.getContext("2d");
canvas.width =1000|| document.documentElement.clientWidth;
canvas.height = 500|| document.documentElement.clientHeight;
var color = ["255,255,255","163,227,183","215,101,153","246,236,186","247,166,141","212,88,107",
               "251,164,159","57,189,222","207,224,233"];
var huaCount = 50;
var hua;
var start = {
    x: 1000/2,
    y: 500
};
var end = {
    x: 100,
    y: 100
};

var count =20;
function line(thisColor){
    var thisColor = thisColor||color[Math.floor(Math.random()*color.length)];
    context.clearRect(0,0,1000,500);
    context.beginPath();
    context.strokeStyle = "rgb("+thisColor+")";
    context.moveTo(start.x + (end.x-start.x)/count, start.y + (end.y-start.y)/count);//将画笔移到x0,y0处
    context.lineTo((end.x-start.x)/count/1.2+start.x, (end.y-start.y)/count/1.2+start.y);//从x0,y0到x1,y1画一条线
    context.stroke();
    if(count>0){
        setTimeout(function(){
            count--;
            line(thisColor);
        },50);
    }
    else{
        hua = inithua();
        zhanfang(thisColor,1);
    }
}

//var opacity=1;
function inithua(){
    hua=[];
    for(var i=0;i<huaCount;i++){
        hua[i]={
            x:Math.random()*200-100+end.x,
            y:Math.random()*200-100+end.y
        };
    }
    return hua;
}

function zhanfang(thisColor, opacity){

    context.clearRect(0,0,1000,500);

    for(var i=0;i<huaCount;i++){
        context.beginPath();
        context.strokeStyle = "rgba("+thisColor+","+opacity+")";
        context.moveTo(end.x + (hua[i].x-end.x)*(1-opacity), end.y + (hua[i].y-end.y)*(1-opacity));//将画笔移到x0,y0处
        context.lineTo((hua[i].x-end.x)*(1-opacity+0.1)+end.x, (hua[i].y-end.y)*(1-opacity+0.1)+end.y);//从x0,y0到x1,y1画一条线
        context.stroke();
    }
    if(opacity >= 0){
        setTimeout(function(){
            opacity = opacity - 0.1;
            zhanfang(thisColor, opacity);
        },100)
    }
    else{
        initEnd();
    }
}
function initEnd(){
    end.x = Math.random()*1000;
    end.y = Math.random()*500;
    count = 20;
    line();
}
line();