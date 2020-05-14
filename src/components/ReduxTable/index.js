import React from "react";
import { Table, Row, Col, Input } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchList, setTablePage } from "../../actions/table";
import "./styles.scss";
import Pagination from "../Pagination";
import { ChevronDown, ChevronUp } from "../../assets/img/icons";
import PageSearch from "../PageSearch";
import Spinner from "../../components/Spinner";

export const ReduxColumn = () => {};

class ReduxTable extends React.Component {
  state = {
    page: 1,
    pageSize: 10,
    id: "",
    apiURL: "",
    selectedAll: false,
    selectedIds: [],
    searchTerm: "",
    isSearch: false,
    isActive: "",
    pagination: true,
    selectedSortOption: "Alphabetical A-Z",
    sortByOptions: [
      {
        value: "a-z",
        label: "Alphabetical A-Z",
      },
    ],
  };

  componentDidMount() {
    const { apiURL, id, table } = this.props;

    this.setState(
      {
        id,
        apiURL,
        page: table[id] && table[id].currentPage ? table[id].currentPage : 1,
        pageSize: table[id] && table[id].pageSize ? table[id].pageSize : 10,
      },
      this.fetchData
    );
  }

  /**
   * Fetch data using API call
   *
   * @param {*} force
   */

  fetchData(force, sort, sortDir) {
    const { id, apiURL, page, pageSize, searchTerm, pagination } = this.state;
    const {
      table,
      actions: { fetchList, setTablePage },
    } = this.props;

    const listDetails = table[id] || {};

    const params = this.props.params || {};
    params.search = searchTerm;
    params.sort = sort || "";
    params.sortDir = sortDir || "";
    params.pagination = pagination;

    if (!listDetails.isFetching) {
      if (!listDetails[page] || force) {
        fetchList(id, apiURL, page, pageSize, params);
      } else {
        setTablePage(id, page);
      }
    }
  }

  /**
   * Change page
   *
   * @param {*} page
   */
  onPageChange(page) {
    this.setState({ page }, this.fetchData);
  }

  /**
   * Change page size
   *
   * @param {*} e
   */
  onPageSizeChange(e) {
    this.setState({ page: 1, pageSize: e.target.value, isSearch: false }, () =>
      this.fetchData(true)
    );
  }

  /**
   * Select all checkbox
   *
   * @param {*} data
   * @param {*} e
   */
  toggleSelectAll(data, e) {
    const selectedIds = this.state.selectedIds;

    data.forEach((row) => {
      if (e.target.checked) {
        if (selectedIds.indexOf(row.id) < 0) {
          selectedIds.push(row.id);
        }
      } else {
        if (selectedIds.indexOf(row.id) >= 0) {
          selectedIds.splice(selectedIds.indexOf(row.id), 1);
        }
      }
    });

    this.setState(
      {
        selectedAll: e.target.checked,
        selectedIds: selectedIds,
      },
      () => {
        this.props.onBulkSelect(selectedIds);
      }
    );
  }

  /**
   * Single checkbox select
   *
   * @param {*} data
   * @param {*} e
   */
  toggleSelect(data, e) {
    const rowIds = [];
    data.forEach((row) => {
      rowIds.push(row.id);
    });

    const rowId = e.target.value;
    const selectedIds = this.state.selectedIds;
    if (e.target.checked) {
      if (selectedIds.indexOf(rowId) < 0) {
        selectedIds.push(rowId);
      }
    } else {
      if (selectedIds.indexOf(rowId) >= 0) {
        selectedIds.splice(selectedIds.indexOf(rowId), 1);
      }
    }

    let selectedLength = 0;
    rowIds.forEach((rowId) => {
      if (selectedIds.indexOf(rowId) >= 0) {
        selectedLength++;
      }
    });

    this.setState(
      {
        selectedAll: rowIds.length === selectedLength,
        selectedIds: selectedIds,
      },
      () => {
        this.props.onBulkSelect(selectedIds);
      }
    );
  }

  componentWillReceiveProps(props) {
    const { table, id } = props;
    const listDetails = table[id];
    let data = [];

    if (listDetails) {
      data = listDetails[listDetails.currentPage] || [];
    }

    const selectedIds = this.state.selectedIds;
    let selectedLength = 0;
    data.forEach((row) => {
      if (selectedIds.indexOf(row.id) >= 0) {
        selectedLength++;
      }
    });

    this.setState({
      selectedAll: selectedLength > 0 && selectedLength === data.length,
    });
  }

  /**
   * Change search term
   *
   * @param {*} event
   */
  onChange(event) {
    this.setState(
      {
        isSearch: true,
        searchTerm: encodeURIComponent(event.target.value),
      },
      () =>
        setTimeout(() => {
          this.fetchData(true);
          this.setState({
            selectedAll: false,
            selectedIds: [],
          });
        }, 1000)
    );
  }

  columnSortBy(sortBy) {
    this.setState({ isActive: !this.state.isActive, sortBy: sortBy });
    let sortDir = "";
    if (this.state.isActive) {
      sortDir = "DESC";
    } else {
      sortDir = "ASC";
    }
    this.fetchData(true, sortBy, sortDir);
  }

  handleSortByChange = (value) => {
    this.getSortByOptions(value);
  };

