import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductAdminService } from '../../core/services/product-admin.service';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../environment/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  products: any[] = [];
  brands: any[] = [];
  addProductForm!: FormGroup;
  editProductForm!: FormGroup;
  selectedFile: File | null = null;
  editSelectedFile: File | null = null;
  previewUrl: string | null = null;
  editPreviewUrl: string | null = null;
  imgUrl = environment.imgUrl;
  loading = false;
  showAddForm = false;
  editingProduct: any = null;

  constructor(
    private productAdminService: ProductAdminService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!this.authService.canManageProducts()) {
      this.router.navigate(['/home']);
      return;
    }
    this.initForms();
    this.loadData();
  }

  private initForms(): void {
    this.addProductForm = this.fb.group({
      brand_id: ['', Validators.required],
      nameproduct: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.min(1)]],
      sizes: this.fb.array([this.createSizeRow()])
    });

    this.editProductForm = this.fb.group({
      nameproduct: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.min(1)]],
      record_status: ['A', Validators.required]
    });
  }

  createSizeRow(): FormGroup {
    return this.fb.group({
      size: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  get sizesArray(): FormArray {
    return this.addProductForm.get('sizes') as FormArray;
  }

  addSizeRow(): void {
    this.sizesArray.push(this.createSizeRow());
  }

  removeSizeRow(index: number): void {
    if (this.sizesArray.length > 1) {
      this.sizesArray.removeAt(index);
    }
  }

  loadData(): void {
    this.loading = true;
    this.productAdminService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        Swal.fire('ผิดพลาด', 'ไม่สามารถโหลดข้อมูลสินค้าได้', 'error');
      }
    });

    this.productAdminService.getAllBrands().subscribe({
      next: (data) => { this.brands = data; },
      error: (err) => console.error(err)
    });
  }

  onFileSelected(event: Event, mode: 'add' | 'edit'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (mode === 'add') {
          this.selectedFile = file;
          this.previewUrl = e.target?.result as string;
        } else {
          this.editSelectedFile = file;
          this.editPreviewUrl = e.target?.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  submitAddProduct(): void {
    if (this.addProductForm.invalid) {
      this.addProductForm.markAllAsTouched();
      return;
    }
    const val = this.addProductForm.value;
    const formData = new FormData();
    formData.append('brand_id', val.brand_id);
    formData.append('nameproduct', val.nameproduct);
    formData.append('price', val.price);
    formData.append('sizes', JSON.stringify(val.sizes));
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    this.productAdminService.createProduct(formData).subscribe({
      next: () => {
        Swal.fire('สำเร็จ!', 'เพิ่มสินค้าเรียบร้อยแล้ว', 'success');
        this.addProductForm.reset();
        while (this.sizesArray.length > 1) {
          this.sizesArray.removeAt(0);
        }
        this.sizesArray.at(0).reset({ size: '', stock: 0 });
        this.selectedFile = null;
        this.previewUrl = null;
        this.showAddForm = false;
        this.loadData();
      },
      error: (err) => {
        console.error(err);
        Swal.fire('ผิดพลาด', err.error?.message || 'ไม่สามารถเพิ่มสินค้าได้', 'error');
      }
    });
  }

  openEditModal(product: any): void {
    this.editingProduct = product;
    this.editProductForm.patchValue({
      nameproduct: product.nameproduct,
      price: product.price,
      record_status: product.record_status || 'A'
    });
    this.editPreviewUrl = product.img ? this.imgUrl + product.img : null;
    this.editSelectedFile = null;
  }

  submitEditProduct(): void {
    if (this.editProductForm.invalid || !this.editingProduct) return;
    const val = this.editProductForm.value;
    const formData = new FormData();
    formData.append('nameproduct', val.nameproduct);
    formData.append('price', val.price);
    formData.append('record_status', val.record_status);
    if (this.editSelectedFile) {
      formData.append('img', this.editSelectedFile);
    }

    this.productAdminService.updateProduct(this.editingProduct.product_id, formData).subscribe({
      next: () => {
        Swal.fire('สำเร็จ!', 'อัปเดตสินค้าเรียบร้อยแล้ว', 'success');
        this.editingProduct = null;
        this.loadData();
      },
      error: (err) => {
        console.error(err);
        Swal.fire('ผิดพลาด', err.error?.message || 'ไม่สามารถอัปเดตสินค้าได้', 'error');
      }
    });
  }

  confirmDelete(product: any): void {
    Swal.fire({
      title: 'ยืนยันการลบสินค้า?',
      html: `คุณต้องการลบ <strong>${product.nameproduct}</strong> ใช่หรือไม่?<br><small class="text-muted">สินค้าจะถูกซ่อนจากหน้าร้าน</small>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'ลบสินค้า',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productAdminService.deleteProduct(product.product_id).subscribe({
          next: () => {
            Swal.fire('ลบแล้ว!', 'ลบสินค้าเรียบร้อยแล้ว', 'success');
            this.loadData();
          },
          error: (err) => {
            console.error(err);
            Swal.fire('ผิดพลาด', 'ไม่สามารถลบสินค้าได้', 'error');
          }
        });
      }
    });
  }

  getBrandName(brandId: number): string {
    const brand = this.brands.find(b => b.brand_id === brandId);
    return brand ? (brand.namebrand || `Brand ${brandId}`) : `Brand ${brandId}`;
  }

  getRoleBadgeLabel(): string {
    return this.authService.isSuperAdmin() ? 'SuperAdmin' : 'Admin';
  }
}
