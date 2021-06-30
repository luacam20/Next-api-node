import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";
import { Category } from "../../model/Category";

class CategoriesRepository implements ICategoriesRepository  {
    //Array
    private categories: Category[];

    private static INSTANCE: CategoriesRepository;

    //Quando nosso repositorio for inicializado 
    private constructor() {
        this.categories = [];
    }

    public static getInstance(): CategoriesRepository {
        if(!CategoriesRepository.INSTANCE){
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
         return CategoriesRepository.INSTANCE;
    }

    //Responsavel por cadastrar a nossa categoria na tabela fake no array
    //void é que não retorna nada 
    create({ description, name }: ICreateCategoryDTO): void {
        const category = new Category();
     
        Object.assign(category, {
        name,
        description,
        created_at: new Date(),
    });

    this.categories.push(category);
    } 
    
    //Listando categorias do nosso array 
    list(): Category[] {
        return this.categories;
    }

    //impedindo cadastro de categoria duplicada 
    //name do tipo string que retorna um objeto do tipo category
    findByName(name: string): Category {
        const category = this.categories.find(category => category.name === name);
        return category;
    }
}

export { CategoriesRepository }