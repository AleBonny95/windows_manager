import { ReactNode } from "react"
import { Coords, Positioning, Size } from "./domain"
import { HeaderBehavior } from "./header.types"

export interface IWindowManager {
  getState(): WMState
  getId(): string
  setSize(width: number, height: number): void
  getSize(): { width: number, height: number }
  updatePosition(x: number, y: number, notify: boolean): void
  setActive(active: boolean, z: number): void
  getZIndex(): number
  getTitle(): string
  setHidden(v: boolean): void
  isHidden(): boolean
  minimize(): void
  fullscreen(): void
  restore(): void
}

export interface WMProps {
  id?: string;
  children: ReactNode;
  title: string;
  padding?: number;
  initialZIndex?: number;
  initialPosition?: Positioning | Coords;
  initialSize?: Size;
  isResizable?: boolean;
  onMouseDown?: (state: WMState) => void;
  onMove?: (state: WMState) => void;
  onResize?: (state: WMState) => void;
  onMount?: (wm: IWindowManager) => void;
  onUnmount?: (wm: IWindowManager) => void;
  className?: string;
  header?: JSX.Element;
  hprops: HeaderBehavior;
  onClose?: (state: any) => void;
  onMinimize?: (state: any) => void;
  onFullscreen?: (state: any) => void;
}

export interface WMState {
  action: number;
  update: number;
  fullscreen: boolean;
  actionTerminate: number;
}