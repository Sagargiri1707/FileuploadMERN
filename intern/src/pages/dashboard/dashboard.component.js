import React, { useContext, useEffect } from "react";
import FileDisplay from "../../component/FileDisplay/fileDisplay.component";
import FileUpload from "../../component/fileUpload/fileUpload.component";
import context from '../../context/Context'
import {Actions} from '../../context/actions'
import { getFiles} from '../../requests/user'
function Dashboard(props) {
  const {dispatch}=useContext(context)
  useEffect(() => { 
    getFiles().then(res => {
      console.log(res);
      dispatch({
        type: Actions.SET_FILES,
        payload:res
      })
    })

  },[])
  return (
    <div>
      <FileUpload />
      <FileDisplay />
    </div>
  );
}

export default React.memo( Dashboard);
