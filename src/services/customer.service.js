import { BASE_API_URL } from "../common/Constants";
import axios from "axios";
import { authHeader } from "./base.service";

const API_URL = BASE_API_URL + "/api/customer";
class CustomerService {
  saveCustomer(customer) {
    return axios.post(API_URL, customer, {headers: authHeader()});
  }
  deletecustomer(customer) {
    return axios.delete(API_URL + "/" + customer.id, {headers: authHeader()});
  }
  getAllCustomer() {
    return axios.get(API_URL, {headers: authHeader()});
  }
}
export default new CustomerService();
