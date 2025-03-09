import G from "./global.js";



export default class ToolManager {

    constructor() {
        this.allTools={}; 
      }

    addTool(id,tool){
        G.markerManager.addMarker(id);
        tool.setMaker(G.markerManager.all[id])
        this.allTools[id]=tool;
        
    }
    update(){
        let i=0;
        for (let tool of Object.entries(this.allTools)) {
            tool[1].update();
            
          }
    }
  }
  