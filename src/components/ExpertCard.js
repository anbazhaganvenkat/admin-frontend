import React from "react";
import { Link } from "react-router-dom";

// Assets
import defaultAvatar from "../assets/default-avatar.png";
import USFlag from "../assets/img/mock_imgs/us-flag-icon-png-24.png";

// Scss
import variables from "../scss/_variables.scss";

// Icons
import { CheckmarkIcon, MaximizeAltIcon } from "../assets/img/icons";

// Helper
import { maskPhoneNumber, isSuperAdmin } from "../lib/helper";

// History
import history from "../history";

const ExpertCard = props => {
  const {
    id,
    bannerColor,
    avatarUrl,
    firstName,
    lastName,
    jobTitle,
    city,
    stateName,
    skills,
    timezone,
    availability,
    hourlyRate,
    fullWidth
  } = props.data;

  {
    /* / This condition will remove after removed avatar image attributes in ExpertCard */
  }
  let expertImage;
  if (avatarUrl) {
    expertImage = `url(${avatarUrl})`;
  } else {
    expertImage = `url(${defaultAvatar})`;
  }

  const {
    classnames,
    admin_data,
    readyForHire,
    handleExperts,
    fixedWidth,
    size,
    certified,
    openLinkInNewTab,
    selectExperts,
    showDeleteIcon,
    selected,
    expertUrl
  } = props;

  let name = [];
  if (firstName) {
    name.push(firstName);
  }
  if (lastName) {
    name.push(lastName);
  }

  name = name.join(" ");

  const location = [];
  if (city) {
    location.push(city);
  }
  if (stateName) {
    location.push(stateName);
  }

  const skillCount = skills && skills.length > 0 ? skills.length : 0;

  const showSkills = skills => {
    const max_skills = skills.length;
    let skills_arr = [];
    for (let i = 0; i < skills.length; i++) {
      skills_arr.push(
        <span className="badge badge-pill badge-dark">{skills[i].name}</span>
      );
      if (i === 1) {
        break;
      }
    }
    if (max_skills > 2) {
      skills_arr.push(
        <span className="badge badge-pill badge-orange">{`+${max_skills -
          2}`}</span>
      );
    }
    return skills_arr;
  };

  const isActiveExperts = selected ? "selected" : "";
  const activeExperts = `expert-select ${isActiveExperts}`;
  const removeSelectExpert = `float-right cursor-pointer remove-expert far fa-times-circle`;
  let cardLink = props.link;

  const setCardLink = () => {
    cardLink = props.link ? props.link : "Javascript:void(0);";
  };
  const resetCardLink = () => {
    cardLink = false;
  };

  return (
    <div
      className={`${size ? size : "m-2"} mb-4 ${classnames} ${isActiveExperts}`}
      key={id}
    >
      <div
        className="card mx-auto cursor-pointer"
        style={{
          minHeight: "400px",
          width: fixedWidth !== undefined && !fixedWidth ? "" : "255px"
        }}
        onClick={() => {
          {
            if (cardLink) {
              openLinkInNewTab ? window.open(cardLink) : history.push(cardLink);
            }
          }
        }}
      >
        <div
          className={`card-header ${
            certified ? "justify-content-start align-items-start" : ""
          }`}
          style={{
            backgroundImage: expertImage,
            backgroundColor: `${
              bannerColor ? bannerColor : variables.cardHeaderDefaultColor
            }`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {certified && (
            <div className="certification">
              <span className="badge badge-pill badge-primary">Certified</span>
            </div>
          )}
          {selectExperts && (
            <span onClick={() => handleExperts(id)} className={activeExperts}>
              {selected && <CheckmarkIcon />}
            </span>
          )}
          <div id="remove-expert">
            {showDeleteIcon && (
              <span
                onClick={() => handleExperts(id)}
                className={removeSelectExpert}
                onMouseOver={resetCardLink}
                onMouseOut={setCardLink}
              />
            )}
          </div>
          {expertUrl && (
            <Link to={`/expert-profile/${id}`} className={"view-full-profile"}>
              <span>View Full Profile</span> <MaximizeAltIcon />
            </Link>
          )}
        </div>
        <div className="card-body">
          <div
            className="user-and-title text-center cursor-pointer"
            onClick={() => {
              {
                if (cardLink) {
                  openLinkInNewTab
                    ? window.open(cardLink)
                    : window.location.replace(cardLink);
                }
              }
            }}
          >
            <p>
              <b>{name}</b>
              <span className="d-block h7 text-gray-dark">{jobTitle}</span>
            </p>
          </div>
          {/* /.user-and-title */}
          <div className="location">
            <div className="city-wrapper d-flex align-items-center justify-content-center">
              <i>
                <img src={USFlag} alt="us-flag" />
              </i>
              <span className="d-block text-gray-dark">
                <small>{location.join(", ")}</small>
              </span>
            </div>
            {/* /.city-wrapper */}
            <div className="timezone-wrapper">
              {timezone && (
                <span className="d-block text-center text-grayed">
                  <small>Time Zone: {timezone}</small>
                </span>
              )}
            </div>
          </div>
          {admin_data && admin_data.phone && (
            <div className="rate text-center">
              <span className="h6-5 d-block text-grayed">Phone:</span>
              <span className="h6-5 d-block">
                {maskPhoneNumber(admin_data.phone)}
              </span>
            </div>
          )}

          {admin_data && admin_data.email && (
            <div className="rate text-center">
              <span className="h6-5 d-block text-grayed">Email:</span>
              <span className="h6-5 d-block">
                <b>{admin_data.email}</b>
              </span>
            </div>
          )}

          {hourlyRate && (
            <div className="rate text-center">
              <span className="h5">
                <b>${hourlyRate}</b>
                <span className="text-grayed">/hr</span>
              </span>
            </div>
          )}

          {skills && (
            <div className="skills d-flex align-items-center justify-content-center">
              {skillCount > 0 && <div>{showSkills(skills)}</div>}
            </div>
          )}

          {availability && (
            <div className="rate text-center">
              <span className="h6-5 d-block text-grayed">Availability:</span>
              <span className="h6-5 d-block text-success">
                Less than 10 Hours per Week
              </span>
            </div>
          )}

          {readyForHire && (
            <div className="btn-wrapper text-center mt-4">
              <Link
                to={{
                  pathname: `/edit/public-profile${
                    isSuperAdmin() ? `?id=${id}` : ""
                  }`,
                  state: {
                    expertId: id
                  }
                }}
                className="text-link h6-5 d-block mt-3"
              >
                Edit My Profile…
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;
