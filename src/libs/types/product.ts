import { ProductBundle, ProductCollection, ProductColor, ProductMode, ProductSize, ProductStatus } from "../enums/product.enum";
import {ObjectId} from "mongoose";

export interface Product{
    _id: ObjectId;
    productStatus: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productSize: ProductSize;
    productColor: ProductColor;
    productBundle: ProductBundle;
    productMode: ProductMode;
    productDesc?: string;
    productImages: string[];
    productViews: number;

    createdAt:Date;
    updatedAt:Date;
}

export interface ProductInquiry{
    order:string;
    limit: number;
    page: number;
    productCollection?:ProductCollection;
    productMode?:ProductMode;
    search?:string;

}


export interface ProductInput{
    productStatus?: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productSize?: ProductSize;
    productColor: ProductColor;
    productBundle: ProductBundle;
    productMode: ProductMode;
    productDesc?: string;
    productImages?: string[];
    productViews?: number;
}
export interface ProductUpdateInput{
    _id:ObjectId;
    productStatus?: ProductStatus;
    productCollection?: ProductCollection;
    productName?: string;
    productPrice?: number;
    productLeftCount?: number;
    productSize?: ProductSize;
    productColor?: ProductColor;
    productBundle?: ProductBundle;
    productMode?: ProductMode;
    productDesc?: string;
    productImages?: string[];
    productViews?: number;
}

  