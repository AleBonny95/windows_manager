import { defaultMinWidth, defaultMinHeight } from "./theme/styled";
import {Coords, Size, Positioning} from "./domain";

export const defaultSize : Size = {width: defaultMinWidth, height: defaultMinHeight};

export const getBoundaryCoords = (coords: Coords, size: Size, padding?: number): Coords => {
  const p = padding ? padding : 0
  const {x, y} = coords;
  const {width, height} = size;
  const {innerWidth, innerHeight} = window;
  const maxX = innerWidth - (width || 0) - p;
  const maxY = innerHeight - (height || 0) - p;
  return {
    x: Math.min(Math.max(x, p), maxX),
    y: Math.min(Math.max(y, p), maxY)
  }
};

export const getCoordsFromPosition = (pos?: Positioning, size: Size = defaultSize): Coords => {
  const {innerWidth, innerHeight} = window;
  const {width, height} = size;
  const xCenter = (innerWidth / 2) - (width / 2);
  const yCenter = (innerHeight / 2) - (height / 2);

  switch (pos) {
    case 'top-left': default: return {x: 10, y: 10};
    case 'top-center': return {x: xCenter, y: 10};
    case 'bottom-center': return {x: xCenter, y: Infinity}
    case 'top-right': return {x: Infinity, y: 10};
    case 'bottom-left': return {x: 10, y: Infinity};
    case 'bottom-right': return {x: Infinity, y: Infinity};
    case 'center': return {x: xCenter, y: yCenter}
  }
}

export const isSmartPosition = (position: Positioning | Coords): position is Positioning =>  {
  return typeof position === 'string';
}