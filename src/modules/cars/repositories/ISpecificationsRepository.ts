//Interface criada, agora vamos criar nossa classe de repository 

import { Specification } from "../model/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ description, name }: ICreateSpecificationDTO): void;
    findByName(name: string) : Specification;
}

//Exprtando interface
export {ISpecificationsRepository, ICreateSpecificationDTO}