  // Sort by option
  getSortByOptions(value) {
    let sortBy = "";
    let sortDir = "";
    if (this.state.isActive) {
      sortDir = "DESC";
    } else {
      sortDir = "ASC";
    }
    this.fetchData(true, sortBy, sortDir);
  }



  render() {
    const {
      table,
      id,
      children: columns,
      headerComponent,
      showHeader,
      onRowClick,
      bulkSelect,
      headerButton,
      searchPlaceholder,
      searchDisabled,
      newTableHeading,
    } = this.props;
    const listDetails = table[id];
    const isLoading = !listDetails || listDetails.isFetching;
    const {
      selectedAll,
      selectedIds,
      selectedSortOption,
      sortByOptions,
    } = this.state;

    let data = [];
    let totalCount = 0;
    let currentPage = "";
    let pageSize = "";
    let startPage = "";
    let endPage = "";

    if (listDetails) {
      currentPage = listDetails.currentPage;
      totalCount = listDetails.totalCount;
      pageSize = listDetails.pageSize;
      data = listDetails[currentPage] || [];

      startPage = (currentPage - 1) * pageSize + 1;
      startPage = startPage > totalCount ? totalCount : startPage;

      endPage = currentPage * pageSize;
      endPage = endPage > totalCount ? totalCount : endPage;
    }

    const columnLength = columns.length + (bulkSelect ? 1 : 0);

    return (
      <div className={`redux-table ${this.props.className}`}>
        <div>
          {showHeader && (
            <>
              {newTableHeading ? (
                <div
                  className={`page-heading d-flex cover flex-md-row align-items-start flex-column ${
                    searchDisabled
                      ? "justify-content-end"
                      : "justify-content-between"
                  }`}
                >
                  {!searchDisabled && (
                    <PageSearch
                      classnames="page-search"
                      placeholder={searchPlaceholder}
                      onChange={this.onChange.bind(this)}
                    />
                  )}
                </div>
              ) : (
                <Row className="mb-3">
                  <Col xs="12">
                    <div
                      className={`page-heading d-flex ${
                        searchDisabled
                          ? "justify-content-end"
                          : "justify-content-between"
                      }`}
                    >
                      {!searchDisabled && (
                        <PageSearch
                          classnames="page-search"
                          placeholder={searchPlaceholder}
                          onChange={this.onChange.bind(this)}
                        />
                      )}
                      {headerButton && headerButton}
                    </div>
                  </Col>
                </Row>
              )}
            </>
          )}

          <Table hover responsive className="table-outline">
            <thead className="thead-light">
              <tr>
                {bulkSelect && (
                  <th style={{ width: 12, paddingRight: 0 }}>
                    <input
                      type="checkbox"
                      checked={selectedAll}
                      onChange={this.toggleSelectAll.bind(this, data)}
                    />
                  </th>
                )}
                {React.Children.map(columns, (x) => {
                  // TODO: Santhosh, let's have the "selected" class applied when you click on the TH for the filterings.
                  return (
                    x && (
                      <th
                        className={`${
                          x.props.sortBy !== "" ? "cursor-pointer" : ""
                        } ${x.props.className}`}
                        onClick={() => {
                          return !x.props.disableOnClick
                            ? this.columnSortBy(x.props.sortBy)
                            : false;
                        }}
                        colSpan={x.props.colspan}
                      >
                        {x.props.children}
                        {!x.props.disableOnClick ? (
                          x.props.sortBy === this.state.sortBy ? (
                            this.state.isActive ? (
                              <ChevronUp />
                            ) : (
                              <ChevronDown />
                            )
                          ) : (
                            <ChevronDown />
                          )
                        ) : (
                          ""
                        )}
                      </th>
                    )
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((list, key) => {
                return (
                  <tr key={key}>
                    {bulkSelect && (
                      <td style={{ paddingRight: 0 }}>
                        <input
                          type="checkbox"
                          value={list.id}
                          onChange={this.toggleSelect.bind(this, data)}
                          checked={selectedIds.indexOf(list.id) >= 0}
                        />
                      </td>
                    )}
                    {React.Children.map(columns, (x) => {
                      return (
                        x && (
                          <td
                            className={`${x.props.className} ${
                              onRowClick && !x.props.disableOnClick
                                ? "cursor-pointer"
                                : ""
                            } ${
                              x.props.type && x.props.type === "link"
                                ? "text-link text-underline"
                                : ""
                            }`}
                            onClick={() =>
                              x.props.isClickable === "true" &&
                              onRowClick &&
                              !x.props.disableOnClick
                                ? onRowClick(list)
                                : null
                            }
                            style={{ maxWidth: "300px" }}
                          >
                            {x.props.field !== "action"
                              ? x.props.renderField
                                ? x.props.renderField(list)
                                : list[x.props.field]
                              : x.props.element}
                          </td>
                        )
                      );
                    })}
                  </tr>
                );
              })}
              {isLoading ? (
                <Spinner />
              ) : data.length === 0 ? (
                <tr>
                  <td className="text-center" colSpan={columnLength}>
                    No records found
                  </td>
                </tr>
              ) : (
                ""
              )}
            </tbody>
          </Table>

          {totalCount > 0 && (
            <Row>
              <Col>
                Showing {startPage} to {endPage} of {totalCount} entries
              </Col>
              <Col>
                <Pagination
                  currentPage={currentPage}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  onPageChange={this.onPageChange.bind(this)}
                />
              </Col>
            </Row>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    table: state.table,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList, setTablePage }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTable);
