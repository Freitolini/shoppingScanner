import { Injectable } from '@angular/core';
import { CVSExporter } from './CVSExporter';
import { IExporter } from '../../types/iexporter';
import { ProductLine } from '../../types/product-line';
@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  exporters: IExporter[] = [new CVSExporter()];
  constructor() { }
  
  getExporterList():string[]{
    return this.exporters.map((exporter) => exporter.type);
  }

  exportProducts(exporter: string, products: ProductLine[]): Promise<Blob>{
    let exporterInstance = this.exporters.find((exporterInstance) => exporterInstance.type === exporter);
    if(exporterInstance){
      return exporterInstance.exportProducts(products);
    }
    return new Promise((resolve, reject) => reject("Exporter not found"));
  }
}
