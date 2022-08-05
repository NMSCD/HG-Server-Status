export const approximateColor1ToColor2ByPercent = (color1: string, color2: string, percent: number) => {
    let localPerc = percent;
    if (localPerc > 1.0) localPerc = 1;

    const red1 = parseInt(color1[1] + color1[2], 16);
    const green1 = parseInt(color1[3] + color1[4], 16);
    const blue1 = parseInt(color1[5] + color1[6], 16);

    const red2 = parseInt(color2[1] + color2[2], 16);
    const green2 = parseInt(color2[3] + color2[4], 16);
    const blue2 = parseInt(color2[5] + color2[6], 16);

    const red = Math.round(mix(red1, red2, localPerc));
    const green = Math.round(mix(green1, green2, localPerc));
    const blue = Math.round(mix(blue1, blue2, localPerc));

    return generateHex(red, green, blue);
}

export const generateHex = (r: number, g: number, b: number) => {
    let rHex = r.toString(16);
    let gHex = g.toString(16);
    let bHex = b.toString(16);

    while (rHex.length < 2) { rHex = "0" + r; }
    while (gHex.length < 2) { gHex = "0" + g; }
    while (bHex.length < 2) { bHex = "0" + b; }

    return "#" + rHex + gHex + bHex;
}

export const mix = (start: number, end: number, percent: number) => {
    return start + ((percent) * (end - start));
}