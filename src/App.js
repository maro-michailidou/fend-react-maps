import React, { Component } from "react";
import fetchJsonp from "fetch-jsonp";
import currentLocations from "./locations.json";
import Filter from "./Filter.js";
import Infowindow from "./Infowindow.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state of the variables needed for the app to run
      locations: currentLocations,
      map: "",
      markers: [],
      boxOpened: false,
      nowmarker: {},
      information: ""
    };
  }
  // Handle invalid key on google maps script
  gm_authFailure = () => {
    window.alert("Google maps authentication error");
  };

  componentDidMount() {
    // This will ensure authorization-fail handler gets invoked immediately
    window.gm_authFailure = this.gm_authFailure;
    //loads the google map as soon as the app runs
    window.initMap = this.initMap;
    loadJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCBwdQHCAp3zwCbUecTF3RktfP_M774pqA&callback=initMap"
    );
  }

  initMap = () => {
    let updateThis = this;
    const { locations, markers } = this.state;

    //Defining the map, its zoom level and its center
    let map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: { lat: 40.636785, lng: 22.942852 },
      mapTypeId: google.maps.MapTypeId.HYBRID
    });

    //Keeping the state in sync with that of the map
    this.setState({
      map
    });

    //Loop that creates a marker for each location from locations.json
    for (let i = 0; i < locations.length; i++) {
      //Defining the properties and their values still from the locations.json file
      let position = locations[i].coordinates;
      let type = locations[i].type;
      let id = locations[i].key;
      //Creating the marker as a unit
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        type: type,
        animation: window.google.maps.Animation.DROP,
        id: id,
        icon:
          "https://uploads.codesandbox.io/uploads/user/884ff08a-9eb7-4dbd-99d0-72c4ed044cea/Lsbi-icons8-marker-64.png"
      });

      //Push the markers into the state
      markers.push(marker);

      // Opening the infowindow when the user clicks on the marker
      marker.addListener("click", function() {
        updateThis.openBox(marker);
      });
    }

    // Adding the event listener that will close the infoWindow
    // when the map is clicked
    map.addListener("click", function() {
      updateThis.closeBox();
    });
  };
  //Opening the infowindow and setting its state
  openBox = marker => {
    this.setState({
      boxOpened: true,
      nowmarker: marker
    });

    this.getInformation(marker);
  };
  //Closing the infowindow and setting its state
  closeBox = () => {
    this.setState({
      boxOpened: false,
      nowmarker: {}
    });
  };
  //getting the information for the locations
  getInformation = marker => {
    let updateThis = this;
    //getting the url from wikipedia
    let place = marker.type;
    let srcUrl =
      "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" +
      place;
    srcUrl = srcUrl.replace(/ /g, "%20");

    //fetching the wikipedia api for the infowindow
    fetchJsonp(srcUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        //filling the infowindow with content from wikipedia
        let pages = data.query.pages;
        let pageId = Object.keys(data.query.pages)[0];
        let pageContent = pages[pageId].extract;

        //Passes the wikipedia content into the state
        updateThis.setState({
          information: pageContent
        });
      })
      .catch(function(error) {
        let pageError = "Parsing failed " + error;
        updateThis.setState({
          information: pageError
        });
      });
  };

  render() {
    return (
      <div className="App">
        <Filter
          list={this.state.locations}
          markers={this.state.markers}
          openBox={this.openBox}
        />
        {this.state.boxOpened && (
          <Infowindow
            nowmarker={this.state.nowmarker}
            information={this.state.information}
          />
        )}
        <div id="map" role="application" />
      </div>
    );
  }
}

export default App;

function loadJS(src) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");

  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);

  script.onerror = function() {
    document.write("Load error: Google Maps");
  };
}
