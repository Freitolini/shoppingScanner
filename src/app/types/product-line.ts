export interface ProductLine {
    date: string;
    payee: string;
    description: string;
    price: number;
    approved: boolean;
    
}

export class Product implements ProductLine {
    date: string = "";
    payee: string = "";
    description: string = "";
    price: number = 0;
    approved: boolean = false;
    constructor(date: string, payee: string, description: string, amount: number){
        this.date = date;
        this.payee = payee;
        this.description = description;
        this.price = amount;
    }
}