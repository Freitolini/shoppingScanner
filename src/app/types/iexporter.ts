import { ProductLine } from "./product-line";

export interface IExporter {
    type: string;
    exportProducts(products :ProductLine[]): Promise<Blob>;
}