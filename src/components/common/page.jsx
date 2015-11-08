var React = require('react');

var Page = React.createClass({
    render: function () {
        if (this.props.isActive) {
            return (<li className="active"><a>{this.props.page}</a></li>)
        }
        else {
            return (<li><a onClick={this.onClick}>{this.props.page}</a></li>)
        }
    },
    onClick: function () {
        this.props.pageChange(this.props.page);
    }
});

module.exports = Page;