import { IWindowManager, WMState } from './wm.types';
import { WM } from './wm';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component, ReactNode } from 'react';
import { v4 as uuidv4 } from "uuid";
import { Theme } from './theme/theme';
import {
  Wrapper,
  ContentWrapper,
  Button,
} from './theme/styled';
import { FinderProps, FinderState, IHandle, INode, INodeProps } from './finder.types';

export class Finder extends Component<FinderProps, FinderState> {
  private handler: Map<string, IHandle> = new Map();
  private taskbarButtons: Array<string> = [];
  private colorSelect = '';
  private deferred: any = null;
  private deferredNodes: Map<string, INode> = new Map();

  constructor(props: FinderProps) {
    super(props);
    this.state = {
      selection: '',
      update: 0,
    }
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

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown(event: any) {
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

  onMount(id: string, wm: IWindowManager) {
    const h = this.handler.get(id);
    if (h) {
      h.wm = wm;
      h.wm.setHidden(true);
      this.update();
    }
  }

  onUnmount(id: string, wm: IWindowManager) {
    this.remove(id);
  }

  onClose(id: string) {
    const { selection } = this.state
    const h = this.handler.get(id);
    if (id === selection && h && h.propsNode.fullscreen) {
      this.setState({ selection: '' });
    }
    this.remove(id);
    this.removeButton(id);
  }

  onMinimize(id: string) {
    const h = this.handler.get(id);
    if (h) {
      if (h.wm && h.propsNode.minimizable) {
        h.wm.minimize();
      }
      this.update();
    }
  }

  onFullscreen(id: string) {
    const h = this.handler.get(id);
    if (h && h.wm && h.propsNode.fullscreen) {
      h.wm.fullscreen();
    }
  }

  onMove(id: string, state: WMState) {
    //console.log('Finder: moving window');
  }

  onResize(id: string, state: WMState) {
    //console.log('Finder: resizing window');
  }

  onClickButton(id: string) {
    const { selection } = this.state;
    const h = this.handler.get(id);

    if (h && h.wm) {
      const hidden = (selection === id) ? !h.wm.isHidden() : false;


      if (h.propsNode.minimizable) {
        h.wm.setHidden(hidden);
      }
      else if (h.wm.isHidden()) h.wm.setHidden(false);

      if (!hidden && selection !== id) {
        //h.wm.setZIndex(Stacker.getNextIndex(h.wm.getZIndex()));
        this.onSelectWindow(id)
      }
    }
  }

  changeZIndex(id: string) {
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

  onSelectWindow(id: string) {
    this.changeZIndex(id);
    this.setState({ selection: id });
  }

  public update() {
    let { update } = this.state
    this.setState({ update: ++update });
  }

  public add(node: INode): string {
    node.children
    const id = uuidv4();
    this.deferredNodes.set(id, node);
    if (!this.deferred) {
      const interval = 100;
      this.deferred = setTimeout(() => {
        let i = 0;
        this.deferred = null;
        this.deferredNodes.forEach((v, k) => {
          const timeout = i * interval;
          setTimeout(() => { this.create(k, v); this.update(); }, timeout)
          i++;
        })
        this.deferredNodes.clear();
      }, interval)
    }
    return id;
  }

  public remove(id: string) {
    const h = this.handler.get(id);
    if (h) {
      this.handler.delete(id);
      this.update();
    }
  }

  removeButton(id: string) {
    const index = this.taskbarButtons.indexOf(id);
    const arrayButtons = this.taskbarButtons.slice(0, index).concat(this.taskbarButtons.slice(index + 1));
    this.taskbarButtons = arrayButtons;
  }

  private create(id: string, node: INode) {
    const initialZIndex = this.handler.size + 1;
    const { withTaskBar } = this.props;
    const rn = (
      <WM
        key={"window_" + id}
        id={id}
        title={node.title}
        isResizable={node.resizable}
        initialZIndex={initialZIndex}
        initialPosition={node.initialPosition}
        initialSize={node.initialSize}
        onClose={withTaskBar ? () => this.onClose(id) : undefined}
        onMouseDown={() => this.onSelectWindow(id)}
        onMinimize={withTaskBar ? () => this.onMinimize(id) : undefined}
        onFullscreen={withTaskBar ? () => this.onFullscreen(id) : undefined}
        onMove={(state: any) => { this.onMove(id, state) }}
        onResize={(state: any) => { this.onResize(id, state) }}
        onMount={(wm: any) => this.onMount(id, wm)}
        onUnmount={(wm: any) => this.onUnmount(id, wm)}
        header={node.header}
        hprops={node.hProps}
      >
        {node.children}
      </WM>
    );
    this.taskbarButtons.push(id);
    const propsNode: INodeProps = {
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
    const btns: JSX.Element[] = [];
    const margin = 5;
    this.taskbarButtons.forEach((id) => {
      const title = this.handler.get(id)?.wm?.getTitle()
      const color = selection === id ? this.colorSelect : undefined
      const border = selection === id ? 2 : undefined
      let button: JSX.Element;
      const onClickHandler = () => this.onClickButton(id);
      if (buttons) {
        button = React.cloneElement(buttons, { key: "button_" + id, onClick: onClickHandler, children: title })
      }
      else {
        button =
          <Button
            key={"button_" + id}
            margin={margin}
            color={color}
            border={border}
            onClick={onClickHandler}
          >
            {title}
          </Button>
      }
      btns.push(button);
    });

    return (
      <ContentWrapper
        key={"CW_" + this.handler.size + 1}
        padding={this.props.padding}
      >
        {btns}
      </ContentWrapper>
    );

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
    const nodes: ReactNode[] = []
    this.handler.forEach(h => {
      nodes.push(h.node);
    })

    const { wrapperButtons } = this.props;
    const renderButton = this.renderButton();
    let wrapperButton: JSX.Element;
    if (wrapperButtons) {
      wrapperButton = React.cloneElement(wrapperButtons,
        {
          children: renderButton
        })
    }
    else {
      wrapperButton = <Wrapper
        minHeight={minTaskBarHeight ? minTaskBarHeight : height}
        minWidth={minTaskBarWidth}
        style={styleTaskBar}
        isActive={true}
        className={className}
      >
        {this.renderButton()}
      </Wrapper>
    }

    // nameTheme è opzionale, e può assumere i valori: 'light' o 'dark'
    // se nameTheme è vuoto o non è valorizzato, viene visualizzato uno switch per cambiare il tema
    return ReactDOM.createPortal(
      <Theme name='light'>
        {nodes}
        {withTaskBar ? (
          wrapperButton
        ) : (
          <></>
        )}
      </Theme>,
      document.body
    );
  }
}
