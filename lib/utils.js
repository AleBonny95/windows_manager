"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSmartPosition = exports.getCoordsFromPosition = exports.getBoundaryCoords = exports.defaultSize = void 0;
const styled_1 = require("./theme/styled");
exports.defaultSize = { width: styled_1.defaultMinWidth, height: styled_1.defaultMinHeight };
const getBoundaryCoords = (coords, size, padding) => {
    const p = padding ? padding : 0;
    const { x, y } = coords;
    const { width, height } = size;
    const { innerWidth, innerHeight } = window;
    const maxX = innerWidth - (width || 0) - p;
    const maxY = innerHeight - (height || 0) - p;
    return {
        x: Math.min(Math.max(x, p), maxX),
        y: Math.min(Math.max(y, p), maxY)
    };
};
exports.getBoundaryCoords = getBoundaryCoords;
const getCoordsFromPosition = (pos, size = exports.defaultSize) => {
    const { innerWidth, innerHeight } = window;
    const { width, height } = size;
    const xCenter = (innerWidth / 2) - (width / 2);
    const yCenter = (innerHeight / 2) - (height / 2);
    switch (pos) {
        case 'top-left':
        default: return { x: 10, y: 10 };
        case 'top-center': return { x: xCenter, y: 10 };
        case 'bottom-center': return { x: xCenter, y: Infinity };
        case 'top-right': return { x: Infinity, y: 10 };
        case 'bottom-left': return { x: 10, y: Infinity };
        case 'bottom-right': return { x: Infinity, y: Infinity };
        case 'center': return { x: xCenter, y: yCenter };
    }
};
exports.getCoordsFromPosition = getCoordsFromPosition;
const isSmartPosition = (position) => {
    return typeof position === 'string';
};
exports.isSmartPosition = isSmartPosition;
