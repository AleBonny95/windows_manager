export interface IHeader {
    onMinimize(listener: () => void): void
    onFullscreen(listener: () => void): void
    onClose(listener: () => void): void
    setTitle(title: string): void
}

export interface HeaderBehavior {
    isDraggable?: boolean;
    isClosable?: boolean;
    isMinimizable?: boolean;
    canFullscreen?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {
    title?: string;
    padding?: number;
    height?: number;
    hProps?: HeaderBehavior;
    onClose?: (state: HeaderState) => void;
    onMinimize?: (state: HeaderState) => void;
    onFullscreen?: (state: HeaderState) => void;
    buttonClose?: JSX.Element;
    buttonMinimize?: JSX.Element;
    buttonFullscreen?: JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderState {
    action: number;
    update: number;
}