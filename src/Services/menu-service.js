import http from "../http-common";

class menuDataService {
    getMenu() {
        return http.get(`/Menu`);
    }

    getMenuByCategory(category) {
        return http.get(`/Menu/GetMenuByCategoryType?categoryType=${category}`);
    }

    GetMenuByName(name) {
        return http.get(`/Menu/GetMenuByName?name=${name}`);
    }

    getMenuTypes() {
        return http.get(`/Menu/GetMenuTypes`);
    }

    GetMenus() {
        return http.get(`/Menu/GetMenus`);
    }

    GetCategories() {
        return http.get(`/Menu/GetCategories`);
    }

    AddMenu(menu, token) {
        return http.post(`/Menu`, menu, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }

    UpdateMenu(menuName, menu) {
        return http.put(`/Menu/${menuName}`, menu);
    }

    DeleteMenu(menuName) {
        return http.delete(`/Menu/${menuName}`);
    }
}

export default new menuDataService();