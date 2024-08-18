export default class ColorConvert {

    constructor(color) {
    // convert HSB в RGB
    function hsbConvertRgb(getColor) {

    let r; let g; let b; let transparency;
    if (getColor[3] != null) { transparency =  Number(getColor[3])} else { transparency =  1 };

    let hi = Math.floor((getColor[0] / 60) % 6);
    let vmin = ((100 - getColor[1])*getColor[2])/100;
    let vinc = vmin + (getColor[2] - vmin)*((getColor[0] % 60) / 60);
    let vdec = getColor[2] - (getColor[2] - vmin)*((getColor[0] % 60) / 60);

    let paramCalc = (data) => Math.round(data * 255 / 100);

    if (hi == 0) { r = paramCalc(getColor[2]); g = paramCalc(vinc); b = paramCalc(vmin);
    } else if (hi == 1) { r = paramCalc(vdec); g = paramCalc(getColor[2]); b = paramCalc(vmin);
    } else if (hi == 2) { r = paramCalc(vmin); g = paramCalc(getColor[2]); b = paramCalc(vinc);
    } else if (hi == 3) { r = paramCalc(vmin); g = paramCalc(vdec); b = paramCalc(getColor[2]);
    } else if (hi == 4) { r = paramCalc(vinc); g = paramCalc(vmin); b = paramCalc(getColor[2]);
    } else if (hi == 5) { r = paramCalc(getColor[2]); g = paramCalc(vmin); b = paramCalc(vdec);
    };

    return[r, g, b, transparency];
    };

    // convert HSB -> HEX
    function hsbСonverterHex(color) {
    const colorRGB = hsbConvertRgb(color);
    let recountOx = (data) => Number(data).toString(16).padStart(2, '0').toUpperCase()
    return[recountOx(colorRGB[0]), recountOx(colorRGB[1]), recountOx(colorRGB[2])]; 
    };

    // convert HSB -> HEXstyle
    function hsbСonverterHexStyle(color) {
        const colorRGB = hsbConvertRgb(color);
        let recountOx = (data) => Number(data).toString(16).padStart(2, '0').toUpperCase()
        return (`#${recountOx(colorRGB[0])}${recountOx(colorRGB[1])}${recountOx(colorRGB[2])}`); 
        };

    function rgbStyle(color) {
        let rgb = hsbConvertRgb(color);
        let rgbstyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${rgb[3]})`;
        return rgbstyle;
    }

    this.hsb = [color[0], color[1], color[2]];
    this.rgb = hsbConvertRgb(color);
    this.rgbstyle = rgbStyle(color);
    this.hex = hsbСonverterHex(color);
    this.hexstyle = hsbСonverterHexStyle(color);
    }
 
};