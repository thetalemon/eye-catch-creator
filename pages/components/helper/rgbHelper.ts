
type RgbaObject = {
  red: number,
  green: number,
  blue: number,
  alpha: number
}

export type RgbObject = {
  red: number,
  green: number,
  blue: number
}

export function rgbaFormatter(rgba: RgbaObject): string {
  return `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${ rgba.alpha})`;
}

export function convertColorCode2RgbObject(colorCode: string): RgbObject {  
  return {
    red: parseInt(colorCode.substr(1, 2), 16),
    green: parseInt(colorCode.substr(3, 2), 16),
    blue: parseInt(colorCode.substr(5, 2), 16)
  }
}