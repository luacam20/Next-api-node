import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ email, password}: IRequest): Promise<IResponse> {
        //usuario existe 
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new Error("Email or password incorrect!");
        }

        //Senha correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email or password incorrect!");
        }
        
        // Gerar jsonwebtoken
        const token = sign({}, "kdsk3798s8jue83usne88w8r8", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
               name: user.name,
               email: user.email,
            }
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }