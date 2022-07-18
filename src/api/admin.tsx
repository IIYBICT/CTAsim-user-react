import { UserState } from "@/types/user";
import { getToken, getUserId } from "@/utils/auth";
import http, { HttpResponse } from "@/utils/http";
import qs from "query-string";

export function GetUserList() {
  return http.get<{ size: number; data: UserState[] }>(
    "/api/admin/get/user/list",
    {
      params: { token: getToken() },
    }
  );
}

export function AdminGetUserInfo(userId: string) {
  return http.get<UserState>("/api/admin/get/user/info", {
    params: { token: getToken(), userId: userId },
  });
}

export function AdminGetUserList() {
  return http.get<{
    size: number;
    data: { id: number; groupName: string; isAdmin: number }[];
  }>("/api/admin/get/group/list", {
    params: { token: getToken() },
  });
}

export function AdminGetRatingList() {
  return http.get<{
    size: number;
    data: { id: number; name: string; nameEn: string }[];
  }>("/api/admin/get/rating/list", {
    params: { token: getToken() },
  });
}

export function AdminUpdateUserInfo(data: {
  userId: string;
  userCall: string;
  username: string;
  groupId: string;
  email: string;
  qq: string;
  token?: string;
}) {
  data.token = String(getToken());
  return http.post<{ isUpdate: boolean }>(
    "/api/admin/update/user/info",
    qs.stringify(data)
  );
}
