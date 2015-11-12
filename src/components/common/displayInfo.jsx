var React = require('react');

var DisplayInfo = React.createClass({
    render: function(){
        var lastRecord = this.props.currentPage * this.props.itemPerPage;
        if (lastRecord > this.props.totalItems) {
            lastRecord = this.props.totalItems;
        }
        var showInfo = 'Showing ' + ((this.props.currentPage - 1) * this.props.itemPerPage + 1) + ' to ' + lastRecord + ' of ' + this.props.totalItems + ' items.';
        return (<p>{showInfo}</p>)
    }
});

module.exports = DisplayInfo;