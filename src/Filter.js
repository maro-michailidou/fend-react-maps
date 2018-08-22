import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";
import * as currentLocations from "./locations.json";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      locationsFiltered: currentLocations.default,
      markersFiltered: [],
      markerNow: {},
      listOpened: true
    };
  }

  locations = () => fetch("./locations.json");

  componentDidMount() {
    //When the app loads the markersFiltered state is passed to the props
    this.setState({
      markersFiltered: this.props.markers
    });
  }

  handleChangedQuery = query => {
    // Handling any changes to the query
    this.setState({
      query,
      listOpened: true
    });

    // Changing how the list is appearing on the app
    if (query === "") {
      this.setState({
        listOpened: false
      });
    }
    this.updateLocations(query);
  };

  updateList = () => {
    this.setState(prevState => ({
      listOpened: !prevState.listIsOpen
    }));
  };

  updateLocations = query => {
    //Handling the state of the locations
    let updateThis = this;
    let fLocations;
    let fMarkers;

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");

      // Adding a location to the array if its the same as the query
      fLocations = this.props.list.filter(location =>
        match.test(location.title)
      );

      // Adding a marker to the array if its the same as the query
      fMarkers = this.props.markers.filter(marker => match.test(marker.title));

      this.setState({
        locationsFiltered: fLocations,
        markersFiltered: fMarkers
      });
    } else {
      this.setState({
        locationsFiltered: this.props.list,
        markersFiltered: this.props.markers
      });
    }

    // Showing the markers on the map depending on their current state
    this.props.markers.map(marker => marker.setVisible(false));
    setTimeout(function() {
      updateThis.props.markers.map(marker => updateThis.markerVisible(marker));
    }, 1);
  };

  markerVisible = marker => {
    // The markers who match now show up on the map
    this.state.markersFiltered.map(
      markerFiltered =>
        markerFiltered.id === marker.id && marker.setVisible(true)
    );
  };

  markerClicked = location => {
    // Handling how the markers animate when they are clicked on
    let updateThis = this;

    this.removeMarker();
    this.addMarker(location);
    setTimeout(function() {
      updateThis.removeMarker();
    }, 1250);

    //Getting the marker that is clicked and opening the correct infowindow
    this.getMarkerNow(location);

    setTimeout(function() {
      updateThis.props.openBox(updateThis.state.markerNow);
    }, 1);
  };

  removeMarker = () => {
    //Removing the marker's animations
    this.state.markersFiltered.map(markerFiltered =>
      markerFiltered.setAnimation(null)
    );
  };

  addMarker = location => {
    // Adding animations to a showing marker
    this.state.markersFiltered.map(
      markerFiltered =>
        markerFiltered.id === location.key &&
        markerFiltered.setAnimation(window.google.maps.Animation.BOUNCE)
    );
  };

  getMarkerNow = location => {
    //Clicking the marker will give the information in the infowindow
    this.state.markersFiltered.map(
      markerFiltered =>
        markerFiltered.id === location.key &&
        this.setState({
          markerNow: markerFiltered
        })
    );
  };

  render() {
    const { query, locationsFiltered, listOpened } = this.state;

    return (
      <section className="list-box">
        <form className="list-form" onSubmit={event => event.preventDefault()}>
          <button className="list-btn" onClick={() => this.updateList()}>
            List
          </button>

          <input
            className="list-input"
            aria-labelledby="filter"
            type="text"
            placeholder="Filter Locations..."
            value={query}
            onChange={event => this.handleChangedQuery(event.target.value)}
          />
        </form>

        {this.props.listOpened && (
          <ul className="locations-list">
            {locationsFiltered.map(location => (
              <li
                tabIndex={0}
                role="button"
                className="location-item"
                key={location.key}
                onClick={() => this.markerClicked(location)}
                onKeyPress={() => this.markerClicked(location)}
              >
                {location.title}
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
}

export default Filter;
