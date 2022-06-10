import { normalize, toHex, toHsla, toHslaString, toHslString, toRgba, toRgbaString, toRgbString } from "./parseColor";

export class Hsl {
    color:HslaType
    constructor(color:string){
        this.color = this.setValue(color);
    }

    get = (type:ColorType|'RgbaType'|'HslaType') => {
        switch (type) {
            case 'RgbaType' :
                return toRgba(this.color);
            case 'HslaType' :
                return toHsla(this.color);
            case 'hex' :
                return toHex(this.color);
            case 'hsl' :
                return toHslString(this.color);
            case 'hsla' :
                return toHslaString(this.color);
            case 'rgb' :
                return toRgbString(this.color);
            case 'rgba' :
                return toRgbaString(this.color);
            default :
                return this.color;
        }
    }
    set = (color:string) => {
        this.color = normalize(toHsla(color));
    }
    setValue = (color:string) => {
        return normalize(toHsla(color));
    }
}
export class Color extends Hsl {
    initial:HslaType
    constructor(color:string){
        super(color);
        this.initial = this.color;
    }

    reset = () => {
        this.color = this.initial;
    }
}