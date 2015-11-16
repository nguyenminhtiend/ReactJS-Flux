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
        value: React.PropTypes.string,
        error: React.PropTypes.string,
    },
    render: function () {
        return (
            <FormInput name={this.props.name} label={this.props.label} error={this.props.error}>
                <DatePicker dateFormat={Constant.DATE_FORMAT} className="form-control" placeholderText={this.props.placeholder} />
            </FormInput>
        )
}
});

module.exports = InputDateTime;