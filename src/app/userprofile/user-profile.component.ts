import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { Stock } from '../stock';
import Swal from 'sweetalert2';
import { AccountService } from '../service/account.service';
import { environment } from '../environment/environment';


@Component({
  selector: 'app-payment-popup',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() ShowPopup: boolean = false;
  @Input() data!: Stock[];
  @Input() Total!: number;
  @Output() popupClosed: EventEmitter<boolean> = new EventEmitter();

  profile: any;
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  baseApiUrl = environment.imgUrl;
  selectedFileName: string | null = null;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private accountService: AccountService
  ) { }
  ngOnChanges(): void {
    // console.log("daTA",this.data)
  }

  ngOnInit(): void {
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    const userId = profile.userId; // Replace with actual user ID
    // console.log(profile.userId, profile.email);

    if (userId) {
      this.userProfile(+userId);
    }
  }

  userProfile(id: number) {
    this.accountService.getProfile(id).subscribe(
      (response) => {
        // console.log('User Profile:', response);
        var image = this.convertPath(response.user_img);
        response.user_img = image;
        this.profile = response; // ✅ เก็บข้อมูลไว้ใน data
        // Handle the user profile data as needed
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFileName = file.name;

    const reader = new FileReader();
    reader.onload = e => this.previewUrl = reader.result;
    reader.readAsDataURL(file);
  }
}

  onUpload() {
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    const userId = profile.userId;
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('account_id', userId!);

    this.accountService.uploadImage(formData).subscribe(
      (response) => {
        console.log('Upload success:', response);
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful',
          text: 'Your profile picture has been updated.',
          confirmButtonText: 'OK'
        });
      });
  }
  ShowUploadPopup() {
    this.ShowPopup = true;
  }
  CloseUploadPopup() {
    this.ShowPopup = false;
  }
  convertPath(path: string): string {
    // แปลง backslash เป็น slash
    const fixedPath = path.replace(/\\/g, '/');
    // คืนค่าเป็น URL เต็ม
    return fixedPath;
  }


}
