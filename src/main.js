var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
var routes = require('./routes.jsx');

Router.run(routes, function(Handler) {
    ReactDOM.render(<Handler />, document.getElementById('app'));
});