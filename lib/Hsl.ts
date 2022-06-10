import { colorType } from './parseColor';

export class Hsl {
    color:HslType
    constructor(color:string) {
        this.color = this.parseColor(color);
    }

    colorType = colorType

    parseColor = (color:string):HslType => {
        return {
            hue:1,
            saturation:2,
            lightness:3
        }
    }
}