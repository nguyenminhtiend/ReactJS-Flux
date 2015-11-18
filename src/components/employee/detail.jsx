var React = require('react');
var EmployeeAction = require('../../actions/employeeAction');
var DateTimeInput = require('../common/form-control/dateTimeInput.jsx');
var TextInput = require('../common/form-control/textInput.jsx');
var DropDownList = require('../common/form-control/dropDownList.jsx');
var Router = require('react-router');
var EmployeeDetailStore = require('../../stores/employeeDetailStore');
var moment = require('moment');
var Constant = require('../../constants/employeeConstant');

var departments = [{ id: 1, name: 'IT' }, { id: 2, name: 'FPO' }];

var DetailEmployee = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function () {
        return EmployeeDetailStore.getState();
    },
    onChange: function (event) {
        var employeeDetail = this.state.employeeDetail;
        var field = event.target.name;
        var value = event.target.value;
        employeeDetail[field] = value;
        this.setState({ employeeDetail: employeeDetail });
    },
    onBirthdayChange: function (birthday) {
        var employeeDetail = this.state.employeeDetail;
        employeeDetail.birthday = birthday;
        this.setState({ employeeDetail: employeeDetail });
    },
    isFormValid: function () {
        var isValid = true;
        var errors = {};
        var employeeDetail = this.state.employeeDetail;
        if (employeeDetail.firstName.trim() == "") {
            isValid = false;
            errors.firstName = "First Name is required!"
        }
        if (employeeDetail.lastName.trim() == "") {
            isValid = false;
            errors.lastName = "Last Name is required!"
        }
        if (employeeDetail.email.trim() == "") {
            isValid = false;
            errors.email = "Email is required!"
        }
        if (employeeDetail.phone.trim() == "") {
            isValid = false;
            errors.phone = "Phone is required!"
        }
        this.setState({ errors: errors });
        return isValid;
    },
    save: function(){
        if (this.isFormValid()) {
            var employeeDetail = this.state.employeeDetail;
            employeeDetail.birthday = employeeDetail.birthday.format(Constant.DATE_FORMAT);
            EmployeeAction.save(employeeDetail);
        }
    },
    render: function () {
        return (
            <div className="form-horizontal">
                <TextInput name="firstName" placeholder="Input First Name" onChange={this.onChange} label="First Name:" value={this.state.employeeDetail.firstName} error={this.state.errors.firstName} />
                <TextInput name="lastName" placeholder="Input Last Name" onChange={this.onChange} label="Last Name:" value={this.state.employeeDetail.lastName} error={this.state.errors.lastName} />
                <TextInput name="email" placeholder="Input Email" label="Email:" onChange={this.onChange} value={this.state.employeeDetail.email} error={this.state.errors.email} />
                <TextInput name="phone" placeholder="Input Phone" label="Phone:" onChange={this.onChange} value={this.state.employeeDetail.phone} error={this.state.errors.phone}/>
                <DateTimeInput name="birthday" placeholder="Click to select Birthday" label="Birthday:" onChange={this.onBirthdayChange} value={this.state.employeeDetail.birthday} />
                <DropDownList name="departmentId" placeholder="Input Department" label="Department:" onChange={this.onChange} dataSource={departments} value={this.state.employeeDetail.departmentId} />
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button className="btn btn-info right_space" onClick={this.save}><i className="fa fa-floppy-o"></i> Save</button>
                        <button className="btn btn-danger">Cancel</button>
                    </div>
                </div>
            </div>
        )
    },
    componentWillMount: function () {

    },
    componentWillUnmount: function () {
        EmployeeDetailStore.removeChangeListener(this._onChange);
    },
    componentDidMount: function () {
        EmployeeDetailStore.addChangeListener(this._onChange);
    },
    _onChange: function () {
        var state = EmployeeDetailStore.getState();
        this.setState(state);
        if (state.saveCompleted) {
            this.transitionTo('employee');
        }
    },
});

module.exports = DetailEmployee;