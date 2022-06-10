import { normalize } from "./parseColor"

//hue
export const hue = ({saturation, lightness, alpha}:HslaType, h:number):HslaType => {
    return normalize({
        hue : h,
        saturation,
        lightness,
        alpha
    })
}
//hue

//hue
export const saturation = ({hue, lightness, alpha}:HslaType, s:number):HslaType => {
    return normalize({
        hue,
        saturation : s,
        lightness,
        alpha
    })
}
//hue

//lightness
export const lightness = ({hue, saturation, alpha}:HslaType, l:number):HslaType => {
    return normalize({
        hue,
        saturation,
        lightness : l,
        alpha
    })
}
export const lighten = ({hue, saturation, lightness, alpha}:HslaType, size:number):HslaType => {
    return normalize({
        hue,
        saturation,
        lightness : lightness+size,
        alpha
    })
}
//lightness