import { Router } from "express";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";


const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

//Rota categories = criando 
categoriesRoutes.post("/", createCategoryController.handle);

// listando 
categoriesRoutes.get("/", listCategoriesController.handle);

//upload
categoriesRoutes.post(
    "/import", 
    upload.single("file"), 
    importCategoryController.handle
    );

export { categoriesRoutes };