import { IExporter } from "../../types/iexporter";
import { ProductLine } from "../../types/product-line";

export class CVSExporter implements IExporter{
    type: string = "CVS";
    async exportProducts(products: ProductLine[]): Promise<Blob> {
        let csv = "Date,Payee,Memo,Outflow\n";
        products.forEach((product) => {
            csv += `${product.date},${product.payee},${product.description},${product.price}+"€"\n`;
        });
        return new Blob([csv], {type: 'text/csv'});
    }
}   