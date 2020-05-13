import React from "react";
import SVG from "react-inlinesvg";
import searchIcon from "./nav-icon-search.svg";
import favoritesIcon from "./nav-icon-favorites.svg";
import helpIcon from "./nav-icon-help.svg";
import notificationIcon from "./nav-icon-notifications.svg";
import projectsIcon from "./nav-icon-projects.svg";
import envelopeIcon from "./icon-email.svg";
import envelopeOpenIcon from "./icon-email-open.svg";
import moreIconVertical from "./icon-more-vertical.svg";
import chevronDownIcon from "./icon-chevron-down.svg";
import chevronUpIcon from "./icon-chevron-up.svg";
import chevronLeftIcon from "./icon-chevron-left.svg";
import chevronRightIcon from "./icon-chevron-right.svg";
import arrowLeftIcon from "./icon-arrow-left.svg";
import arrowRightIcon from "./icon-arrow-right.svg";
import checkmarkIcon from "./icon-check.svg";
import checkmarkCircleIcon from "./icon-check-circle.svg";
import clockIcon from "./icon-clock.svg";
import refreshcwIcon from "./icon-refresh-cw.svg";
import checkBoxOff from "./icon-checkbox-off.svg";
import checkBoxOn from "./icon-checkbox-on.svg";
import copyWriterIcon from "./icon-edit.svg";
import uXIcon from "./icon-thumbs-up.svg";
import webDesignIcon from "./icon-trello.svg";
import illustrationIcon from "./icon-pen-tool.svg";
import graphicDIcon from "./icon-layout.svg";
import infoTextIcon from "./icon-info.svg";
import swissKnife from "./icon-swiss-knife.svg";
import projectType from "./icon-project-type.svg";
import projectTimeline from "./icon-timeline.svg";
import calendarIcon from "./icon-calendar.svg";
import womanIcon from "./icon-woman.svg";
import worldIcon from "./icon-world.svg";
import handsIcon from "./icon-hands.svg";
import filePlusIcon from "./icon-file-plus.svg";
import htmlFileIcon from "./icon-html-file.svg";
import fileIcon from "./icon-file.svg";
import plusIcon from "./icon-plus.svg";
import userIcon from "./icon-user.svg";
import userPlusIcon from "./icon-user-plus.svg";
import activityIcon from "./icon-activity.svg";
import dollarIcon from "./icon-dollar-sign.svg";
import sendIcon from "./icon-send.svg";
import messageCircleIcon from "./icon-message-circle.svg";
import checkboxOnIconAlt from "./icon-checkbox-on-alt.svg";
import checkboxOffIcon from "./icon-checkbox-off.svg";
import locationIcon from "./icon-location.svg";
import crossIcon from "./icon-cross.svg";
import octagonAlertIcon from "./icon-alert-octagon.svg";
import sportVestIcon from "./icon-vest-sport.svg";
import editIconAlt from "./icon-edit-alt.svg";
import editIconSimple from "./icon-edit-simple.svg";
import trashIcon from "./icon-trash.svg";
import trashIconAlt from "./icon-trash-alt.svg";
import attachIcon from "./icon-paperclip.svg";
import smileIcon from "./icon-smile.svg";
import gifIcon from "./icon-gif.svg";
import imageIcon from "./icon-image.svg";
import watchIcon from "./icon-watch.svg";
import largeWatchIcon from "./icon-large-watch.svg";
import downloadIcon from "./icon-download.svg";
import logoIcon from "./icon-logo-dark.svg";
import infoIcon from "./icon-basic-info.svg";
import homeIcon from "./icon-home.svg";
import maximizeAltIcon from "./icon-maximize-2.svg";
import cloudUploadIcon from "./icon-upload-cloud.svg";
import blueMessageIcon from "./icon-message.svg";
import starIcon from "./icon-star.svg";
import starIconFilled from "./icon-star-filled.svg";
import awardIcon from "./icon-award.svg";
import warningRedIcon from "./icon-check-circle.png";
import successCheckIcon from "./icon-check-circle-success.png";

import rocketGraphicIcon from "./icon-graphic-rocket.svg";
import expertProIcon from "./icon-pro-expert.svg";
import expertEliteIcon from "./icon-elite-expert.svg";
import expertCertifiedIcon from "./icon-certified-expert.svg";
import expertIcon from "./icon-expert.svg";
import matchedGraphicIcon from "./icon-graphic-matched.svg";
import congratsGraphicIcon from "./icon-graphic-congrats.svg";
import calendarGraphicIcon from "./icon-graphic-calendar.svg";
import coffeeGraphicIcon from "./icon-graphic-coffee.svg";
import doubleClapGraphicIcon from "./icon-double-clap.svg";

import torchliteLogoDark from "../../logo.svg";

