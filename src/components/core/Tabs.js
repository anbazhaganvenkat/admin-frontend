import React from "react";
import { Row, Col } from "reactstrap";

export const Tab = props => <span {...props}>{props.children}</span>;

export default class Tabs extends React.Component {
  render() {
    const { children, active, onToggle } = this.props;

    return (
      <Row className="my-4">
        <Col xs="12" sm="4" md="3" lg="3">
          <ul className="tab-sidebar">
            {React.Children.map(children, (child, key) => {
              return (
                <li
                  key={key}
                  className={child.props.id === active ? "active" : ""}
                  onClick={() => onToggle(child.props.id)}
                >
                  {child.props.title} <i className="fa fa-angle-right" />
                </li>
              );
            })}
          </ul>
        </Col>
        <Col xs="12" sm="8" md="9" lg="9">
          <div className="tab-content">
            {React.Children.map(
              children,
              child => child.props.id === active && child
            )}
          </div>
        </Col>
      </Row>
    );
  }
}
