var React = require('react');
var FormInput = require('./formInput.jsx');

var DropDownList = React.createClass({
    
    render: function () {
        var options = this.props.dataSource.map(function(item) {
            return <option key={item.value} value={item.value}>{item.text}</option>
        });

        return (
            <FormInput name={this.props.name} label={this.props.label} error={this.props.error}>
                <select className="form-control" name={this.props.name} value={this.props.value} ref={this.props.name} onChange={this.props.onChange}>
                    {options}
                </select>
            </FormInput>
        )
    }
});

module.exports = DropDownList;