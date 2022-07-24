import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

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
    <main className=''>
      <div className='flex h-screen justify-center items-center'>
        <div className='bg-gradient-to-b  rounded-lg mx-28 w-80 py-2 '>
       
          <h4 className='text-center text-black text-2xl my-6'>Sign Up</h4>
          <div className=''>
            <form className='text-slate-900 flex flex-col' onSubmit={handleFormSubmit}>
              <input
                className='w-10/16 my-1 mx-auto align-middle px-1'
                placeholder='First name'
                name='firstName'
                type='firstName'
                id='firstName'
                value={formState.firstName}
                onChange={handleChange}
              />
              <input
                className='w-10/16 my-1 mx-auto align-middle px-1'
                placeholder='Last name'
                name='lastName'
                type='lastName'
                id='lastName'
                value={formState.lastName}
                onChange={handleChange}
              />
              <input
                className='w-10/16 mx-auto my-1 px-1'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='w-10/16 mx-auto my-1 px-1'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
               <Link className='mx-auto text-center transition-all duration-300 mx-auto p-2 mx-2 rounded-md' to="/login">
                Already have an account?
              
              </Link>
              <button className='text-sky-50 mb-2 mt-1 transition-all duration-300 mx-auto p-2 rounded-md' type='submit'>
                Submit
              </button>
             
              {error && <div className='mx-auto'>Sign up failed</div>}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
