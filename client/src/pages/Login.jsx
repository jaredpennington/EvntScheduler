import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Header/>
      <div className="my-auto">
        <div className="">
          <div className="uk-card uk-card-body card-centering">
            <h4 className="uk-card-title uk-text-center">Login</h4>
            <div className="">
              <form
                className="form-centering form-input-margin"
                onSubmit={handleFormSubmit}
              >
                <input
                  className="form-input-margin"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input-margin"
                  placeholder="******"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <Link className="form-input-margin account-prop" to="/signup">
                  Don't have an account?
                </Link>
                <button
                  className="button-border form-input-margin "
                  type="submit"
                >
                  Submit
                </button>
                {error && <div>Login failed</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
