import React from "react";
import propTypes from "prop-types";
import SVG from "react-inlinesvg";
import EnvelopeIcon from "../../assets/img/icons/icon-email.svg";
import EnvelopeIconOpen from "../../assets/img/icons/icon-email-open.svg";
import PaintIcon from "../../assets/img/icons/icon-paint.svg";
import GearIcon from "../../assets/img/icons/icon-gear.svg";
import FileIcon from "../../assets/img/icons/icon-file.svg";
import SnowflakeIcon from "../../assets/img/icons/icon-snowflake.svg";
import DripIcon from "../../assets/img/icons/icon-drip.svg";
import ConsultingIcon from "../../assets/img/icons/icon-consulting.svg";
import NestIcon from "../../assets/img/icons/icon-nest.svg";
import SocialIcon from "../../assets/img/icons/icon-social.svg";
import ConveIcon from "../../assets/img/icons/icon-social2.svg";
import GoalIcon from "../../assets/img/icons/icon-goal.svg";

class playbookIcon extends React.Component {
  render() {
    const playbookIconOptions = [
      {
        url: EnvelopeIcon,
        name: "EnvelopeIcon"
      },
      {
        url: EnvelopeIconOpen,
        name: "EnvelopeIconOpen"
      },
      {
        url: PaintIcon,
        name: "PaintIcon"
      },
      {
        url: GearIcon,
        name: "CogIcon"
      },
      {
        url: FileIcon,
        name: "FileIcon"
      },
      {
        url: DripIcon,
        name: "DripIcon"
      },
      {
        url: ConsultingIcon,
        name: "ConsultingIcon"
      },
      {
        url: SnowflakeIcon,
        name: "SnowflakeIcon"
      },
      {
        url: NestIcon,
        name: "NestIcon"
      },
      {
        url: SocialIcon,
        name: "SocialIcon"
      },
      {
        url: ConveIcon,
        name: "ConveIcon"
      },
      {
        url: GoalIcon,
        name: "GoalIcon"
      }
    ];

    const icon = playbookIconOptions.find(icon => {
      return icon.name === this.props.iconName;
    });

    return (
      <div className="icon-picker">
        {icon ? (
          <span className={icon.name}>
            <SVG src={icon.url} alt={icon.name} />
          </span>
        ) : (
          ""
        )}
      </div>
    );
  }
}

playbookIcon.propTypes = {
  iconName: propTypes.string
};

export default playbookIcon;
