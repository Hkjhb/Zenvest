import React from "react";

const topics = [
  {
    title: "Getting Started",
    links: [
      "Open the simulator dashboard",
      "Create a practice user",
      "Understand virtual funds",
      "Navigate the dashboard",
    ],
  },
  {
    title: "Trading Practice",
    links: [
      "Add stocks to a watchlist",
      "Place a simulated buy order",
      "Review order history",
      "Understand practice execution",
    ],
  },
  {
    title: "Portfolio",
    links: [
      "Read holdings",
      "Read positions",
      "Track profit and loss",
      "Review funds and margin",
    ],
  },
  {
    title: "Learning",
    links: [
      "Simulator versus real trading",
      "Risk awareness basics",
      "Common beginner mistakes",
      "How to use Zenvest safely",
    ],
  },
  {
    title: "Technical",
    links: [
      "Frontend deployment",
      "Dashboard deployment",
      "Backend API setup",
      "MongoDB environment variables",
    ],
  },
  {
    title: "Project Notes",
    links: [
      "Portfolio project scope",
      "No real brokerage connection",
      "No investment advice",
      "Report an issue",
    ],
  },
];

function CreateTicket() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2">Browse simulator help topics</h1>
        {topics.map((topic) => (
          <div className="col-md-4 p-5 mt-2 mb-2" key={topic.title}>
            <h4>
              <i className="fa fa-plus-circle" aria-hidden="true"></i>{" "}
              {topic.title}
            </h4>
            {topic.links.map((link) => (
              <React.Fragment key={link}>
                <a href="/" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                  {link}
                </a>
                <br />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;
