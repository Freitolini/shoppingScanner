import { IShopParser, ParserState } from "../../types/ishop-parser";
import { Invoice, Product, IProduct } from "../../types/invoice";

export class ContinenteParser implements IShopParser{
    shopName: string = "Continente";
    parseLines(lines: string[],date?:string): Invoice {
        let state: ParserState = ParserState.Date;
        let products: IProduct[] = [];
        if (date){
            state = ParserState.StartOfProducts
        }
        let payee: string = this.shopName;
        let calculateTotal :number = 0;
        let totalReal :number = 0;      
        lines.forEach((line, index) => {
            switch (state) {
                case ParserState.Date:
                    if (line.includes("Nro:")) {
                        date = line.split(" ")[3];
                        //from yyyy-mm-dd to mm/dd/yyyy
                        //let dateSplt = date.split("—");
                        //date = dateSplt[1] + "/" + dateSplt[2] + "/" + dateSplt[0];
                        state = ParserState.StartOfProducts;
                    }
                    break;
                case ParserState.StartOfProducts:
                    if (line.includes("VALOR")) {
                        state = ParserState.Products;
                    }
                    break;
                case ParserState.Products:
                    if (line.includes("TOTAL A PAGAR ")) {
                        let lines = line.trim().split(" ");
                        totalReal = Number(lines[lines.length-1].replace(",","."));
                        state = ParserState.Ended; 
                        break
                    }
                    let splits:string[] = line.trim().split(" ");
                    let price = parseFloat(splits[splits.length-1].replace(",",".").replace(",","."));
                    let description = splits.slice(1,splits.length-1);
                    if (!isNaN(price) && description.length != 0){
                        calculateTotal+=price;
                        products.push(new Product(description.join(" "), price));
                    }
                    break;
                case ParserState.Ended:
                    break;

                    
            }
        });
        return new Invoice(date,payee,products,calculateTotal,totalReal);        
    }

}