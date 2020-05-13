import React from "react";
import { isExpert, isCustomer } from "../lib/helper";
import { ProjectsIcon } from "../assets/img/icons";
import { apiClient } from "../apiClient";
import { endpoints } from "../configs";
import ProjectsList from "../views/projects/inner-components/ProjectsList";
import {
  PROJECT_STATUS_ACTIVE,
  PROJECT_STATUS_INPROCESS
} from "../constants/ProjectStatus";
import { PROJECT_USER_STATUS_ACCEPTED } from "../constants/Project";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { BlueMessageIcon } from "../assets/img/icons";
import Form from "../components/core/Form";
import TextArea from "./core/TextArea";

class ProjectList extends React.Component {
  state = {
    projectDetails: [],
    messageAccountManagerModal: false,
    accountManagerMessage: ""
  };

  // Get active project list
  getProjectList = status => {
    this.setState({ isLoading: true }, () => {
      const projectUserStatus = isExpert()
        ? `&projectUserStatus=${PROJECT_USER_STATUS_ACCEPTED}`
        : "";
      apiClient
        .get(`${endpoints().projectAPI}?status=${status}${projectUserStatus}`)
        .then(response => {
          const data = response.data;
          this.setState({
            isLoading: false,
            projectDetails: !data ? [] : data,
            totalCount: data.totalCount
          });
        });
    });
  };

  toggleMessageAccountManagerModal = () => {
    this.setState({
      messageAccountManagerModal: !this.state.messageAccountManagerModal
    });
  };
  onChangeMessage = e => {
    this.setState({ accountManagerMessage: e.target.value });
  };
  sendMessage = values => {
    apiClient
      .post(`${endpoints().dashboardAPI}/contact/support`, {
        message: this.state.accountManagerMessage
      })
      .then(response => {
        this.toggleMessageAccountManagerModal();
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
  };

  componentDidMount() {
    const projectStatus = isCustomer()
      ? PROJECT_STATUS_INPROCESS
      : PROJECT_STATUS_ACTIVE;

    this.getProjectList(projectStatus);
  }

  render() {
    const { projectDetails, isLoading } = this.state;

    if (isLoading) {
      return "";
    }

    return (
      <div className={`${!this.props.enable ? "disabled" : ""}`}>
        <h5 className={["mt-4", "mb-2", "font-weight-bold"].join(" ")}>
          Active Projects
        </h5>
        {projectDetails &&
        projectDetails.activeProjectsCount > 0 &&
        !isLoading ? (
          <>
            {/* Active project list */}
            <ProjectsList data={projectDetails} history={this.props.history} />
          </>
        ) : (
          <>
            <div
              className="card d-flex align-items-center justify-content-center flex-column mb-5"
              style={{ minHeight: "350px" }}
            >
              <div className="active-projects-icon mb-4">
                <ProjectsIcon />
              </div>
              <span className="h6 d-block font-weight-bold text-inline-grayed">
                As soon as an active project is in process, you'll see it here!
              </span>
              <span className="h6 d-block">
                <i class="fas fa-info-circle text-link mr-2"></i>
                <span className="font-weight-bold">Need Help?</span>{" "}
                <a
                  href=""
                  className="text-link text-underline"
                  onClick={e => {
                    e.preventDefault();
                    this.toggleMessageAccountManagerModal();
                  }}
                >
                  Contact Torchlite Account Manager
                </a>
              </span>
            </div>
          </>
        )}
        <MessageAccountManagerModal
          isOpen={this.state.messageAccountManagerModal}
          toggle={this.toggleMessageAccountManagerModal}
          onChangeMessage={this.onChangeMessage}
          sendMessage={this.sendMessage}
        />
      </div>
    );
  }
}
const MessageAccountManagerModal = ({
  isOpen,
  toggle,
  onChangeMessage,
  sendMessage
}) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className={["edit-task-modal"].join(" ")}
      backdrop="static"
    >
      <Form
        initialValues={{ message: "" }}
        onSubmit={values => {
          sendMessage(values);
        }}
      >
        <ModalHeader toggle={toggle}>
          <div
            className={["d-flex", "flex-column", "align-items-center"].join(
              " "
            )}
          >
            <BlueMessageIcon />
            <h4 className={["font-weight-bold", "mt-2"].join(" ")}>
              Message Account Manager
            </h4>
          </div>
        </ModalHeader>
        <ModalBody className={["mb-4", "px-0"].join(" ")}>
          <div className={["text-center", "modal-body-subtitle"].join(" ")}>
            <p>
              Send a message to the account manager by using the text area
              below:
            </p>
          </div>
          <div className="form-wrapper justify-content-center d-flex">
            <div className="field-wrapper w-100">
              <TextArea
                name="message"
                label="Your message"
                placeholder="Your message..."
                rows="5"
                onChange={onChangeMessage}
                error="Your message is required"
                required
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className={["justify-content-center"].join(" ")}>
          <div className="btn-wrapper">
            <button className="btn btn-outline-secondary mr-2" onClick={toggle}>
              Cancel
            </button>
            <Button type="submit" label="">
              Send Message
            </Button>
          </div>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ProjectList;
