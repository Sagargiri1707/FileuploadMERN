import React, { createContext, useEffect, useReducer } from "react";
import {
  getLoggedIn,
  signup,
  signin,
  logout,
  FormUpload, getFiles
} from "../requests/user";
import { Actions } from "./actions";
import Reducer from "./reducer";
const context = createContext();

export const ContextProvider = ({ children }) => {
  const initialState = {
    files: [],
    message: {
      message: "",
    },
  };
  const [state, dispatch] = useReducer(Reducer, initialState);
  useEffect(() => {
    getLoggedIn().then((res) => {
      console.log(res);
      dispatch({
        type: Actions.SET_IS_LOGGED_IN,
        payload: res.auth,
      });
      dispatch({
        type: Actions.SET_ADMIN,
        payload: res.isAdmin,
      });
    });
    getFiles().then(res => {
      console.log(res);
      dispatch({
        type: Actions.SET_FILES,
        payload:res
      })
    })
    
  }, []);
  

  const userSignup = (data) => {
    signup(data).then((res) => {
      dispatch({
        type: Actions.SET_MESSAGE,
        payload: res.info,
      });
    });
  };

  const userSignin = (data) => {
    signin(data).then((Res) => {
      dispatch({
        type: Actions.SET_MESSAGE,
        payload: Res.info,
      });
      dispatch({
        type: Actions.SET_IS_LOGGED_IN,
        payload: Res.auth,
      });
    });
  };
  const logOut = () => {
    logout().then((res) => {

      dispatch({
        type: Actions.SET_IS_LOGGED_IN,
        payload: res.auth,
      });
      dispatch({
        type: Actions.CLEARING_DATA
      })
    });
  };
  const uploadForm = (form) => {
    FormUpload(form).then((res) => {
      dispatch({
        type: Actions.SET_MESSAGE,
        payload: res.fileUploadStatus,
      });
      dispatch({
        type: Actions.ADD_NEW_FILE,
        payload: res.file,
      });
    });
  };
  const removeMessageAlert = () => {
    dispatch({
     type: Actions.CLEARING_DATA
    })
  }
  return (
    <context.Provider
      value={{
        isloggedIn: state.auth,
        message: state.message,
        files: state.files,
        userSignin,
        userSignup,
        logOut,
        uploadForm,
        dispatch,
        removeMessageAlert
      }}
    >
      {children}
    </context.Provider>
  );
};

export default ( context);
