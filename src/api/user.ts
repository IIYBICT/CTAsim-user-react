import { UserState } from "@/types/user";
import { getToken, getUserId } from "@/utils/auth";
import http, { HttpResponse } from "@/utils/http";
import qs from "query-string";

export interface LoginData {
  call: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  call: string;
  qq: string;
}

export interface LoginRes {
  isLogin: boolean;
  userId: string;
  token: string;
}
export interface RegisterRes {
  isRegister: boolean;
}

export function login(data: LoginData) {
  return http.get<LoginRes>("/api/user/login", {
    params: { call: data.call, password: data.password },
  });
}

export function getUserInfo() {
  return http.get<UserState>("/api/user/info", {
    params: { token: getToken() },
  });
}

export function sendActivateEmail() {
  return http.post<{ isSend: boolean }>(
    "/api/user/sand/activate/email",
    qs.stringify({ token: getToken() })
  );
}

export function GetCert() {
  return http.get("/api/user/cert");
}

export function register(data: RegisterData) {
  return http.post<RegisterRes>("/api/user/register", qs.stringify(data));
}

export function UserActivateEmail(sjs: string) {
  return http.post<{ isActivate: boolean }>(
    "/api/user/activate/email",
    qs.stringify({ sjs: sjs })
  );
}
export function UserActivateCall(password: string) {
  return http.post<{ isActivate: boolean }>(
    "/api/user/activate/call",
    qs.stringify({ token: getToken(), password: password })
  );
}

export function logout() {
  return http.post<LoginRes>(
    "/api/user/logout",
    qs.stringify({
      token: getToken(),
    })
  );
}
