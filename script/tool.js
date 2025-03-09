import CubeCone from "./cubeCone.js";

export default class Tool {
    constructor(view) {
        this.audioInput = null;
        this.audioOutput = null;
        this.view =view;
        this.link= new CubeCone();
    }
    setMaker(marker){
        this.marker=marker;
    }
    update(){
        this.link.node.visible= false;
        this.view.update(this.marker);
        if (this.connectedTool != null ){
            if (this.connectedTool.marker.isVisible){
            this.link.node.visible= true;
            }
            else {
                this.link.node.visible= false;
            } 
            this.link.update(this.marker,this.connectedTool.marker);
        }
    }
    
    connectTo(tool) {
        
          this.connectedTool = tool;
          this.audioOutput.connect(tool.audioInput);
        
      }
    
    
}

  
  