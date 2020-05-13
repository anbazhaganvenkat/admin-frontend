import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

// Assets
import { LocationIcon } from "../assets/img/icons";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address:
        this.props.liveFilters.location &&
        this.props.liveFilters.location.selectedValue
          ? this.props.liveFilters.location.selectedValue
          : ""
    };
  }

  handleChange = address => {
    this.setState({ address });
    console.log("handleChange");
  };

  handleSelect = address => {
    this.setState({ address }, () => {
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log("Success", latLng))
        .catch(error => console.error("Error", error));
      this.props.getSelectedFilters(
        { selectedValue: [address] },
        this.props.selectName
      );
    });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.liveFilters.location &&
      prevProps.liveFilters.location.selectedValue &&
      this.props.liveFilters.location.selectedValue &&
      prevProps.liveFilters.location.selectedValue !==
        this.props.liveFilters.location.selectedValue
    ) {
      this.setState({
        address: this.props.liveFilters.location.selectedValue
          ? this.props.liveFilters.location.selectedValue
          : ""
      });
    }
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <span
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              position: "relative"
            }}
          >
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <LocationIcon />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input"
                })}
                value={this.state.address}
              />
            </InputGroup>
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item--active dropdown-item"
                  : "suggestion-item dropdown-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </span>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
