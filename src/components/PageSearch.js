import React from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { SearchIcon } from "../assets/img/icons";

const PageSearch = props => {
  const { classnames, placeholder, onChange } = props;

  return (
    <>
      <InputGroup className={`${classnames} align-items-stretch`}>
        <p className="font-weight-bold my-auto ml-0 mr-2 d-block d-md-none">
          Search:{" "}
        </p>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <SearchIcon />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder={placeholder} onChange={onChange} />
      </InputGroup>
    </>
  );
};

export default PageSearch;
