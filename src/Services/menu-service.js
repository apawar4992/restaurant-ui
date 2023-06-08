import http from "../http-common";

class menuDataService {
    getMenu() {
        return http.get(`/Menu`);
    }

    getMenuByCategory(category) {
        return http.get(`/Menu/GetMenuByCategoryType?categoryType=${category}`);
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

    AddMenu(menu) {
        return http.post(`/Menu`, menu);
    }
}

export default new menuDataService();