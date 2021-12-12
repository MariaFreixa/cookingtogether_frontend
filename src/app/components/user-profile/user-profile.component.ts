import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  userProfile: User = new User();
  updateUserForm: FormGroup;
  updateImageUserForm: FormGroup;
  errors = null;
  selectedImage: any = '';
  thumbnail: any;
  
  constructor(public authService: AuthService, public fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.authService.profileUser().subscribe((response: any) => {
      this.userProfile = response;
      this.updateUserForm = this.fb.group({
        name: [this.userProfile.name],
        email: [this.userProfile.email],
        password: [''],
        password_confirmation: ['']
      });
      if(response.avatar != null) {
        this.cargarAvatar(response.avatar);
      } else {
        this.thumbnail = '../assets/img/avatar.jpg';
      }
    })
    
  }

  ngOnInit() {}

  onSubmit() {
    var userInfo = new FormData();
    userInfo.append('avatar', this.selectedImage);
    userInfo.append('name', this.updateUserForm.value.name);
    userInfo.append('email', this.updateUserForm.value.email);
    userInfo.append('password', this.updateUserForm.value.password);
    userInfo.append('password_confirmation', this.updateUserForm.value.password_confirmation);

    this.authService.updateProfileUser(userInfo).subscribe(response =>  {
      this.cargarAvatar(response.user.avatar);
      },
      error => {
        this.errors = error.error;
      }
    );
  }

  onAvatarChange(event) {
    this.selectedImage = event.target.files[0];
  }

  cargarAvatar(avatar: any) {
    //Cargamos la imagen de perfil guardada
    let objectURL = 'data:image/jpeg;base64,' + avatar;
    this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}
