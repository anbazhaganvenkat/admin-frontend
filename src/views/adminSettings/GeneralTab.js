import React from "react";

// Components
import Select from "../../components/core/Select";
import Email from "../../components/core/Email";
import Text from "../../components/core/Text";
import URL from "../../components/core/URL";

// Settings
import {
  SETTINGS_EXPERT_REQUEST_NOTIFICATION_EMAIL,
  SETTINGS_EXPERT_SIGNUP_WELCOME_MESSAGE,
  SETTINGS_FIND_AN_EXPERT_VERSION,
  SETTINGS_TERMS_OF_SERVICE_URL,
  SETTINGS_DEFAULT_ACCOUNT_MANAGER
} from "../../constants/Settings";

const GeneralTab = ({
  selectedFindAnExpertVersion,
  defaultAccountManager,
  defaultAccountManagerList
}) => {
  const expertVersionForm = () => [
    {
      label: "Simple Form",
      value: "Simple Form"
    },
    {
      label: "Multi-Step Wizard",
      value: "Multi-Step Wizard"
    }
  ];

  return (
    <>
      <div className="form-wrapper">
        <h5 className="font-weight-bold">Find an Expert Version</h5>
        <div className="field-wrapper">
          <Select
            name={SETTINGS_FIND_AN_EXPERT_VERSION}
            label="Which “Find an Expert” version will work best on your marketplace?"
            placeholder="Select a version"
            options={expertVersionForm()}
            defaultValue={expertVersionForm().find(
              findAnExpertVersion =>
                findAnExpertVersion.value === selectedFindAnExpertVersion
            )}
          />
        </div>

        <h5 className="font-weight-bold">URL for Terms of Service</h5>
        <div className="field-wrapper">
          <URL
            name={SETTINGS_TERMS_OF_SERVICE_URL}
            label="Set the path to your terms of service."
            placeholder="Enter the url..."
          />
        </div>

        <h5 className="font-weight-bold">Welcome Message for Experts</h5>
        <div className="field-wrapper">
          <Text
            name={SETTINGS_EXPERT_SIGNUP_WELCOME_MESSAGE}
            label="This will be the welcome headline within Expert Signup wizard."
            placeholder="Type something..."
          />
        </div>

        <h5 className="font-weight-bold">Email Address</h5>
        <div className="field-wrapper">
          <Email
            name={SETTINGS_EXPERT_REQUEST_NOTIFICATION_EMAIL}
            label="This is where you will receive pending Expert request alerts."
            placeholder="Enter your email..."
          />
        </div>

        <h5 className="font-weight-bold">Default Account Manager</h5>
        <div className="field-wrapper">
          <Select
            name={SETTINGS_DEFAULT_ACCOUNT_MANAGER}
            label="Who do you want to assign as the default Account Manager as your marketplace?"
            placeholder="Select a default account manager"
            options={defaultAccountManagerList}
            defaultValue={defaultAccountManagerList.find(
              accountManager =>
                accountManager.value === parseInt(defaultAccountManager, 10)
            )}
          />
        </div>
      </div>
    </>
  );
};

export default GeneralTab;
