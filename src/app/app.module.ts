import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { UltimasRecetasComponent } from './components/home/ultimas-recetas/ultimas-recetas.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CocinaComponent } from './components/cocina/cocina.component';
import { RecetaComponent } from './components/receta/receta.component';
import { MasPuntuadasComponent } from './components/home/mas-puntuadas/mas-puntuadas.component';
import { CrearEditarRecetaComponent } from './components/cocina/crear-editar-receta/crear-editar-receta.component';
import { MisRecetasComponent } from './components/cocina/mis-recetas/mis-recetas.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UltimasRecetasComponent,
    BusquedaComponent,
    CategoriaComponent,
    CocinaComponent,
    RecetaComponent,
    MasPuntuadasComponent,
    CrearEditarRecetaComponent,
    MisRecetasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    NgbModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
