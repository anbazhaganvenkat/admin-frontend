import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DropdownItem } from "reactstrap";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/ReduxTable";
import MoreDropdown from "../../../components/drodpowns/MoreDropdown";
import AddButton from "../../../components/core/AddButton";
import Form from "../../../components/Form";
import Text from "../../../components/Text";
import Select from "../../../components/Select";

// Helper
import { toString } from "../../../lib/helper";

// API call
import { apiClient } from "../../../apiClient";

// Configs
import { endpoints } from "../../../configs";

// Tags
import { deleteTag, addTag, updateTag } from "../../../actions/tags";

class ManageTagList extends React.Component {
  constructor(props) {
    super(props);
    // Set the initial input values
    this.state = {
      isLoading: false,
      isOpen: false,
      id: 0,
      name: "",
      type: "",
      typeId: null,
      projectCategory: "",
      projectCategoryId: null,
      tagTypeDetails: [],
      projectCategoryDetails: []
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   *
   * @param id
   */
  handleDelete(id) {
    this.props.actions.deleteTag(id);
  }

  /**
   * Create tag
   *
   * @param data
   */
  tagCreate = data => {
    this.props.actions.addTag(data);
  };

  /**
   * Update tag
   *
   * @param data
   * @param id
   */
  tagUpdate = data => {
    this.props.actions.updateTag(this.state.id, data);
  };

  _toggle = tagId => {
    this.setState({ isOpen: !this.state.isOpen, id: tagId || 0 });
  };

  // Render the header buttin
  headerButton = () => (
    <div className="btn-wrapper">
      <AddButton
        label="New Tag"
        className="pull-right btn btn-secondary"
        onClick={() => {
          this.setState({
            name: "",
            projectCategory: "",
            projectCategoryId: null,
            type: "",
            typeId: null
          });
          this._toggle();
        }}
      />
      {this.tagModal()}
    </div>
  );

  componentDidMount = () => {
    this.getTagTypeData();
    this.getProjectCategory();
  };

  // Get Tag Type Data
  getTagTypeData = () => {
    this.setState({ isLoading: true }, () => {
      return apiClient
        .get(`${endpoints().tagTypeAPI}`)
        .then(response => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
          }
          console.error(successMessage);
          this.setState({ tagTypeDetails: response.data.data });
        })
        .catch(error => {
          if (error.response && error.response.status >= 400) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            console.error(errorMessage);
          }
        });
    });
  };

  // Get Project Category Data
  getProjectCategory = () => {
    this.setState({ isLoading: true }, () => {
      return apiClient
        .get(`${endpoints().projectCategoryAPI}`)
        .then(response => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
          }
          console.error(successMessage);
          this.setState({ projectCategoryDetails: response.data.data });
        })
        .catch(error => {
          if (error.response && error.response.status >= 400) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            console.error(errorMessage);
          }
        });
    });
  };

  // Tag type options
  tagTypeOptions = () => {
    const { tagTypeDetails } = this.state;
    return (
      tagTypeDetails &&
      tagTypeDetails.map(tagType => ({
        label: tagType.name,
        value: tagType.id
      }))
    );
  };

  // Project category options
  projectCategoryOptions = () => {
    const { projectCategoryDetails } = this.state;
    return (
      projectCategoryDetails &&
      projectCategoryDetails.map(projectCategory => ({
        label: projectCategory.name,
        value: projectCategory.id
      }))
    );
  };

  // Render the tag modal
  tagModal = () => (
    <div>
      <Modal
        isOpen={this.state.isOpen}
        toggle={this._toggle}
        className="landing-create-popup w-100"
        backdrop="static"
      >
        <ModalHeader
          toggle={this._toggle}
          cssModule={{ "modal-title": "w-100 text-center" }}
        >
          <p>{this.state.id ? "Edit Tag" : "Create Tag"}</p>
        </ModalHeader>
        <Form
          initialValues={{
            name: this.state.name || "",
            projectCategory: {
              value: this.state.projectCategoryId || null,
              label: this.state.projectCategory || ""
            },
            type: {
              value: this.state.typeId || null,
              label: this.state.type || ""
            }
          }}
          onSubmit={values => {
            values.name = toString(values.name);
            values.type = toString(values.type ? values.type.value : "");
            values.projectCategory = toString(
              values.projectCategory ? values.projectCategory.value : ""
            );
            this.state.id ? this.tagUpdate(values) : this.tagCreate(values);
            setTimeout(() => {
              this._toggle();
            }, 100);
          }}
        >
          <ModalBody className="ml-3 mr-3 mt-2 mb-3">
            <div>
              <Text
                name="name"
                label="Tag Name"
                placeholder="Enter tag name"
                error=""
                notify={true}
                required
              />
            </div>
            <div>
              <Select
                name="type"
                label="Tag Type"
                options={this.tagTypeOptions()}
                error=""
                notify={true}
                required
              />
            </div>
            <div>
              <Select
                name="projectCategory"
                label="Project Category"
                options={this.projectCategoryOptions()}
                error=""
                notify={true}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="container-fluid">
              <div className="col-sm-12 text-center">
                <Button type="submit" label="">
                  {this.state.id ? "Save" : "Create Tag"}
                </Button>
              </div>
            </div>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );

  render() {
    return (
      <div>
        <ReduxTable
          id="tags"
          apiURL={`${endpoints().tagAPI}`}
          headerButton={this.headerButton()}
          onRowClick={row => {
            this.setState({
              name: row.name,
              projectCategory: row.projectCategory,
              projectCategoryId: row.projectCategoryId,
              type: row.type,
              typeId: row.typeId
            });
            return this._toggle(row.id);
          }}
          showHeader
          searchDisabled
        >
          <ReduxColumn type="link" isClickable="true" field="name">
            Name
          </ReduxColumn>
          <ReduxColumn field="type">Type</ReduxColumn>
          <ReduxColumn field="projectCategory">Project Category</ReduxColumn>
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
                      this.setState({
                        name: row.name,
                        projectCategory: row.projectCategory,
                        projectCategoryId: row.projectCategoryId,
                        type: row.type,
                        typeId: row.typeId
                      });
                      return this._toggle(row.id);
                    }}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    className={"text-danger"}
                    onClick={() => this.handleDelete(row.id)}
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ deleteTag, addTag, updateTag }, dispatch)
  };
}

export default connect(() => {
  return {};
}, mapDispatchToProps)(ManageTagList);
