import { inject } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "../../repositories/IUsersRepository";


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
}

class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password}: IRequest): Promise<IResponse> {
        
        //Verificar se user existe
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error("Email or password incorrect!");
        }

        // senha esta correta 
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email or password incorrect!");
        }

        // Gerar o json web token 
        const token = sign({}, "e1d9614bc81cfc05391171cede492e79", {
            subject: user.id,
            expiresIn: "1d"
        });

        return { 
            user,
            token,
        }
    }
}

export { AuthenticateUserUseCase }