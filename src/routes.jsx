"use strict";

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var routes = (
	<Route name="app" path="/" handler={require('./components/app.jsx')} >
		<DefaultRoute handler={require('./components/homePage.jsx')} />
		<Route name="about" handler={require('./components/about/aboutPage.jsx')} />
        <Route name="employee" handler={require('./components/employee/index.jsx')} />
	</Route>
);

module.exports = routes;