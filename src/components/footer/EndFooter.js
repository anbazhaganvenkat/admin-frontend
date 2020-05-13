import React from "react";
import { Container } from "reactstrap";
import SocialIcons from "../SocialIcons";

const EndFooter = () => {
  return (
    <div className={["end-footer", "bg-dark"].join(" ")}>
      <Container>
        <div className="endfooter-wrapper d-flex justify-content-stretch text-white">
          <p>
            © 2017 Torchlite. All rights reserved. • 342 Massachusetts Avenue
            Ste. 203, Indianapolis, Indiana 46204 • 317-643-4200 •
            contact@torchlite.co
          </p>

          <SocialIcons
            className="social-icons sidebar-content-box sidebar-content"
            facebook={"https://facebook.com"}
            linkedIn={"https://linkedin.com"}
            instagram={"https://instagram.com"}
            twitter={"https://twitter.com"}
          />
        </div>
      </Container>
    </div>
  );
};

export default EndFooter;
