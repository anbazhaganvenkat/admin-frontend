import React, { useState } from "react";
import { DropdownItem } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import ReduxTable, { ReduxColumn } from "../../../components/ReduxTable";
import MoreDropdown from "../../../components/drodpowns/MoreDropdown";
import Form from "../../../components/Form";
import Text from "../../../components/Text";
import AddButton from "../../../components/core/AddButton";

// Configs
import { endpoints } from "../../../configs";

// Helper
import { toString } from "../../../lib/helper";

// Actions
import {
  addProjectCategory,
  updateProjectCategory,
  deleteProjectCategory
} from "../../../actions/projectCategory";

const ManageProjectCategoriesList = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  /**
   * Create project category
   *
   * @param data
   */
  const projectCategoryCreate = data => {
    props.actions.addProjectCategory(data);
  };

  /**
   * Update project category
   *
   * @param data
   * @param id
   */
  const projectCategoryUpdate = data => {
    props.actions.updateProjectCategory(id, data);
  };

  /**
   * Delete project category
   *
   * @param id
   */
  const handleDelete = id => {
    props.actions.deleteProjectCategory(id);
  };

  const headerButton = () => (
    <div className="btn-wrapper">
      <AddButton
        label="New Project Category"
        className="pull-right btn btn-secondary"
        onClick={() => {
          setName("");
          _toggle();
        }}
      />
      {projectCategoryModal()}
    </div>
  );

  const _toggle = projectCategoryId => {
    setId(projectCategoryId || 0);
    setIsOpen(!isOpen);
  };

  // Render the project category modal
  const projectCategoryModal = () => (
    <Modal
      isOpen={isOpen}
      toggle={_toggle}
      className="landing-create-popup w-100"
    >
      <ModalHeader
        toggle={_toggle}
        cssModule={{ "modal-title": "w-100 text-center" }}
      >
        <p>{id ? "Edit Project Category" : "Create Project Category"}</p>
      </ModalHeader>
      <Form
        initialValues={{
          name: name || ""
        }}
        onSubmit={values => {
          values.name = toString(values.name);
          id ? projectCategoryUpdate(values) : projectCategoryCreate(values);
          setTimeout(() => {
            setIsOpen(!isOpen);
          }, 100);
        }}
      >
        <ModalBody className="ml-3 mr-3 mt-2 mb-3">
          <div>
            <Text
              name="name"
              label="Project Category"
              placeholder="Enter project category"
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
                {id ? "Save" : "Create Project Category"}
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
        id="projectCategory"
        apiURL={`${endpoints().projectCategoryAPI}`}
        headerButton={headerButton()}
        onRowClick={row => {
          setName(row.name);
          return _toggle(row.id);
        }}
        showHeader
        searchDisabled
      >
        <ReduxColumn type="link" isClickable="true" field="name">
          Name
        </ReduxColumn>
        <ReduxColumn field="createdAt">Created At</ReduxColumn>
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
      { addProjectCategory, updateProjectCategory, deleteProjectCategory },
      dispatch
    )
  };
}

export default connect(() => {
  return {};
}, mapDispatchToProps)(ManageProjectCategoriesList);
