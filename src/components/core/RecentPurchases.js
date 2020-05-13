import React from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";

// Components
import Button from "../core/Button";
import ProjectsList from "../../views/projects/inner-components/ProjectsList";
import ProjectCard from "../ProjectCard/index";
import mockImage from "../../assets/img/mock_imgs/project_bg.jpg";
import mockAvatar from "../../assets/img/mock_imgs/user-photo.png";
import PlaybookCard from "../PlaybookCard";
import Avatar from "./Avatar";
import {
  DollarIcon,
  MessageCircleIcon,
  UserIcon
} from "../../assets/img/icons";
import ProjectStepWrapper from "../../views/projects/inner-components/ProjectStepWrapper";
import { isCustomer } from "../../lib/helper";
import SimpleExpertCard from "../SimpleExpertCard";
import Steps from "../../views/projects/inner-components/ProjectSteps";

export default class RecentPurchases extends React.Component {
  render() {
    const {
      status,
      projectName,
      price,
      bannerImage,
      projectId,
      projectNotifications
    } = this.props;
    const project = {
      id: projectId,
      bannerImageUrl: mockImage,
      name: projectName,
      projectNotifications: projectNotifications,
      account_manager: {
        id: 1,
        avatarUrl: mockAvatar,
        firstName: "Norbert",
        lastName: "Biro",
        jobTitle: "Account Manager"
      },
      users: {
        expertBeingSourced: true
      }
    };
    const steps = Steps();
    let projectStatusHistory = [];
    return (
      <>
        <a
          href={`/project/${project.id}`}
          className="project d-flex justify-content-start text-decoration-none"
          key={project.id}
        >
          <PlaybookCard
            data={project}
            isPreview={"false"}
            size={"project-playbook-card"}
            boxShadow={"false"}
            placeHolder={true}
            link={`/project/edit/${project.id}`}
            bannerImageUrl={project.bannerImageUrl}
            notifications={project.projectNotifications}
            tag={"div"}
            fullWidth
          />
          <div className="project-data d-flex flex-column w-100">
            <div className="project-maininfo d-flex justify-content-between">
              <div className="project-finances">
                {!isCustomer() && (
                  <div className="field-wrapper">
                    <p className="font-weight-bold">Client</p>
                    <span className="d-block text-grayed font-weight-bold">
                      {project.customer ? project.customer.displayName : ""}
                    </span>
                  </div>
                )}
                {isCustomer() && (
                  <div className="field-wrapper">
                    <div className="supporting-materials">
                      <div className={"supporting-material"}>
                        <SimpleExpertCard
                          data={project.account_manager}
                          key={project.account_manager.id}
                        />
                        <div className="action">
                          <a
                            href="#"
                            onClick={e => {
                              e.preventDefault();
                            }}
                          >
                            <MessageCircleIcon />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="field-wrapper">
                  <p className="font-weight-bold">Budget</p>
                  <span className="d-block text-grayed font-weight-bold">
                    Invoiced $0 of{" "}
                    {project.estimatedBudget
                      ? `$${project.estimatedBudget}`
                      : ""}
                  </span>
                </div>

                <div className="field-wrapper">
                  <p className="font-weight-bold">Timeline</p>
                  <span className="d-block text-grayed font-weight-bold">
                    {project.estimatedTimeline ? project.estimatedTimeline : ""}
                  </span>
                </div>
              </div>
              <div className="project-progress">
                <div className="field-wrapper">
                  <div className="user-wrapper">
                    {project.users &&
                      project.usersCount > 0 &&
                      project.users.slice(0, 4).map(user => (
                        <>
                          <div
                            className={`field-icon ${project.usersCount > 2 &&
                              "mr-2"}`}
                          >
                            {user &&
                            user.avatarUrl !== null &&
                            user.avatarUrl ? (
                              <Avatar
                                firstName={user.firstName}
                                lastName={user.lastName}
                                size="customSize"
                                imageSize={"27"}
                                url={user.avatarUrl}
                              />
                            ) : (
                              <Avatar
                                firstName={user.firstName}
                                lastName={user.lastName}
                                size="customSize"
                                imageSize={"27"}
                              ></Avatar>
                            )}
                          </div>
                          {project.usersCount < 4 && (
                            <p className="font-weight-bold">{user.name}</p>
                          )}
                        </>
                      ))}
                    {project.usersCount > 3 && (
                      <div className="field-icon rounded-circle">...</div>
                    )}
                    {project.users &&
                      !project.usersCount &&
                      !project.users.expertBeingSourced && (
                        <>
                          <div className="field-icon">
                            <UserIcon />
                          </div>
                          <p className="font-weight-bold">Unmatched</p>
                        </>
                      )}
                    {project.users && project.users.expertBeingSourced && (
                      <>
                        <div className="field-icon">
                          <UserIcon />
                        </div>
                        <p className="font-weight-bold">Sourcing Expert</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="field-wrapper">
                  <div className="d-flex align-items-center">
                    <div className="field-icon">
                      <UserIcon />
                    </div>
                    <p className="font-weight-bold">
                      {project.estimatedLength || 0}
                      <span className="text-grayed font-weight-bold">
                        Hours This Month
                      </span>
                    </p>
                  </div>
                </div>

                {!isCustomer() && (
                  <div className="field-wrapper">
                    <div className="d-flex align-items-center">
                      <div className="field-icon">
                        <DollarIcon />
                      </div>
                      <p className="font-weight-bold">
                        {project.estimatedBudget > 0 ? (
                          <>
                            ${project.estimatedBudget}
                            <span className="text-grayed font-weight-bold">
                              Fixed
                            </span>
                          </>
                        ) : (
                          <>
                            {project.experts ? project.experts.hourlyRate : ""}
                            <span className="text-grayed font-weight-bold">
                              per hour
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="project-timeline">
              <ProjectStepWrapper
                steps={steps}
                projectStatusHistory={projectStatusHistory}
              />
            </div>
          </div>
        </a>
      </>
    );
  }
}
