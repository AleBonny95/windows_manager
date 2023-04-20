"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinIcon = exports.FullscreenIcon = exports.CloseIcon = exports.Icons = exports.Button = exports.BottomRightResizeHandle = exports.BottomResizeHandle = exports.RightResizeHandle = exports.WindowTitle = exports.ContentWrapper = exports.WindowHeader = exports.WrapperHeader = exports.Wrapper = exports.Container = exports.bottomRightResizeCursor = exports.bottomResizeCursor = exports.rightResizeCursor = exports.defaultMinHeight = exports.defaultMinWidth = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
//-------------------CONST-------------------//
exports.defaultMinWidth = 400;
exports.defaultMinHeight = 225;
exports.rightResizeCursor = "ew-resize";
exports.bottomResizeCursor = "ns-resize";
exports.bottomRightResizeCursor = "nwse-resize";
//-------------------STYLE ELEMENTS-------------------//
const wrapperStyles = ({ isActive }) => {
    if (isActive) {
        return `
      
    `;
    }
    return `opacity: 1;`;
};
exports.Container = styled_components_1.default.div `
  .switch {
    position: relative;
    display: inline-block;
    width: 4rem;
    height: 1.5rem;
  }
  .switch input {
    opacity: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.background};
    -webkit-transition: 0.2s;
    transition: 0.2s;
    box-shadow: 0 0 2px ${({ theme }) => theme.text};
  }
  .slider:before {
    position: absolute;
    content: "";
    background-color: ${({ theme }) => theme.background};
    -webkit-transition: 0.2s;
    transition: 0.2s;
  }
  input:checked + .slider {
    background-color: ${({ theme }) => theme.background};
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(35px);
    -ms-transform: translateX(35px);
    transform: translateX(35px);
  }
  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }
  .slider.round:before {
    border-radius: 50%;
  }
`;
exports.Wrapper = styled_components_1.default.div `
  ${wrapperStyles}
  position: fixed;
  display: inline-flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 5px, rgba(0, 0, 0, 0.1) 0px 1px 1px;
  min-width: ${({ minWidth }) => minWidth ? minWidth + `px` : exports.defaultMinWidth + `px`};
  min-height: ${({ minHeight }) => minHeight ? minHeight + `px` : `min-content`};
  user-select: none;
`;
/* defaultMinHeight + `px`}; */
exports.WrapperHeader = styled_components_1.default.div `
  background-color: ${({ isActive }) => isActive ? `skyblue` : `grey`};
  border-radius: 3px 3px 0 0;
`;
/* background: white; */
exports.WindowHeader = styled_components_1.default.div `
  height: ${({ height }) => (height ? height + `px` : `30px`)};
  min-height: 30px;
  border-bottom: 1px solid #ccc;
  cursor: ${({ cursor }) => cursor};
  align-items: center;
  padding: ${({ padding }) => (padding ? padding + `px` : `5px`)};
`;
//cursor: ${({isDraggable}: HeaderProps) => isDraggable ? `-webkit-grab` : `default`};
// display: flex;
// justify-content: space-between;
exports.ContentWrapper = styled_components_1.default.div `
  padding: ${({ padding }) => padding ? padding + `px` : `0`};
  height: 100%;
  width: 100%;
`;
exports.WindowTitle = styled_components_1.default.div `
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  max-width: calc(100% - 25px);
  overflow: hidden;
  text-overflow: ellipsis;
  float: left;
`;
exports.RightResizeHandle = styled_components_1.default.div `
  width: 20px;
  height: calc(100% - 50px);
  position: absolute;
  bottom: 20px;
  right: 0;
  cursor: ${exports.rightResizeCursor};
`;
exports.BottomResizeHandle = styled_components_1.default.div `
  height: 20px;
  width: calc(100% - 40px);
  position: absolute;
  bottom: 0;
  left: 20px;
  cursor: ${exports.bottomResizeCursor};
`;
exports.BottomRightResizeHandle = styled_components_1.default.div `
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: ${exports.bottomRightResizeCursor};
`;
exports.Button = styled_components_1.default.button `
  margin: ${({ margin }) => (margin ? margin + `px` : `0`)}; 
  color: ${({ color }) => (color ? color : `#006BB4`)}; 
  border-bottom: ${({ border, color }) => border ? border + `px solid ` + (color ? color : `#006BB4`) : `none`};
  
  border-radius: 4px;
  padding: 10px 25px;
  font-family: "Inter UI", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 500;
  cursor: pointer;
  
  position: relative;
  display: inline-block;
   
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
  background: transparent; rgb(96,9,240);
  border: solid 1px #006BB4;
  border-top-color: #006BB4;
  border-right-color: #006BB4;
  border-bottom-color: #006BB4;
  border-left-color: #006BB4;
  transition: transform 250ms ease-in-out, background 250ms ease-in-out, -webkit-transform 250ms ease-in-out;
  
  &:before {
    height: 0%;
    width: 2px;
  }
  &:active {
    -webkit-transform: translateY(1px);
    transform: translateY(1px);
  }
  &:hover {
    text-decoration: underline solid;
    -webkit-transform: translateY(-1px);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px 0 rgba(54, 97, 126, 0.15), 0 2px 2px -1px rgba(54, 97, 126, 0.3);
    background-color: rgba(0, 107, 180, 0.1);
  }
}
`;
/*
box-shadow:inset 0px 2px 2px 0px rgba(255,255,255,.5),
font-family: 'Lato', sans-serif;
transition: all 0.3s ease;
border: none;
background: rgb(96,9,240);
background: linear-gradient(0deg, rgba(96,219,240,1) 0%, rgba(129,215,240,1) 100%);
&:hover{
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),-4px -4px 6px 0 rgba(116, 125, 136, .5),
    inset -4px -4px 6px 0 rgba(255,255,255,.2), inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
}
*/
//-------------------ICONS-------------------//
exports.Icons = styled_components_1.default.span `
  width: 100%;
  display: flex;
  justify-content: space-between;
  top: 25%;
  align-items: center;

  svg {
    color: ${({ theme }) => theme.text};
    z-index: 1;
  }
