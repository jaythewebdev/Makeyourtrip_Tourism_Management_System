import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../Navbar/AdminNavbar";

function ApproveAgent() {
  const [agents, setAgents] = useState([]);
  const [update, setUpdate] = useState({
    emailId: "",
    status: "",
  });

  useEffect(() => {
    getAgentInfo();
  }, []);

  const getAgentInfo = () => {
    fetch("http://localhost:5279/api/Admin/View_All_TravelAgents", {
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

  const updatestatus = () => {
    // let JwtToken = localStorage.getItem("token");

    fetch("http://localhost:5279/api/Admin/Update_TravelAgent_Status", {
      method: "PUT",
      headers: {
        accept: "text/plain",
        // Authorization: "Bearer " + JwtToken,
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),

      },
      body: JSON.stringify({ ...update }),
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        toast.success("Status Updated Successfully");

        // Update the status in the agents array
        setAgents((prevAgents) =>
          prevAgents.map((agent) =>
            agent.emailId === update.emailId
              ? { ...agent, status: update.status }
              : agent
          )
        );
      })
      .catch((err) => {
        console.log(err.error);
      });
  };

  // Call updatestatus function when update state changes
  useEffect(() => {
    if (update.emailId && update.status) {
      updatestatus();
    }
  }, [update]);

  const handleDeleteAgent = (emailId) => {
    console.log(emailId);
    if (window.confirm("Are you sure you want to delete this agent?")) {
      // let JwtToken = localStorage.getItem("token");
      fetch(
        `http://localhost:5279/api/Admin/Delete_TravelAgent?key=${encodeURIComponent(
          emailId)
        }`,
        {
          method: "DELETE",
          headers: {
            accept: "text/plain",
            // Authorization: "Bearer " + JwtToken,
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
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
          Recent Agent Requests
        </h3>

        <table className="table datatable" style={{
            backgroundColor:"yellow",
            height:"auto",
            width:"70%",
            margin:"auto"
        }}>
          <thead>
            <tr>
              <th scope="col">Agent ID</th>
              <th scope="col">Agent Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Status</th>
              <th scope="col">Change Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.agentId}>
                <th scope="row">
                  <a href={`#${agent.agentId}`}>{agent.agentId}</a>
                </th>
                <td>{agent.agencyName}</td>
                <td>
                  <a href={`mailto:${agent.emailId}`} className="text-primary">
                    {agent.emailId}
                  </a>
                </td>
                <td>{agent.phoneNumber}</td>
                <td>
                  <span
                    className={`badge bg-${
                      agent.status === "Approved"
                        ? "success"
                        : agent.status === "UnApproved"
                        ? "warning"
                        : "danger"
                    }`}
                  >
                    {agent.status}
                  </span>
                </td>
                <td>
                  <select
                    className="form-select"
                    onChange={(event) => {
                      const newStatus = event.target.value;
                      setUpdate({
                        ...update,
                        status: newStatus,
                        emailId: agent.emailId, // Update emailId here
                      });
                    }}
                    value={agent.status}
                  >
                    <option value="Approved">Approved</option>
                    <option value="UnApproved">UnApproved</option>
                  </select>
                </td>
                <td>
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
                          href="#"
                          onClick={() => handleDeleteAgent(agent.emailId)}
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApproveAgent;