import { Category } from "./category";

export class Product {
    id!:number;
    name!:string;
    price!:string;
    image!:string;
    category!:Category;
    quantity: number = 1;

    constructor(){
        this.category= new Category();
     };
}
