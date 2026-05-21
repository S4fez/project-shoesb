import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AccountService } from '../service/account.service';
import { AuthService } from '../auth.service';
import { environment } from '../environment/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  ShowPopup: boolean = false;

  profile: any;
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  baseApiUrl = environment.imgUrl;
  selectedFileName: string | null = null;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
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
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
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
    return path.replace(/\\/g, '/');
  }

  isAdmin(): boolean { return this.authService.isAdmin(); }
  isStaff(): boolean { return this.authService.isStaff(); }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