import salesforceIcon from "./icon-salesforce.svg";
import googleIcon from "./icon-google.svg";
import officeIcon from "./icon-office.svg";
import linkedinIcon from "./icon-linkedin.svg";
import instagramIcon from "./icon-instagram.svg";
import facebookIcon from "./icon-facebook.svg";
import twitterIcon from "./icon-twitter.svg";
import globeIcon from "./icon-globe.svg";

import helpGraphicIcon from "./icon-help.svg";
import eyeIcon from "./icon-eye.svg";

const SearchIcon = () => <SVG src={searchIcon} alt="search" />;
const FavoritesIcon = () => <SVG src={favoritesIcon} alt="favorites" />;
const HelpIcon = () => <SVG src={helpIcon} alt="help" />;
const NotificationIcon = () => (
  <SVG src={notificationIcon} alt="notifications" />
);
const EnvelopeIcon = () => <SVG src={envelopeIcon} alt="envelope" />;
const EnvelopeIconOpen = () => (
  <SVG src={envelopeOpenIcon} alt="envelope open" />
);
const MoreIconVertical = () => <SVG src={moreIconVertical} alt="more" />;
const ChevronDown = () => <SVG src={chevronDownIcon} alt="chevron down" />;
const ChevronUp = () => <SVG src={chevronUpIcon} alt="chevron up" />;
const ChevronLeft = () => <SVG src={chevronLeftIcon} alt="chevron left" />;
const ChevronRight = () => <SVG src={chevronRightIcon} alt="chevron right" />;

const ArrowLeft = () => <SVG src={arrowLeftIcon} alt="arrow left" />;
const ArrowRight = () => <SVG src={arrowRightIcon} alt="arrow right" />;

const CheckmarkIcon = () => <SVG src={checkmarkIcon} alt="checkmark" />;
const CheckmarkCircleIcon = () => (
  <SVG src={checkmarkCircleIcon} alt="checkmark" />
);
const ClockIcon = () => <SVG src={clockIcon} alt="clock" />;
const RefreshCW = () => <SVG src={refreshcwIcon} alt="refresh" />;

const InlineInfoIcon = () => <SVG src={infoTextIcon} />;

const CheckBoxOff = () => <SVG src={checkBoxOff} alt="unchecked" />;
const CheckBoxOn = () => <SVG src={checkBoxOn} alt="checked" />;

const CopyWriterIcon = () => <SVG src={copyWriterIcon} />;
const UXIcon = () => <SVG src={uXIcon} />;
const WebDesignIcon = () => <SVG src={webDesignIcon} />;
const IllustrationIcon = () => <SVG src={illustrationIcon} />;
const GraphicDIcon = () => <SVG src={graphicDIcon} />;

// used in admin panels
const FilePlusIcon = () => <SVG src={filePlusIcon} />;
const HtmlFileIcon = () => <SVG src={htmlFileIcon} />;
const PlusIcon = () => <SVG src={plusIcon} />;

// expert wizard
const LogoIcon = () => <SVG src={logoIcon} />;
const InfoIcon = () => <SVG src={infoIcon} />;
const SwissKnifeIcon = () => <SVG src={swissKnife} />;
const ProjectTypeIcon = () => <SVG src={projectType} />;
const TimelineIcon = () => <SVG src={projectTimeline} />;
const CalendarIcon = () => <SVG src={calendarIcon} />;
const WomanIcon = () => <SVG src={womanIcon} />;
const WorldIcon = () => <SVG src={worldIcon} />;
const HandsIcon = () => <SVG src={handsIcon} />;

const UserIcon = () => <SVG src={userIcon} />;
const UserPlusIcon = () => <SVG src={userPlusIcon} />;
const ActivityIcon = () => <SVG src={activityIcon} />;
const DollarIcon = () => <SVG src={dollarIcon} />;
const SendIcon = () => <SVG src={sendIcon} />;
const MessageCircleIcon = () => <SVG src={messageCircleIcon} />;

const CrossIcon = () => <SVG src={crossIcon} />;
const CheckboxOnIconAlt = () => <SVG src={checkboxOnIconAlt} />;
const CheckboxOffIcon = () => <SVG src={checkboxOffIcon} />;
const LocationIcon = () => <SVG src={locationIcon} />;
const OctagonAlertIcon = () => <SVG src={octagonAlertIcon} />;
const SportVestIcon = () => <SVG src={sportVestIcon} />;
const EditIconAlt = () => <SVG src={editIconAlt} />;
const EditIconSimple = () => <SVG src={editIconSimple} />;
const TrashIcon = () => <SVG src={trashIcon} />;
const TrashIconAlt = () => <SVG src={trashIconAlt} />;
const AttachIcon = () => <SVG src={attachIcon} />;
const SmileIcon = () => <SVG src={smileIcon} />;
const GifIcon = () => <SVG src={gifIcon} />;
const WatchIcon = () => <SVG src={watchIcon} />;
const LargeWatchIcon = () => <SVG src={largeWatchIcon} />;
const DownloadIcon = () => <SVG src={downloadIcon} />;
const ImageIcon = () => <SVG src={imageIcon} />;
const FileIcon = () => <SVG src={fileIcon} />;
const HomeIcon = () => <SVG src={homeIcon} />;
const ProjectsIcon = () => <SVG src={projectsIcon} />;
const MaximizeAltIcon = () => <SVG src={maximizeAltIcon} />;
const CloudUploadIcon = () => <SVG src={cloudUploadIcon} />;
const BlueMessageIcon = () => <SVG src={blueMessageIcon} />;
const StarIcon = () => <SVG src={starIcon} />;
const StarIconFilled = () => <SVG src={starIconFilled} />;

