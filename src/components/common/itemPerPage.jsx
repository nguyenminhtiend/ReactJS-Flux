var React = require('react');

var ItemPerPage = React.createClass({
    createItem: function(item ,key) {
            return <option key={key} value={item}>{item}</option>;
    },
    render: function () {
        return (<select className="form-control select_item" onChange={this.onChange} value={this.props.selectedItem}>
                    {this.props.data.map(this.createItem)}
                </select>);
    },
    onChange: function (event) {
        this.props.onChange(event.target.value);
    }
});

module.exports = ItemPerPage;