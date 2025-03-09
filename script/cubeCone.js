import NodePose3D from "./nodePose3D.js";
import * as THREE from '../lib/three/build/three.module.js';
import Utils from "./utils.js";

export default class CubeCone extends NodePose3D {
    constructor() {
        super(); // Appel du constructeur de la classe parente NodePose3D
   
        // Crée la géométrie du cube
        let geometry1 = new THREE.BoxGeometry(1, 1, 1);

        // Crée le matériau du cube avec un éclairage
        let material = new THREE.MeshPhongMaterial({ color: 0x00ffff, side: THREE.DoubleSide });

        // Crée le cube en utilisant la géométrie et le matériau
        let cube = new THREE.Mesh(geometry1, material);
        

        // Ajoute le cube comme enfant du noeud de la pose 3D
        this.node.add(cube);

        // Positionne le cube temporairement pour qu'il soit visible devant la caméra
        cube.position.copy(new THREE.Vector3(0, 0, 0));
        // Cette position devra être ajustée une fois que l'estimation de la pose sera disponible
        this.rotationSpeed = 0.05;
    }

    
        update(marker1,marker2) {
            let position1=marker1.pose.position;
            let position2=marker2.pose.position;
            // place origin frame at center of [position1,position2]
            this.node.position.copy(new THREE.Vector3((position1.x+position2.x)/2.0,(position1.y+position2.y)/2.0,(position1.z+position2.z)/2.0));
            // orient the z-axis toward position2
            this.node.lookAt(position2);
            // extends the cube on z-axis (length of the cube will be the distance [position1,position2])
            
            this.node.children[0].scale.set(0.2,0.2,position1.distanceTo(position2));
      }
        

    

    
}