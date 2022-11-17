import { API_BASE_URL } from "./app-config";

export function call(api, method, header, request) {
    // const header = { "Content-Type" : "application/json" }
    // 과 같은 방식으로 헤더 설정 후
    // 파라미터로 넘겨주고 사용하는 형태로 변경
    // 장소 등록 및 장소 댓글 등록처럼 데이터가 text + image 인 경우 파라미터 : 빈 객체 {}
    // text로만 이루어진 json 데이터일 경우 파라미터 : { "Content-Type" : "application/json" }

    let headers = new Headers(header);

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
    return call("/place", "POST", place)
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

export function registerCourse(place) {
    const M = window.M;
    return call("/course", "POST", place)
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
            window.location.href = "/registercourse"; 
        } 
        return Promise.reject(error);
    })
}