"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tonal = __importStar(require("tonal"));
exports.getScale = (tonicOctScale) => {
    tonicOctScale = tonicOctScale && tonicOctScale.toLowerCase();
    // In Tonal, the only scales that are not entirely lower case are
    // lydian #5P pentatonic and minor #7M pentatonic,
    // hence make provision for them separately
    tonicOctScale = tonicOctScale.replace('#5p', '#5P');
    tonicOctScale = tonicOctScale.replace('#7m', '#7M');
    const tokenizedName = Tonal.Scale.tokenize(tonicOctScale);
    const scaleName = tokenizedName[1];
    if (!Tonal.Scale.exists(scaleName)) {
        throw new Error(`${tonicOctScale} does not exist!`);
    }
    return Tonal.Scale.notes(tonicOctScale).map(Tonal.Note.simplify);
};
exports.scales = () => {
    return Tonal.Scale.names();
};
