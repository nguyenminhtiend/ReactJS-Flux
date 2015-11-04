var React = require('react');

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
						<li><a href="#">Home</a></li>
						<li><a href="#about">About</a></li>
						<li><a href="#employee">Employee</a></li>
					</ul>
					</div>
				</div>
			</nav>
		)
	}
});

module.exports = Header;