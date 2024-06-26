export interface IProduct {
    description: string;
    price: number;
    approved: boolean;
    
}

export class Product implements IProduct {
    description: string = "";
    price: number = 0;
    approved: boolean = false;
    constructor(description: string, amount: number){
        this.description = description;
        this.price = amount;
    }
}

export class Invoice {
    date: string = "";
    payee: string = "";
    calculateTotal: number = 0;
    totalReal: number = 0;
    products: IProduct[] = [];
    status: InvoiceStatus = InvoiceStatus.None;
    constructor(date: string, payee: string, products: IProduct[], calculateTotal: number, totalReal: number, status: InvoiceStatus = InvoiceStatus.None){
        this.date = date;
        this.payee = payee;
        this.products = products;
        this.calculateTotal = calculateTotal;
        this.totalReal = totalReal;
        this.status = status;
    }
}
export enum InvoiceStatus {
    None = "None",
    Started = "Started",
    Processing = "Processing",
    Complete = "Complete",
    Failed = "Failed"

}