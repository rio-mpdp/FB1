var db,gamestate=0,playercount,game,form,player,label,greeting,textfield,button,gs=0,playerinfo
var c1,c2,c3,c4,b,p1,p2,p=[],bg
function preload(){
 c1=loadImage("basket.png")  
 c2=loadImage("basket.png")  
  b=loadImage("q.jpg")   
bg=loadImage("bg1.jpg")
}
function setup(){
createCanvas(1000,600)
db=firebase.database()
label=createElement("h1")
label.html("Fruit Basket")
label.position(400,150)
textfield=createInput("enter name")
textfield.position(400,250)
textfield.hide()
button=createButton(" press to start  ")
button.position(430,300)
button.hide()
button1=createButton("Reset")
button1.position(900,500)
button1.hide()
greeting=createElement("h1")
greeting.position(350,height/2)
greeting.hide()
db.ref("gamestate").on("value",readgs)
db.ref("playercount").on("value",readpc)

p1=createSprite(350,500)
p1.addImage(c1)
p1.scale=0.5
p2=createSprite(650,500)
p2.addImage(c2)
p2.scale=0.5
p=[p1,p2]
}
function draw(){
background(220)
if(gamestate==3){
  playercount=0
  writegs(0)
  writepc(0)
  
}
 if(gamestate==0){
if(playercount==2){

writegs(1)
}
image(bg,0,0,width,height)
 textfield.show()  
 button.show() 
 button.mousePressed(function(){
  textfield.hide()   
  button.hide()
  var name=textfield.value()
  playercount+=1
writepc()
player= new Player()
player.playernumber=playercount
player.playername=name
player.updatename()

greeting.show()
greeting.html("Welcome"+player.playernumber +":" + name)
gs=1
 }) 
 if(gs==1){
   textfield.hide()
   button.hide()
 }
 }
 else if(gamestate==1){
  button1.mousePressed(function(){
writegs(3)
var pir=db.ref("players")
pir.remove()
playercount=0

  })
     label.hide()
     greeting.hide()
     button1.show()
     
     image(b,0,0,1000,600)
     drawSprites()
     db.ref("players").on("value",function(d){
     playerinfo=d.val()  
     })
     if(player!=undefined){
     var index=0
     for(var plr in playerinfo) {
      index+=1
        textSize(20)
      fill("black")
      text(playerinfo[plr].name,p[index-1].x-25,p[index-1].y+25)
     }
     }
    /* if(keyDown("left")&&player.playernumber!=0){
      player.positionX+=50
      player.updateposition()
    }*/
 }fill(255)
textSize(30)
text(mouseX+","+mouseY,mouseX,mouseY)
}
function readgs (d) {
gamestate=d.val()    
}
function readpc(a){
    playercount=a.val()
}
function writepc (){
  db.ref("/").update({playercount:playercount}) 
}
 function writegs(g){
db.ref("/").update({gamestate:g})
 }
  
 