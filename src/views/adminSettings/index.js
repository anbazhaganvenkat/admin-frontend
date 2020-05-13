import React, { Component } from "react";
import { toast } from "react-toastify";
import GeneralTab from "./GeneralTab";
import ManageLists from "./ManageLists";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { TAB_GENERAL, TAB_LIST } from "../../constants/AdminSetting";

// Components
import PageTitle from "../../components/core/PageTitle";
import Form from "../../components/core/Form";
import CancelButton from "../../components/core/CancelButton";
import SaveButton from "../../components/core/SaveButton";
import { Redirect } from "react-router-dom";

// Helper
import { toString, getParamsByName } from "../../lib/helper";

// API call
import { apiClient } from "../../apiClient";

// Configs
import { endpoints } from "../../configs";

// Settings
import {
  SETTINGS_FIND_AN_EXPERT_VERSION,
  SETTINGS_DEFAULT_ACCOUNT_MANAGER
} from "../../constants/Settings";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "",
      settigsData: "",
      defaultAccountManager: "",
      defaultAccountManagerList: [],
      selectedFindAnExpertVersion: ""
    };
  }

  componentWillMount() {
    const tab = getParamsByName("tab");
    this.setState({ activeTab: tab || TAB_GENERAL });
  }

  componentDidMount() {
    this.getSettingsData();
    this.getDefaultAccountManagerList();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { search } = prevProps.history.location;
    const params = new URLSearchParams(search);
    const section = params.get("tab");
    // Set current active tab
    if (this.state.currentSection !== section) {
      this.setState({
        currentSection: section,
        activeTab: section
      });
    }
  }

  _submit = values => {
    if (values.find_an_expert_version && values.find_an_expert_version.value) {
      values.find_an_expert_version = toString(
        values.find_an_expert_version.value
      );
    } else {
      values.find_an_expert_version = this.state.selectedFindAnExpertVersion;
    }

    if (
      values.default_account_manager &&
      values.default_account_manager.value
    ) {
      values.default_account_manager = toString(
        values.default_account_manager.value
      );
    } else {
      values.default_account_manager = this.state.defaultAccountManager;
    }
    // Save settings
    this._createSettings(values);
  };

  // Settings API post
  _createSettings(data) {
    return apiClient
      .post(endpoints().settingAPI, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
        window.location.replace("/admin-settings");
      })
      .catch(error => {
        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
          console.error(errorMessage);
        }
      });
  }

  // Get Settings Data
  getSettingsData = () => {
    this.setState({ isLoading: true }, () => {
      return apiClient
        .get(`${endpoints().settingAPI}`)
        .then(response => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
          }
          console.error(successMessage);
          const settings = response.data.data;
          if (settings) {
            settings.forEach(data => {
              const name = data.name;
              const value = data.value;
              if (name === SETTINGS_DEFAULT_ACCOUNT_MANAGER) {
                this.setState({ defaultAccountManager: value });
              } else if (name === SETTINGS_FIND_AN_EXPERT_VERSION) {
                this.setState({ selectedFindAnExpertVersion: value });
              } else {
                this.setState({ [name]: value });
              }
            });
          }
          this.setState({ isLoading: false });
        })
        .catch(error => {
          if (error.response && error.response.status >= 400) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            console.error(errorMessage);
          }
        });
    });
  };

  // Get default account manager user list
  getDefaultAccountManagerList = () => {
    this.setState({ isLoading: true }, () => {
      return apiClient
        .get(`${endpoints().settingAPI}/account/manager/list`)
        .then(response => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
          }
          console.error(successMessage);
          const results = response.data.data;
          let defaultAccountManagerList = [];
          if (results) {
            results.forEach(data => {
              defaultAccountManagerList.push({
                label: data.name,
                value: data.id
              });
            });
          }
          this.setState({
            defaultAccountManagerList,
            isLoading: false
          });
        })
        .catch(error => {
          if (error.response && error.response.status >= 400) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            console.error(errorMessage);
          }
        });
    });
  };

  toggle = tab => {
    if (tab === TAB_GENERAL) {
      this.props.history.push(`/admin-settings?tab=${TAB_GENERAL}`);
    } else {
      this.props.history.push(
        `/admin-settings?tab=${TAB_LIST}&filter=tags_table`
      );
    }
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    let {
      find_an_expert_version,
      selectedFindAnExpertVersion,
      defaultAccountManager,
      defaultAccountManagerList,
      default_account_manager
    } = this.state;

    find_an_expert_version = {
      label: find_an_expert_version ? find_an_expert_version : "",
      value: find_an_expert_version ? find_an_expert_version : ""
    };

    default_account_manager = {
      label: default_account_manager ? default_account_manager : "",
      value: default_account_manager ? default_account_manager : ""
    };

    const {
      terms_of_service_url,
      expert_signup_welcome_message,
      expert_request_notification_email,
      isLoading
    } = this.state;

    const initialValues = {
      terms_of_service_url,
      find_an_expert_version,
      expert_signup_welcome_message,
      expert_request_notification_email,
      default_account_manager
    };

    const { activeTab } = this.state;
    if (isLoading) {
      return "";
    }
    return (
      <>
        {!activeTab && <Redirect to={`admin-settings?tab=${TAB_GENERAL}`} />}
        <PageTitle label="Admin Settings" />
        <Nav tabs className="admin-tabs">
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === TAB_GENERAL
              })}
              onClick={() => {
                this.toggle(TAB_GENERAL);
              }}
            >
              General
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === TAB_LIST
              })}
              onClick={() => {
                this.toggle(TAB_LIST);
              }}
            >
              List
            </NavLink>
          </NavItem>
        </Nav>

        <div className="tabs-and-preview full-width d-flex admin-settings">
          <TabContent activeTab={activeTab}>
            <TabPane tabId={TAB_GENERAL}>
              <div className="tab-content-wrapper">
                <Form
                  initialValues={initialValues}
                  onSubmit={values => {
                    this._submit(values);
                  }}
                >
                  <GeneralTab
                    selectedFindAnExpertVersion={selectedFindAnExpertVersion}
                    defaultAccountManager={defaultAccountManager}
                    defaultAccountManagerList={defaultAccountManagerList}
                  />
                  <div className="btn-wrapper">
                    <CancelButton onClick={() => this.props.history.goBack()} />
                    <SaveButton />
                  </div>
                </Form>
              </div>
            </TabPane>
            <TabPane tabId={TAB_LIST}>
              <div className="tab-content-wrapper">
                <ManageLists history={this.props.history} />
              </div>
            </TabPane>
          </TabContent>
        </div>
      </>
    );
  }
}

export default Settings;
