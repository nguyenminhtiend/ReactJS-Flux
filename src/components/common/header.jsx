var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
	render: function(){
		return (
			<nav className="navbar navbar-default navbar-static-top">
				<div className="container">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">React with Flux</a>
					</div>
					<div id="navbar" className="navbar-collapse collapse">
					<ul className="nav navbar-nav">
						<li><Link to="app">Home</Link></li>
						<li><Link to="about">About</Link></li>
						<li><Link to="employee">Employee</Link></li>
                        <li><Link to="addEmployee">Add Employee</Link></li>
					</ul>
					</div>
				</div>
			</nav>
		)
	}
});

module.exports = Header;