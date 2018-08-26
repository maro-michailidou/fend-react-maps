## Fend Neighbourhood React Map

This is the eighth project from Udacity's Front End Nanodegree.

It utilises React's create-react-app template and the Google Maps API to create an app that shows a series of interesting locations at the greek city of Thessaloniki.

## How to run the app:

The app has a development and a production mode. You need to follow the steps below to access each mode:

### Devolopment mode:
- Download or clone the repository
- Install all dependencies with npm install
- Start the server with npm start
- Visit http://localhost:3000

### Production mode:
- Download or clone the repository
- Install all dependencies with npm install
- Build and start the server with npm build
- Visit http://localhost:5000

Note that the service worker is only available in the production build of the app.

(More on the production build: https://reactjs.org/docs/optimizing-performance.html)

## General Info:

1) The project was created with the create-react-app: https://github.com/facebook/create-react-app

2) The project uses React: https://reactjs.org/

3) The project uses the Google Maps API: https://developers.google.com/maps/documentation/

4) The project fetches data with the Wikipedia API: https://www.mediawiki.org/wiki/API:Main_page

5) Kudos to the code sandbox editor that allowed me to develop this app in a public computer: https://codesandbox.io/

## Dependecies:

The project was created with:
- escape-string-regexp
- fetch-jsonp
- google-maps-api
- react
- react-router
- react-router-dom
- react-scripts

## Component Hierarchy

<App />
--- <FilterLocations />
--- <InfoWindow />

- The App starts the google map and stores the wikipedia api (fetch jsonp)
- The Filter component is filtering the markers and the locations (according to the search bar)
- The Infowindow component is based on the wikipedia api and displays content from the wiki page of each location

## Future changes:

Those are things I don't have the time currently to do so they are written here for future documentation.

- Put a slide menu to the app with links to sources
- Change the map styles of this app
