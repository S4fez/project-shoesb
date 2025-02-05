export interface Products {
    product_id: number;
    brand_id:number;
    nameproduct: string;
    detail: string;

    // store detail
    productsize_id: number;
    size:string;
    price_size: string;
    stock_size:number;
    // imageUrl: string;
  }  

  export interface Shoes {
    product_id: number;
    brand_id:number;
    nameproduct: string;
    namebrand:string;
    detail: string;
    img: string;
    price:number;
  } 