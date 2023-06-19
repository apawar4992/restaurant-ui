import http from "../http-common";

class RegisterUserService {

    registerUser(user) {
        return http.post(`/Register`, user);
    }

    GetUserRoles() {
        return http.get(`/Register/GetUserRoles`);
    }

    GetUserProfile(emailAddress) {
        return http.get(`/Register/GetUser?emailAddress=${emailAddress}`);
    }
}

export default new RegisterUserService();