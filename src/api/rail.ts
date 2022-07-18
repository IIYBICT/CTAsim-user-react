import { getToken } from "@/utils/auth";
import http from "@/utils/http";
import qs from "query-string";

const RegisterRail = (railName: string) => {
  return http.post(
    "/api/rail/register",
    qs.stringify({ token: getToken(), railName: railName })
  );
};

const GetRailInfo = () => {
  return http.get("/api/rail/info", {
    params: { token: getToken() },
  });
};

export { GetRailInfo, RegisterRail };
