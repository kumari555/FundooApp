import React from 'react';
import {
    shallow
} from 'enzyme';
import Register from '../components/registerComponent';
import '../setupTest'
/**
 * describe what we are testing
 **/
describe('Register Component', () => {
    /**
     * make our assertion and what we expect to happen 
     **/
    it('should render without throwing an error', () => {
        expect(shallow(< Register />).exists()).toBe(true)
    })
    /**
     * within the Login components describe function
     **/
    it('renders a email input', () => {
        expect(shallow(< Register />).find('#firstName').length).toEqual(1)
    })
    it('renders a password input', () => {
        expect(shallow(< Register />).find('#lastName').length).toEqual(1)
    })
    it('renders a password input', () => {
        expect(shallow(< Register />).find('#lastName').length).toEqual(1)
    })
    it('renders a password input', () => {
        expect(shallow(< Register />).find('#lastName').length).toEqual(1)
    })
    /**
     * within the Login components describe function
     **/
    describe('Email input', () => {
        it('should respond to change event and change the state of the Login Component', () => {
            const wrapper = shallow(< Register />);
            wrapper.find('#email').simulate('change', {
                target: {
                    name: 'email',
                    value: 'rathnaa@gmail.com'
                }
            });
            expect(wrapper.state('email')).toEqual('rathnaa@gmail.com');
        })
    })
    describe('Password input', () => {
        it('should respond to change event and change the state of the Login Component', () => {
            const wrapper = shallow(<Register />);
            wrapper.find('#password')
                .simulate('change', {
                    target: {
                        name: 'password',
                        value: 'rockzzz'
                    }
                });
            expect(wrapper.state('password')).toEqual('rockzzz');
        })
    })
})