import React from "react";
import { CrossIcon } from "../assets/img/icons";
import Avatar from "./core/Avatar";
import { Input, Label } from "reactstrap";
import checkBoxOn from "../assets/img/icons/icon-checkbox-on.svg";
import checkBoxOff from "../assets/img/icons/icon-checkbox-off.svg";

const SimpleExpertCard = props => {
  const {
    addExpert,
    showDeleteIcon,
    handleExperts,
    selected,
    currentUserId
  } = props;
  const { id, avatarUrl, firstName, lastName, jobTitle } = props.data;
  const TagName = props.tag || "div";
  const tagNameForProps =
    addExpert && TagName === "label" ? { htmlFor: `expert${id}` } : {};

  let type;
  return (
    <div className={["simple-expert-card"].join(" ")}>
      <div
        className={[
          "card-header",
          "bg-transparent",
          "d-flex",
          "align-items-center"
        ].join(" ")}
      >
        {showDeleteIcon && (
          <span
            onClick={() => handleExperts(id, (type = "remove"))}
            className={["d-block", "mr-2"].join(" ")}
          >
            <CrossIcon />
          </span>
        )}

        {addExpert && (
          <div className="checkbox-wrapper m-0">
            <Label htmlFor={`expert${id}`}>
              <Input
                id={`expert${id}`}
                name={`expert${id}`}
                onChange={() => {
                  handleExperts(id);
                }}
                value={`expert${id}`}
                type="checkbox"
                checked={selected}
              />{" "}
              <span
                className={`checkbox-placeholder mx-0 mr-2 p-0 ${
                  selected ? "active" : ""
                }`}
              />
            </Label>
          </div>
        )}

        <TagName
          className={[
            "user-and-title",
            "d-flex",
            "align-items-center",
            "mb-0"
          ].join(" ")}
          {...tagNameForProps}
        >
          <div className={["mr-2"].join(" ")}>
            <Avatar
              url={avatarUrl}
              firstName={firstName}
              lastName={lastName}
              size="xs"
            />
          </div>
          <div className={["user-title"].join(" ")}>
            <span
              className={["text-inline-grayed", "d-block", "h6-5"].join(" ")}
            >
              {jobTitle}
            </span>
            <p className={["h6-5", "m-0", "font-weight-bold"].join(" ")}>
              {currentUserId ? (
                currentUserId === id ? (
                  "You"
                ) : (
                  <>
                    {firstName} {lastName}
                  </>
                )
              ) : (
                <>
                  {firstName} {lastName}
                </>
              )}
            </p>
          </div>
        </TagName>
      </div>
    </div>
  );
};

export default SimpleExpertCard;
