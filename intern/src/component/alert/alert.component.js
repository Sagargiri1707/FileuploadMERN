import React, { useContext } from "react";
import context from "../../context/Context";

function Alert(props) {
  const { message,removeMessageAlert } = useContext(context);
 
  return (
    <div>
      {message.message.length > 1 ? (
        < >
          <div className="card-alert card red lighten-5" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
    <div className="card-content red-text">
              {message.message}
              
            </div>
            <span onClick={removeMessageAlert}>X</span>
   
</div>
                 
              </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default React.memo(Alert);
