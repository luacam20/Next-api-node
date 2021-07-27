import { AppError } from "../errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction) {
    
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token missing", 401);
    }

    //Criar um array com 2 posições, na 1° vem o Bearer e na 2° o token 
    const [, token] = authHeader.split(" ");
    
    try { 
        const { sub: user_id } = verify(
            token, 
            "698dc19d489c4e4db73e28a713eab07b"
            ) as IPayload;
            
            const usersRepository = new UsersRepository();
            const user = await usersRepository.findById(user_id);

            if(!user) {
                throw new AppError("User does not exists!", 401);
            }

        next();
        } catch { 
            throw new AppError("Invalid token!", 401);
    }
}
