import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { host } from "storybook-host";

import { PhoneNumber } from "../index";

storiesOf("PhoneNumber", module)
  .addDecorator(
    host({
      align: "center middle"
    })
  )
  .add(
    "Phone Number with initial value",
    withInfo()(() => {
      return <PhoneNumber phone="1234567890" />;
    })
  )
  .add(
    "Phone Number with initial value and class name",
    withInfo()(() => {
      return <PhoneNumber phone="1234567890" className="text-danger" />;
    })
  )
  .add(
    "Phone Number with initial value and link class name",
    withInfo()(() => {
      return (
        <PhoneNumber
          phone="1234567890"
          className="text-danger"
          linkClassName="text-danger"
        />
      );
    })
  );
