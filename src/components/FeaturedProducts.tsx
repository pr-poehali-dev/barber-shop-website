import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Шампунь для сухих волос",
    price: "1200 ₽",
    image: "https://images.unsplash.com/photo-1619021015210-3a39c84141ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Увлажняющая маска",
    price: "1800 ₽",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Питательное масло",
    price: "1500 ₽",
    image: "https://images.unsplash.com/photo-1590393802688-ab3fd7c152d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Популярные товары</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            В нашем магазине представлена профессиональная косметика для волос и кожи 
            от ведущих мировых брендов. Качество, проверенное экспертами.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover-scale">
              <div className="h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-lg">{product.price}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link to={`/products/${product.id}`}>
                  <Button variant="outline">Подробнее</Button>
                </Link>
                <Button>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/products">
            <Button>Все товары</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
