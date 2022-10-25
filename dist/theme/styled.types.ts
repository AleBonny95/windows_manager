export interface WrapperProps {
  isActive: boolean;
  minWidth?: number;
  minHeight?: number | string;
}

export interface HeaderProps {
  isActive: boolean;
  height: number;
  isDraggable?: boolean;
  padding?: number;
  cursor: string;
}

export interface WrapperHeaderProps {
  isActive: boolean;
}

export interface ButtonProps {
  margin?: number;
  color?: string;
  border?: number;
}

export interface ContentWrapperProps {
  padding?: number;
}
