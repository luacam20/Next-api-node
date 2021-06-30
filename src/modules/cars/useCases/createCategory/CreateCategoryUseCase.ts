import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

//Criar uma categoria e fazer a regra de negocio 
class CreateCategoryUseCase {
    
    //Principo de inversao de dependencia 
    constructor(private categoriesRepository: ICategoriesRepository) {}
    
    execute({ description, name }: IRequest): void {
        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists) {
            throw new Error("Category alredy exists!");
        }
    
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase }; 