import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { host } from "storybook-host";

import { Email } from "../index";

storiesOf("Email", module)
  .addDecorator(
    host({
      align: "center middle"
    })
  )
  .add(
    "Email with initial value",
    withInfo()(() => {
      return <Email email="test@thidiff.com" />;
    })
  )
  .add(
    "Email with initial value and class name",
    withInfo()(() => {
      return <Email email="test@thidiff.com" className="text-danger" />;
    })
  )
  .add(
    "Email with initial value and link class name",
    withInfo()(() => {
      return (
        <Email
          email="test@thidiff.com"
          className="text-danger"
          linkClassName="text-danger"
        />
      );
    })
  );
