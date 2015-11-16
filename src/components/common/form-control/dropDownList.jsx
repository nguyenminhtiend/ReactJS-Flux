﻿var React = require('react');
var FormInput = require('./formInput.jsx');

var DropDownList = React.createClass({
    
    render: function () {
        var options = this.props.dataSource.map(function(item) {
            return <option key={item.id} value={item.id}>{item.name}</option>
        });

        return (
            <FormInput name={this.props.name} label={this.props.label} error={this.props.error}>
                <select className="form-control" value={this.props.value} ref={this.props.name} onChange={this.props.onChange}>
                    {options}
                </select>
            </FormInput>
        )
    }
});

module.exports = DropDownList;