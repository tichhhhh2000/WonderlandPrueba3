import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'contactanos',
    loadChildren: () => import('./pages/contactanos/contactanos.module').then( m => m.ContactanosPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./pages/registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'detalle-album',
    loadChildren: () => import('./pages/detalle-album/detalle-album.module').then( m => m.DetalleAlbumPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'cambiar-contra',
    loadChildren: () => import('./pages/cambiar-contra/cambiar-contra.module').then( m => m.CambiarContraPageModule)
  },
  {
    path: 'administracion',
    loadChildren: () => import('./admin/administracion/administracion.module').then( m => m.AdministracionPageModule)
  },
  {
    path: 'modificar-album',
    loadChildren: () => import('./pages/modificar-album/modificar-album.module').then( m => m.ModificarAlbumPageModule)
  },
  {
    path: 'agregar-album',
    loadChildren: () => import('./pages/agregar-album/agregar-album.module').then( m => m.AgregarAlbumPageModule)
  },
  {
    path: 'eliminar-album',
    loadChildren: () => import('./pages/eliminar-album/eliminar-album.module').then( m => m.EliminarAlbumPageModule)
  },
  {
    path: 'ver-album',
    loadChildren: () => import('./pages/ver-album/ver-album.module').then( m => m.VerAlbumPageModule)
  },
  {
    path: 'modificar-detalle-album',
    loadChildren: () => import('./pages/modificar-detalle-album/modificar-detalle-album.module').then( m => m.ModificarDetalleAlbumPageModule)
  },
  {
    path: 'buscar',
    loadChildren: () => import('./pages/buscar/buscar.module').then( m => m.BuscarPageModule)
  },
  {
    path: 'libreria',
    loadChildren: () => import('./pages/libreria/libreria.module').then( m => m.LibreriaPageModule)
  },
  {
    path: 'detalle-album-carrito',
    loadChildren: () => import('./pages/detalle-album-carrito/detalle-album-carrito.module').then( m => m.DetalleAlbumCarritoPageModule)
  },
  {
    path: 'detalle-libreria',
    loadChildren: () => import('./pages/detalle-libreria/detalle-libreria.module').then( m => m.DetalleLibreriaPageModule)
  },
  {
    path: 'boleta',
    loadChildren: () => import('./pages/boleta/boleta.module').then( m => m.BoletaPageModule)
  },
  {
    path: 'estrenos-album',
    loadChildren: () => import('./pages/estrenos-album/estrenos-album.module').then( m => m.EstrenosAlbumPageModule)
  },
  {
    path: 'detalle-estreno/:id',
    loadChildren: () => import('./pages/detalle-estreno/detalle-estreno.module').then( m => m.DetalleEstrenoPageModule)
  },
  {
    path: 'historial-compra',
    loadChildren: () => import('./pages/historial-compra/historial-compra.module').then( m => m.HistorialCompraPageModule)
  },
  {
    path: 'historial-venta',
    loadChildren: () => import('./pages/historial-venta/historial-venta.module').then( m => m.HistorialVentaPageModule)
  },
  {
    path: 'recuperar-contra',
    loadChildren: () => import('./pages/recuperar-contra/recuperar-contra.module').then( m => m.RecuperarContraPageModule)
  },
  {
    path: 'modificar-perfil',
    loadChildren: () => import('./pages/modificar-perfil/modificar-perfil.module').then( m => m.ModificarPerfilPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
