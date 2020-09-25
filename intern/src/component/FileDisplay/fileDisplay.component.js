import Axios from "axios";
import React, { useContext } from "react";
import context from "../../context/Context";

function FileDisplay(props) {
    const { files } = useContext(context);
    const Download = (index) => {

        Axios({
            method: 'get',
            url: `/api/file/download/${files[index]._id}`,
            responseType:'blob'
        })
            .then(res => {
                console.log(res.data);
                const file = new Blob(
                    [res.data],
                    {type:'application/pdf'}
                )
                const fileURL = URL.createObjectURL(file);
                var downloadLink = document.createElement("a");
                downloadLink.download = files[index].name;
                downloadLink.href = fileURL;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
                downloadLink.click();
            })
            .catch(err => {
                console.log(err);
        })
    }
  return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      {files.map((data,index) => (
        <div key={data._id}  style={{ margin: '10px' }} >
          <div className="btn btn-waves green" onClick={() => Download(index)}>
          {data.name}
          </div>
          <div className="sm">{
            data.by ? <> By {data.by.name} </>:<></>
          }</div>
          
        
        </div>
      ))}
    </div>
  );
}

export default React.memo(FileDisplay);
