import styled from 'styled-components';
import {Sun} from '@styled-icons/boxicons-solid/Sun'
import {Moon} from '@styled-icons/heroicons-solid/Moon'
import * as bootstrap from '@styled-icons/bootstrap'
import { GlobalThemeProps } from './global.types'

//-------------------INTERFACE-------------------//

import { ButtonProps, ContentWrapperProps, HeaderProps, WrapperHeaderProps, WrapperProps } from "./styled.types";

//-------------------CONST-------------------//

export const defaultMinWidth = 400;
export const defaultMinHeight = 225;

export const rightResizeCursor = 'ew-resize';
export const bottomResizeCursor = 'ns-resize';
export const bottomRightResizeCursor = 'nwse-resize';

//-------------------STYLE ELEMENTS-------------------//

const wrapperStyles = ({isActive}: WrapperProps) => {
  if (isActive) {
    return `
      
    `;
  }

  return `opacity: 1;`;
};

export const Container = styled.div`
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
    content: '';
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

export const Wrapper = styled.div`
  ${wrapperStyles}
  position: fixed;
  display: inline-flex;
  flex-direction: column;
  background: ${({ theme }: GlobalThemeProps) => theme.background};
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 5px, rgba(0, 0, 0, 0.1) 0px 1px 1px;
  min-width: ${({minWidth}: WrapperProps) => minWidth ? minWidth + `px` : defaultMinWidth + `px`};
  min-height: ${({minHeight}: WrapperProps) => minHeight ? minHeight + `px` : `fit-content`};
  user-select: none;
  `;
  /* defaultMinHeight + `px`}; */

  export const WrapperHeader = styled.div`
  background-color: ${({isActive}: WrapperHeaderProps) => isActive ?  `red` : `grey`};
  `;
  /* background: white; */

export const WindowHeader = styled.div`
  height: ${({height}: HeaderProps) => height ? height + `px` : `30px`};
  min-height: 30px;
  border-bottom: 1px solid #ccc;
  cursor: ${({cursor}: HeaderProps) => cursor};
  align-items: center;
  padding: ${({padding}: HeaderProps) => padding ? padding + `px` : `5px`};
`;

//cursor: ${({isDraggable}: HeaderProps) => isDraggable ? `-webkit-grab` : `default`};
// display: flex;
// justify-content: space-between;

export const ContentWrapper = styled.div`
  padding: ${({padding}: ContentWrapperProps) => padding ? padding + `px` : `0`};
`;


export const WindowTitle = styled.div`
  color: ${({ theme }: GlobalThemeProps) => theme.text};
  white-space: nowrap;
  max-width: calc(100% - 25px);
  overflow: hidden;
  text-overflow: ellipsis;
  float: left;
`;

export const RightResizeHandle = styled.div`
  width: 20px;
  height: calc(100% - 50px);
  position: absolute;
  bottom: 20px;
  right: 0;
  cursor: ${rightResizeCursor};
`;

export const BottomResizeHandle = styled.div`
  height: 20px;
  width: calc(100% - 40px);
  position: absolute;
  bottom: 0;
  left: 20px;
  cursor: ${bottomResizeCursor};
`;

export const BottomRightResizeHandle = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: ${bottomRightResizeCursor};
`;

export const Button = styled.button`
  margin: ${({margin}: ButtonProps) => margin ? margin + `px` : `0`}; 
  color: ${({color}: ButtonProps, ) => color ? color : `#006BB4`}; 
  border-bottom: ${({border, color}: ButtonProps) => (border ? border + `px solid `+ (color ? color : `#006BB4`) : `none`)};
  
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

export const Icons = styled.span`
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

export const CloseIcon = styled.div`
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
  &:before, &:after {
    position: absolute;
    right: 15px;
    content: ' ';
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

export const FullscreenIcon = styled.div`
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
    content: ' ';
    height: 21px;
    width: 2px;
    background-color: #333;
  }
`;

export const MinIcon = styled.div`
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
    content: ' ';
    height: 21px;
    width: 2px;
    background-color: #333;
  }
  
   &:after {
    transform: rotate(90deg);
  }
`;


export const CloseIconBootstrap = styled(bootstrap.XCircleFill)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  float: right;
  color: ${({ theme }) => theme.text};
  &:hover {
    color: white;
  }`;

export const MinIconBootstrap = styled(bootstrap.DashCircleFill)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  float: right;
  color: ${({ theme }) => theme.text};
  &:hover {
    color: white;
  }`;

export const MaxiIconBootstrap = styled(bootstrap.StopCircleFill)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  float: right;
  color: ${({ theme }) => theme.text};
  &:hover {
    color: white;
  }`;
/* `
  color: ${({ theme }) => theme.text};
`; */

export const SunIcon = styled(Sun)``;

export const MoonIcon = styled(Moon)``;
