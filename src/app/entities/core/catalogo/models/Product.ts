export class Product {
  id: number;
  name: string;
  typeCurrency: string;
  price: number;
  description: string;
  image: string;
  best: boolean;
  constructor(id: number, name: string, typeCurrency: string, price: number, description: string, image: string, best: boolean) {
    this.id = id;
    this.name = name;
    this.typeCurrency = typeCurrency;
    this.price = price;
    this.description = description;
    this.image = image;
    this.best = best;
  }
}
