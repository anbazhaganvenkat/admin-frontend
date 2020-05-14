import React from "react";
import { Container } from "reactstrap";
import SocialIcons from "../SocialIcons";

const EndFooter = () => {
  return (
    <div className={["end-footer", "bg-dark"].join(" ")}>
      <Container>
        <div className="endfooter-wrapper d-flex justify-content-stretch text-white">
          <p>
            © 2020 admin
          </p>

        </div>
      </Container>
    </div>
  );
};

export default EndFooter;
