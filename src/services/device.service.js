import { BASE_API_URL } from "../common/Constants";
import axios from "axios";
import { authHeader } from "./base.service";

const API_URL = BASE_API_URL + "/api/product";
class DeviceService {
  saveDevice(device,category) {
    return axios.post(API_URL+ "/" + category.id, device, {headers: authHeader()});
  }
  deleteDevice(device) {
    return axios.delete(API_URL+ "/" + device.id, {headers: authHeader()});
  }
  getAllDevices() {
    return axios.get(API_URL);
  }
}
export default new DeviceService();
