/**
 * @author F. Aubert/Université de Lille
 */



export default class CaptureSource {

  // constructor
  // @in captureId : id of the capture tag : should contains a video and an image
  // @in sourceId : id of the source canvas tag 
  // @in captureMode : 'webcam' | 'video' | 'fixedImage'
  constructor(captureId, sourceId, captureMode) {
    const captureDiv = document.getElementById(captureId);
    const captureImg = captureDiv.querySelector('img');
    const captureVideo = captureDiv.querySelector('video');
    if (captureMode == 'fixedImage') {
      this.captureElt = captureImg;
      captureVideo.style.display = 'none';
    }
    else {
      this.captureElt = captureVideo;
      captureImg.style.display = 'none';
    }
    this.sourceCtx = document.getElementById(sourceId).getContext('2d');
    this.captureMode = captureMode;
  }



  // @return promise : fulfilled when openCV ready
  waitingOpenCV() {
    console.log('waiting opencv...');
    const promise = new Promise((resolve, reject) => {
      if (cv.getBuildInformation != null) { console.log('opencv ready'); resolve(); } // in case openCV is already ready before waitOpenCV is called
      else {
        cv['onRuntimeInitialized'] = () => { console.log('opencv ready'); resolve(); }
      }
    });
    return promise;
  }


  // set the the capture element to the given stream
  // @return promise : fulfilled when the webcam stream is ready
  waitingWebcamStream(stream) {
    console.log("set webcam stream");
    this.captureElt.srcObject = stream; // source of the video element is the media device stream
    return new Promise(resolve => {
      this.captureElt.addEventListener("loadedmetadata", () => { console.log('webcam stream ready'); resolve(); });
    });
  }

  // detect webcam
  // @return promise : fulfilled when the webcam is detected (and allowed by user)
  waitingWebcam() {
    console.log("detect webcam...");
    let constraint = { audio: true, video: true };

    const promise = navigator.mediaDevices.getUserMedia(constraint); // request media device (async)
    return promise;
  }

  // set the capture element to the webcam stream (detect webcam and set stream)
  // @return promise : fulfilled when webcam stream is in capture element
  async captureWebcam() {
    const stream = await this.waitingWebcam();
    await this.waitingWebcamStream(stream);
  }

  // set the capture element according to the choosen mode (see constructor)
  // @return promise : fullfilled when all ok
  async prepareStream() {
    switch (this.captureMode) {
      case 'webcam': await this.captureWebcam(); this.captureElt.play(); break;
      case 'video': await this.captureElt.play(); break;
      case 'fixedImage': break;
      default: throw new Error('InitSource.initialize : wrong captureMode ' + captureMode);
    }

  }


  // @return promise : fulfilled when all ready
  async initializeCapture() {
    await this.waitingOpenCV();
    await this.prepareStream();
  }

  // copy the content of the capture element in the source canvas
  capture2Source() {
    let wCapture, hCapture;
    if (this.captureMode == 'fixedImage') {
      wCapture = this.captureElt.naturalWidth;
      hCapture = this.captureElt.naturalHeight;
    }
    else {
      wCapture = this.captureElt.videoWidth;
      hCapture = this.captureElt.videoHeight;

    }
    // copy from capture element (image/video/webcam) to source element (the image in source element will be analyzed for marker recognition)
    // a ratio is applied (source size and capture size can differ) to avoid image deformation #TODO : only landscape configuration is done
    const ctx = this.sourceCtx;
    const ratio = hCapture / wCapture;
    const wSource = ctx.canvas.width;
    const hSource = ctx.canvas.height;

    ctx.fillStyle = "hsl(265, 100%, 86%)";
    ctx.fillRect(0, 0, wSource, hSource);
    ctx.drawImage(this.captureElt, 0, 0, wCapture, hCapture, 0, (hSource - hSource * ratio) / 2, wSource, hSource * ratio); // only landscape orientation is considered here

  }
}
