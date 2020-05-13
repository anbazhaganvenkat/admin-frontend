import React from "react";
import DefaultContent from "../content/DefaultContent";
import TextArea from "../core/TextArea";

const ExpertProfileAboutMe = () => {
  return (
    <>
      <DefaultContent title={"About me"}>
        <p className={["text-inline-grayed"].join("")}>
          Tell us more about you, your philosophy, and why you’re the best. This
          is your opening statement, so be descriptive, and help people
          understand who you are!
        </p>
        <TextArea
          name="aboutMe"
          maxLength={250}
          showCharCount
          required
          placeholder={"About Me"}
        />
      </DefaultContent>
    </>
  );
};

export default ExpertProfileAboutMe;
