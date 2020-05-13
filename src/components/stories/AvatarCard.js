import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { host } from "storybook-host";

import { AvatarCard } from "../index";

storiesOf("AvatarCard", module)
  .addDecorator(
    host({
      align: "center middle"
    })
  )
  .add(
    "Avatar card with url, first name, last name and title",
    withInfo()(() => {
      return (
        <AvatarCard
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVDfzabJUj-8aOpuiRQ0WuC1KvwyPz_yTeKPrxHpL2eaQUtOsX"
          firstName="Test"
          lastName="User"
          title="Software Engineer"
        />
      );
    })
  )
  .add(
    "Avatar card with url, first name and last name",
    withInfo()(() => {
      return (
        <AvatarCard
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVDfzabJUj-8aOpuiRQ0WuC1KvwyPz_yTeKPrxHpL2eaQUtOsX"
          firstName="Test"
          lastName="User"
        />
      );
    })
  )
  .add(
    "Avatar card with url and title",
    withInfo()(() => {
      return (
        <AvatarCard
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVDfzabJUj-8aOpuiRQ0WuC1KvwyPz_yTeKPrxHpL2eaQUtOsX"
          title="Software Engineer"
        />
      );
    })
  )
  .add(
    "Avatar card with url, first name, last name, title and size",
    withInfo()(() => {
      return (
        <AvatarCard
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVDfzabJUj-8aOpuiRQ0WuC1KvwyPz_yTeKPrxHpL2eaQUtOsX"
          firstName="Test"
          lastName="User"
          size="lg"
          title="Software Engineer"
        />
      );
    })
  );
