var React = require('react');
var classNames = require('classnames');

var TableHeader = React.createClass({
    render: function () {
        if (this.props.data.sortAble == true) {
            var sortClass = classNames({
                'fa fa-sort': this.props.sortColumn != this.props.data.name,
                'fa fa-sort-asc': this.props.sortColumn == this.props.data.name && this.props.isAscending,
                'fa fa-sort-desc': this.props.sortColumn == this.props.data.name && !this.props.isAscending
            });
            return (<th onClick={this.sort}>{this.props.data.display}<i className={sortClass}></i></th>);
        } else {
            return <th>{this.props.data.display}</th>
        }
    },
    sort: function () {
        var isAscending = false;
        if (this.props.sortColumn == this.props.data.name) {
            isAscending = !this.props.isAscending;
        } else {
            isAscending = true;
        }
        this.props.sort(this.props.data.name, isAscending);
    }
});

module.exports = TableHeader;