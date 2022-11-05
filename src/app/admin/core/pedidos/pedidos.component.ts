import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';
import { MisPedidosService } from '../mispedidos/mispedidos.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  constructor(private charts: ChartsModule,
    private charts2: NgxChartsModule,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private misPedidosService: MisPedidosService) {
      // this.fromDate = calendar.getToday();
      this.fromDate = calendar.getPrev(calendar.getToday(), 'd', 30);
		  this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
      this.fromDateDef = calendar.getPrev(calendar.getToday(), 'd', 30);
		  this.toDateDef = calendar.getNext(calendar.getToday(), 'd', 10);
    }

  @ViewChild('NgbdDatepicker') d: NgbDateStruct;

  hoveredDate: NgbDate | null = null;

	fromDate: NgbDate | null;
	toDate: NgbDate | null;

  fromDateDef: NgbDate | null;
	toDateDef: NgbDate | null;

  body: any;
  single = [];
  multi = [];


  aduana: any;
  fech_reg: any;

  name = 'SDFARL';
  width = 400;
  height = 300;
  fitContainer = false;

  view: any[] = [900, 700];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Periodos';
  showYAxisLabel = true;
  yAxisLabel = 'Casos Fraudulentos';
  timeline = true;
  doughnut = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  // pie
  showLabels = true;
  // data goes here

aduanas = [{
  id: 0,
  descripcion: 'Santamaría'
},
{
  id: 0.1,
  descripcion: 'Paso Canoas'
},
{
  id: 0.2,
  descripcion: 'La Anexión'
},
{
  id: 0.3,
  descripcion: 'Caldera'
},
{
  id: 0.66666667,
  descripcion: 'Limón'
},
{
  id: 1,
  descripcion: 'Peñas Blancas'
},
{
  id: 1.1,
  descripcion: 'Aduana Central'
}];

    onDateSelection(date: NgbDate) {
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
      } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
        this.toDate = date;
      } else {
        this.toDate = null;
        this.fromDate = date;
      }
    }

    isHovered(date: NgbDate) {
      return (
        this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
      );
    }

    isInside(date: NgbDate) {
      return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
      return (
        date.equals(this.fromDate) ||
        (this.toDate && date.equals(this.toDate)) ||
        this.isInside(date) ||
        this.isHovered(date)
      );
    }

    validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
      const parsed = this.formatter.parse(input);
      return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    }

  ngOnInit() {
    this.fech_reg = this.fromDate['month'] + '/'
     + this.fromDate['day'] + '/'
      + this.fromDate['year'] + '-'
       + this.toDate['month'] + '/'
        + this.toDate['day'] + '/'
         + this.toDate['year'] ;

    this.body = {
      'fech_reg': this.fech_reg,
      'aduana': null
    };
    console.log(this.body);

    this.getInfoDashboards(this.body);
    // this.single = [
    //   {
    //     'name': 'China',
    //     'value': 2243772
    //   },
    //   {
    //     'name': 'USA',
    //     'value': 1126000
    //   },
    //   {
    //     'name': 'Norway',
    //     'value': 296215
    //   },
    //   {
    //     'name': 'Japan',
    //     'value': 257363
    //   },
    //   {
    //     'name': 'Germany',
    //     'value': 196750
    //   },
    //   {
    //     'name': 'France',
    //     'value': 204617
    //   }
    // ];

    // this.multi = [
    //   {
    //     'name': 'China',
    //     'series': [
    //       {
    //         'name': '2018',
    //         'value': 2243772
    //       },
    //       {
    //         'name': '2017',
    //         'value': 1227770
    //       }
    //     ]
    //   },
    //   {
    //     'name': 'USA',
    //     'series': [
    //       {
    //         'name': '2018',
    //         'value': 1126000
    //       },
    //       {
    //         'name': '2017',
    //         'value': 764666
    //       }
    //     ]
    //   },
    //   {
    //     'name': 'Norway',
    //     'series': [
    //       {
    //         'name': '2018',
    //         'value': 296215
    //       },
    //       {
    //         'name': '2017',
    //         'value': 209122
    //       }
    //     ]
    //   },
    //   {
    //     'name': 'Japan',
    //     'series': [
    //       {
    //         'name': '2018',
    //         'value': 257363
    //       },
    //       {
    //         'name': '2017',
    //         'value': 205350
    //       }
    //     ]
    //   },
    //   {
    //     'name': 'Germany',
    //     'series': [
    //       {
    //         'name': '2018',
    //         'value': 196750
    //       },
    //       {
    //         'name': '2017',
    //         'value': 129246
    //       }
    //     ]
    //   },
    //   {
    //     'name': 'France',
    //     'series': [
    //       {
    //         'name': '2018',
    //         'value': 204617
    //       },
    //       {
    //         'name': '2017',
    //         'value': 149797
    //       }
    //     ]
    //   }
    // ];

  }

  descargarPdf() {
    // Extraemos el
    const DATA = document.getElementById('dvCharts');
    const FILTRO = document.getElementById('dvFiltro');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_Charts.pdf`);
    });
  }

  busquedaDashboard() {
    console.log(this.aduana);
    console.log(this.fromDate);
    console.log(this.toDate);
    console.log(this.fromDate['day']);
    console.log(this.fromDate['month']);
    console.log(this.fromDate['year']);

    this.fech_reg = this.fromDate['month'] + '/'
    + this.fromDate['day'] + '/'
    + this.fromDate['year'] + '-'
    + this.toDate['month'] + '/'
    + this.toDate['day'] + '/'
    + this.toDate['year'] ;

    console.log(this.fech_reg);

    this.body = {
      'fech_reg': this.fech_reg,
      'aduana': this.aduana === undefined ? null : this.aduana
    };
    console.log(this.body);

    this.getInfoDashboards(this.body);

  }

  getInfoDashboards(body: any) {
    // this.single = [];
    this.misPedidosService.getPieDashboard(body).subscribe(
      (data) => {
        const singles = [];
        console.log(data);
        if (data['data'] !== undefined) {
          for (const value of data['data']) {
            console.log(value);
            console.log(value[0]);
            console.log(value[1]);
            singles.push({ 'name': value[1].toUpperCase(), 'value': value[0]});
          }
        }

        this.single = singles;
      }, (error) => {
        console.log(JSON.stringify(error, null, 2));
      }
    );


    this.misPedidosService.getbarDashboard(this.body).subscribe(
      (data) => {
        console.log(data);

        const multis = [];
        console.log(data);
        if (data['data'] !== undefined) {
          for (const value of data['data']) {
            const series = [];

            let name;
            this.aduanas.forEach(function(val) {
              if (val.id === Number(value[2])) {
                name = val.descripcion;
              }
            });
            series.push({ 'name': name, 'value': value[0]});
            multis.push({ 'name': value[1], 'series': series});
            console.log(multis);
          }
        }

        this.multi = multis;
      }, (error) => {
        console.log(JSON.stringify(error, null, 2));
      }
    );
  }

  limpiarBusqueda() {
    this.aduana = null;
    this.fromDate = this.fromDateDef;
		this.toDate = this.toDateDef;
  }
}
