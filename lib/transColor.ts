import { normalize, normalizeRgba } from "./parseColor";

export const stringToRgba = (color:string):RgbaType => {
    const [r, g, b, a = 1] = color.match(/[\d\.]+/g).map(item => parseFloat(item)%1 ? parseFloat(item) : parseInt(item));
    return normalizeRgba({r,g,b,a});
}
export const rgbaToString = (color:RgbaType):string => {
    const {r, g, b, a = 1} = normalizeRgba(color);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export const stringToHsla = (color:string):HslaType => {
    let [hue, saturation, lightness, alpha = 1] = color.match(/[\d\.]+%?/g).map(item => parseFloat(item)%1 ? parseFloat(item) : parseInt(item));
    return normalize({hue, saturation, lightness, alpha});
}
export const hslaToString = (color:HslaType):string => {
    const {hue, saturation, lightness, alpha = 1} = normalize(color);
    return `hsla(${hue}, ${saturation}, ${lightness}, ${alpha})`;
}

export const hexToRgba = (color:string):RgbaType => {
    let tmp = color.substring(1).toUpperCase();
    if(tmp.length === 3)   tmp += 'F';
    if(tmp.length === 4)   tmp = tmp.split('').map(item => item.repeat(2)).join('');
    if(tmp.length === 6)   tmp += 'FF';
    const [r, g, b, a] = tmp.match(/[\dA-Z]{2}/g).map((item, idx) => idx === 3 ? parseInt(item, 16)/255 : parseInt(item, 16));

    return { r, g, b, a }
}
export const rgbaToHex = (color:RgbaType):string => {
    const {r, g, b, a = 1} = color;
    return `#${('0'+r.toString(16)).slice(-2)}${('0'+g.toString(16)).slice(-2)}${('0'+b.toString(16)).slice(-2)}${a === 1 ? '' : (a*255).toString(16)}`.toUpperCase();
}

export const RgbaToHsla = (color:RgbaType):HslaType => {
    const {r:$r, g:$g, b:$b, a = 1} = normalizeRgba(color);
    const r = $r/255, g = $g/255,  b = $b/255;
    const max = Math.max(r,g,b);
    const min = Math.min(r,g,b);
    const delta = max-min;

    				
    let h = 0;
    let s = 0;
    let l = (max+min)/2;

    if(delta != 0){
        let $h:number;
        switch (max){
            case r :
                $h = ((g-b)/delta)%6;
                break;
            case g :
                $h = (b-r)/delta + 2;
                break;
            case b :
                $h = (r-g)/delta + 4;
                break;
        }
        $h*=60;
        if($h <= 0) $h += 360;
        h = $h;
        s = delta == 0 ? 0 : delta/((1-Math.abs(l*2-1)));
    }

    return {
        hue:h,
        saturation:s*100,
        lightness:l*100,
        alpha:a
    }
}
export const HslaToRgba = (color:HslaType):RgbaType => {
    const {hue, saturation, lightness, alpha} = normalize(color);
    const h = hue, s = saturation/100, l = lightness/100, a = alpha;

    let c = (1-Math.abs(2*l-1))*s;
    let x = c*(1-(Math.abs((h/60)%2-1)));
    let m = l-c/2;

    let r:number;
    let g:number;
    let b:number;

    switch (Math.floor(h/60)){
        case 0 :
            r = c; g = x; b = 0;
            break;
        case 1 :
            r = x; g = c; b = 0;
            break;
        case 2 :
            r = 0; g = c; b = x;
            break;
        case 3 :
            r = 0; g = x; b = c;
            break;
        case 4 :
            r = x; g = 0; b = c;
            break;
        case 5 :
            r = c; g = 0; b = x;
            break;
        case 6 :
            r = c; g = x; b = 0;
            break;
    }
    r = Math.round((r+m)*255);
    g = Math.round((g+m)*255);
    b = Math.round((b+m)*255);
    return {r, g, b, a};
}