const AwardIcon = () => <SVG src={awardIcon} />;
const WarningRedIcon = () => (
  <img src={warningRedIcon} width={50} height={50} />
);
const SuccessCheckIcon = () => (
  <img src={successCheckIcon} width={50} height={50} />
);

const RocketGraphicIcon = () => <SVG src={rocketGraphicIcon} />;
const ExpertProIcon = () => <SVG src={expertProIcon} />;
const ExpertEliteIcon = () => <SVG src={expertEliteIcon} />;
const ExpertCertifiedIcon = () => <SVG src={expertCertifiedIcon} />;
const ExpertIcon = () => <SVG src={expertIcon} />;
const MatchedGraphicIcon = () => <SVG src={matchedGraphicIcon} />;
const CongratsGraphicIcon = () => <SVG src={congratsGraphicIcon} />;
const CalendarGraphicIcon = () => <SVG src={calendarGraphicIcon} />;
const CoffeeGraphicIcon = () => <SVG src={coffeeGraphicIcon} />;
const DoubleClapGraphicIcon = () => <SVG src={doubleClapGraphicIcon} />;

const TorchliteLogoDark = () => <SVG src={torchliteLogoDark} />;

const SalesforceIcon = () => <SVG src={salesforceIcon} />;
const GoogleIcon = () => <SVG src={googleIcon} />;
const OfficeIcon = () => <SVG src={officeIcon} />;
const LinkedinIcon = () => <SVG src={linkedinIcon} />;

const HelpGraphicIcon = () => <SVG src={helpGraphicIcon} />;

const InstagramIcon = () => <SVG src={instagramIcon} />;
const FacebookIcon = () => <SVG src={facebookIcon} />;
const TwitterIcon = () => <SVG src={twitterIcon} />;
const GlobeIcon = () => <SVG src={globeIcon} />;

const EyeIcon = () => <SVG src={eyeIcon} />;

export {
  SearchIcon,
  FavoritesIcon,
  HelpIcon,
  NotificationIcon,
  EnvelopeIcon,
  EnvelopeIconOpen,
  MoreIconVertical,
  ChevronDown,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  CheckmarkIcon,
  ClockIcon,
  RefreshCW,
  CheckBoxOff,
  CheckBoxOn,
  CopyWriterIcon,
  UXIcon,
  WebDesignIcon,
  IllustrationIcon,
  GraphicDIcon,
  LogoIcon,
  InfoIcon,
  SwissKnifeIcon,
  InlineInfoIcon,
  ProjectTypeIcon,
  TimelineIcon,
  CalendarIcon,
  WomanIcon,
  WorldIcon,
  HandsIcon,
  FilePlusIcon,
  PlusIcon,
  ChevronUp,
  UserIcon,
  UserPlusIcon,
  ActivityIcon,
  DollarIcon,
  SendIcon,
  MessageCircleIcon,
  CheckboxOnIconAlt,
  CheckboxOffIcon,
  LocationIcon,
  CrossIcon,
  OctagonAlertIcon,
  SportVestIcon,
  ChevronRight,
  EditIconAlt,
  TrashIcon,
  TrashIconAlt,
  AttachIcon,
  SmileIcon,
  GifIcon,
  WatchIcon,
  LargeWatchIcon,
  DownloadIcon,
  HtmlFileIcon,
  ImageIcon,
  FileIcon,
  HomeIcon,
  ProjectsIcon,
  MaximizeAltIcon,
  CloudUploadIcon,
  BlueMessageIcon,
  StarIcon,
  StarIconFilled,
  AwardIcon,
  RocketGraphicIcon,
  ExpertProIcon,
  ExpertEliteIcon,
  ExpertCertifiedIcon,
  ExpertIcon,
  MatchedGraphicIcon,
  CongratsGraphicIcon,
  CalendarGraphicIcon,
  CoffeeGraphicIcon,
  WarningRedIcon,
  CheckmarkCircleIcon,
  SuccessCheckIcon,
  DoubleClapGraphicIcon,
  TorchliteLogoDark,
  SalesforceIcon,
  GoogleIcon,
  OfficeIcon,
  LinkedinIcon,
  HelpGraphicIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  GlobeIcon,
  EditIconSimple,
  EyeIcon
};
