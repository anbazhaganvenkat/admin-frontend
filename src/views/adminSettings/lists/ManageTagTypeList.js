import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DropdownItem } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// Component
import ReduxTable, { ReduxColumn } from "../../../components/ReduxTable";
import MoreDropdown from "../../../components/drodpowns/MoreDropdown";
import AddButton from "../../../components/core/AddButton";
import Form from "../../../components/Form";
import Text from "../../../components/Text";

// Configs
import { endpoints } from "../../../configs";

// Helper
import { toString } from "../../../lib/helper";

// Tags
import {
  deleteTagType,
  addTagType,
  updateTagType
} from "../../../actions/tagType";

const ManageTagTypeList = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  /**
   * Create tag
   *
   * @param data
   */
  const tagTypeCreate = data => {
    props.actions.addTagType(data);
  };

  /**
   * Update tag type
   *
   * @param data
   * @param id
   */
  const tagTypeUpdate = data => {
    props.actions.updateTagType(id, data);
  };

  /**
   * Delete tag type
   *
   * @param id
   */
  const handleDelete = id => {
    props.actions.deleteTagType(id);
  };

  const _toggle = tagTypeId => {
    setId(tagTypeId || 0);
    setIsOpen(!isOpen);
  };

  const headerButton = () => (
    <div className="btn-wrapper">
      <AddButton
        label="New Tag Type"
        className="pull-right btn btn-secondary"
        onClick={() => {
          setName("");
          _toggle();
        }}
      />
      {tagTypeModal()}
    </div>
  );

  // Render the tag type modal
  const tagTypeModal = () => (
    <Modal
      isOpen={isOpen}
      toggle={_toggle}
      className="landing-create-popup w-100"
    >
      <ModalHeader
        toggle={_toggle}
        cssModule={{ "modal-title": "w-100 text-center" }}
      >
        <p>{id ? "Edit Tag Type" : "Create Tag Type"}</p>
      </ModalHeader>
      <Form
        initialValues={{
          name: name || ""
        }}
        onSubmit={values => {
          values.name = toString(values.name);
          id ? tagTypeUpdate(values) : tagTypeCreate(values);
          setTimeout(() => {
            setIsOpen(!isOpen);
          }, 100);
        }}
      >
        <ModalBody className="ml-3 mr-3 mt-2 mb-3">
          <div>
            <Text
              name="name"
              label="Tag Type"
              placeholder="Enter tag type"
              notify={true}
              error=""
              required
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="container-fluid">
            <div className="col-sm-12 text-center">
              <Button type="submit" label="">
                {id ? "Save" : "Create Tag Type"}
              </Button>
            </div>
          </div>
        </ModalFooter>
      </Form>
    </Modal>
  );

  return (
    <div>
      <ReduxTable
        id="tagTypes"
        apiURL={`${endpoints().tagTypeAPI}`}
        headerButton={headerButton()}
        onRowClick={row => {
          setName(row.name);
          return _toggle(row.id);
        }}
        showHeader
        searchDisabled
      >
        <ReduxColumn type="link" isClickable="true" field="name" sortBy="name">
          Name
        </ReduxColumn>
        <ReduxColumn field="createdAt" sortBy="createdAt">
          Created At
        </ReduxColumn>
        <ReduxColumn
          field="status"
          disableOnClick
          className="action-column"
          renderField={row => (
            <div className="text-center landing-group-dropdown">
              <MoreDropdown>
                <DropdownItem
                  onClick={() => {
                    setName(row.name);
                    return _toggle(row.id);
                  }}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  className={"text-danger"}
                  onClick={() => {
                    handleDelete(row.id);
                  }}
                >
                  Delete
                </DropdownItem>
              </MoreDropdown>
            </div>
          )}
        >
          Action
        </ReduxColumn>
      </ReduxTable>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { deleteTagType, addTagType, updateTagType },
      dispatch
    )
  };
}

export default connect(() => {
  return {};
}, mapDispatchToProps)(ManageTagTypeList);
