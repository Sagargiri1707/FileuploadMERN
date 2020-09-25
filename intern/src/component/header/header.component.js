import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Homepage } from "./header.style";
import context from "../../context/Context";

function Home(props) {
  const { isloggedIn, logOut } = useContext(context);
  return (
    <Homepage>
      {isloggedIn ? (
        <>
          <button className="waves-effect waves-light btn" onClick={logOut}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className="waves-effect waves-light btn" to="/login">
            Login
          </Link>
          <Link className="waves-effect waves-light btn" to="/signup">
            SignUp
          </Link>
        </>
      )}
    </Homepage>
  );
}

export default Home;
