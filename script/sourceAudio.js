import Tool from "./tool.js";
import G from "./global.js";
import ViewCube from "./viewCube.js";
export default class AudioSourceTool extends Tool {
  constructor() {
    super();

    // Créer la source audio en utilisant l'élément audio HTML
    this.source = G.audioCtx.createMediaElementSource(document.getElementById("sound"));

    // Lancer l'élément audio
    document.getElementById("sound").play();

    // La sortie audio de la source est la source elle-même
    this.audioOutput = this.source;

    // La source ne peut pas être connectée en entrée, donc audioInput est null
    this.audioInput = null;

    // Définir la vue spécifique pour cette source
    this.view = new ViewCube(); // Remplacez AudioSpectrumView par votre classe de vue
  }
}