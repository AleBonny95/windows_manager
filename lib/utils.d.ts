import { Coords, Size, Positioning } from "./domain";
export declare const defaultSize: Size;
export declare const getBoundaryCoords: (coords: Coords, size: Size, padding?: number) => Coords;
export declare const getCoordsFromPosition: (pos?: Positioning, size?: Size) => Coords;
export declare const isSmartPosition: (position: Positioning | Coords) => position is Positioning;
