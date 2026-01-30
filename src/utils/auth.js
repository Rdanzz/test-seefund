export const setAuth = (token, expiresIn) => {
  const expiredAt = Date.now() + expiresIn * 1000;

  localStorage.setItem("token", token);
  localStorage.setItem("expired_at", expiredAt);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isTokenExpired = () => {
  const expiredAt = localStorage.getItem("expired_at");

  if (!expiredAt) return true;

  return Date.now() > Number(expiredAt);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expired_at");

  window.location.href = "/login";
};
