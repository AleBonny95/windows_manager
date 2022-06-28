"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const styled_1 = require("./theme/styled");
class Header extends react_1.Component {
    minimize = null;
    fullscreen = null;
    close = null;
    title = '';
    active = false;
    constructor(props) {
        super(props);
        this.title = props.title;
        this.state = {
            action: 0x00,
            update: 0,
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    componentDidMount() {
        const { onClose, onMinimize, onFullscreen } = this.props;
        if (onClose) {
            const onCloseHandler = () => onClose(this.state);
            this.onClose(onCloseHandler);
        }
        if (onMinimize) {
            const onMinimizeHandler = () => onMinimize(this.state);
            this.onMinimize(onMinimizeHandler);
        }
        if (onFullscreen) {
            const onFullscreenHandler = () => onFullscreen(this.state);
            this.onClose(onFullscreenHandler);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    componentWillUnmount() {
    }
    onMinimize(listener) {
        this.minimize = listener;
    }
    onFullscreen(listener) {
        this.fullscreen = listener;
    }
    onClose(listener) {
        this.close = listener;
    }
    setTitle(title) {
        this.title = title;
    }
    update() {
        let { update } = this.state;
        this.setState({ update: update++ });
    }
    render() {
        const { action } = this.state;
        const { onClose, onMinimize, onFullscreen, hProps } = this.props;
        const { buttonClose, buttonMinimize, buttonFullscreen } = this.props;
        let closeIcon = null;
        let minIcon = null;
        let fullscreenIcon = null;
        if (hProps && hProps.isClosable && onClose) {
            const onCloseHandler = () => onClose(this.state);
            closeIcon = buttonClose ?
                (React.cloneElement(buttonClose, { onClick: onCloseHandler })) :
                (React.createElement(styled_1.CloseIcon, { onClick: onCloseHandler }));
        }
        if (hProps && hProps.isMinimizable && onMinimize) {
            const onMinimizeHandler = () => onMinimize(this.state);
            minIcon = buttonMinimize ?
                (React.cloneElement(buttonMinimize, { onClick: onMinimizeHandler })) :
                (React.createElement(styled_1.MinIcon, { onClick: onMinimizeHandler }));
        }
        if (hProps && hProps.canFullscreen && onFullscreen) {
            const onFullscreenHandler = () => { onFullscreen(this.state); };
            fullscreenIcon = buttonFullscreen ?
                (React.cloneElement(buttonFullscreen, { onClick: onFullscreenHandler })) :
                (React.createElement(styled_1.FullscreenIcon, { onClick: onFullscreenHandler }));
        }
        let cursor = 'default';
        if (hProps && hProps.isDraggable) {
            cursor = action === 0xf00 ? '-webkit-grabbing' : '-webkit-grab';
        }
        const height = this.props.height ? this.props.height : 30;
        return (React.createElement(styled_1.WindowHeader, { isActive: this.active, height: height, isDraggable: hProps ? hProps.isDraggable : false, padding: this.props.padding, cursor: cursor },
            React.createElement(styled_1.WindowTitle, null, this.title),
            closeIcon,
            fullscreenIcon,
            minIcon));
    }
}
exports.Header = Header;
