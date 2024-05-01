import { Invoice } from "./invoice";

export interface IExporter {
    type: string;
    exportProducts(invoice: Invoice): Promise<Blob>;
}