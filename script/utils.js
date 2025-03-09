import * as THREE from '../lib/three/build/three.module.js';

export default class Utils {
 
// in : src = [x0,y0,x1,y1,x2,y2,x3,y3], dst=[x'0,y'0,x'1,y'1,x'2,y'2,x'3,y'3]
// return : the THREE.Mat4 that corresponds to the homography from src to dst
static mat4FromHomography(src,dst) {  
  let quadSrc = cv.matFromArray(4, 1, cv.CV_32FC2, src);
  let quadDst = cv.matFromArray(4, 1, cv.CV_32FC2, dst);
  let transform = cv.getPerspectiveTransform(quadSrc, quadDst);

  let res=new THREE.Matrix4();
  let m=transform.data64F; // synonym for the coefficients of transform (type cv.Mat)
  res.fromArray(
    [ 
      m[0], m[3], 0 , m[6], // first column (caution : THREE is column-major, openCV is row-major)
      m[1], m[4], 0 , m[7],
        0 ,  0  , 1 ,  0  ,  
      m[2], m[5], 0 , m[8]
    ]);
  quadSrc.delete();
  quadDst.delete();
  transform.delete();
  return res;
}


}
