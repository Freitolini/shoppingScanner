import { IShopParser, ParserState } from "../../types/ishop-parser";
import { Product, ProductLine } from "../../types/product-line";

export class PingoDoceParser implements IShopParser{
    shopName: string = "Pingo Doce";
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
                    if (line.includes("Data de emissão:")) {
                        date = line.split(" ")[3].trim().split(":")[1];
                        //from yyyy-mm-dd to mm/dd/yyyy
                        let dateSplt = date.split("—");
                        date = dateSplt[1] + "/" + dateSplt[2] + "/" + dateSplt[0];
                        state = ParserState.StartOfProducts;
                    }
                    break;
                case ParserState.StartOfProducts:
                    if (line.includes("Artigos\n")) {
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
                    let description = splits.slice(2,splits.length-1);
                    if (this.checkforMultiple(lines[index+1])){
                        let nextLine = lines[index+1].trim().split(" ");
                        price = parseFloat(nextLine[nextLine.length-1].replace(",","."));
                        state = ParserState.Multiple; 
                    }
                    if (!isNaN(price) && description.length != 0){
                        products.push(new Product(date, payee, description.join(" "), price));
                    }
                    break;
                case ParserState.Ended:
                    break;
                case ParserState.Multiple:
                    state = ParserState.Products;
                    break;
                    
            }
        });
        return products;        
    }

    private checkforMultiple(line:string):boolean{
        return !isNaN(Number(line[0]));
    }
}