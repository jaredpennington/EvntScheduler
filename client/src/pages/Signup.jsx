import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Signup = () => {
  const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState }
      });
      
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
    <Header/>
    <main className='my-auto'>
      <div className=''>
        <div className='uk-card uk-card-body card-centering'>
          <h4 className='uk-card-title uk-text-center'>Sign Up</h4>
          <div className=''>
            <form className='form-centering form-input-margin' onSubmit={handleFormSubmit}>
              <input
                className='form-input-margin'
                placeholder='First name'
                name='firstName'
                type='firstName'
                id='firstName'
                value={formState.firstName}
                onChange={handleChange}
              />
              <input
                className='form-input-margin'
                placeholder='Last name'
                name='lastName'
                type='lastName'
                id='lastName'
                value={formState.lastName}
                onChange={handleChange}
              />
              <input
                className='form-input-margin'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input-margin'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
               <Link className='form-input-margin account-prop' to="/login">
                Already have an account?
              
              </Link>
              <button className='form-input-margin button-border' type='submit'>
                Submit
              </button>
             
              {error && <div className='form-input-margin'>Sign up failed</div>}
            </form>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};

export default Signup;
