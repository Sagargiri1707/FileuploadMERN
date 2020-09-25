import React, { useContext, useState } from "react";
import context from "../../context/Context";

function FileUpload(props) {
  const [formdata, setFormdata] = useState();
  const { uploadForm } = useContext(context);
  const handleChange = (e) => {
    var value = e.target.files[0];
    setFormdata((prevState) => ({
      ...prevState,
      file: value,
    }));
  };
  const submitForm = (e) => {
    e.preventDefault();
    const form = new FormData();
    for (var x in formdata) {
      form.set(x, formdata[x]);
    }
      uploadForm(form);
      setFormdata()
  };

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={submitForm}>
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleChange}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
              </div>
              
              {
                  formdata?
                  <button className="waves-effect waves-light btn" type="submit">
                    Upload file
                  </button>:<></>
              }
      </form>
    </div>
  );
}

export default React.memo(FileUpload);
