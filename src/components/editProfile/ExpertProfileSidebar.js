import React, { Component } from "react";
import SidebarContent from "../SidebarContent";
import UploadAvatar from "../../views/users/UploadAvatar";
import uploadImgPlaceholder from "../../assets/img/mock_imgs/upload_placeholder.jpg";
import Text from "../core/Text";
import Select from "../core/Select";
import Country from "../Country";
import { State } from "../core/State";
import Phone from "../core/Phone";
import Email from "../core/Email";
import TimeZone, { TimeZones } from "../TimeZone";
import URL from "../core/URL";
import { COUNTRY_OPTIONS } from "../../constants/CountryOptions";
import { AVAILABILITY } from "../../constants/AvailabilityArray";
import Form from "../../components/core/Form";

import {
  CalendarIcon,
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  TwitterIcon
} from "../../assets/img/icons";
import Multiselect from "../core/Multiselect";
import {
  TAG_TYPE_INDUSTRIES,
  TAG_TYPE_SKILLS,
  TAG_TYPE_TOOLS
} from "../../constants/tagtype";
import { Field } from "formik";

class ExpertProfileSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: this.props.expertDetails.skills,
      tools: this.props.expertDetails.tools,
      industries: this.props.expertDetails.industries
    };
  }

  render() {
    const { skillsList, toolsList, industriesList } = this.props;

    return (
      <div className="expert-details-sidebar mb-4">
        <SidebarContent title={""}>
          <Field
            render={({ field, form }) => {
              return (
                <UploadAvatar
                  data={this.props.expertDetails}
                  publicRoute
                  apiURL={this.props.apiUrl}
                  square
                  customSize={"100%"}
                  hideUploadButton
                  placeholderUrl={uploadImgPlaceholder}
                  setValue={form.setFieldValue}
                />
              );
            }}
          />

          <div className="field-wrapper">
            <Text
              name={"firstName"}
              placeholder={"Your first name..."}
              label={"First Name"}
              required
            />
          </div>

          <div className="field-wrapper">
            <Text
              name={"lastName"}
              placeholder={"Your lastName name..."}
              label={"Last Name"}
              required
            />
          </div>

          <div className="field-wrapper">
            <Text
              name={"jobTitle"}
              placeholder={"Expert Title..."}
              label={"I want apply as an…"}
            />
          </div>

          <div className="field-wrapper">
            <Country
              name="countryName"
              placeholder="Select Country"
              error=""
              notify="true"
              countryOptionsFromProps={COUNTRY_OPTIONS}
              defaultValue={COUNTRY_OPTIONS.find(
                country =>
                  country.value === this.props.expertDetails.countryName
              )}
            />
          </div>

          <div className="field-wrapper">
            <Text name="city" placeholder="Enter city" notify="true" error="" />
          </div>

          <div className="field-wrapper">
            <Select
              name="stateName"
              placeholder="Enter state"
              options={State}
              defaultValue={State.find(
                state => state.value === this.props.expertDetails.stateName
              )}
            />
          </div>

          <div className="field-wrapper">
            <Phone name="phone" placeholder="Phone number..." />
          </div>

          <div className="field-wrapper">
            <Email name="email" placeholder="Email..." required />
          </div>

          <div className="field-wrapper align-items-end">
            <Text
              name={"hourlyRate"}
              label={"Base rate"}
              addonText={"$"}
              addonType={"prepend"}
            />
            <span className="text-inline-grayed h6-5">per hour</span>
          </div>

          <div className="field-wrapper">
            <TimeZone
              name="timezone"
              label="Timezone"
              placeholder="Select Timezone..."
              defaultValue={TimeZones.find(
                timezone => timezone.value === this.props.expertDetails.timezone
              )}
            />
          </div>

          <div className="field-wrapper">
            <Select
              name="availability"
              label="What’s your general availability for work?"
              placeholder="Select one..."
              options={AVAILABILITY}
              defaultValue={AVAILABILITY.find(
                available =>
                  available.value === this.props.expertDetails.availability
              )}
            />
          </div>
        </SidebarContent>

        <SidebarContent title={""}>
          <div className="field-wrapper">
            <URL
              name={"websiteUrl"}
              addonText={<GlobeIcon />}
              addonType={"prepend"}
              notify="true"
            />
          </div>

          <div className="field-wrapper">
            <URL
              name={"twitterUrl"}
              addonText={<TwitterIcon />}
              addonType={"prepend"}
              notify="true"
            />
          </div>

          <div className="field-wrapper">
            <URL
              name={"facebookUrl"}
              addonText={<FacebookIcon />}
              addonType={"prepend"}
              notify="true"
            />
          </div>
          <div className="field-wrapper">
            <URL
              name={"instagramUrl"}
              addonText={<InstagramIcon />}
              addonType={"prepend"}
              notify="true"
            />
          </div>
        </SidebarContent>

        <SidebarContent title={"Top Five Skills"}>
          <div className="field-wrapper mb-4">
            <Multiselect
              name="skills"
              options={skillsList}
              label="What are the top five (5) skills that you've mastered?"
              closeMenuOnSelect={false}
              placeholder="e.g. Photoshop, Sketch, Python..."
            />
          </div>
        </SidebarContent>

        <SidebarContent title={"Tools"}>
          <div className="field-wrapper mb-4">
            <Multiselect
              name="tools"
              options={toolsList}
              label="What are the top five (5) tools that you use?"
              closeMenuOnSelect={false}
              placeholder="e.g. Photoshop, Sketch..."
            />
          </div>
        </SidebarContent>

        <SidebarContent title={"Industries"}>
          <div className="field-wrapper mb-4">
            <Multiselect
              name="industries"
              options={industriesList}
              label="What industries do you serve? (e.g. Airline, Retail, Food)"
              closeMenuOnSelect={false}
              placeholder="e.g. Airline, Fintech..."
            />
          </div>
        </SidebarContent>
      </div>
    );
  }
}

export default ExpertProfileSidebar;
