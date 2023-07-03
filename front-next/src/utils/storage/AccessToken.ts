function getAccessToken() {
  return (
    localStorage.getItem("@learnistic/accessToken") ||
    sessionStorage.getItem("@learnistic/accessToken")
  );
}

function setAccessToken(token: string) {
  localStorage.setItem("@learnistic/accessToken", token);
}

function setOneSessionAccessToken(token: string) {
  sessionStorage.setItem("@learnistic/accessToken", token);
}

function clearAccessToken() {
  localStorage.removeItem("@learnistic/accessToken");
  sessionStorage.removeItem("@learnistic/accessToken");
}

const AccessToken = {
  get: getAccessToken,
  set: setAccessToken,
  setForOneSession: setOneSessionAccessToken,
  clear: clearAccessToken,
};

export default AccessToken;
