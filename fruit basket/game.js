class Game{
 constructor(){} 
 getstate(){
 /* db.ref("gamestate").on("value",function(data){
    gamestate=data.val()
  },
  function(){}) */
  var pcr=db.ref("gamestate")
  pcr.on("value",function(data){
    gamestate=data.val()
  })
 } 
 updatestate(a){
db.ref("/").update({"gamestate":a})
 }
 start(){
  if(gamestate==0){
      
  }
 }
}