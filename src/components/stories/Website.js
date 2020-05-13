import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { host } from "storybook-host";

import { Website } from "../index";

storiesOf("Website", module)
  .addDecorator(
    host({
      align: "center middle"
    })
  )
  .add(
    "Website with initial value",
    withInfo()(() => {
      return <Website website="http://www.thidiff.com" />;
    })
  )
  .add(
    "Website with initial value and class name",
    withInfo()(() => {
      return (
        <Website website="http://www.thidiff.com" className="text-danger" />
      );
    })
  )
  .add(
    "Website with initial value and link class name",
    withInfo()(() => {
      return (
        <Website
          website="http://www.thidiff.com"
          className="text-danger"
          linkClassName="text-danger"
        />
      );
    })
  )
  .add(
    "Website with custom text",
    withInfo()(() => {
      return <Website website="http://www.thidiff.com">ThiDiff</Website>;
    })
  );
