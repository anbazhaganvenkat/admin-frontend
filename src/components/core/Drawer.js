import React from "react";
import ReactCSS from "react-cssobj";

const { css, mapClass } = ReactCSS({
  "#drawerContainer": {
    transition:
      "padding-right, padding-left, margin-left, margin-right, width, flex",
    transitionDuration: "0.25s",
    position: "relative"
  },
  ".drawerLayout": {
    position: "fixed",
    background: "#fff",
    bottom: 0,
    top: 0
  },
  ".leftDrawer": {
    borderRight: "1px solid #ccc",
    transition: "left",
    transitionDuration: "0.25s",
    zIndex: 999
  },
  ".rightDrawer": {
    borderLeft: "1px solid #ccc",
    transition: "right",
    transitionDuration: "0.25s"
  },
  ".leftDrawerVisible": {},
  ".rightDrawerVisible": {}
});

export default class Drawer extends React.Component {
  constructor() {
    super();
    this.drawerLayout = React.createRef();
    this.state = {};
  }

  componentWillMount() {
    const { left, isOpen, width } = this.props;
    this.setState({ left, isOpen, width }, () => this.updateCSS());
  }

  componentDidMount() {
    setTimeout(() => {
      const offset = this.drawerLayout.current.parentElement.getBoundingClientRect();
      this.setState({ offsetTop: offset.top, offsetLeft: offset.left }, () =>
        this.updateCSS()
      );
    }, 0);
  }

  componentWillReceiveProps(props) {
    const { left, isOpen, width } = props;
    this.setState({ left, isOpen, width }, () => this.updateCSS());
  }

  positionLeft() {
    const { isOpen, width, offsetLeft, offsetTop } = this.state;
    const drawerWidth = width || 250;

    css.set([".leftDrawer"], {
      width: `${drawerWidth}px`,
      left: `${offsetLeft - drawerWidth}px`,
      top: `${offsetTop}px`
    });

    css.set(["#drawerContainer"], {
      paddingLeft: `${isOpen ? drawerWidth : 0}px`
    });

    css.set([".leftDrawerVisible"], {
      left: `${isOpen ? offsetLeft : 0}px`
    });
  }

  positionRight() {
    const { isOpen, width, offsetTop } = this.state;
    const drawerWidth = width || 250;

    css.set([".rightDrawer"], {
      width: `${drawerWidth}px`,
      right: `${-drawerWidth}px`,
      top: `${offsetTop}px`
    });

    css.set(["#drawerContainer"], {
      paddingRight: `${isOpen ? drawerWidth : 0}px`
    });

    css.set([".rightDrawerVisible"], {
      right: `${isOpen ? 0 : -drawerWidth}px`
    });
  }

  updateCSS() {
    const { left, isOpen } = this.state;
    isOpen
      ? document.body.classList.add("drawer-visible")
      : document.body.classList.remove("drawer-visible");
    return left ? this.positionLeft() : this.positionRight();
  }

  render() {
    const { left, children, isOpen } = this.props;
    return mapClass(
      <div
        ref={this.drawerLayout}
        className={`${isOpen ? "drawerLayout" : ""} ${
          left ? "left" : "right"
        }Drawer ${isOpen ? `${left ? "left" : "right"}DrawerVisible` : ""}`}
      >
        {children}
      </div>
    );
  }
}
