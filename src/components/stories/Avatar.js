import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { host } from "storybook-host";

import { Avatar } from "../index";

storiesOf("Avatar", module)
  .addDecorator(
    host({
      align: "center middle"
    })
  )
  .add(
    "Avatar without url and name",
    withInfo()(() => {
      return <Avatar />;
    })
  )
  .add(
    "Avatar with url",
    withInfo()(() => {
      return (
        <Avatar url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVDfzabJUj-8aOpuiRQ0WuC1KvwyPz_yTeKPrxHpL2eaQUtOsX" />
      );
    })
  )
  .add(
    "Avatar with first name and last name",
    withInfo()(() => {
      return <Avatar firstName="Test" lastName="User" />;
    })
  )
  .add(
    "Avatar with first name",
    withInfo()(() => {
      return <Avatar firstName="Test" />;
    })
  )
  .add(
    "Avatar with last name",
    withInfo()(() => {
      return <Avatar lastName="Account" />;
    })
  )
  .add(
    "Avatar with default url",
    withInfo()(() => {
      return (
        <Avatar defaultUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE4CdQbln3yPgRhFlcTFV3ug1aOO5Vb7iVp66_KoKbQrXINyt" />
      );
    })
  )
  .add(
    "Avatar large",
    withInfo()(() => {
      return (
        <Avatar
          size="lg"
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVDfzabJUj-8aOpuiRQ0WuC1KvwyPz_yTeKPrxHpL2eaQUtOsX"
        />
      );
    })
  )
  .add(
    "Avatar small",
    withInfo()(() => {
      return (
        <Avatar
          size="sm"
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVDfzabJUj-8aOpuiRQ0WuC1KvwyPz_yTeKPrxHpL2eaQUtOsX"
        />
      );
    })
  )
  .add(
    "Avatar medium",
    withInfo()(() => {
      return (
        <Avatar
          size="md"
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVDfzabJUj-8aOpuiRQ0WuC1KvwyPz_yTeKPrxHpL2eaQUtOsX"
        />
      );
    })
  )
  .add(
    "Avatar extra small",
    withInfo()(() => {
      return (
        <Avatar
          size="xs"
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVDfzabJUj-8aOpuiRQ0WuC1KvwyPz_yTeKPrxHpL2eaQUtOsX"
        />
      );
    })
  )
  .add(
    "Avatar with custom size",
    withInfo()(() => {
      return (
        <Avatar
          customSize={200}
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVDfzabJUj-8aOpuiRQ0WuC1KvwyPz_yTeKPrxHpL2eaQUtOsX"
        />
      );
    })
  )
  .add(
    "Avatar with custome color",
    withInfo()(() => {
      return (
        <Avatar firstName="Test" lastName="User" color="white" bgColor="blue" />
      );
    })
  )
  .add(
    "Avatar square size",
    withInfo()(() => {
      return (
        <Avatar
          firstName="Test"
          lastName="User"
          color="white"
          bgColor="blue"
          square
        />
      );
    })
  );
