import { BaseService } from "../BaseService";
import { UserCreateBody, UserDTO, UserUpdateBody } from "./User.types";

class UserService {
  async getById(id: string): Promise<UserDTO> {
    const response = await BaseService.get<UserDTO>("/users/" + id);
    return response?.data;
  }

  async create(body: UserCreateBody): Promise<UserDTO> {
    const response = await BaseService.post<UserDTO>("/users", body);
    return response?.data;
  }

  async update(body: UserUpdateBody): Promise<UserDTO> {
    const response = await BaseService.put<UserDTO>("/users/" + body?.id, body);
    return response?.data;
  }
}

const UserServiceApi = new UserService();
export default UserServiceApi;