`;
exports.CloseIcon = styled_components_1.default.div `
  position: relative;
  width: 20px;
  height: 20px;
  opacity: 0.3;
  cursor: pointer;
  float: right;
  margin-right: 2px;
  &:hover {
    opacity: 1;
  }
  &:before,
  &:after {
    position: absolute;
    right: 15px;
    content: " ";
    height: 21px;
    width: 2px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;
exports.FullscreenIcon = styled_components_1.default.div `
  position: relative;
  width: 20px;
  height: 20px;
  opacity: 0.3;
  cursor: pointer;
  float: right;
  margin-left: auto;
  &:hover {
    opacity: 1;
  }
  &:after {
    position: absolute;
    right: 15px;
    content: " ";
    height: 21px;
    width: 2px;
    background-color: #333;
  }
`;
exports.MinIcon = styled_components_1.default.div `
  position: relative;
  width: 20px;
  height: 20px;
  opacity: 0.3;
  cursor: pointer;
  float: right;
  margin-right: 12px;
  &:hover {
    opacity: 1;
  }
  &:after {
    position: absolute;
    right: 15px;
    content: " ";
    height: 21px;
    width: 2px;
    background-color: #333;
  }

  &:after {
    transform: rotate(90deg);
  }
`;
// export const CloseIconBootstrap = styled(bootstrap.XCircleFill)`
//   width: 1.5rem;
//   height: 1.5rem;
//   cursor: pointer;
//   float: right;
//   color: ${({ theme }) => theme.text};
//   &:hover {
//     color: white;
//   }
// `;
//
// export const MinIconBootstrap = styled(bootstrap.DashCircleFill)`
//   width: 1.5rem;
//   height: 1.5rem;
//   cursor: pointer;
//   float: right;
//   color: ${({ theme }) => theme.text};
//   &:hover {
//     color: white;
//   }
// `;
//
// export const MaxiIconBootstrap = styled(bootstrap.StopCircleFill)`
//   width: 1.5rem;
//   height: 1.5rem;
//   cursor: pointer;
//   float: right;
//   color: ${({ theme }) => theme.text};
//   &:hover {
//     color: white;
//   }
// `;
/* `
  color: ${({ theme }) => theme.text};
`; */
// export const SunIcon = styled(Sun)``;
// export const MoonIcon = styled(Moon)``;
