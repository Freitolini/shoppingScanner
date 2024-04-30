import { IShopParser, ParserState } from "../../types/ishop-parser";
import { Product, ProductLine } from "../../types/product-line";

export class ContinenteParser implements IShopParser{
    shopName: string = "Continente";
    parseLines(lines: string[],date?:string): ProductLine[] {
        let state: ParserState = ParserState.Date;
        let products: ProductLine[] = [];
        if (date){
            state = ParserState.StartOfProducts
        }
        let payee: string = this.shopName;      
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
                        state = ParserState.Ended; 
                        break
                    }
                    let splits:string[] = line.trim().split(" ");
                    let price = parseFloat(splits[splits.length-1].replace(",","."));
                    let description = splits.slice(1,splits.length-1);
                    if (!isNaN(price) && description.length != 0){
                        products.push(new Product(date, payee, description.join(" "), price));
                    }
                    break;
                case ParserState.Ended:
                    break;

                    
            }
        });
        return products;        
    }

}