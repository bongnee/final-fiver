import { AuthLoginDto } from "src/infrastructure/auth/auth.dto";
import { AuthRegisterDto } from "src/infrastructure/auth/auth.dto";
export interface AuthRepository {
   login(userLogin: AuthLoginDto): Promise<any>;
   register(userRegister: AuthRegisterDto): Promise<any>;
   
}