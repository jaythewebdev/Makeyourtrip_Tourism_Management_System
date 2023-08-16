import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../Navbar/AdminNavbar";
import AgentNavbar from "../Navbar/AgentNavbar";

function AgentTours() {
  const [agents, setAgents] = useState([]);

  const agentId = parseInt(localStorage.getItem("userId"));
  console.log(agentId);

  useEffect(() => {
    getAgentInfo();
  });

  const getAgentInfo = () => {
    fetch("http://localhost:5246/api/TourDetails", {
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
        console.log(myData);
        const filteredTours = myData.filter(
          (data) => data.travelAgentId === agentId
        );
        console.log(filteredTours);
        setAgents(filteredTours);
      })
      .catch((error) => {
        console.error("Error fetching agent data:", error);
      });
  };

  const getDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { weekday: "long" });
  };

  const getMonthAbbreviation = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { month: "short" });
  };

  const getDate = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  return (
    <div>
      <div>
        <AgentNavbar />
      </div>
      <div className="card-body" style={{ marginTop: "8rem" }}>
        <h3
          className="card-title"
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          My Tour Offerings
        </h3>

        <table
          className="table datatable"
          style={{
            backgroundColor: "yellow",
            height: "auto",
            width: "70%",
            margin: "auto",
          }}
        >
          <thead>
            <tr>
              <th scope="col">TourID</th>
              <th scope="col">Tour Name</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Max. Capacity</th>
              <th scope="col">Booked Capacity</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.tourId}>
                <th scope="row">
                  <a href={`#${agent.tourId}`}>{agent.tourId}</a>
                </th>
                <td> {agent.tourName}</td>
                <td>
                    {getDay(agent.departureDate)},{getDate(agent.departureDate)} {getMonthAbbreviation(agent.departureDate)}
                </td>
                <td>
                   {getDay(agent.returnDate)},{getDate(agent.returnDate)} {getMonthAbbreviation(agent.returnDate)}
                </td>
                <td>
                {agent.maxCapacity}

                </td>
                <td>
                    {agent.bookedCapacity}

                </td>

                {/* <td>{}</td>
                <td>{agent.phoneNumber}</td>
                <td>{agent.phoneNumber}</td>
                <td>{agent.phoneNumber}</td> */}

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

export default AgentTours;
