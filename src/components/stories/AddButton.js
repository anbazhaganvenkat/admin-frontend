import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import { host } from "storybook-host";

import { AddButton } from "../index";

storiesOf("AddButton", module)
  .addDecorator(
    host({
      align: "center middle"
    })
  )
  .add(
    "Default Button",
    withInfo()(() => {
      return <AddButton onClick={action("clicked")} />;
    })
  )
  .add(
    "Button with Loading",
    withInfo()(() => {
      return <AddButton loading />;
    })
  )
  .add(
    "Submit Button",
    withInfo()(() => {
      return <AddButton type="submit" />;
    })
  );
