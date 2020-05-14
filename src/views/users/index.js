import React, { Component } from "react";

// Configs
import { isLoggedIn } from "../../lib/helper";

// Components
import PageTitle from "../../components/PageTitle";
import ReduxTable, { ReduxColumn } from "../../components/ReduxTable";

//Add User Popup
import AddUserModal from "./AddUserModal";

class users extends Component {
  componentDidMount() {
    // Check is logged in user
    isLoggedIn();
  }

  render() {
    const headerButton = (
      <div className="btn-wrapper pull-right">
        <AddUserModal />
      </div>
    );

    return (
      <>
        {/* /.page-heading */}
        <PageTitle label="Users" />
        {headerButton}

        <div className="mb-5">
          <ReduxTable
            id="users"
            showHeader
            searchPlaceholder="Search Users..."
            newTableHeading
            apiURL="/v1/user"
            onRowClick={(row) =>
              this.props.history.push(`/user/edit/${row.id}`)
            }
          >
            <ReduxColumn
              field="name"
              sortBy="name"
              type="link"
              isClickable="true"
            >
              Name
            </ReduxColumn>
            <ReduxColumn field="email" sortBy="email">
              Email
            </ReduxColumn>
            <ReduxColumn field="phoneNumber" sortBy="phoneNumber">
              phone
            </ReduxColumn>
            <ReduxColumn field="createdAt" sortBy="createdAt">
              Created At
            </ReduxColumn>
            <ReduxColumn field="updatedAt" sortBy="updatedAt">
              Updated At
            </ReduxColumn>
          </ReduxTable>
        </div>
      </>
    );
  }
}

export default users;
