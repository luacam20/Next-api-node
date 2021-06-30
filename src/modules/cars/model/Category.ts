import { v4 as uuidV4  } from 'uuid'

//Atributos que a classe de category vai ter 

class Category {
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    constructor() {
        //Se não tiver nenhum id vindo com esse category 
        //Eu quero que esse id receba um valor uuid 
        //Criação de id  
        if(!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Category } 