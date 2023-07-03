function getVirtualAppId() {
    return (
      localStorage.getItem("@learnistic/virtualAppId") ||
      sessionStorage.getItem("@learnistic/virtualAppId")
    );
  }
  
  function setVirtualAppId(token: string) {
    localStorage.setItem("@learnistic/virtualAppId", token);
  }
  
  function setOneSessionVirtualAppId(token: string) {
    sessionStorage.setItem("@learnistic/virtualAppId", token);
  }
  
  function clearVirtualAppId() {
    localStorage.removeItem("@learnistic/virtualAppId");
    sessionStorage.removeItem("@learnistic/virtualAppId");
  }
  
  const VirtualAppId = {
    get: getVirtualAppId,
    set: setVirtualAppId,
    setForOneSession: setOneSessionVirtualAppId,
    clear: clearVirtualAppId,
  };
  
  export default VirtualAppId;
  