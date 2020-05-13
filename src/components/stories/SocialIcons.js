import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { host } from "storybook-host";

import { SocialIcons } from "../index";

storiesOf("SocialIcons", module)
  .addDecorator(
    host({
      align: "center middle"
    })
  )
  .add(
    "SocialIcons",
    withInfo()(() => {
      return (
        <SocialIcons
          facebook="https://www.facebook.com/thidiff/"
          twitter="https://twitter.com/thidiff"
          linkedIn="https://www.linkedin.com/company/thidiff"
        />
      );
    })
  )
  .add(
    "SocialIcons Facebook",
    withInfo()(() => {
      return <SocialIcons facebook="https://www.facebook.com/thidiff/" />;
    })
  )
  .add(
    "SocialIcons Twitter",
    withInfo()(() => {
      return <SocialIcons twitter="https://twitter.com/thidiff" />;
    })
  )
  .add(
    "SocialIcons LinkedIn",
    withInfo()(() => {
      return (
        <SocialIcons linkedIn="https://www.linkedin.com/company/thidiff" />
      );
    })
  );
