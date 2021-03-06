import React from 'react';
import {Button, Form} from 'semantic-ui-react';
import Validator from 'validator';
import InLineError from '../messages/InLineError';
import PropTypes from 'prop-types';

class LoginForm extends React.Component{

    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    };
    onChange = e => 
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    onSubmit = () => {
        // validate error
        const errors = this.validate(this.state.data);
        this.setState({errors});

        //check if error empty method or not
        if(Object.keys(errors).length === 0) {
            this.props.submit(this.state.data);
        }
        
    };

    validate = (data) =>{
        const errors = {};

        if(!Validator.isEmail(data.email)) errors.email = "Invalid email";

        if(!data.password) errors.password = "Can't be blank";

        return errors;
    }

    render() {
        const { data, errors } = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" name="email" 
                        placeholder="example@example.com"
                        value={data.email}
                        onChange = {this.onChange}
                    />
                    {errors.email && <InLineError text = {errors.email} />}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" name="password" 
                        placeholder="Make it Secure"
                        value={data.password}
                        onChange = {this.onChange}
                    />
                    {errors.password && <InLineError text = {errors.password} />}
                </Form.Field>
                <Button primary>Login</Button>
            </Form>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};
export default LoginForm;