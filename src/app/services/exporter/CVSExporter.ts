import { IExporter } from "../../types/iexporter";
import { IProduct, Invoice } from "../../types/invoice";

export class CVSExporter implements IExporter{
    type: string = "CVS";
    async exportProducts(invoice: Invoice): Promise<Blob> {
        let csv = "Date,Payee,Memo,Outflow\n";
        invoice.products.forEach((product:IProduct) => {
            csv += `${invoice.date},${invoice.payee},${product.description},${product.price}€\n`;
        });
        return new Blob([csv], {type: 'text/csv'});
    }
}   