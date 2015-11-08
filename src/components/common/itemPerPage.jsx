var React = require('react');

var ItemPerPage = React.createClass({
    createItem: function(itemText ,key) {
            return <option key={key}>{itemText}</option>;
    },
    render: function () {
        return (<select className="form-control select_item">
                    {this.props.data.map(this.createItem)}
                </select>);
    }
});

module.exports = ItemPerPage;