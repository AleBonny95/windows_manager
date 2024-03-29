import { Coords, Positioning, Size } from "./domain";
import { ReactNode } from "react";
import { Finder } from "./finder";
import { HeaderBehavior } from "./headerTypes";
import { IWindowManager } from "./wmTypes";

export interface INodeProps {
  resizable: boolean;
  draggable: boolean;
  closable: boolean;
  minimizable: boolean;
  fullscreen: boolean;
  initialPosition?: Positioning | Coords;
  initialSize?: Size;
}

export interface INode {
  wid: string;
  children: ReactNode;
  header?: JSX.Element;
  hProps: HeaderBehavior;
  title: string;
  resizable: boolean;
  initialPosition?: Positioning | Coords;
  initialSize?: Size;
}

export interface IHandle {
  wm: IWindowManager | null;
  node: ReactNode;
  propsNode: INodeProps;
}

export interface FinderProps {
  onMounted: (f: Finder) => void;
  nodes: INode[];
  zIndexStart?: number;
  withTaskBar: boolean;
  padding?: number;
  marginTaskBar?: number;
  minTaskBarHeight?: number;
  className?: string;
  buttons?: JSX.Element;
  wrapperButtons?: JSX.Element;
}

export interface FinderState {
  selection: string;
  update: number;
}
