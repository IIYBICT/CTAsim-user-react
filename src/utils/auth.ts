const TOKEN_KEY = "token";
const USERID_KEY = "user_id";

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const getUserId = () => {
  return localStorage.getItem(USERID_KEY);
};

const setUserId = (UserId: string) => {
  localStorage.setItem(USERID_KEY, UserId);
};

const clearUserId = () => {
  localStorage.removeItem(USERID_KEY);
};
// persist:root

const clearAll = () => {
  // localStorage.removeItem("persist:root");
  localStorage.clear();
};

export {
  isLogin,
  getToken,
  setToken,
  clearToken,
  getUserId,
  setUserId,
  clearUserId,
  clearAll,
};
