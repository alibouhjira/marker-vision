import NodePose3D from "./nodePose3D.js";
import * as THREE from '../lib/three/build/three.module.js';
import Utils from "./utils.js";

export default class ViewCube extends NodePose3D {
    constructor() {
        super(); // Appel du constructeur de la classe parente NodePose3D
        
        

        // Crée la géométrie du cube
        let geometry = new THREE.BoxGeometry(1, 1, 1);

        // Crée le matériau du cube avec un éclairage
        let material = new THREE.MeshPhongMaterial({ color: 0x00ffff, side: THREE.DoubleSide });

        // Crée le cube en utilisant la géométrie et le matériau
        let cube = new THREE.Mesh(geometry, material);

        // Ajoute le cube comme enfant du noeud de la pose 3D
        this.node.add(cube);

        // Positionne le cube temporairement pour qu'il soit visible devant la caméra
        cube.position.copy(new THREE.Vector3(0, 0, 0));
        // Cette position devra être ajustée une fois que l'estimation de la pose sera disponible
        this.rotationSpeed = 0.05;
    }

    update(marker) {
        // À compléter lorsque l'estimation de la pose sera disponible
        // Vous devrez mettre à jour la position et l'orientation du cube en fonction de la pose estimée.

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