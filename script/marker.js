import Pose from "./pose.js";
import Quad from "./quad.js";
import Utils from "./utils.js";
export default class Marker {
  invisibleTime=60;
  constructor(id) {
    this.id=id;
    this.countNoVisible=10; // number of images since the last detection of the marker
    this.isVisible=false;  // isVisible becomes true if marker is detected in the image; becomes false when not detected during maxNoVisible images
    this.id=id;            // id of the marker
    this.quad=new Quad();  // last known quad (position of the 4 corners) in the image; Marker is the owner
    this.isVisible=false;
    this.pose= new Pose();


  }
}


 