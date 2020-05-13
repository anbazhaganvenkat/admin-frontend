import React from "react";
import ToggleSwitch from "../core/ToggleSwitch";
import { Field } from "formik";
const ExpertProfileVisibilitySettings = ({
  expertId,
  profileVisibility,
  updateVisibility
}) => (
  <div className={["set-expert-visibility"].join(" ")}>
    <Field
      name="profile_visibility"
      render={({ field, form }) => {
        return (
          <ToggleSwitch
            name={"profile_visibility"}
            title={field.value ? "On" : "Off"}
            label1={"Your profile's public visibility"}
            label2={"Your profile's public visibility"}
            theme={"primary"}
            size={"small"}
            value={field.value}
            className={["flex-row"].join(" ")}
            handleChange={() =>
              form.setFieldValue("profile_visibility", !field.value)
            }
            outlined
          />
        );
      }}
    />
    <div className="btn-wrapper">
      <a
        href={`/expert-profile/${expertId}`}
        target="_blank"
        className={["btn", "btn-outline-secondary", "mr-2"].join(" ")}
      >
        View Public Profile
      </a>

      <button
        type="submit"
        className={["btn", "btn-primary"].join(" ")}
        onClick={() => {
          // alert();
        }}
      >
        Save Profile
      </button>
    </div>
  </div>
);

export default ExpertProfileVisibilitySettings;
