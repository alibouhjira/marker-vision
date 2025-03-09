import MarkerManager from './markerManager.js';
import ToolManager from './toolManager.js';


export default class G {
  // GLOBALS :

  static captureSource; // the object that contains the capture element and source context (see main.js for the initialize)
  static markerManager; // the marker manager (all registered marker for application)
  static camera2D;     // camera 2D (orthographic)
  static renderer;     // THREE.js renderer
  static scene2D;      // 2D scene (THREE.js) : example : texture onto 2D quad (without 3D pose)
  static toolManager;
  static scene2D;  
  static scene3D;
  static camera3D;
  static waitLoading=0;
  static audioCtx;
  

  
  // default globals setup
  static initGlobal() {
    G.markerManager=new MarkerManager();
    G.toolManager= new ToolManager();
    G.audioCtx = new AudioContext();
  }
}
