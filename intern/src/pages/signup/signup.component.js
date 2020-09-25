import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import context from "../../context/Context";
function Signup(props) {
  const { userSignup, isloggedIn } = useContext(context);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    userSignup(signupData);
  };
  if (isloggedIn) return <Redirect to="/" />;
  return (
    <div className={`row `}>
      <form className="col s12" onSubmit={submitForm}>
        <div className="row">
          <div className="input-field col m12 l12 xl12 s12">
            <input
              placeholder="name"
              id="first_name"
              type="text"
              className="validate"
              name="name"
              onChange={changeHandler}
            />
            <label htmlFor="first_name" className="active">
              First Name
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col m12 l12 xl12 s12">
            <input
              placeholder="Email"
              id="first_name"
              type="email"
              className="validate"
              name="email"
              onChange={changeHandler}
            />
            <label htmlFor="first_name" className="active">
              First Name
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col m12 l12 xl12 s12">
            <input
              placeholder="password"
              id="first_name"
              type="password"
              className="validate"
              name="password"
              onChange={changeHandler}
            />
            <label htmlFor="first_name" className="active">
              First Name
            </label>
          </div>
        </div>
        <button className="waves-effect waves-light btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default React.memo(Signup);
