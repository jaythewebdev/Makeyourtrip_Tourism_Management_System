import React from "react";
import "./Page404.css"; 
import { useNavigate } from "react-router-dom";


const Page404 = () => {
    const navigate=useNavigate();

    const handleBackHome=()=>{
        localStorage.clear();
        navigate("/");
    }
  return (
    <section className="page_404" style={{width:"100vw",height:"100vh"}}>
      <div className="container" style={{width:"70%",height:"100%",margin:"auto"}}>
        <div className="row">
          <div className="col-sm-12" style={{display:"flex",justifyContent:"center"}}>
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>
                <p>The page you are looking for is not available!</p>
                <button onClick={handleBackHome} className="link_404">
                  Go to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
