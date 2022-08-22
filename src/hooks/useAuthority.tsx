export function getToken() {
  const token = localStorage.getItem("token");
  return token;
}
export function setToken(val) {
  localStorage.setItem("token", val);
}
