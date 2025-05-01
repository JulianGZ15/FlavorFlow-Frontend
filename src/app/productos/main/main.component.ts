import { Component, OnInit } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { RestauranteService } from '../../services/restaurante.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/productos.service';
import { VentasService } from '../../services/ventas.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgxChartsModule,
    CommonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
showXAxis: any;
showYAxis: any;


  constructor(
    private router: Router,
    private service: RestauranteService,
    private productosService: ProductoService,
    private ventasService: VentasService,
  ){}
  restaurant !: number
  nombreRest !:string
  below!: LegendPosition.Below;


  single1: any[] = [];
  single2: any[] = [];


   // options
   gradient: boolean = true;
   showLegend: boolean = true;
   showLabels: boolean = true;
   isDoughnut: boolean = false;

     // options
  legend: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Año';
  yAxisLabel: string = 'Ganancias';
  timeline: boolean = true;
 
   colorScheme = {
     domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
   };
 
 


  ngOnInit(): void {
    this.service.getRestaurante().subscribe(
      data=>{ 
        console.log(data)
        data.map(restaurant=>[
          this.restaurant = restaurant.cve_restaurante,
          this.nombreRest = restaurant.nombre
        ])

        if(this.restaurant == 0){
          this.router.navigate(['/datos_restaurante'])

          
        }
      }
    )


    
    this.productosService.getMasVendidos().subscribe(data => {
      this.single1 = data.map(item => ({
        name: item.producto,
        value: item.cantidadVendida
      }));
    });


    this.ventasService.getGanaciaMes().subscribe(data => {
      this.single2 = data.map(item => ({
        name: item.mes,
        value: item.ganancias
      }));
    });

  }



  view: [number, number] = [500, 250];

 
  
  
    onSelect(data: any): void {
      console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }
  
    onActivate(data: any): void {
      console.log('Activate', JSON.parse(JSON.stringify(data)));
    }
  
    onDeactivate(data: any): void {
      console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }
  

    generarPdf(){
      const elemento:any = document.getElementById('reporte')
  
      html2canvas(elemento, {scale: 2}).then((canvas)=>{
  
        const pdf = new jsPDF();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG',0,0,211,298);
  
        pdf.setProperties({
          title : 'Reporte de restaurante',
          author: 'FlavorFlow'
        });
        pdf.setFontSize(12);
        pdf.text('Reporte de empleado', 14,22);
        pdf.save('reporte de empleado Flavorflow')
        
      }
      )
    }


  }


