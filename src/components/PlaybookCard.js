import React from "react";
import MoreDropdown from "../components/drodpowns/MoreDropdown";
import variables from "../scss/_variables.scss";
import headerTriangles from "../assets/header-triangles.svg";
import { DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";
import PlaybookIcon from "../components/core/PlaybookIcon";
import { ArrowRight, MessageCircleIcon } from "../assets/img/icons";
import { PLAYBOOK_PRICING_TYPE_HOURLY_PAYMENT } from "../constants/playbook";
import { CLICK_MARKETPLACE_LANDING_PAGE_PLAYBOOK } from "../constants/MetaCXEvents";

// Library
import { metaCXTrack } from "../lib/metaCXTrack";

class PlaybookCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardLink:
        this.props.isPreview === "true"
          ? "Javascript:void(0);"
          : this.props.link
          ? this.props.link
          : "Javascript:void(0);"
    };
    this.renderUnreadMessages = this.renderUnreadMessages.bind(this);
    this.renderAlertNotification = this.renderAlertNotification.bind(this);
  }

  renderUnreadMessages() {
    const { notifications } = this.props;
    if (notifications !== undefined && notifications.newMessages !== null) {
      return (
        <div className="new-message">
          <MessageCircleIcon />
          {notifications.newMessages}
        </div>
      );
    }
  }

  renderAlertNotification() {
    const { notifications } = this.props;
    if (
      notifications !== undefined &&
      notifications.notificationAlertLabel !== null
    ) {
      return (
        <div className="new-alert-message">
          {notifications.notificationAlertLabel}
        </div>
      );
    }
  }

  // Open the link
  openLink() {
    const { link, openLinkInNewTab } = this.props;
    if (link) {
      openLinkInNewTab ? window.open(link) : this.props.history.push(link);
    }
  }
  setCardLink() {
    const { openLinkInNewTab } = this.props;
    if (openLinkInNewTab) {
      this.setState({
        cardLink: "Javascript:void(0);"
      });
    } else {
      this.setState({
        cardLink:
          this.props.isPreview === "true"
            ? "Javascript:void(0);"
            : this.props.link
            ? this.props.link
            : "Javascript:void(0);"
      });
    }
  }
  resetCardLink() {
    this.setState({
      cardLink: "Javascript:void(0)"
    });
  }

  render() {
    const cardBoxStyle = {
      height: showCardBody ? "350px" : "",
      width: this.props.fullWidth ? "" : "255px"
    };

    const multiLineElipsisStyle = {
      display: "-webkit-box",
      WebkitLineClamp: "3",
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    };

    // props
    const {
      landingPageName,
      data,
      size,
      link,
      viewLink,
      showEditOptions,
      onSaveDraft,
      onSavePublish,
      onSaveDuplicate,
      onClickDelete,
      selectPlaybooks,
      removePlaybook,
      showCardBody,
      isActive,
      handlePlaybooks,
      notifications,
      isPreview,
      bannerImageUrl,
      boxShadow,
      placeHolder,
      showPrice,
      showOption,
      isMarketPlaceLandingPage,
      salesforceLanding
    } = this.props;

    // Playbook details
    const {
      id,
      bannerColor,
      name,
      price,
      bannerImagePathUrl,
      bannerIcon,
      publishStatus,
      pricingType,
      priceRange,
      description
    } = data;

    const pricesArray = [];
    let standard, basic, premium;
    if (price && price.priceRange) {
      const priceRange = price.priceRange;
      standard = priceRange.standard;
      basic = priceRange.basic;
      premium = priceRange.premium;
    }

    if (standard) {
      pricesArray.push(standard);
    }

    if (basic) {
      pricesArray.push(basic);
    }

    if (premium) {
      pricesArray.push(premium);
    }

    const cursorPointer = isPreview === "true" ? "" : "cursor-pointer";

    const ImageURL = bannerImagePathUrl || bannerImageUrl;

    const isActivePlaybooks = isActive
      ? "active-playbooks far fa-check-circle"
      : "inactive-playbooks far fa-circle";

    const activePlaybooks = `float-right ${cursorPointer} ${isActivePlaybooks}`;
    const removeSelectPlaybook = `float-right cursor-pointer remove-expert far fa-times-circle`;

    const TagName = this.props.tag || "a";

    return (
      <TagName
        id="card-link"
        href={this.state.cardLink}
        style={{ color: "#212529", cursor: isPreview ? "default" : "pointer" }}
        className={`
          ${boxShadow !== false ? "playbook-card-link" : ""}
          ${isPreview === "true" ? "" : size ? size : "col-4"}
          mb-4
          text-decoration-none
        `}
        key={id}
        onClick={e => {
          // Track MetaCX event for click on Playbook card
          isMarketPlaceLandingPage &&
            metaCXTrack(
              CLICK_MARKETPLACE_LANDING_PAGE_PLAYBOOK,
              {
                landingPageName,
                playbookId: id,
                name,
                price,
                pricingType,
                priceRange
              },
              () => {
                e.preventDefault();
              }
            );
        }}
      >
        <div className={`${cursorPointer} card mx-auto`} style={cardBoxStyle}>
          <div
            id="card-image"
            className="card-header"
            style={{
              backgroundImage: `url(${
                bannerImageUrl
                  ? bannerImageUrl
                  : ImageURL
                  ? ImageURL
                  : headerTriangles
              })`,
              backgroundColor: `${
                bannerColor ? bannerColor : variables.cardHeaderDefaultColor
              }`,
              backgroundSize: "cover"
            }}
            onMouseOver={e => {
              if (e.target.id === "card-image") {
                this.setCardLink();
              } else {
                this.resetCardLink();
              }
            }}
            onClick={e => {
              if (e.target.id === "card-image") {
                this.openLink();
              }
            }}
          >
            {showOption && showEditOptions && (
              <MoreDropdown>
                <Link
                  to={viewLink}
                  target="_blank"
                  style={{
                    color: "inherit",
                    textDecoration: "none"
                  }}
                >
                  <DropdownItem>View</DropdownItem>
                </Link>
                <Link
                  to={`${link}`}
                  style={{
                    color: "inherit",
                    textDecoration: "none"
                  }}
                >
                  <DropdownItem>Edit</DropdownItem>
                </Link>
                <DropdownItem onClick={onSaveDuplicate}>Duplicate</DropdownItem>
                <DropdownItem
                  onClick={
                    publishStatus === "Active" ? onSaveDraft : onSavePublish
                  }
                >
                  {publishStatus === "Active" ? "Unpublish" : "Publish"}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem className={"text-danger"} onClick={onClickDelete}>
                  Delete
                </DropdownItem>
              </MoreDropdown>
            )}
            {/* /.dropdown-wrapper */}
            <div className="card-header-icon" onClick={() => this.openLink()}>
              {!ImageURL ? <PlaybookIcon iconName={bannerIcon} /> : ""}
              {/*TODO: Santhosh, let's try to implement a way to dynamically load all icons, instead of duplicating the code if possible! */}
            </div>

            {selectPlaybooks && (
              <span
                onClick={() => handlePlaybooks(id)}
                className={activePlaybooks}
                style={{
                  right: "20px",
                  top: "0.75rem",
                  position: "absolute",
                  color: "white",
                  fontSize: "50px"
                }}
              ></span>
            )}
            <div id="remove-playbook">
              {removePlaybook && (
                <span
                  onClick={() => handlePlaybooks(id)}
                  className={removeSelectPlaybook}
                  onMouseOver={e => {
                    if (e.target.id === "remove-playbook") {
                      this.setCardLink();
                    } else {
                      this.resetCardLink();
                    }
                  }}
                />
              )}
            </div>

            {this.renderUnreadMessages()}
            {this.renderAlertNotification()}
          </div>
          <div className={"body-wrapper"}>
            {showCardBody !== false ? (
              <div className="card-body" onClick={() => this.openLink()}>
                <p
                  className={`${cursorPointer} card-title font-weight-bold`}
                  style={multiLineElipsisStyle}
                >
                  {!name && placeHolder ? "" : name}
                </p>
                {salesforceLanding && description && (
                  <p className={["h6-5", "playbook-description"].join(" ")}>
                    {description}
                  </p>
                )}
              </div>
            ) : (
              ""
            )}
            {price && price.priceRange && (
              <div
                className="card-footer"
                style={{ minHeight: "40px" }}
                onClick={() => this.openLink()}
              >
                {price.salesPrice && (
                  <p>
                    <b>On Sale: </b>{" "}
                    <span className="price text-success">
                      <s>{`$${price.currentPrice}`}</s>{" "}
                      <b> {`$${price.currentPrice}`}</b>
                    </span>
                  </p>
                )}

                {pricesArray.length > 0 ? (
                  <p>
                    <b>
                      {pricesArray.length === 1 ? "Price: " : "Starting at: "}
                    </b>
                    <span className="price text-success">
                      <b>{`$${Math.min.apply(Math, pricesArray)}`}</b>
                    </span>
                  </p>
                ) : (
                  ""
                )}

                {showPrice !== false && price.currentPrice && (
                  <p>
                    <b>
                      {priceRange && priceRange.length === 1
                        ? "Price: "
                        : "Starting at: "}
                    </b>
                    <span className="price text-success">
                      <b>{`$${price.currentPrice}${
                        pricingType === PLAYBOOK_PRICING_TYPE_HOURLY_PAYMENT
                          ? "/hr."
                          : ""
                      }`}</b>
                    </span>
                  </p>
                )}

                {!price.priceRange && !price.salesPrice && price.currentPrice && (
                  <p>
                    <b>Price: </b>{" "}
                    <span className="price text-success">
                      <b>{`$${price.currentPrice}`}</b>
                    </span>
                  </p>
                )}

                {salesforceLanding && (
                  <Link to={this.state.cardLink}>
                    View Playbook <ArrowRight />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </TagName>
    );
  }
}

export default PlaybookCard;
