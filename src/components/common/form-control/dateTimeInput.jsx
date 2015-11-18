var React = require('react');
var DatePicker = require('react-datepicker');

var Constant = require('../../../constants/employeeConstant');
var FormInput = require('./formInput.jsx');

var InputDateTime = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        error: React.PropTypes.string,
    },
    render: function () {
        return (
            <FormInput name={this.props.name} label={this.props.label} error={this.props.error}>
                <DatePicker dateFormat={Constant.DATE_FORMAT} selected={this.props.value} name={this.props.name} className="form-control" onChange={this.props.onChange} placeholderText={this.props.placeholder} />
            </FormInput>
        )
}
});

module.exports = InputDateTime;