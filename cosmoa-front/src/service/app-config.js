let backendHost;
const hostname = window && window.location && window.location.hostname;
if (hostname === "localhost") {
    
}
backendHost = "http://192.168.236.22:8080";
export const API_BASE_URL = `${backendHost}`;