import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CocinaComponent } from './components/cocina/cocina.component';
import { CrearEditarRecetaComponent } from './components/cocina/crear-editar-receta/crear-editar-receta.component';
import { HomeComponent } from './components/home/home.component';
import { RecetaComponent } from './components/receta/receta.component';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'categoria/:id', component: CategoriaComponent },
  { path: 'cocina', component: CocinaComponent },
  { path: 'receta/:id', component: RecetaComponent },
  { path: 'crear-receta', component: CrearEditarRecetaComponent },
  { path: 'editar-receta/:id', component: CrearEditarRecetaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
