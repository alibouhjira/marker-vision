import Marker from "./marker.js";
import Recognizer from "./recognizer.js";
import Utils from "./utils.js";

// all registered markers
export default class MarkerManager {
  constructor() {
    this.all={}; // all registered markers {id1 : Marker1, id2 : Marker2, ...}. this.all[id] gives the marker 
  }
  
  // add the marker id (create a new marker in this.all)
  addMarker(id) {
    let m=new Marker(id);
    this.all[id]=m;
    return m;    
  }
    
  // update all registered markers (in this.all) from the image contained in the given canvas 
  // in : canvas = the HTML Canvas that contains the image to process
  updateFromCanvas(sourceCanvas) {
    // recognition
    let markerQuad=Recognizer.recognizeMarker(sourceCanvas); // get all recognized id markers in the image with their corresponding quad {id1 : quad1, id2 : quad2, ...}
    this.updateFromRecognized(markerQuad);             // update all registered markers from the recognized markers
    
  }
    
  // update all markers from a list of recognized quads
  // in : allRecognized = all quads {id1 : quad1, id2 : quad2, ...} 
  updateFromRecognized(allRecognized) {

    for(let marker of Object.entries(this.all)){
      if (marker[1].isVisible){
      marker[1].isVisible = false;
      }else{
              
              marker[1].isVisible = false;
              marker[1].countNoVisible++
      }

    }
    for (let i=0; i<allRecognized.length;i++){
      if (this.all[allRecognized[i].id]){ 
        this.all[allRecognized[i].id].quad = allRecognized[i].quad;
        this.all[allRecognized[i].id].isVisible = true;
        this.all[allRecognized[i].id].countNoVisible=0;

        
        let transform= Utils;
        let m1 =transform.mat4FromHomography([-0.5, -0.5, 0.5, -0.5, 0.5,0.5, -0.5,0.5],this.all[allRecognized[i].id].quad.t)
        this.all[allRecognized[i].id].pose.setFromHomography(m1);
        
    
        

        
        
        
  }
  
}

  }

  

}
