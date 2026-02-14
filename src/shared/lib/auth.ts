const AUTH_STORAGE_KEY = "isAuthenticated";

export const isAuthenticated = () => {
  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
};

export const setAuthenticated = (value: boolean) => {
  window.localStorage.setItem(AUTH_STORAGE_KEY, String(value));
};
