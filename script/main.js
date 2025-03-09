import MarkerManager from './markerManager.js';

import CaptureSource from './captureSource.js';

import Recognizer from './recognizer.js';

import G from './global.js';
 
import * as THREE from '../lib/three/build/three.module.js';
import Image2D from './image2d.js'
import Tool from './tool.js';
import Image2DV2 from './image2DV2.js';
import ViewCube from './viewCube.js';
import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js';
import GLTF from './gltf.js';
import AudioSourceTool from './sourceAudio.js';
import AudioDestinationTool from './destinationAudio.js';
/**
 * main (loading, launch) 
 * 
 */
let cube;

const main=()=> {
  // waiting for openCV loading and stream setup
  // call function start if ok (start can be considered as the application entry point)
  G.captureSource = new CaptureSource('capture','source','video') // id capture, id source, 'fixedImage' | 'webcam' | 'video'
  G.captureSource.initializeCapture().then(start);
  
}

window.addEventListener("DOMContentLoaded",main);

// Application entry point (initialize application then mainLoop)
const start=()=> {
  initialize();
  window.requestAnimationFrame(mainLoop);
}

// initialize all data (global and specific for a given demonstration)
const initialize=()=>{
  G.initGlobal();
  G.scene2D=new THREE.Scene();


  G.scene3D=new THREE.Scene();

  G.camera3D=new THREE.PerspectiveCamera(90 ,1 ,1 ,1000);
  G.camera3D.position.set(0 ,0 ,0)
  G.scene3D.background = G.scene2D;

      G.camera2D=new THREE.OrthographicCamera(-1,1,1,-1,-1,1);
      G.camera2D.position.set(0,0,0);

      G.renderer=new THREE.WebGLRenderer({canvas:document.getElementById("canvas2D")});
      G.renderer.setSize(500,500);
      G.toolManager.addTool(447, new Tool(new Image2DV2()));
      G.toolManager.addTool(868, new Tool(new Image2DV2()));
      G.toolManager.addTool(689, new Tool(new Image2DV2()));
      G.toolManager.addTool(607, new Tool(new Image2DV2()));
      
      let texture=new THREE.CanvasTexture(G.captureSource.sourceCtx.canvas); // créée une texture en recopiant l'image du canvas  
      G.scene2D.background = texture;


      
      let light=new THREE.DirectionalLight(0xffffff,1.0); // lumière blanche maximale
      light.position.set(0,0,1); // direction d'où provient l'éclairage (depuis l'axe $z$ ici).
      G.scene3D.add(light);
      const sourceAudioTool = new AudioSourceTool();
      const destinationAudioTool = new AudioDestinationTool();
      
      sourceAudioTool.connectTo(destinationAudioTool);
      G.toolManager.addTool(447, sourceAudioTool);
      G.toolManager.addTool(868, new Tool(new  ViewCube()));
      G.toolManager.addTool(689, destinationAudioTool );
      G.toolManager.addTool(607, new Tool(new  GLTF("/data/truck_02.gltf")));
      console.log(G.toolManager.allTools[689]);

      

      
      initializeDemo1();
  
}

// specific initialization for a demonstration
const initializeDemo1=()=>{

}

// mainLoop (copy the capture to the source image then the source image is analyzed)
const mainLoop=() => {
  if (G.waitLoading!=0) {//>> waiting Three.js models loading
    console.log("wait loader");
    window.requestAnimationFrame(mainLoop);
    return; // do nothing
  }
  G.captureSource.capture2Source();
  G.markerManager.updateFromCanvas(G.captureSource.sourceCtx.canvas);
  G.scene2D.background.needsUpdate = true;
  G.scene3D.background.needsUpdate = true;
  G.renderer.autoClear=true;               // effacer la dernière visualisation Three
  G.renderer.render(G.scene2D,G.camera2D);
  G.renderer.autoClear=false;              // ne pas effacer la dernière visualisation Three
  G.renderer.render(G.scene3D,G.camera3D);
  G.toolManager.update();
  
  window.requestAnimationFrame(mainLoop);
}






