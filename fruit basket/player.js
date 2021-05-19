class Player{
  constructor(){
  this.playernumber=0
this.playername=""
this.position=0
  } 
  getcount(){
    /*db.ref("playercount").on("value",function(a){
    playercount=a.val()    
    })*/
    var gsr=db.ref("gamestate")
      gsr.on("value",(data)=>{
 gsr=playercount=data.val()
      })
    
    }
  updatecount(c){
db.ref("/").update({"playercount":c})

  }
  updatename(){
    db.ref("players/player"+ this.playernumber).update({"name":this.playername})
  }
  updateposition(){
    db.ref("players/player"+ this.playernumber).update({"position":this.position})
  }
}