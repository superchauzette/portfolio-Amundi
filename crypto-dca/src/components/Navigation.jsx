import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            React Multi-Page Website
          </Link>
          <div>
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Dashboard
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/dcaControl" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/dcaControl">
                  DCA Control
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/apiParam" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/apiParam">
                  API Parameters
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);