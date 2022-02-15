import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [
  {
    canActivate: [GuardGuard],
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'security',
    loadChildren: () => import('./pages/security/security.module').then( m => m.SecurityPageModule)
  },
  {
    path: 'datos-solicitud',
    loadChildren: () => import('./pages/datos-solicitud/datos-solicitud.module').then( m => m.DatosSolicitudPageModule)
  },
  {
    path: 'observaciones',
    loadChildren: () => import('./pages/observaciones/observaciones.module').then( m => m.ObservacionesPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'trabajar-vehiculo',
    loadChildren: () => import('./pages/trabajar-vehiculo/trabajar-vehiculo.module').then( m => m.TrabajarVehiculoPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'ver-sim',
    loadChildren: () => import('./pages/ver-sim/ver-sim.module').then( m => m.VerSIMPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'ver-datos',
    loadChildren: () => import('./pages/ver-datos/ver-datos.module').then( m => m.VerDatosPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'modal-observaciones',
    loadChildren: () => import('./pages/modal-observaciones/modal-observaciones.module').then( m => m.ModalObservacionesPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'travajar-vehiculo-op',
    loadChildren: () => import('./pages/travajar-vehiculo-op/travajar-vehiculo-op.module').then( m => m.TravajarVehiculoOpPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
