import * as THREE from '../lib/three/build/three.module.js';

export default class Pose {
  constructor () {
    this.allPoses= []; 
    this . xAxis = new THREE . Vector3 ();
    this . yAxis = new THREE . Vector3 ();
    this . zAxis = new THREE . Vector3 ();
    this . position = new THREE . Vector3 ();
    }
    // in m : THREE . Matrix4 ( conversion from OpenCV homography )
    setFromHomography (m) {
  
  this . xAxis .x=m. elements [0];
  this . xAxis .y=m. elements [1];
  this . xAxis .z=-m. elements [3];
  this . yAxis .x=m. elements [4];
  this . yAxis .y=m. elements [5];
  this . yAxis .z=-m. elements [7];
  this . zAxis . crossVectors ( this . xAxis , this . yAxis );
  this . position .x=m. elements [12];
  this . position .y=m. elements [13];
  this . position .z=-m. elements [15];
  let lx = this . xAxis . length ();
  let ly = this . yAxis . length ();
  this . position . multiplyScalar (2.0/( lx + ly ));
  this . xAxis . normalize ();
  this . yAxis . normalize ();
  this . zAxis . normalize ();
    }





    returnMat(){

      let p = new Pose();
      p.xAxis.copy(this.xAxis)
      p.yAxis.copy(this.yAxis)
      p.zAxis.copy(this.zAxis)
      p.position.copy(this.position)

        if (this.allPoses.length>10){
            this.allPoses.shift();
        }
       
           this.allPoses.push(p);
        

        
        // Créez un tableau pour stocker les instances de THREE.Vector3
        let XvectorArray = [];
        let YvectorArray = [];
        let PositionvectorArray = [];
        
        // Ajoutez 10 éléments à votre tableau
        for (let i = 0; i < this.allPoses.length; i++) {
            XvectorArray.push(this.allPoses[i].xAxis);
            YvectorArray.push(this.allPoses[i].yAxis);
            PositionvectorArray.push(this.allPoses[i].position);
        }
        
        // Calculez la somme des vecteurs
        let sumVectorX = new THREE.Vector3();
        let sumVectorY = new THREE.Vector3();
        let sumVectorPosition = new THREE.Vector3();

        for (let i = 0; i < XvectorArray.length; i++) {
            sumVectorX.add(XvectorArray[i]);
            sumVectorY.add(YvectorArray[i]);
            sumVectorPosition.add(PositionvectorArray[i]);
        }
        
        // Calculez la moyenne en divisant la somme par le nombre d'éléments
        let averageVectorX = sumVectorX.divideScalar(XvectorArray.length);
        let averageVectorY = sumVectorY.divideScalar(YvectorArray.length);
        let averageVectorPosition = sumVectorPosition.divideScalar(PositionvectorArray.length);

    
        let m = new THREE.Matrix4();
        let z = new THREE . Vector3 ();

        z.crossVectors(averageVectorX,averageVectorY);
        
        m.makeBasis(averageVectorX,averageVectorY,z);
        m.setPosition(averageVectorPosition);


        return m;
    }
}