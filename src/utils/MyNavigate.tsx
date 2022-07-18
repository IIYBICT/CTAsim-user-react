import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

function MyNavigate({ to, replace }: { to: string; replace: boolean }) {
  return <Navigate to={to} replace={replace} />;
}

export default MyNavigate;
