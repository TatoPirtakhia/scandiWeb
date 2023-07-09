
type Furniture = {
    Height: number;
    Width: number;
    Length: number;
};

type DVD = {
    size: number;
  };
  
  type Book = {
    Weight: number;
  };
  
  type Product = {
    id: string;
    name: string;
    price: number;
    DVD?: DVD;
    Book?: Book;
    Furniture?:Furniture
  };
  
  export { Product, DVD, Book };
  