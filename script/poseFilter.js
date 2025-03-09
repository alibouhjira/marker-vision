import G from "./global.js";
import MarkerManager from "./markerManager.js";
import Tool from "./tool.js";



export default class ToolManager {

    constructor() {
        this.allPoses= new Array[10]; 
      }

    addPose(pose){
        if (this.allPoses[9]){
            this.allPoses.shift();
            this.allPoses.push(pose);
        }
        else {
            this.allPoses.push(pose);
        }
    }


  }