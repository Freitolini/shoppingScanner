import { IShopParser } from "../../types/ishop-parser";
import { Product, ProductLine } from "../../types/product-line";

export class PingoDoceParser implements IShopParser{
    shopName: string = "Pingo Doce";
    parseLines(lines: string[]): ProductLine[] {
        let products: ProductLine[] = [];
        let date: string = "";
        let payee: string = "";
        let description: string = "";
        let amount: number = 0;
        for (let line of lines) {
            if (line.includes("Pingo Doce")) {
                date = line.split(" ")[0];
                payee = "Pingo Doce";
            }
            else if (line.includes("€")) {
                let amountString = line.split("€")[1];
                amount = parseFloat(amountString);
                products.push(new Product(date, payee, description, amount));
            }
            else {
                description = line;
            }
        }
        return products;
    }
}