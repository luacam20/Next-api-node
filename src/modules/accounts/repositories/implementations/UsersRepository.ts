import { User } from "../../entites/User";
import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

// ctr + . encima de UsersRepository (implement interface)
class UsersRepository implements IUsersRepository {
    
    //Criando nosso repository
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }
    
    async create({ name, username, email, password, driver_license}: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            username, 
            email, 
            password, 
            driver_license
        }); 

        await this.repository.save(user);
    }

}

export { UsersRepository }