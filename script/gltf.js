import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js';
import NodePose3D from './nodePose3D.js';
import * as THREE from '../lib/three/build/three.module.js';
import G from './global.js';
export default class GLTF extends NodePose3D {
    constructor(filename) {
      super();
      var gltfNode=new THREE.Group();
  
      G.waitLoading+=1;
      new GLTFLoader()
            .load(filename,
          // called when loaded
          function ( gltf ) {
            let obj=gltf.scene;
            gltfNode.add(obj);
  
            /* truck2   */
            obj.scale.x=.006;
            obj.scale.y=.006;
            obj.scale.z=.006;
  
            obj.rotateOnAxis(new THREE.Vector3(1,0,0),-3.14/2.0);
  
            gltfNode.translateOnAxis(new THREE.Vector3(0,0,1),0);
  
            G.waitLoading-=1;
  
          },
          // called when progress
          function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
          },
          // called when loading has errors
          function ( error ) {
            console.log( 'An error happened'+error );
  
          }
        );
      this.node.add(gltfNode);
    }

    update (marker){
        if (marker.isVisible){
            this.node.visible=true;
            let pose = marker.pose;
    
    
            
            let m= pose.returnMat();
             
            this . node . matrix . copy (m ); // set to the matrix node
            this . node . matrixAutoUpdate = false ;
            
            }
            else{
                if (marker.countNoVisible>5){
                    this.node.visible=false;
                }
             }
            
    
        }
    
    }
  