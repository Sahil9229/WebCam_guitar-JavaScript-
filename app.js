const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
  }


  navigator.getUserMedia= navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

  //select from html

  const video=document.querySelector('#video');
  const audio=document.querySelector('#audio');
 let model;


 handTrack.startVideo(video)
   .then( status=>{
    
     if(status){ 
       navigator.getUserMedia(
           { video:{}},stream => { video.srcObject=stream;    
            //run detection 
            setInterval(runDetection,100)
          
          },err=>console.log(err)
           
           ); }
   }

   );

function runDetection(){
  model.detect(video).then(predictions=>{
   if(predictions.length !=0){
     let hand1=predictions[0].bbox;
     let x=hand1[0];
     let y=hand1[1];
     //console.log(x);
      if(y<300)
        if(x>400)
         audio.src='amin-bar.wav';
        else if(x>320)
          audio.src='g-full.wav';
        else if(x>250)
          audio.src='f-3strs.wav';
        else if(x>160)
          audio.src='c-full.wav';
        else if(x>90)
          audio.src='e-min-full.wav';  
         else
           audio.src='d-full-ok.wav';      
      
      audio.play();

        }


   // console.log(predictions);
  }
  );


}
  

handTrack.load(modelParams)
   .then( lmodel=>{model=lmodel;} );
