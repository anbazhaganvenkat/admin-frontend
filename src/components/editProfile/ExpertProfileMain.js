import React, { Component } from "react";
import ExpertProfileAboutMe from "./ExpertProfileAboutMe";
import ExpertProfileRecommendations from "./ExpertProfileRecommendations";
import ExpertProfileCertifications from "./ExpertProfileCertifications";
import ExpertProfileEmployments from "./ExpertProfileEmployments";
import ExpertProfileEducation from "./ExpertProfileEducation";

class ExpertProfileMain extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      id,
      aboutMe,
      certifications,
      employments,
      education,
      recommendations
    } = this.props.expertDetails;

    return (
      <div className={["expert-profile-main", "ml-4", "w-100"].join(" ")}>
        <ExpertProfileAboutMe aboutMe={aboutMe} />

        <ExpertProfileRecommendations recommendations={recommendations} />

        <ExpertProfileCertifications certifications={certifications} />

        <ExpertProfileEmployments employments={employments} />

        <ExpertProfileEducation educations={education} />
      </div>
    );
  }
}

export default ExpertProfileMain;
