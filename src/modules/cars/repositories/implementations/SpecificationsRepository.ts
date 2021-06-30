import { Specification } from "../../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


//Vai impleentar nossa interface 
// ctr + . (Implementar interface) e ele vai trazer o interface 
class SpecificationsRepository implements ISpecificationsRepository {
    //Criando nossa tabela fake 

    //Array de specificação 
    private specifications: Specification[];

    //Dentro do nosso construtor a gente vai inicializar esse nosso array
    constructor() {
        this.specifications = [];
    }

    //Agora dentro do nosso create vamos fazer a criação da nossa especificação
    create({ description, name }: ICreateSpecificationDTO): void {
        //Quando a gente da esse new ele vai criar o id lá no Specification.ts porque ele vai entender que não tem nenhum id preenchido
        const specification = new Specification();

        //O object.assgn ele pega tudo que a gente ta pasando nele e coloca no specification
        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        //Agora que ja temos nosso objeto criado vamos dar um push na tabela
        this.specifications.push(specification);
    }
    
    findByName(name: string): Specification {
        console.log(this.specifications);

        const specification = this.specifications.find(
            (specification) => specification.name === name);
        
        return specification;    
    }

}

export { SpecificationsRepository }