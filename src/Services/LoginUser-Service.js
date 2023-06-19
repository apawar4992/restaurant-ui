import http from "../http-common";

class LoginUserService {

    loginUser(userCredentials) {
        return http.post(`/User/Authenticate`, userCredentials);
    }
}

export default new LoginUserService();