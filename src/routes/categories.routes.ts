import { Router } from "express";
import multer from "multer";

import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";


const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

//Rota categories = criando 
categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

// listando 
categoriesRoutes.get("/", (request, response) => {
   return listCategoriesController.handle(request, response);
});

//upload
categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response);
});

export { categoriesRoutes };