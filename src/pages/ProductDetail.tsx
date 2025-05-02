
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { productData } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart, Share2, ArrowLeft, Check, Star } from "lucide-react";
import Icon from "@/components/ui/icon";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  
  // Находим продукт по id
  const product = productData.find(p => p.id === Number(id));
  
  // Если продукт не найден
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-16 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
            <p className="mb-8">К сожалению, запрашиваемый товар не существует.</p>
            <Link to="/products">
              <Button>Вернуться в каталог</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Находим связанные продукты
  const relatedProducts = product.relatedProducts 
    ? productData.filter(p => product.relatedProducts?.includes(p.id))
    : productData.filter(p => 
        p.id !== product.id && 
        p.category === product.category
      ).slice(0, 3);
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleAddToCart = () => {
    // Здесь будет логика добавления в корзину
    console.log(`Добавлен товар с ID: ${product.id}, количество: ${quantity}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4">
          <Link to="/products" className="inline-flex items-center text-sm text-primary mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Назад в каталог
          </Link>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Галерея изображений */}
            <div>
              {product.gallery && product.gallery.length > 1 ? (
                <Carousel className="w-full">
                  <CarouselContent>
                    {product.gallery.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <img 
                            src={image} 
                            alt={`${product.name} - изображение ${index + 1}`} 
                            className="w-full h-96 object-cover rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              ) : (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-96 object-cover rounded-lg"
                />
              )}
            </div>
            
            {/* Информация о товаре */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.popularity)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.popularity.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground mx-2">|</span>
                <span className="text-sm text-muted-foreground">Бренд: {product.brand}</span>
              </div>
              
              <p className="text-lg font-semibold mb-1">{product.price} ₽</p>
              {product.discountPrice && (
                <p className="text-sm text-muted-foreground line-through mb-4">
                  {product.discountPrice} ₽
                </p>
              )}
              
              <div className="bg-primary/5 rounded-lg p-4 mb-6 flex items-center">
                <div className="w-2 h-8 bg-primary rounded-full mr-3"></div>
                <div>
                  <span className="font-medium">Наличие: </span>
                  {product.inStock ? (
                    <span className="text-green-600 flex items-center">
                      <Check className="h-4 w-4 mr-1" /> В наличии
                    </span>
                  ) : (
                    <span className="text-red-500">Нет в наличии</span>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                {product.shortDescription || product.description.slice(0, 150) + "..."}
              </p>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Icon name="Minus" className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleIncreaseQuantity}
                  >
                    <Icon name="Plus" className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  className="flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  В корзину
                </Button>
              </div>
              
              {product.attributes && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Характеристики:</h3>
                  <div className="space-y-2">
                    {Object.entries(product.attributes).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="text-sm text-muted-foreground w-1/3">{key}:</span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Вкладки с дополнительной информацией */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="mb-4">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="characteristics">Характеристики</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="p-4 bg-muted/20 rounded-lg">
              <p>{product.description}</p>
            </TabsContent>
            
            <TabsContent value="characteristics" className="p-4 bg-muted/20 rounded-lg">
              {product.attributes ? (
                <div className="space-y-2">
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 py-2 border-b last:border-0">
                      <span className="font-medium">{key}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Характеристики отсутствуют</p>
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="p-4 bg-muted/20 rounded-lg">
              <p>Отзывы временно недоступны</p>
            </TabsContent>
          </Tabs>
          
          {/* Связанные товары */}
          {relatedProducts.length > 0 && (
            <div>
              <Separator className="mb-8" />
              <h2 className="text-2xl font-bold mb-6">Вам может понравиться</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="overflow-hidden hover-scale">
                    <Link to={`/products/${relatedProduct.id}`}>
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={relatedProduct.image} 
                          alt={relatedProduct.name} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <Link to={`/products/${relatedProduct.id}`}>
                        <h3 className="font-medium hover:text-primary">{relatedProduct.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">{relatedProduct.brand}</p>
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">{relatedProduct.price} ₽</p>
                        <Button size="sm" variant="outline" onClick={() => console.log(`Добавлен товар: ${relatedProduct.id}`)}>
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
