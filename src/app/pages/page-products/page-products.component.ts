import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-page-products',
  templateUrl: './page-products.component.html',
  styleUrls: ['./page-products.component.scss']
})
export class PageProductsComponent implements OnInit {

  productList:Product[] = [];

  productFormGroup!: FormGroup;

  submitted:boolean = false;
  categoryList : Category[] = [];
  productModel:Product = new Product();

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;


  file!: File;
  imgUrl: string | ArrayBuffer = 'assets/images/default.png'

  
cartItems: Product[] = [];


  constructor(private productService:ProductService, private toastr: ToastrService, 
    private categoryService:CategoryService, private cartService: CartService) { }

  ngOnInit(): void {

    this.productFormGroup = new FormGroup({
      'name' : new FormControl('', Validators.required),
      'price' : new FormControl('', Validators.required),
      'image' : new FormControl('', Validators.required),
      'category' : new FormControl('', Validators.required),

    });

    this.getProductList();
    this.getCategories();

    this.cartItems = this.cartService.getCartItems();
  }

  addToCart(product: Product) {
    product.quantity = 1;
    this.cartService.addToCart(product);
    this.cartItems = [...this.cartService.getCartItems()];
    this.toastr.success('Success!', 'Produit ajouté au panier!');
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = [...this.cartService.getCartItems()];
    this.toastr.success('Success!', 'Produit supprimé du panier!');
  }

  updateQuantity(cartItem: Product, increment: number) {
    cartItem.quantity += increment;
    this.cartItems = [...this.cartService.getCartItems()];
  }

  calculateHT(): number {
    return this.cartItems.reduce((total, cartItem) => {
      const productTotal = Number(cartItem.price) * Number(cartItem.quantity);
      return total + productTotal;
    }, 0);
  }

  calculateTVA(): number {
    const ht = this.calculateHT();
    const tvaRate = 0.19;
    return ht * tvaRate;
  }

  calculateTTC(): number {
    const ht = this.calculateHT();
    const tva = this.calculateTVA();
    return ht + tva;
  }

  getProductList()
  {
    this.productService.getProductList().subscribe(res => {
      this.productList = res
    } , error => {
        console.error(error)
    } , ()=> {

    })
  }

  getCategories()
  {
    this.categoryService.getCategoryList().subscribe(
      res => {
        
        this.categoryList = res
      } , error => {
        console.error(error)
      } , () => {

      }
    )
  }

  addProduct()
  {
    
    this.submitted = true;
    if(this.productFormGroup.invalid)
    {
      return  ;
    }
      
      this.productModel.name = this.productFormGroup.value.name;
      this.productModel.price = this.productFormGroup.value.price;
      this.productModel.image = this.productFormGroup.value.image;
      this.productModel.category.id = this.productFormGroup.value.category
    
      this.productService.saveProduct(this.productModel)
        .subscribe({
          next: (res) => {
            this.productService.uploadProductImage(res.id, this.file).subscribe(
              res =>  {} , error => {} , () => {this.closeModalBtn.nativeElement.click()
                this.getProductList();
                this.submitted = false ; 
                this.productModel = new Product();
                this.productFormGroup.reset();
                this.toastr.success('Success!', 'Votre produit a été ajouté!');});            
            
          },
        });
        
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0) as File;
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result;
          }
        };
      }
    }
  }

  changeSource(event:any) {      
    event.target.src = "assets/images/default.png";
}

}
