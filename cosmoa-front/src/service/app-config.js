let backendHost;
const hostname = window && window.location && window.location.hostname;
if (hostname === "localhost") {
    
}
backendHost = "http://14.45.203.199:8080";
export const API_BASE_URL = `${backendHost}`;