var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementById('app'));
});

//var Home =  require('./components/homePage.jsx');
//var About =  require('./components/about/aboutPage.jsx');
//var Header = require('./components/common/header.jsx');

//(function(win){
//	var App = React.createClass({
//		render: function(){
//			var Child;
			
//			switch (this.props.route) {
//				case 'about':
//					Child = About;
//					break;
//				default:
//					Child = Home;
//					break;
//			}
			
//			return (
//				<div>
//					<Header />
//					<Child />
//				</div>
//			);
//		}
//	});

//	function render(){
//		var route = win.location.hash.substr(1);
//		React.render(<App route={route} />, document.getElementById('app'));
//	}
	
//	win.addEventListener('hashchange', render);
//	render();
//})(window);



//React.render(<Home />, document.getElementById('app'));