import * as THREE from '../lib/three/build/three.module.js';
import G from './global.js';
export default class Image2D {
    constructor() { // idImg : HTML id
      
      


        let material = new THREE.MeshBasicMaterial( { color : 0xFF0000 } );
        let geometry = new THREE.PlaneGeometry(1 ,1); // le centre de la sph è re est (0 ,0 ,0) dans son rep è re local
        
        this.node = new THREE . Mesh ( geometry , material ); // THREE Object3D (Group or Mesh)
  
       G.scene2D.add(this.node);
    }

    update(marker){

         if (marker.isVisible){
            this.node.visible =true;
            this.node.geometry.vertices[0].x=marker.quad.t[0];
            this.node.geometry.vertices[0].y=marker.quad.t[1];
            this.node.geometry.vertices[1].x=marker.quad.t[2];
            this.node.geometry.vertices[1].y=marker.quad.t[3];
            this.node.geometry.vertices[3].x=marker.quad.t[4]; // noter l ’ ordre des sommets
            this.node.geometry.vertices[3].y=marker.quad.t[5];
            this.node.geometry.vertices[2].x=marker.quad.t[6];
            this.node.geometry.vertices[2].y=marker.quad.t[7];
            this.node.geometry.verticesNeedUpdate = true ; // notifier le renderer que la gé om é trie a chang é
            
         }
         else{
            
            this.node.visible =false;
         }
    }
  }