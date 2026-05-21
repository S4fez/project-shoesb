import { Injectable } from '@angular/core';

export interface Product {
  id: string; brand: string; name: string; model: string;
  price: number; oldPrice: number | null; color: string; img: string;
  tags: string[]; rating: number; reviews: number; stock: number;
}
export interface Brand { id: string; name: string; tagline: string; count: number; }

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly heroImg = 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1600&q=80&auto=format&fit=crop';
  readonly extraImgs = [
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1539185441755-769473a23570?w=900&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=900&q=80&auto=format&fit=crop',
  ];

  readonly products: Product[] = [
    { id:'n01',  brand:'Nike',     name:'Sabrina 1 — Magnetic',    model:'DZ4470-002',  price:4290, oldPrice:4990, color:'Black/Orange',       img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80&auto=format&fit=crop',  tags:['New','Performance'], rating:4.8, reviews:312, stock:12 },
    { id:'n02',  brand:'Nike',     name:'KD 17 — Penny',           model:'FZ1399-100',  price:5590, oldPrice:null, color:'White/Crimson',       img:'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&q=80&auto=format&fit=crop',  tags:['Hot'],              rating:4.7, reviews:184, stock:6  },
    { id:'n03',  brand:'Nike',     name:'Giannis Immortality 4',   model:'FQ8732-002',  price:3290, oldPrice:3690, color:'Phantom/Sail',        img:'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=900&q=80&auto=format&fit=crop',  tags:['Sale'],             rating:4.6, reviews:540, stock:21 },
    { id:'a01',  brand:'Adidas',   name:'Harden Vol. 9',           model:'IF1075',      price:5290, oldPrice:null, color:'Carbon/Wonder Beige', img:'https://images.unsplash.com/photo-1539185441755-769473a23570?w=900&q=80&auto=format&fit=crop',  tags:['New'],              rating:4.5, reviews:96,  stock:8  },
    { id:'a02',  brand:'Adidas',   name:'Dame 8 — Day One',        model:'GY2768',      price:3990, oldPrice:4690, color:'Solar Red',           img:'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=900&q=80&auto=format&fit=crop',  tags:['Sale','Hot'],       rating:4.9, reviews:421, stock:4  },
    { id:'p01',  brand:'Puma',     name:'MB.03 — Toxic',           model:'309257-01',   price:4490, oldPrice:null, color:'Lime Squeeze',        img:'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=900&q=80&auto=format&fit=crop',  tags:['New'],              rating:4.4, reviews:78,  stock:15 },
    { id:'p02',  brand:'Puma',     name:'Stewie 3 — Heir',         model:'378315-04',   price:4790, oldPrice:5290, color:'Sun Stream',          img:'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=900&q=80&auto=format&fit=crop',  tags:['Sale'],             rating:4.6, reviews:132, stock:9  },
    { id:'c01',  brand:'Converse', name:'All Star BB Pro',         model:'A09112C',     price:3490, oldPrice:null, color:'Black/White',         img:'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=900&q=80&auto=format&fit=crop',  tags:['Hot'],              rating:4.3, reviews:245, stock:18 },
    { id:'c02',  brand:'Converse', name:'Shai Mid — Origin',       model:'A07623C',     price:4990, oldPrice:null, color:'Volt/Black',          img:'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=900&q=80&auto=format&fit=crop',  tags:['New','Limited'],    rating:4.7, reviews:41,  stock:3  },
    { id:'l01',  brand:'Li-Ning',  name:'Way of Wade — All Day 6', model:'ABPS003-1',   price:3890, oldPrice:4290, color:'Ink Black',           img:'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=900&q=80&auto=format&fit=crop',  tags:['Sale'],             rating:4.5, reviews:67,  stock:11 },
    { id:'an01', brand:'Anta',     name:'KAI 1 — Speed',           model:'112341101-1', price:3290, oldPrice:null, color:'Court Blue',          img:'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900&q=80&auto=format&fit=crop',  tags:['New'],              rating:4.4, reviews:28,  stock:7  },
  ];

  readonly brands: Brand[] = [
    { id:'nike',     name:'Nike',     tagline:'Just Do It',            count:3 },
    { id:'adidas',   name:'Adidas',   tagline:'Impossible is Nothing', count:2 },
    { id:'puma',     name:'Puma',     tagline:'Forever Faster',        count:2 },
    { id:'converse', name:'Converse', tagline:'All Star',              count:2 },
    { id:'lining',   name:'Li-Ning',  tagline:'Anything is Possible',  count:1 },
    { id:'anta',     name:'Anta',     tagline:'Keep Moving',           count:1 },
  ];

  readonly sizes = ['7','7.5','8','8.5','9','9.5','10','10.5','11','12'];
  readonly availableSizes = ['8','9','9.5','10','10.5','11','12'];

  getById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  filter(brandId: string, priceMax: number, sortBy: string): Product[] {
    let r = this.products.filter(p => p.price <= priceMax);
    if (brandId !== 'all') {
      r = r.filter(p => p.brand.toLowerCase().replace(/[-\s]/g,'') === brandId.toLowerCase().replace(/[-\s]/g,''));
    }
    if (sortBy === 'price-asc')  r = [...r].sort((a,b) => a.price - b.price);
    if (sortBy === 'price-desc') r = [...r].sort((a,b) => b.price - a.price);
    if (sortBy === 'rating')     r = [...r].sort((a,b) => b.rating - a.rating);
    return r;
  }
}
