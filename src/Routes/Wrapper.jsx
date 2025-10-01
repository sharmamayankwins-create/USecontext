import React from "react";
import { Outlet } from "react-router-dom";

const Wrapper = () => (
  <div>
    {/* Place header/sidebar/footer here if needed */}
    <Outlet />
  </div>
);

export default Wrapper;
