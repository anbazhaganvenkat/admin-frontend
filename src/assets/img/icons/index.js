import React from "react";

import SVG from "react-inlinesvg";
import searchIcon from "./nav-icon-search.svg";
import chevronDownIcon from "./icon-chevron-down.svg";
import chevronUpIcon from "./icon-chevron-up.svg";

const SearchIcon = () => <SVG src={searchIcon} alt="search" />;
const ChevronDown = () => <SVG src={chevronDownIcon} alt="chevron down" />;
const ChevronUp = () => <SVG src={chevronUpIcon} alt="chevron up" />;

export { SearchIcon, ChevronDown, ChevronUp };
