

(function iife(){

/*
Object view that creates effect based on which key is pressed
Property 1 -> display which is a function that attaches the class "playing" to the object to create effect
Property 2 -> remove which is a function that removes the class "playing" from the object to create effect
*/

var view = {
  display: function(keyCode){
    var keyInstrumentalObject = document.querySelector(`div[data-key="${keyCode}"]`);
    keyInstrumentalObject.classList.add("playing");
  },

  remove: function(keyCode){
    var removekeyInstrumentalObject = document.querySelector(`div[data-key="${keyCode}"]`);
    removekeyInstrumentalObject.classList.remove("playing");
  },

};


/*Object audio that plays the audio based on which key is pressed
Property 1 -> playAudio which is a function that uses play() function on the object to play the audio file. Current time is set to 0 to play the audio without having to wait for the *audio to finish
*/
var audio = {

  playAudio: function(keyCode){
    var audioObj = document.querySelector(`audio[data-key="${keyCode}"]`);
    audioObj.currentTime = 0;
    audioObj.play();
  }

}


window.onload = function(){

  document.addEventListener('keydown',function (e){
    
    view.display(e.keyCode);
    audio.playAudio(e.keyCode);
  });

  document.addEventListener('keyup',function (e){
    view.remove(e.keyCode);
  }); 

}

})();