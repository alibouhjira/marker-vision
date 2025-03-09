import ImageSon from "./image2doiseau.js";
import Tool from "./tool.js"
import G from "./global.js";

export default class AudioDestinationTool extends Tool {
    constructor() {
      super();
  
      // La destination a une entrée audio par défaut fournie par la librairie WebAudio
      this.audioInput = G.audioCtx.destination;
  
      // La sortie audio de la destination est null
      this.audioOutput = null;
  
      // Définir la vue spécifique pour cette destination
      this.view = new ImageSon(); // Remplacez SpeakerImageView par votre classe de vue
    }
  }
  