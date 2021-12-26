import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        const client = await prisma.clients.findFirst({
            where: {
                username,
            },
        });

        if (!client) {
            throw new Error("Username or password is invalid!");
        }

        const passwordMatch = await compare(password, client.password);

        if (!passwordMatch) {
            throw new Error("Username or password is invalid!");
        }

        const token = sign({ username }, "98c6c14acce440c6ab3058d2970d5a0f", {
            subject: client.id,
            expiresIn: "1d",
        })
       
        return token
        
    }
}