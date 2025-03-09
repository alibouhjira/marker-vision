import Quad from "./quad.js";
import MarkerCode from "./MarkerCode.js";

// recognize all markers in a canvas
export default class Recognizer {

  // recognize all markers in a canvas
  // in : canvas = HTML canvas : image to analyze    
  // return : {id1 : quad1, id2 : quad2, ...} : all recognized marker id (int) with their quad (Quad)
  static recognizeMarker(canvas) {

      // for now : only set an OpenCV image from a canvas, and draw it in another canvas
      

      let src = cv.imread(canvas); // src set to a cv.Mat image

      let dst = new cv.Mat();  


      cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
      cv.blur(dst, dst, {width : 5,height:5});
      cv.adaptiveThreshold(dst,dst,255,cv.ADAPTIVE_THRESH_GAUSSIAN_C,cv.THRESH_BINARY_INV,7,4.0);
      // BINARY_INV ? échange blanc/noir (car contour extrait depuis pixels blancs)
      let allContour=new cv.MatVector(); // tous les contours stockés dans un tableau de Mat
      let hierarchy=new cv.Mat(); // mémorise la topologie des contours
      cv.findContours(dst,allContour,hierarchy,cv.RETR_EXTERNAL,cv.CHAIN_APPROX_TC89_L1);
      // RETR_EXTERNAL : uniquement les contours extérieurs (non inclus dans un autre)
      let viewCnt = src.clone(); // les contours seront affichés sur viewCnt (image initiale copiée)
      allContour =this.selectQuadContour(allContour);
      cv.drawContours(viewCnt,allContour,-1,new cv.Scalar(255,0,0,255),2,cv.LINE_4); // trace les contours
      cv.imshow("extracted0",viewCnt);
      const canvas2 = document.getElementById("inter");
      const ctx = canvas2.getContext("2d");
      const image = document.getElementById("source");


      ctx.drawImage(image, 1, 1 );
      
    
      cv.imshow("dstcv1",dst); // feedback : draw dst in canvas dstcv1
      let res = new Array();
      

      
      for(let i=0;i<allContour.size();i++){
        let q=new Quad();
        q.setFromWindowCoord(allContour.get(i).data32S,[ctx.canvas.width, ctx.canvas.height])
        q.draw(ctx)

        let quadSrc = cv.matFromArray(4, 1, cv.CV_32FC2, q.toWindowCoord([ctx.canvas.width, ctx.canvas.height]) ); // q = notre Quad à traiter; notez le q.toWindowCoord : OpenCV "travaille" en coordonnées pixels.
        let quadDst = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, 100, 0, 100,100, 0,100]); // pour obtenir une transformation vers un carré de 100x100 pixels
        let transform = cv.getPerspectiveTransform(quadSrc, quadDst);
      
        let transformImage=new cv.Mat();
        cv.warpPerspective(src, transformImage, transform, {width:100,height:100}, cv.INTER_LINEAR, cv.BORDER_CONSTANT); // src est l'image à traiter; notez le 100, 100 pour être cohérent avec la définition de \verb#quadDst# précédente (tester d'autres valeurs).
        cv.cvtColor(transformImage, transformImage, cv.COLOR_RGBA2GRAY);
        
        cv.blur(transformImage, transformImage, {width : 5,height:5});
      
        cv.threshold(transformImage , transformImage , 100 , 255 , cv . THRESH_BINARY );
        let m = new MarkerCode();
        if (m.fromImg(transformImage,i)){
          if(m.m.includes(1)){
            m.Drawsquars(i)
            let k=m.nearestId();
            
            
            if (k.distance<1){
              let r={
                id: k.id,
                quad: q,
              }
              res.push(r)
            }
            
            }
        }
        
        



       

        if(i<4)cv.imshow("extracted"+i,transformImage)
        transformImage.delete()
        transform.delete()
        quadDst.delete()
        quadSrc.delete()
      }
      
      



      // delete **all** cv data : do not forget to delete each useless cv data
      src.delete(); 
      dst.delete();
      viewCnt.delete();
      allContour.delete();
      hierarchy.delete();
      return res;
 
  }

  static selectQuadContour(allContour) {
    let res=new cv.MatVector(); 
    for (let i = 0; i < allContour.size(); ++i) {
      let tmp = new cv.Mat();
      let cnt = allContour.get(i);
      cv.approxPolyDP(cnt, tmp, 3, true);
      if (tmp.size().height==4) {
      res.push_back(tmp);
      }
      cnt.delete(); tmp.delete();
  }
  
    return res;
    // !! n'oubliez pas les delete des objets OpenCV devenus inutiles créés par new (mais surtout pas sur res qui contient le résultat à exploiter par la suite...)
  }
}



