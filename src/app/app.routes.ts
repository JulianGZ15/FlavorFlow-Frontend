import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { PagesComponent } from './pages/pages.component';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './principal/index/index.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { MainComponent } from './productos/main/main.component';
import { RestauranteModule } from './registro/restaurante.module';
import { RestauranteComponent } from './registro/restaurante/restaurante.component';
import { AuthOrdersComponent } from './auth/auth-orders/auth-orders.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { EmpleadosOrdersComponent } from './empleados/empleados-orders/empleados-orders.component';
import { EmpleadosOrdersAccessComponent } from './empleados/empleados-orders-access/empleados-orders-access.component';
import { ProductosOrdersComponent } from './ordenes/productos-orders/productos-orders.component';
import { MesasOrdersComponent } from './ordenes/mesas-orders/mesas-orders.component';




export const routes: Routes = [
    {path:'', redirectTo:'/index', pathMatch:'full'},
    {path: 'index', component: IndexComponent},
    {path: 'adminlogin', component: AuthComponent,
      loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),
      },



    {path: 'orderslogin', component: AuthOrdersComponent,
      loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),
      },


    {path: 'registro', component: RegistroComponent},
         
      { path:'datos_restaurante',component: RestauranteComponent},
      
  
    
    {path: 'dashboard', component: PagesComponent,
    children:[
        {path: 'admin', component:MainComponent,},
        
        { path:'productos',
          loadChildren:() => import('./productos/productos.module').then(m => m.ProductosModule),
          
        },
        { path:'empleados',
        loadChildren:() => import('./empleados/empleados.module').then(m => m.EmpleadosModule)

        },

        { path:'mesas',
        loadChildren:() => import('./mesas/mesas.module').then(m => m.MesasModule)

        },

        { path:'zonas',
        loadChildren:() => import('./zonas/zonas.module').then(m => m.ZonasModule)

        },

        
        { path:'puestos',
        loadChildren:() => import('./puestos/puestos.module').then(m => m.PuestosModule)

        },

        { path:'ventas',
        loadChildren:() => import('./ventas/ventas.module').then(m => m.VentasModule)

        }
        
     ]
    },


    {path: 'orders', component: OrderPageComponent,
    children:[
      { path:'empleados', component: EmpleadosOrdersComponent,
      
      },

      { path:'empleados_access/:id', component: EmpleadosOrdersAccessComponent,
      
      },

      { path:'productos/:id', component: ProductosOrdersComponent,
      
      },

      { path:'mesas', component: MesasOrdersComponent,
      
      },
      ]
    },



];
