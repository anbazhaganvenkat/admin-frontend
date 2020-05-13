import React from "react";
import PropTypes from "prop-types";
import ExpertCard from "./ExpertCard";
import { connect } from "react-redux";

class ExpertGrid extends React.Component {
  state = {
    experts: this.props.expertList
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { expertList, updatedExpertList } = this.props;

    const prevExpertList = JSON.stringify(prevProps.expertList);
    const prevUpdatedExpertList = JSON.stringify(prevProps.updatedExpertList);

    // Update expert list
    if (prevExpertList !== JSON.stringify(expertList)) {
      this.setState({ experts: expertList });
    } else if (prevUpdatedExpertList !== JSON.stringify(updatedExpertList)) {
      this.setState({ experts: updatedExpertList });
    }
  }

  render() {
    const {
      expertList,
      selectedExperts,
      handleExperts,
      selectExperts,
      certified,
      openLinkInNewTab,
      showDeleteIcon,
      currentUrl,
      expertIds,
      size,
      updatedExpertList
    } = this.props;

    const { experts } = this.state;

    // const experts = updatedExpertList || expertList;

    return (
      <div className="row">
        {experts &&
          experts.length > 0 &&
          experts.map(expert =>
            selectedExperts ? (
              (selectExperts
                ? selectedExperts.indexOf(expert.id) === -1
                : selectedExperts.indexOf(expert.id) > -1) && (
                <ExpertCard
                  classnames="expert-card"
                  data={expert}
                  selectExperts={selectExperts}
                  selected={
                    expertIds && expertIds.indexOf(parseInt(expert.id, 10)) > -1
                  }
                  size={size ? size : "col-12 col-md-12 col-lg-6 col-xl-4"}
                  key={expert.id}
                  certified={certified}
                  showDeleteIcon={showDeleteIcon}
                  handleExperts={handleExperts}
                  link={
                    currentUrl
                      ? `/expert-profile/${expert.id}?redirect=${currentUrl}`
                      : ""
                  }
                  openLinkInNewTab={openLinkInNewTab}
                />
              )
            ) : (
              <ExpertCard
                classnames="expert-card"
                data={expert}
                size={size ? size : "col-12 col-md-12 col-lg-6 col-xl-4"}
                key={expert.id}
                certified={certified}
                handleExperts={handleExperts}
                link={
                  currentUrl
                    ? `/expert-profile/${expert.id}?redirect=${currentUrl}`
                    : ""
                }
                openLinkInNewTab={openLinkInNewTab}
              />
            )
          )}
      </div>
    );
  }
}

ExpertGrid.propTypes = {
  expertList: PropTypes.string,
  selectedExperts: PropTypes.string,
  selectExperts: PropTypes.string,
  openLinkInNewTab: PropTypes.string,
  removeExpert: PropTypes.string,
  currentUrl: PropTypes.string,
  id: PropTypes.string,
  data: PropTypes.string,
  size: PropTypes.string,
  handleExperts: PropTypes.func,
  certified: PropTypes.string
};

const mapStateToProps = state => {
  const { approvedExperts } = state.table;
  return {
    updatedExpertList:
      approvedExperts && !approvedExperts.isFetching ? approvedExperts["1"] : ""
  };
};

export default connect(mapStateToProps)(ExpertGrid);
