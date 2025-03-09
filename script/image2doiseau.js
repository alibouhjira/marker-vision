import * as THREE from '../lib/three/build/three.module.js';
import G from './global.js';
export default class ImageSon {
    constructor() { // idImg : HTML id


        let texture = THREE.ImageUtils.loadTexture('data/hp.png', {}, function() {
            
        })

        let material = new THREE.MeshBasicMaterial( {map: texture} );
        let geometry = new THREE.PlaneGeometry(1 ,1); // le centre de la sph è re est (0 ,0 ,0) dans son rep è re local

  
        let node = new THREE.Mesh( geometry, material );
        

        let nodeParent = new THREE.Group();
        
        node.visible=false;
        nodeParent.add(node);
        this.node=nodeParent;
        G.scene2D.add(this.node);
    }

    

    update(marker){
            //console.log(marker);
         if (marker.isVisible){
            
           this.node.children[0].visible =true;
            let x=[-0.5, -0.5, 0.5, -0.5, 0.5,0.5, -0.5,0.5]
            
            let quadSrc = cv.matFromArray(4, 1, cv.CV_32FC2, x); 
            let quadDst = cv.matFromArray(4, 1, cv.CV_32FC2, marker.quad.t); 
            let transform = cv.getPerspectiveTransform(quadSrc,quadDst);
            let res=new THREE.Matrix4();
            let m=transform.data64F; 
            res.fromArray(
                [
                m[0], m[3], 0 , m[6], // first column (caution : THREE is column-major, openCV is row-major)
                m[1], m[4], 0 , m[7],
                0   ,  0  , 1 ,  0  , // z is ignored 
                m[2], m[5], 0 , m[8]
                ]);

                this.node.matrix.copy(res); // m = homographie pour cette question
                this.node.matrixAutoUpdate=false; // désactive la mise à jour de la matrice par \verb#Three#

                //let n=this.node.children[0];
                //n.rotateOnAxis(new THREE.Vector3(0,1,0),Math.PI/6.0)

                quadDst.delete();
                quadSrc.delete()
                
         }
         else{
            if (marker.countNoVisible>5){
           this.node.children[0].visible =false;
            }
         }
    }
  }