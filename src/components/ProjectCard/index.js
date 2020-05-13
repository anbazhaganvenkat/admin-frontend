import React from "react";
import Avatar from "../../components/core/Avatar";
import variables from "../../scss/_variables.scss";
import { isCustomer } from "../../lib/helper";
import headerTriangles from "../../assets/header-triangles.svg";
import {
  ActivityIcon,
  ArrowRight,
  CheckmarkIcon,
  DollarIcon,
  SendIcon,
  UserIcon,
  UserPlusIcon
} from "../../assets/img/icons";

import ProjectStepWrapper from "../../views/projects/inner-components/ProjectStepWrapper";
import Steps from "../../views/projects/inner-components/ProjectSteps";

class ProjectCard extends React.Component {
  render() {
    const projectDetails = this.props.data;
    const isCompletedStatus = this.props.status;
    const cursorPointer = "cursor-pointer";
    const steps = Steps();
    let projectStatusHistory = [];
    const cardBoxStyle = {
      height: "350px"
    };
    return (
      <div>
        {projectDetails &&
          projectDetails.map(projectDetail => (
            <div className="card project-list-card shadow cursor-pointer">
              <div
                className="row"
                onClick={() =>
                  window.location.replace(`/project/edit/${projectDetail.id}`)
                }
              >
                <div
                  className="col-md-5 project-list-card-left-side-section"
                  style={{
                    color: "black"
                  }}
                >
                  <div className="card" style={cardBoxStyle}>
                    <div
                      id="card-image"
                      className="card-header"
                      style={{
                        backgroundImage: `url(${
                          projectDetail.coverPhoto
                            ? projectDetail.coverPhoto
                            : headerTriangles
                        })`,
                        backgroundColor: variables.cardHeaderDefaultColor,
                        backgroundSize: "cover"
                      }}
                    ></div>
                    <div className="row">
                      <div className="col  m-3">
                        <h6 className="font-weight-bold">
                          {projectDetail.name}
                        </h6>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row mt-3 mb-3">
                    <div className="col-12 status-header">
                      <div
                        className="d-inline-block pl-2 pr-2 status rounded-pill"
                        style={{
                          backgroundColor: isCompletedStatus
                            ? "#57D1B1"
                            : "#0a9dda"
                        }}
                      >
                        {projectDetail.status}
                      </div>
                      <div
                        className="float-right pl-2 pr-2 notification rounded-pill"
                        style={{
                          display: isCompletedStatus ? "none" : "block"
                        }}
                      >
                        New
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="col-md-7 project-list-card-right-side-section">
                  <div className="row p-3">
                    <div className="col-md-6">
                      <div className="project-maininfo d-flex justify-content-between">
                        <div className="project-finances">
                          {!isCustomer() && (
                            <div className="field-wrapper">
                              <p className="font-weight-bold">Client</p>
                              <span className="d-block text-grayed font-weight-bold">
                                {projectDetail.customer
                                  ? projectDetail.customer.displayName
                                  : ""}
                                {projectDetail ? projectDetail.id : ""}
                              </span>
                            </div>
                          )}
                          <div className="field-wrapper">
                            <p className="font-weight-bold">Budget</p>
                            <span className="d-block text-grayed font-weight-bold">
                              {projectDetail.estimatedBudget
                                ? projectDetail.estimatedBudget
                                : ""}
                            </span>
                          </div>

                          <div className="field-wrapper">
                            <p className="font-weight-bold">Timeline</p>
                            <span className="d-block text-grayed font-weight-bold">
                              {projectDetail.estimatedTimeline
                                ? projectDetail.estimatedTimeline
                                : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 p-1">
                      <div className="project-maininfo d-flex justify-content-between">
                        <div className="project-finances">
                          <div className="project-progress">
                            <div className="field-wrapper">
                              <div className="user-wrapper">
                                {projectDetail.experts &&
                                  projectDetail.expertsCount >= 1 && (
                                    <>
                                      <div className="field-icon">
                                        {projectDetail.experts &&
                                        projectDetail.experts.avatarUrl !==
                                          null &&
                                        projectDetail.experts.avatarUrl ? (
                                          <img
                                            src={
                                              projectDetail.experts.avatarUrl
                                            }
                                            alt="user photo"
                                          />
                                        ) : (
                                          <UserIcon />
                                        )}
                                      </div>
                                      <p className="font-weight-bold">
                                        {projectDetail.experts.name}
                                      </p>
                                    </>
                                  )}
                                {projectDetail.experts &&
                                  projectDetail.expertsCount < 1 && (
                                    <>
                                      <div className="field-icon">
                                        <UserIcon />
                                      </div>
                                      <p className="font-weight-bold">
                                        Unmatched
                                      </p>
                                    </>
                                  )}
                              </div>
                            </div>

                            <div className="field-wrapper m-2">
                              <div className="d-flex align-items-center">
                                <div className="field-icon">
                                  <UserIcon />
                                </div>
                                <p className="font-weight-bold">
                                  {projectDetail.estimatedLength}
                                  <span className="m2 text-grayed font-weight-bold">
                                    Hours This Month
                                  </span>
                                </p>
                              </div>
                            </div>

                            <div className="field-wrapper m-2">
                              <div className="d-flex align-items-center">
                                <div className="field-icon">
                                  <DollarIcon />
                                </div>
                                <p className="font-weight-bold">
                                  {projectDetail.estimatedBudget > 0 ? (
                                    <>
                                      {projectDetail.estimatedBudget}
                                      <span className="m-2 text-grayed font-weight-bold">
                                        Fixed
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      {projectDetail.experts
                                        ? projectDetail.experts.hourlyRate
                                        : ""}
                                      <span className="m-2 text-grayed font-weight-bold">
                                        per hour
                                      </span>
                                    </>
                                  )}
                                </p>
                              </div>
                            </div>

                            {/*<div className="field-wrapper">*/}
                            {/*  <div className="d-flex align-items-center">*/}
                            {/*    <div className="field-icon">*/}
                            {/*      <ActivityIcon />*/}
                            {/*    </div>*/}
                            {/*    <p className="font-weight-bold">*/}
                            {/*      {project.projectProgress.projectActivity.activity}*/}
                            {/*      <span className="d-block text-grayed font-weight-bold">*/}
                            {/*        {project.projectProgress.projectActivity.date}*/}
                            {/*      </span>*/}
                            {/*    </p>*/}
                            {/*  </div>*/}
                            {/*</div>*/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="project-timeline">
                        <ProjectStepWrapper
                          steps={steps}
                          projectStatusHistory={projectStatusHistory}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default ProjectCard;
