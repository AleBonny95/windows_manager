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
exports.Finder = void 0;
const wm_1 = require("./wm");
const React = __importStar(require("react"));
const ReactDOM = __importStar(require("react-dom"));
const react_1 = require("react");
const uuid_1 = require("uuid");
const theme_1 = require("./theme/theme");
const styled_1 = require("./theme/styled");
class Finder extends react_1.Component {
    handler = new Map();
    taskbarButtons = [];
    colorSelect = '';
    deferred = null;
    deferredNodes = new Map();
    constructor(props) {
        super(props);
        this.state = {
            selection: '',
            update: 0,
        };
        this.onWindowResize = this.onWindowResize.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        document.addEventListener("keydown", this.onKeyDown, false);
        this.props.onMounted(this);
        this.props.nodes.forEach((r) => {
            this.add(r);
        });
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
        document.removeEventListener("keydown", this.onKeyDown);
    }
    onKeyDown(event) {
        if (event.key === "Escape") {
            const h = this.handler.get(this.state.selection);
            if (h && h.wm) {
                h.wm.restore();
            }
        }
    }
    onWindowResize() {
        this.update();
    }
    onMount(id, wm) {
        const h = this.handler.get(id);
        if (h) {
            h.wm = wm;
            h.wm.setHidden(true);
            this.update();
        }
    }
    onUnmount(id, wm) {
        this.remove(id);
    }
    onClose(id) {
        const { selection } = this.state;
        const h = this.handler.get(id);
        if (id === selection && h && h.propsNode.fullscreen) {
            this.setState({ selection: '' });
        }
        this.remove(id);
        this.removeButton(id);
    }
    onMinimize(id) {
        const h = this.handler.get(id);
        if (h) {
            if (h.wm && h.propsNode.minimizable) {
                h.wm.minimize();
            }
            this.update();
        }
    }
    onFullscreen(id) {
        const h = this.handler.get(id);
        if (h && h.wm && h.propsNode.fullscreen) {
            h.wm.fullscreen();
        }
    }
    onMove(id, state) {
        //console.log('Finder: moving window');
    }
    onResize(id, state) {
        //console.log('Finder: resizing window');
    }
    onClickButton(id) {
        const { selection } = this.state;
        const h = this.handler.get(id);
        if (h && h.wm) {
            const hidden = (selection === id) ? !h.wm.isHidden() : false;
            if (h.propsNode.minimizable) {
                h.wm.setHidden(hidden);
            }
            else if (h.wm.isHidden())
                h.wm.setHidden(false);
            if (!hidden && selection !== id) {
                //h.wm.setZIndex(Stacker.getNextIndex(h.wm.getZIndex()));
                this.onSelectWindow(id);
            }
        }
    }
    changeZIndex(id) {
        const hwm = this.handler.get(id);
        if (hwm) {
            this.handler.delete(id);
            this.handler.set(id, hwm);
            let i = 0;
            const active = this.handler.size - 1;
            this.handler.forEach(h => {
                if (h.wm) {
                    h.wm.setActive(active == i, i);
                    i++;
                }
            });
        }
    }
    onSelectWindow(id) {
        this.changeZIndex(id);
        this.setState({ selection: id });
    }
    update() {
        let { update } = this.state;
        this.setState({ update: ++update });
    }
    add(node) {
        node.children;
        const id = (0, uuid_1.v4)();
        this.deferredNodes.set(id, node);
        if (!this.deferred) {
            const interval = 100;
            this.deferred = setTimeout(() => {
                let i = 0;
                this.deferred = null;
                this.deferredNodes.forEach((v, k) => {
                    const timeout = i * interval;
                    setTimeout(() => { this.create(k, v); this.update(); }, timeout);
                    i++;
                });
                this.deferredNodes.clear();
            }, interval);
        }
        return id;
    }
    remove(id) {
        const h = this.handler.get(id);
        if (h) {
            this.handler.delete(id);
            this.update();
        }
    }
    removeButton(id) {
        const index = this.taskbarButtons.indexOf(id);
        const arrayButtons = this.taskbarButtons.slice(0, index).concat(this.taskbarButtons.slice(index + 1));
        this.taskbarButtons = arrayButtons;
    }
    create(id, node) {
        const initialZIndex = this.handler.size + 1;
        const { withTaskBar } = this.props;
        const rn = (React.createElement(wm_1.WM, { key: "window_" + id, id: id, title: node.title, isResizable: node.resizable, initialZIndex: initialZIndex, initialPosition: node.initialPosition, initialSize: node.initialSize, onClose: withTaskBar ? () => this.onClose(id) : undefined, onMouseDown: () => this.onSelectWindow(id), onMinimize: withTaskBar ? () => this.onMinimize(id) : undefined, onFullscreen: withTaskBar ? () => this.onFullscreen(id) : undefined, onMove: (state) => { this.onMove(id, state); }, onResize: (state) => { this.onResize(id, state); }, onMount: (wm) => this.onMount(id, wm), onUnmount: (wm) => this.onUnmount(id, wm), header: node.header, hprops: node.hProps }, node.children));
        this.taskbarButtons.push(id);
        const propsNode = {
            closable: node.hProps.isClosable ? node.hProps.isClosable : false,
            minimizable: node.hProps.isMinimizable ? node.hProps.isMinimizable : false,
            draggable: node.hProps.isDraggable ? node.hProps.isDraggable : false,
            fullscreen: node.hProps.canFullscreen ? node.hProps.canFullscreen : false,
            resizable: node.resizable,
            initialPosition: node.initialPosition,
            initialSize: node.initialSize
        };
        this.handler.set(id, { node: rn, wm: null, propsNode: propsNode });
    }
    renderButton() {
        const { selection } = this.state;
        const { buttons } = this.props;
        const btns = [];
        const margin = 5;
        this.taskbarButtons.forEach((id) => {
            const title = this.handler.get(id)?.wm?.getTitle();
            const color = selection === id ? this.colorSelect : undefined;
            const border = selection === id ? 2 : undefined;
            let button;
            const onClickHandler = () => this.onClickButton(id);
            if (buttons) {
                button = React.cloneElement(buttons, { key: "button_" + id, onClick: onClickHandler, children: title });
            }
            else {
                button =
                    React.createElement(styled_1.Button, { key: "button_" + id, margin: margin, color: color, border: border, onClick: onClickHandler }, title);
            }
            btns.push(button);
        });
        return (React.createElement(styled_1.ContentWrapper, { key: "CW_" + this.handler.size + 1, padding: this.props.padding }, btns));
    }
    render() {
        const { className, minTaskBarHeight, marginTaskBar, withTaskBar } = this.props;
        const zIndex = 1000;
        const margin = marginTaskBar ? marginTaskBar : 10;
        const minHeight = minTaskBarHeight ? minTaskBarHeight : 50;
        const height = "fit-content";
        const minHeightProp = "min-height";
        const minTaskBarWidth = window.innerWidth - (margin * 2);
        const styleTaskBar = { left: margin, bottom: 0, zIndex: zIndex };
        //top: window.innerHeight - minHeight - margin, minHeightProp: height,
        const nodes = [];
        this.handler.forEach(h => {
            nodes.push(h.node);
        });
        const { wrapperButtons } = this.props;
        const renderButton = this.renderButton();
        let wrapperButton;
        if (wrapperButtons) {
            wrapperButton = React.cloneElement(wrapperButtons, {
                children: renderButton
            });
        }
        else {
            wrapperButton = React.createElement(styled_1.Wrapper, { minHeight: minTaskBarHeight ? minTaskBarHeight : height, minWidth: minTaskBarWidth, style: styleTaskBar, isActive: true, className: className }, this.renderButton());
        }
        // nameTheme è opzionale, e può assumere i valori: 'light' o 'dark'
        // se nameTheme è vuoto o non è valorizzato, viene visualizzato uno switch per cambiare il tema
        return ReactDOM.createPortal(React.createElement(theme_1.Theme, { name: 'light' },
            nodes,
            withTaskBar ? (wrapperButton) : (React.createElement(React.Fragment, null))), document.body);
    }
}
exports.Finder = Finder;
