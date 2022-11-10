import { API_BASE_URL } from "./app-config";

export function call(api, method, request) {
    let headers = new Headers({
        //"Content-Type" : "multipart/form-data"
        "Content-Type" : "application/json"
    });

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        url : API_BASE_URL + api,
        method : method,
        headers : headers,
    };
    console.log(API_BASE_URL);

    if (request) {
        options.body = request;
    }

    return fetch(options.url, options).then((response) => 
    response.json().then((json) => {
        if (!response.ok) {
            return Promise.reject(json);
        }
        return json;
    }))
    .catch((error) => {
        if (error.status === 403) {
            window.location.href = "/signin";
        }
        return Promise.reject(error);
    });
}

export function signin(member) {
    return call("/user/login", "POST", member)
    .then((response) => {
        console.log(response.data);
        localStorage.setItem("USER", JSON.stringify(response.data));
        window.location.href = "/";
        // if (response.data.token) {
        //     localStorage.setItem("USER_KEY", response.data.id);
        //     // localStorage.setItem("ACCESS_TOKEN", response.data.token);
        // }
    })
    .catch((error) => {
        window.alert(error.error);
    });
}

export function signup(member) {
    return call("/auth/signup", "POST", member)
    .then((response) => {
        console.log(response);
        if (response.data) {
            if (response.data.id) window.location.href = "/";
        } else if (response.error) {
            window.alert(response.error);
        }
    }).catch((error) => {
        if (error.status === 403) {
            window.location.href = "/signup";
        }
        return Promise.reject(error);
    });
}

export function signout() {
    localStorage.setItem("USER_KEY", "");
    localStorage.setItem("ACCESS_TOKEN", "");
    window.location.href = "/";
}

export function userUpdate(user) {
    return call(`/user/${user.email}`, "PUT", JSON.stringify(user))

}

export function registerPlace(place) {
    const M = window.M;
    return call("/place", "POST", place)  // 주소 변경 필요
    .then((response) => {
        if(response.ok) {
            window.location.href = "/main";
        }
    })
    .catch((error)=>{
        console.log("Oops!"); 
        console.log(error.status); 
        console.log("Ooops!")
        M.pop.alert("등록이 이루어지지 않았습니다.");
        if(error.status === 403) { 
            window.location.href = "/registerplace"; 
        } 
        return Promise.reject(error);
    })
}

// 작성중
export function searchPlace(searchWord) {
    return call("/search", "POST", searchWord)
    .then((response) => {
        console.log(response.data);

    })
    .catch((error) => {
        
    })
}