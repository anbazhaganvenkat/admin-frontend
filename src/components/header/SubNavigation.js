import React from "react";
import { Col, Container } from "reactstrap";
import { ArrowLeft } from "../../assets/img/icons";

const SubNavigation = ({ redirectTo }) => (
  <div className="sub-navigation" style={{ cursor: "default" }}>
    <Container>
      <p
        style={{ width: "70px", cursor: "pointer" }}
        onClick={() => redirectTo()}
        className="text-link d-flex align-items-center"
      >
        <ArrowLeft /> Back
      </p>
    </Container>
  </div>
);

export default SubNavigation;
