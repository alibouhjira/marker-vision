
export default class Quad { // 2D quad
  det;
  constructor() {
    this.t=[]; // [x0,y0,x1,y1,x2,y2,x3,y3] = the 4 corners of the quad
  }
  
  set(q) { // copy the quad q to this
    q.forEach((value,index)=>this.t[index]=value); // DO NOT USE map : do not create a new array; Quad is the owner of t
  }

  setFromWindowCoord(s,t){
    let L1x=s[2]-s[0]
    let L1y=s[3]-s[1]
    let L2x=s[4]-s[2]
    let L2y=s[5]-s[3]

    let det = L1x*L2y-L1y*L2x

    if (det<0){
      let v1x = s[2]
      let v1y = s[3]
      let v3x = s[6]
      let v3y = s[7]

      s[2]=v3x
      s[3]=v3y
      s[6]=v1x
      s[7]=v1y

    }
    

    for( let i=0;i<s.length;i++){
      this.t[i]= (s[i]/t[0])*2-1
      i++
      this.t[i]= (s[i]/t[1])*(-2)+1
    }


  }

  toWindowCoord(s) {
    let res=[] ;
    
    for( let i=0;i<this.t.length;i++){
      res.push((s[0]*(this.t[i]+1))/2)
      i++
      res.push((s[1]*(this.t[i]-1))/(-2))

    }
    return res
 }

 draw(ctx) {
  let res = this.toWindowCoord([ctx.canvas.width,ctx.canvas.height])
  

    ctx.beginPath();
    ctx.moveTo(res[0], res[1]);
    ctx.lineTo(res[2], res[3]);
    ctx.lineTo(res[4], res[5]);
    ctx.lineTo(res[6], res[7]);

    ctx.fill();
  }



  
}
