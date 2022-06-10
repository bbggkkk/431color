import { hexToRgba, HslaToRgba, hslaToString, rgbaToHex, RgbaToHsla, rgbaToString, stringToHsla, stringToRgba } from "./transColor";

export const toHsla = (color:string|RgbaType|HslaType):HslaType => {
    const type = getColorType(color);
    let value:HslaType;
    switch (type){
        case 'hex' :
            const tmpHexToRgba = hexToRgba(color as string);
            value = RgbaToHsla(tmpHexToRgba);
            break;
        case 'hsl' :
        case 'hsla' :
            value = stringToHsla(color as string);
            break;
        case 'rgb' :
        case 'rgba' :
            const tmpStringToRgba = stringToRgba(color as string);
            value = RgbaToHsla(tmpStringToRgba);
            break;
        case 'RgbaType' :
            value = RgbaToHsla(color as RgbaType);
            break;
        default :
            value = color as HslaType;
    }
    return value;
}
export const toRgba = (color:string|RgbaType|HslaType):RgbaType => {
    const type = getColorType(color);
    let value:RgbaType;
    switch (type){
        case 'hex' :
            value = hexToRgba(color as string);
            break;
        case 'rgb' :
        case 'rgba' :
            value = stringToRgba(color as string);
            break;
        case 'hsl' :
        case 'hsla' :
            const tmpHslaString = stringToHsla(color as string);
            value = HslaToRgba(tmpHslaString);
            break;
        case 'HslaType' :
            value = HslaToRgba(color as HslaType);
            break;
        default :
            value = color as RgbaType;
    }
    return value;
}
export const toHex = (color:string|RgbaType|HslaType):string => {
    const type = getColorType(color);
    let value:string;
    switch (type){
        case 'rgb' :
        case 'rgba' :
            const tmpRgbaString = stringToRgba(color as string);
            value = rgbaToHex(tmpRgbaString);
            break;
        case 'hsl' :
        case 'hsla' :
            const tmpHslaString = stringToHsla(color as string);
            const tmpRgbaType = HslaToRgba(tmpHslaString);
            value = rgbaToHex(tmpRgbaType);
            break;
        case 'HslaType' :
            const tmpRgba = HslaToRgba(color as HslaType);
            value = rgbaToHex(tmpRgba);
            break;
        case 'RgbaType' :
            value = rgbaToHex(color as RgbaType);
            break;
        default :
            value = color as string;
    }

    return value;
}
export const toHslaString = (color:string|RgbaType|HslaType):string => {
    const type = getColorType(color);
    let value:string;
    switch (type){
        case 'hex' :
            const tmpHtxToRgba = hexToRgba(color as string);
            const tmpRgbaToHsla = RgbaToHsla(tmpHtxToRgba);
            value = hslaToString(tmpRgbaToHsla);
            break;
        case 'rgb' :
        case 'rgba' :
            const tmpRgbaString = stringToRgba(color as string);
            const tmpHlsaType = RgbaToHsla(tmpRgbaString);
            value = hslaToString(tmpHlsaType);
            break;
        case 'hsl' :
        case 'hsla' :
            const tmpHslaString = stringToHsla(color as string);
            value = hslaToString(tmpHslaString);
            break;
        case 'HslaType' :
            value = hslaToString(color as HslaType);
            break;
        case 'RgbaType' :
            const tmpRgba = RgbaToHsla(color as RgbaType);
            value = hslaToString(tmpRgba as HslaType);
            break;
        default :
            value = color as string;
    }

    return value;
}
export const toHslString = (color:string|RgbaType|HslaType):string => {
    const str = toHslaString(color).replace('hsla','hsl').split(',').slice(0,3).join(',')+')';
    return str;
}
export const toRgbaString = (color:string|RgbaType|HslaType):string => {
    const type = getColorType(color);
    let value:string;
    switch (type){
        case 'hex' :
            const tmpHtxToRgba = hexToRgba(color as string);
            value = rgbaToString(tmpHtxToRgba);
            break;
        case 'rgb' :
        case 'rgba' :
            const tmpRgbaString = stringToRgba(color as string);
            value = rgbaToString(tmpRgbaString);
            break;
        case 'hsl' :
        case 'hsla' :
            const tmpHslaString = stringToHsla(color as string);
            const tmpHslaToRgba = HslaToRgba(tmpHslaString);
            value = rgbaToString(tmpHslaToRgba);
            break;
        case 'HslaType' :
            const tmpHslaTypeToRgba = HslaToRgba(color as HslaType);
            value = rgbaToString(tmpHslaTypeToRgba);
            break;
        case 'RgbaType' :
            value = rgbaToString(color as RgbaType);
            break;
        default :
            value = color as string;
    }

    return value;
}
export const toRgbString = (color:string|RgbaType|HslaType):string => {
    const str = toRgbaString(color).replace('rgba','rgb').split(',').slice(0,3).join(',')+')';
    return str;
}

export const parseColorType = (color:string):ColorType => {
    const reg= {
        hex:/#(?:[\da-fA-F]{3})|(?:[\da-fA-F]{4})|(?:[\da-fA-F]{6})|(?:[\da-fA-F]{8})/,
        rgb:/rgb\(\s*\d{1,3}\s*\,\s*\d{1,3}\s*\,\s*\d{1,3}\s*\)/,
        rgba:/rgba\(\s*\d{1,3}\s*\,\s*\d{1,3}\s*\,\s*\d{1,3}\s*,\s*(?:\d+?|0?\.\d+)\s*\)/,
        hsl:/hsl\(\s*\d{1,3}\s*\,\s*(?:\d{1,3}%|0)\s*\,\s*(?:\d{1,3}%|0)\s*\)/,
        hsla:/hsla\(\s*\d{1,3}\s*\,\s*(?:\d{1,3}%|0)\s*\,\s*(?:\d{1,3}%|0)\s*,\s*(?:\d+?|0?\.\d+)\s*\)/,
    }
    const keys = Object.keys(reg) as ColorType[];
    const value = keys.find((item:'hex'|'rgb'|'rgba'|'hsl'|'hsla') => color.match(reg[item]));

    if(value === undefined){
        throw new Error("색깔 형식을 찾을 수 없습니다.");
    }
    
    return value;
}

export const getColorType = (color:string|HslaType|RgbaType):ColorType|'HslaType'|'RgbaType' => {
    const type = typeof color;
    let ObjectType:ColorType|'HslaType'|'RgbaType';

    if(type === 'string'){
        const definedColor = parseColorType(color as string);
        ObjectType = definedColor;
    }else if(Object.keys(color).some(item => item==='r')){
        ObjectType = 'RgbaType';
    }else{
        ObjectType = 'HslaType';
    }
    return ObjectType;
}

export const normalize = (color:HslaType):HslaType => {
    let {hue, saturation, lightness, alpha} = color;
    hue = hue < 0 ? 0 : hue > 360 ? 360 : hue;
    saturation = saturation < 0 ? 0 : saturation > 100 ? 100 : saturation;
    lightness = lightness < 0 ? 0 : lightness > 100 ? 100 : lightness;
    alpha = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;
    return { hue, saturation, lightness, alpha };
}
export const normalizeRgba = (color:RgbaType):RgbaType => {
    let {r, g, b, a} = color;
    r = r < 0 ? 0 : r > 255 ? 255 : r;
    g = g < 0 ? 0 : g > 255 ? 255 : g;
    b = b < 0 ? 0 : b > 255 ? 255 : b;
    a = a < 0 ? 0 : a > 1 ? 1 : a;
    return { r, g, b, a };
}