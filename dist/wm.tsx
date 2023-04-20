import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { v4 as uuidv4 } from "uuid";
import {
  bottomResizeCursor,
  BottomResizeHandle,
  bottomRightResizeCursor,
  BottomRightResizeHandle,
  ContentWrapper,
  rightResizeCursor,
  RightResizeHandle,
  Wrapper,
  WrapperHeader
} from './theme/styled';
import { Header } from './header';
import { defaultSize, getBoundaryCoords, getCoordsFromPosition, isSmartPosition } from './utils';

import { WMProps, WMState } from './wmTypes';
import { Size } from './domain';

export class WM extends Component<WMProps, WMState> {
  private readonly wid: string;
  private headerElement: HTMLDivElement | null = null
  private contentElement: HTMLDivElement | null = null;
  private wrapperElement: HTMLDivElement | null = null;
  private headerHeight = 30;
  private x: number;
  private y: number;
  private minWidth?: number;
  private minHeight?: number;
  private width?: number;
  private LastWidth?: number;
  private height?: number;
  private lastHeight?: number;
  private posX: number;
  private posY: number;
  private offsetX: number;
  private offsetY: number;
  private zIndex: number;
  private active = false;
  private deferred: any = null;
  private initialized = false;

  constructor(props: WMProps) {
    super(props);
    this.wid = props.wid ? props.wid : uuidv4();

    this.state = {
      action: 0x0,
      update: 0,
      fullscreen: false,
      actionTerminate: 0
    }

    this.x = this.props.padding ? this.props.padding : 0;
    this.y = this.props.padding ? this.props.padding : 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.posX = 0;
    this.posY = 0;
    this.zIndex = this.props.initialZIndex ? (this.props.initialZIndex + 1) : 1;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('resize', this.onWindowResize);

    if (this.props.onMount) {
      this.props.onMount(this);
    }
  }

  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount(this);
    }
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('resize', this.onWindowResize);
  }

  private deferredUpdate(initialize: boolean, timeout: number) {
    if (this.deferred) {
      clearTimeout(this.deferred);
      this.deferred = null;
    }
    this.deferred = setTimeout(() => {
      if (initialize) {
        /*this.minWidth = undefined;
        this.minHeight = undefined;
        this.lifeCycle = 1;*/
        this.setHidden(false);
      }
      this.deferred = null;
      let { update } = this.state;
      this.setState({ update: ++update });
    }, timeout);
  }

  getState(): WMState {
    return this.state;
  }

  getId(): string {
    return this.wid;
  }

  getTitle(): string {
    return this.props.title;
  }

  getSize(): Size {
    const s: Size = { width: 0, height: 0 };
    s.width = (this.width) ? this.width : 0;
    s.height = (this.height) ? this.height : 0;
    return s
  }

  setSize(width: number, height: number) {
    if (this.renewSize(width, height)) {
      this.deferredUpdate(false, 0);
    }
  }

  setHidden(hidden: boolean) {
    if (this.wrapperElement) {
      this.wrapperElement.style.visibility = hidden ? 'hidden' : 'visible';
    }
  }

  isHidden() {
    if (this.wrapperElement) {
      if (this.wrapperElement.style.visibility === 'visible') {
        return false
      }
    }
    return true;
  }

  isFullscreen() {
    return this.state.fullscreen;
  }

  fullscreen() {
    const { fullscreen } = this.state;
    if (fullscreen) {
      this.width = this.LastWidth;
      this.height = this.lastHeight;
    }
    else {
      this.lastHeight = this.height;
      this.LastWidth = this.width;
    }
    this.setState({ fullscreen: !fullscreen });
  }

  restore() {
    const { fullscreen } = this.state;
    if (fullscreen) {
      this.setState({ fullscreen: false });
    }
  }

  minimize() {
    if (this.wrapperElement) {
      this.wrapperElement.style.visibility = 'hidden';
    }
  }

  onWindowResize = () => {
    const { x, y, width, height } = this;
    const size = width && height ? { width, height } : defaultSize;
    const { x: newX, y: newY } = getBoundaryCoords({ x, y }, size, this.props.padding);
    this.updatePosition(newX, newY);
  }

  onMouseDown(e: React.MouseEvent, action: number) {
    /* this.lifeCycle = 2; */
    const { hprops } = this.props;
    if (hprops.isDraggable && this.wrapperElement) {
      const rect = this.wrapperElement.getBoundingClientRect();
      this.offsetX = e.clientX - rect.x;
      this.offsetY = e.clientY - rect.y;
      this.posX = rect.x;
      this.posY = rect.y;
      this.setState({ action: action }, () => { if (this.props.onMouseDown) this.props.onMouseDown(this.state) });
    } else {
      this.setState({}, () => { if (this.props.onMouseDown) this.props.onMouseDown(this.state) });
    }
  }

  onMouseMove(e: MouseEvent) {
    const { action } = this.state;
    if (action & 0xf00) {
      const newX = e.clientX - this.offsetX;
      const newY = e.clientY - this.offsetY;
      const size = this.width && this.height ? { width: this.width, height: this.height } : defaultSize;
      const { x, y } = getBoundaryCoords({ x: newX, y: newY }, size, this.props.padding);
      this.updatePosition(x, y)
      return;
    }

    if (action & 0x00f || action & 0x0f0) {
      const { width, height } = this;
      let w = width;
      let h = height;
      const padding = this.props.padding ? this.props.padding : 0
      if (action & 0x00f) {
        const { posX } = this;
        const maxWidth = window.innerWidth - padding;
        const newWidth = e.clientX - posX;
        w = e.clientX > maxWidth ? width : newWidth;
      }
      if (action & 0x0f0) {
        const { posY } = this;
        const maxHeight = window.innerHeight - padding;
        const newHeight = e.clientY - posY;
        h = e.clientY > maxHeight ? height : newHeight;
      }
      this.updateSize(w, h);
    }
  }

  onMouseUp() {
    if (document.body.style.cursor !== '') {
      document.body.style.cursor = '';
    }
    this.setState({ action: 0x0, actionTerminate: Date.now() });
  }

  private renewPosition(x: number, y: number): boolean {
    if (x !== this.x || y !== this.y) {
      this.x = x;
      this.y = y;
      return true;
    }
    return false;
  }

  private renewSize(newWidth: number | undefined, newHeight: number | undefined): boolean {
    newWidth = newWidth && newWidth > 0 ? newWidth : 0;
    newHeight = newHeight && newHeight > 0 ? newHeight : 0;

    if (this.minWidth && newWidth < this.minWidth) newWidth = this.minWidth;
    if (this.minHeight && newHeight < this.minHeight) newHeight = this.minHeight;

    if (newWidth > 0 && newWidth !== this.width || newHeight > 0 && newHeight !== this.height) {
      this.width = newWidth;
      this.height = newHeight;
      return true;
    }
    return false;
  }

  updateSize(width: number | undefined, height: number | undefined) {
    if (this.renewSize(width, height)) {
      let { update } = this.state;
      this.setState({ update: ++update }, () => { if (this.props.onResize) this.props.onResize(this.state) });
    }
  }

  updatePosition(x: number, y: number) {
    if (this.renewPosition(x, y)) {
      let { update } = this.state;
      this.setState({ update: ++update }, () => { if (this.props.onMove) this.props.onMove(this.state) });
    }
  }

  setActive(active: boolean, zIndex: number) {
    this.active = active;
    this.zIndex = zIndex;
    this.deferredUpdate(false, 0);
  }

  getZIndex(): number {
    return this.zIndex;
  }

  initialize() {
    /* if (this.lifeCycle > 1) {
      return;
    } */
    const c = this.contentElement;
    if (!c) {
      return;
    }
    const headerHeight = this.headerElement ? this.headerElement.getBoundingClientRect().height : 0;
    const rc = c.getBoundingClientRect();
    let update = false;
    const { initialPosition, initialSize } = this.props;
    const size = initialSize ? initialSize : { width: rc.width, height: rc.height + headerHeight };
    if (this.renewSize(size.width, size.height)) {
      update = true;
    }
    if (initialPosition) {
      if (!this.initialized) {
        const cords = isSmartPosition(initialPosition) ? getCoordsFromPosition(initialPosition, size) : initialPosition;
        const { x, y } = getBoundaryCoords(cords, size, this.props.padding);
        if (this.renewPosition(x, y)) {
          update = true;
        }
      }
    }
    if (update) {
      /* this.lifeCycle = 1; */
      this.deferredUpdate(true, 25);
    }
    this.initialized = true;
  }

  saveHeaderRef(el: HTMLDivElement | null) {
    this.headerElement = el;
  }

  saveContentRef(el: HTMLDivElement | null) {
    this.contentElement = el;
    if (this.contentElement) {
      const resizeOb = new ResizeObserver(entries => {
        const elapsedTime = Date.now() - this.state.actionTerminate;

        if (this.state.action === 0x0 && elapsedTime > 1000) {
          this.initialize();
        }
      });
      resizeOb.observe(this.contentElement);
    }
  }

  saveWrapperRef(el: HTMLDivElement | null) {
    this.wrapperElement = el;
  }

  renderHeader() {
    let targetHeader: JSX.Element;
    const { header, hprops, onClose, onMinimize, onFullscreen, title } = this.props;

    if (!header) {
      targetHeader = (<Header
        title={title}
        padding={this.props.padding}
        height={this.headerHeight}
        hProps={hprops}
        onClose={onClose}
        onMinimize={onMinimize}
        onFullscreen={onFullscreen}
      />);
    } else {
      targetHeader = React.cloneElement(header, {
        title: title,
        onClose: onClose,
        onMinimize: onMinimize,
        onFullscreen: onFullscreen
      });
    }
    return (
      <WrapperHeader
        isActive={this.active}
        ref={(el) => { this.saveHeaderRef(el) }}
        onMouseDown={(e) => { this.onMouseDown(e, 0xf00) }}
      >
        {targetHeader}
      </WrapperHeader>);
  }

  renderContent() {
    const { children } = this.props;
    if (this.contentElement) {
      const { fullscreen } = this.state;
      if (!fullscreen) {
        const headerHeight = this.headerElement ? this.headerElement.clientHeight : 0;
        const fullHeight = this.contentElement.clientHeight + headerHeight;
        const fullWidth = this.contentElement.clientWidth;

        if (!this.minWidth) {
          this.minWidth = fullWidth
        } else if (fullWidth < this.minWidth) {
          this.minWidth = fullWidth;
        }
        if (!this.minHeight) {
          this.minHeight = fullHeight
        } else if (fullHeight < this.minHeight) {
          this.minHeight = fullHeight;
        }
        //this.width = fullWidth;
        //this.height = fullHeight;
      }
    }
    return (
      <ContentWrapper
        padding={this.props.padding}
        ref={(el) => { this.saveContentRef(el) }}
      >
        {children}
      </ContentWrapper>
    );
  }

  renderResizeHandles() {
    const { isResizable } = this.props;
    const { fullscreen } = this.state;
    if (!isResizable) {
      return;
    }
    if (fullscreen) {
      return null;
    }
    return [
      <RightResizeHandle
        key="right-resize"
        onMouseDown={(e) => {
          document.body.style.cursor = rightResizeCursor;
          this.onMouseDown(e, 0x00f);
        }}
      />,
      <BottomRightResizeHandle
        key="bottom-right-resize"
        onMouseDown={(e) => {
          document.body.style.cursor = bottomRightResizeCursor;
          this.onMouseDown(e, 0x0ff);
        }}
      />,
      <BottomResizeHandle
        key="bottom-resize"
        onMouseDown={(e) => {
          document.body.style.cursor = bottomResizeCursor;
          this.onMouseDown(e, 0x0f0);
        }}
      />,
    ];
  }

  render() {
    const { action, fullscreen } = this.state;
    const isActive = action !== 0x0;
    const { className } = this.props;

    const style = fullscreen ?
      { left: 0, top: 0, width: '100vw', height: '100vh', zIndex: 10000 } :
      { left: this.x, top: this.y, width: this.width, height: this.height, zIndex: this.zIndex };

    const onRef = fullscreen ?
      (e: HTMLDivElement | null) => { } :
      (e: HTMLDivElement | null) => this.saveWrapperRef(e);

    const onMouseDown = fullscreen ?
      (e: React.MouseEvent) => { } :
      (e: React.MouseEvent) => { this.setState({}, () => { if (this.props.onMouseDown) this.props.onMouseDown(this.state) }); };

    return ReactDOM.createPortal(
      <Wrapper
        id={this.wid}
        style={style}
        ref={onRef}
        isActive={isActive}
        className={className}
        onMouseDown={onMouseDown}
      >
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderResizeHandles()}
      </Wrapper>,
      document.body
    );
  }
}
