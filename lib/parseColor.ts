export const parseColor = (color:string) => {
    
}

export const colorType = (color:string):ColorType => {
    const reg = {
        hex:/#(?:[\da-fA-F]{3})|(?:[\da-fA-F]{6})|(?:[\da-fA-F]{8})/,
        rgb:/rgb\(\s*\d{1,3}\s*\,\s*\d{1,3}\s*\,\s*\d{1,3}\s*\)/,
        rgba:/rgba\(\s*\d{1,3}\s*\,\s*\d{1,3}\s*\,\s*\d{1,3}\s*,\s*(?:\d+|0\.\d+)\s*\)/,
    }
    reg.forEach(item => {
        console.log(color.match(item));
    })
    return 'rgb';
}