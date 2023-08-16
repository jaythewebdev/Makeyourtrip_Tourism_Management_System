import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../Navbar/AdminNavbar";

function TravellerDetails() {
  const [agents, setAgents] = useState([]);


  useEffect(() => {
    getAgentInfo();
  }, []);

  const getAgentInfo = () => {
    fetch("http://localhost:5279/api/Admin/View_All_Travellers", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const myData = await response.json();
        setAgents(myData);
      })
      .catch((error) => {
        console.error("Error fetching agent data:", error);
      });
  };


  const handleDeleteAgent = (emailId) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      // let JwtToken = localStorage.getItem("token");
      fetch(
        `${encodeURIComponent(
          emailId
        )}`,
        {
          method: "DELETE",
          headers: {
            accept: "text/plain",
            // Authorization: "Bearer " + JwtToken,
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (data) => {
          var myData = await data.json();
          console.log(myData);
          toast.success("Agent Deleted Successfully");

          // Remove the deleted agent from the agents array
          setAgents((prevAgents) =>
            prevAgents.filter((agent) => agent.emailId !== emailId)
          );
        })
        .catch((err) => {
          console.log(err.error);
        });
    }
  };

  return (
    <div>
        <div>
            <AdminNavbar/>
        </div>
      <div className="card-body" style={{marginTop:"8rem"}}>
        <h3 className="card-title" style={{textAlign:"center",marginBottom:"2rem"}}>
          Travellers Details
        </h3>

        <table className="table datatable" style={{
            backgroundColor:"yellow",
            height:"auto",
            width:"70%",
            margin:"auto"
        }}>
          <thead>
            <tr>
              <th scope="col">Traveller ID</th>
              <th scope="col">Traveller Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.travellerId}>
                <th scope="row">
                  <a href={`#${agent.travellerId}`}>{agent.travellerId}</a>
                </th>
                <td>{agent.name}</td>
                <td>
                  <a href={`mailto:${agent.emailId}`} className="text-primary">
                    {agent.emailId}
                  </a>
                </td>
                <td>{agent.phoneNumber}</td>
                {/* <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-link dropdown-toggle"
                      type="button"
                      id={`dropdownMenuButton-${agent.agentId}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby={`dropdownMenuButton-${agent.agentId}`}
                    >
                      <li>
                        <a
                          className="dropdown-item"
                        //   href="#"
                          onClick={() => handleDeleteAgent(agent.emailId)}
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TravellerDetails;