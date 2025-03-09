import MarkerManager from "./markerManager.js";

export default class MarkerCode {
    // grid of 5x5 values of a marker : 0 (black) or 1 (white)
    constructor() {
      this.m=[]; // array of 25 values (5x5 values : first line = 5 first values, ...)
    }

    fromImg(src,i) {
        // compute the 5x5 values of the grid
        let stepX=src.cols/7.0; // step (in pixels) between 2 columns in the image. src.cols = the image width (in pixels); there are 7 cols in marker (the 2 borders + 5 values)
        let stepY=src.rows/7.0; // step between 2 rows.
    
        let centerX=stepX/2.0; // center of the first square of the grid (in pixels)
        let centerY=stepY/2.0;
    
        let square=0;          // square counter
        for(let y=0;y<7;++y) { // 7 rows
          centerX=stepX/2.0;   // start pixel row (first column)
          for(let x=0;x<7;++x) {
            let valueSquare=-1; // value of the marker square : 0=black, 1=white, -1= rejected 
            let dst=src.roi({x:centerX-1,y:centerY-1,width:3,height:3}); // crop image at center of the square (3x3 pixels zone) with OpenCV
            let nbWhite=cv.countNonZero(dst);                            // count white pixels in these 3x3 pixels
            dst.delete(); // dst is useless now
    
            if (nbWhite>3) {valueSquare=1;}      // it is a white value 
            else if (nbWhite<3) {valueSquare=0;} // black value       
                
    
            if (valueSquare==-1) return false;   // neither black nor white => rejected
            if (x==0 || x==6 || y==0 || y==6) {  // the border should be black
              if (valueSquare!=0) return false;  // not a border => not a marker => rejected
            }
            else {
              this.m[square]=valueSquare;        // sets the value of the square, then next square
              square+=1;
            }
            centerX+=stepX; // next col
          }
          centerY+=stepY; // next row
        }
        
        return true;
      }

      Drawsquars(i){
        const canvas3 = document.getElementById("code"+i);
        const ctx2 = canvas3.getContext("2d");

        let k=0,l=0
        let couleur
        
        
        
        for(let i=0;i<ctx2.canvas.width; i+=ctx2.canvas.height/7){
          for(let j=0;j<ctx2.canvas.height; j+=ctx2.canvas.width/7){
            if (i>0 && i<ctx2.canvas.width-ctx2.canvas.width/7 && j>0 && j<ctx2.canvas.height-ctx2.canvas.height/7){
             
            
            if (this.m[l]== 1) {couleur= "#FFFFFF"}
            else {couleur= "black";}
            
            ctx2.beginPath();
            ctx2.moveTo(j, i);
            ctx2.lineTo(j,i+ctx2.canvas.width/7);
            ctx2.lineTo( j +ctx2.canvas.height/7, i+ctx2.canvas.width/7);
            ctx2.lineTo(j+ctx2.canvas.height/7,i);
            ctx2.fillStyle= couleur
            
            ctx2.fill();
            l++
            
          
          }
          else{
            ctx2.beginPath();
            ctx2.moveTo(j, i);
            ctx2.lineTo(j,i+ctx2.canvas.width/7);
            ctx2.lineTo( j +ctx2.canvas.height/7, i+ctx2.canvas.width/7);
            ctx2.lineTo(j+ctx2.canvas.height/7,i);
            ctx2.fillStyle= "black"
            
            ctx2.fill();
            

          }

          
          
        }
      }
      
      }

     


      nearestId() {
        let pattern = [ [1,0,0,0,0], [1,0,1,1,1], [0,1,0,0,1], [0,1,1,1,0] ] // or [16, 23, 9, 14] or ... // the 4 possible values of a row
        let markerId=0; // computed id
        let dtottmp=0;
        let dTot=0;     // total distance for the 5 rows
        let nbRotation=0;
        let marker = new Array(5);
        let distmp=0;

        

        for (let i=0; i < 5; i++){
              marker[i] = new Array(5)
        }
        let l=0;
        for (let i=0; i<5; i++){
          for( let j=0;j<5;j++){
            marker[i][j]= this.m[l]
            l++
          }
        }


       for(let r=0;r<4;r++){
        
        let valeurs=new Array(5);
        if (r>0) {
          marker=this.rotateMatrix(marker);
          
        }
        if(r==1) ;
        
        dtottmp=0;
        

        for (let i=0;i<5;i++){
          for (let j=0;j<4;j++){
            
            let dist=0
            for (let k=0;k<5;k++){
              if (marker[i][k]!=pattern[j][k]) {
                dist++ ;
              }
            }
            if (j==0) {distmp =dist; valeurs[i]=j}
            else if (dist<distmp) {
              
              distmp=dist;
              valeurs[i]=j;
              
            }
            
            
          }
          dtottmp=dtottmp+distmp
          
          
        }
        if(r==0) {dTot=dtottmp; nbRotation = r;markerId=valeurs[0]*Math.pow(4, 4)+valeurs[1]*Math.pow(4, 3)+valeurs[2]*Math.pow(4, 2)+valeurs[3]*Math.pow(4, 1)+valeurs[4]*Math.pow(4, 0);
        }
        else
        if (dtottmp<dTot) {
          dTot=dtottmp;
          nbRotation=r;
          markerId=valeurs[0]*Math.pow(4, 4)+valeurs[1]*Math.pow(4, 3)+valeurs[2]*Math.pow(4, 2)+valeurs[3]*Math.pow(4, 1)+valeurs[4]*Math.pow(4, 0);
          
          
        }


      }
      



    
        return {id:markerId,distance:dTot}
      }

       rotateMatrix(matrix) {
        const numRows = matrix.length;
        const numCols = matrix[0].length;
      
        // Créez une nouvelle matrice vide de taille inverse
        const rotatedMatrix = new Array(numCols).fill(null).map(() => []);
      
        // Parcourez la matrice d'origine en sens inverse pour la rotation à 90 degrés
        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numCols; col++) {
            rotatedMatrix[col][numRows - 1 - row] = matrix[row][col];
          }
        }
        
        return rotatedMatrix;
      }

    


      
  }