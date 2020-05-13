import React from "react";
import { ChevronRight } from "../assets/img/icons";
import { InputGroup, InputGroupAddon } from "reactstrap";

const NewsletterSignupForm = () => {
  return (
    <form
      action=""
      onSubmit={e => e.preventDefault()}
      className={["form-wrapper"].join(" ")}
    >
      <div className="field-wrapper newsletter-wrapper">
        <InputGroup>
          <input
            type="email"
            placeholder={"Get the newsletter..."}
            className={"form-control"}
          />
          <InputGroupAddon addonType={"append"}>
            <button type="submit" className={["btn", "btn-dark"].join(" ")}>
              <ChevronRight />
            </button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </form>
  );
};

export default NewsletterSignupForm;
