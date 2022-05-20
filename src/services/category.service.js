import { BASE_API_URL } from "../common/Constants";
import axios from "axios";
import { authHeader } from "./base.service";

const API_URL = BASE_API_URL + "/api/category";
class CategoryService {
  saveCategory(category) {
    return axios.post(API_URL, category, {headers: authHeader()});
  }
  deleteCategory(category) {
    return axios.delete(API_URL + "/" + category.id, {headers: authHeader()});
  }
  getAllCategories() {
    return axios.get(API_URL);
  }
}
export default new CategoryService();
