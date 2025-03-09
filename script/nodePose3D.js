import * as THREE from '../lib/three/build/three.module.js';
import G from './global.js';

export default class NodePose3D {
    constructor() {
      this.node=new THREE.Group();
      G.scene3D.add(this.node);
    }
  
    update(marker) {

    }
  }