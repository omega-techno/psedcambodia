
var ProgressBar=Class.create();
ProgressBar.prototype={
initialize:function(){
this.container=document.createElement('div');
this.progress=document.createElement('div');


this.container.addClassName('progressBar');
this.progress.addClassName('progress');
this.container.appendChild(this.progress);
},

update:function(percentage){
if(parseFloat(this.progress.getStyle('width'))<percentage*100){
this.progress.setStyle({width:(percentage*100)+'%'});
}
}
}

var VRGallery=Class.create();
Object.extend(VRGallery.prototype,Event.Publisher);
Object.extend(VRGallery.prototype,{
lastX:null,
lastY:null,
thisX:0,
thisY:0,
velocityX:0,
velocityY:0,

mouseDown:false,
loaded:false,
animating:false,

images:[],

initialize:function(options){
this.__VRGallery_initialize(options);
},

__VRGallery_initialize:function(options){

this.baseName=options.baseName
this.extension=options.extension||'png';
this.initialVelocityX=options.initialVelocityX||0;
this.initialVelocityY=options.initialVelocityY||0;
this.residualVelocityX=options.residualVelocityX||0;
this.residualVelocityY=options.residualVelocityY||0;
this.imagesPerRow=options.imagesPerRow
this.skipFrames=options.skipFrames||0;
this.skipRows=options.skipRows||0;
this.startImage=options.startImage;
this.totalImages=options.totalImages;
this.container=$(options.container||'vr_gallery');
this.captureClick=typeof(options.captureClick)=='undefined'?true:options.captureClick;
this.friction=options.friction||1;


this.container.addClassName('vr_gallery');


this.container.addClassName('loading');
this.container.innerHTML+='<div class="loading">Loading...</div>';

this.progressBar=new ProgressBar();
this.container.appendChild(this.progressBar.container);
this.loadImagesArray();
this.preloadRow(0);
},

dragStart:function(evt){
Event.stop(evt);
this.initialVelocityX=0;
this.initialVelocityY=0;
this.mouseDown=true;
this.container.addClassName('drag');
},

dragStop:function(evt){
Event.stop(evt);
this.mouseDown=false;
this.lastX=null;
this.lastY=null;
this.container.removeClassName('drag');
},

loadImagesArray:function(){
for(var y=0;y<this.realNumRows();y++){
var row=[];
this.images.push(row);
for(var x=0;x<this.realNumCols();x++){
var img=document.createElement('img');
row.push(img);


if(x==this.realNumCols()-1){
Event.observe(img,'load',this.preloadRow.bind(this,y+1));
}
}
}
},

preloadRow:function(row){
if(!this.images[row])return;
for(var i=0;i<this.realNumCols();i++)this.preload(row,i);
},

preload:function(row,col){
var imgNumber=this.getImageNumber(row,col);
var img=this.images[row][col];
img.src=this.baseName+new Number(imgNumber).toPaddedString(3)+'.'+this.extension;

Event.observe(img,'load',function(r,c){
var num=((r+1)*(c+1))/this.getTotalLoadedImages();
if(this.progressBar)this.progressBar.update(num);


if(num==1)this.onload();
}.bind(this,row,col));
img.onerror=this.onload.bind(this);
},

getImageNumber:function(row,col){
var realRow=(row+1)+this.skipRows*row;
var realCol=(col+1)+this.skipFrames*col;
return(realRow-1)*this.imagesPerRow+realCol;
},

getTotalLoadedImages:function(){
var numRows=this.realNumRows();
var numCols=this.realNumCols();
return numRows*numCols;
},

realNumRows:function(){
return Math.ceil(Math.ceil(this.totalImages/(this.skipRows+1))/this.imagesPerRow);
},

realNumCols:function(){
return Math.ceil(this.imagesPerRow/(this.skipFrames+1));
},

calculateClickVelocity:function(evt){
var x=Event.pointerX(evt);
var y=Event.pointerY(evt);


var hSplit=9;
var vSplit=9;
var wh=this.container.getDimensions();
var rW=wh.width/hSplit;
var rH=wh.height/vSplit;
var scaleX=1;
var scaleY=1;
var offset=Position.cumulativeOffset(this.container);


var splitX=1/((hSplit-1)/2);
var splitY=1/((vSplit-1)/2);

for(var rY=offset[1];rY<=offset[1]+vSplit*rH;rY+=rH){
scaleX=1;
for(var rX=offset[0];rX<=offset[0]+hSplit*rW;rX+=rW){
if(this.inRect(x,y,rX,rY,rW,rH)){
if(Math.abs(scaleX)<=0.25&&Math.abs(scaleY)<=0.25){
this.velocityX=0;
this.velocityY=0;
}
else{

if(Math.abs(scaleX)>=0.25){

if(Math.abs(scaleY)>=0.25&&Math.abs(scaleX)<=0.5){
scaleX=0;
}
else{
scaleY=0;
}
}

this.velocityX+=scaleX;
this.velocityY+=scaleY;
}
break;
}
scaleX-=splitX;
}
scaleY-=splitY;
}


this.animate();
},

inRect:function(x,y,rX,rY,rW,rH){
return x>=rX&&x<=rX+rW&&y>=rY&&y<=rY+rH;
},

calculateVelocity:function(evt){
if(!this.mouseDown)return;
var x=Event.pointerX(evt);
var y=Event.pointerY(evt);
if(this.lastX!=null&&this.lastY!=null){
var percentOfTotal=this.totalImages/this.getTotalLoadedImages();
this.velocityX=(this.lastX-x)/(percentOfTotal*0.5*this.realNumCols());
this.velocityY=(this.lastY-y)/(percentOfTotal*0.5*this.realNumRows());
}
this.lastX=x;
this.lastY=y;


this.animate();
},

onload:function(){
if(this.loaded)return;
this.container.removeClassName('loading');
this.container.innerHTML='';
delete this.progressBar;

if(this.startImage){
this.thisX=this.startImage[0];
this.thisY=this.startImage[1];
}
else{
this.thisY=Math.floor(this.images.length/2);
this.thisX=Math.floor(this.images[this.thisY].length/2);
}

this.draw(this.thisY,this.thisX);
this.loaded=true;


this.clickFrame=document.createElement('div');
this.clickFrame.setStyle({width:'100%',height:'100%'});
this.clickFrame.addClassName('clickFrame');
this.container.appendChild(this.clickFrame);

Event.observe(this.clickFrame,'mousedown',this.dragStart.bindAsEventListener(this));
Event.observe(this.clickFrame,'mouseup',this.dragStop.bindAsEventListener(this));
Event.observe(this.clickFrame,'mousemove',this.calculateVelocity.bindAsEventListener(this));
if(this.captureClick){
Event.observe(this.clickFrame,'click',this.calculateClickVelocity.bindAsEventListener(this));
}

this.dispatchEvent('load',this);


this.animate();
},

animate:function(force){
if(!this.loaded)return;

if(this.animating&&!force)return;
this.animating=true;


if(this.velocityX==0&&this.velocityY==0&&
this.initialVelocityX==0&&this.initialVelocityY==0&&
this.residualVelocityX==0&&this.residualVelocityY==0){
this.animating=false;
return;
}

this.thisX+=this.velocityX+this.initialVelocityX+this.residualVelocityX;
this.thisY+=this.velocityY+this.initialVelocityY+this.residualVelocityY;
this.velocityX/=this.friction;
this.velocityY/=this.friction;
if(this.mouseDown){
this.velocityX/=3;
this.velocityY/=3;
}
if(Math.abs(this.velocityX)<0.01)this.velocityX=0;
if(Math.abs(this.velocityY)<0.01)this.velocityY=0;
try{
if(this.thisY<0){
this.container.addClassName('top');
this.thisY=0;
}
else if(this.thisY>=this.images.length-1){
this.container.addClassName('bottom');
this.thisY=this.images.length-1;
}
else{
this.container.removeClassName('top');
this.container.removeClassName('bottom');
}

if(this.thisX<0)this.thisX=this.images[Math.floor(this.thisY)].length-1;
this.thisX=this.thisX%(this.imagesPerRow/(this.skipFrames+1));
this.draw(this.thisY,this.thisX);
}
catch(e){}

setTimeout(function(){this.animate(true);}.bind(this),10);
},

draw:function(row,col){
this.container.setStyle({'background-image':'url("'+this.images[Math.floor(row)][Math.floor(col)].src+'")'});
}
});
