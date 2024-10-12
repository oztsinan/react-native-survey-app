import { BaseService } from "../BaseService";
import { UserDTO } from "../User";
import { AuthLoginBody, AuthLoginDTO } from "./Auth.types";

class AuthService {
  async login(body: AuthLoginBody): Promise<AuthLoginDTO> {
    const response = await BaseService.post<AuthLoginDTO>("auth/login", body);
    return response.data;
  }

  async getMe(): Promise<UserDTO> {
    const response = await BaseService.get<UserDTO>("auth/profile");
    return response.data;
  }
}

const AuthServiceApi = new AuthService();
export default AuthServiceApi;
