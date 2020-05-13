import React, { useState, useEffect } from "react";
import ManageTagList from "./lists/ManageTagList";
import ManageTagTypeList from "./lists/ManageTagTypeList";
import ManageProjectCategoriesList from "./lists/ManageProjectCategoriesList";
import { getParamsByName } from "../../lib/helper";

// Components
import PrimaryDropdown from "../../components/core/PrimaryDropdown";

const ManageLists = props => {
  const [selectedList, setSelectedList] = useState("tags_table");
  const [label, setLabel] = useState("Manage Tags");
  const [params, setParams] = useState(getParamsByName("filter"));

  const dropdownOptions = [
    { label: "Manage Tags", value: "tags_table" },
    { label: "Manage Tag Types", value: "tags_type_table" },
    { label: "Manage Project Categories", value: "project_categories_table" }
  ];

  useEffect(() => {
    // Set label
    const option = dropdownOptions.find(option => option.value === params);
    option && setLabel(option.label);

    const currentParams = new URLSearchParams(
      props.history.location.search
    ).get("filter");

    setParams(currentParams);
  });

  const selectList = e => {
    const { value, label } = e.target.dataset;
    setLabel(label);
    setParams(value);
    props.history.push(
      `${props.history.location.pathname}?tab=List&filter=${value}`
    );
    setSelectedList(value);
  };

  const ENUM = {
    tags_table: <ManageTagList />,
    tags_type_table: <ManageTagTypeList />,
    project_categories_table: <ManageProjectCategoriesList />
  };

  return (
    <>
      <PrimaryDropdown
        buttonLabel={label}
        dropdownLinks={dropdownOptions}
        onClick={selectList}
        menuPosition={false}
      />

      {ENUM[params]}
    </>
  );
};

export default ManageLists;
