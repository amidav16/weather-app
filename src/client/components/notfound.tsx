import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    //Will display incase the URL doesnt match any of the routes
    <div style={{ margin: 20 }}>
      Page not Found 404
      <div>
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
};

export default NotFound;
