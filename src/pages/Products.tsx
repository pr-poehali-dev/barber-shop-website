
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Search, SlidersHorizontal } from "lucide-react";
import { productData } from "@/data/products";

const Products = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 6000]);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  
  // Получить все категории из данных
  const categories = [...new Set(productData.map(product => product.category))];
  
  // Фильтрация продуктов
  const filteredProducts = productData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = categoryFilter === "" || product.category === categoryFilter;
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  const handleAddToCart = (productId: number) => {
    // Здесь будет логика добавления в корзину
    console.log(`Добавлен товар с ID: ${productId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-primary/10 py-8">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-2">Каталог товаров</h1>
            <p className="text-muted-foreground">Профессиональные средства для волос и ухода за собой</p>
          </div>
        </div>
        
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Фильтры для мобильных устройств */}
            <div className="md:hidden w-full mb-4">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Фильтры
              </Button>
            </div>
            
            {/* Сайдбар с фильтрами */}
            <div className="hidden md:block w-full md:w-1/4 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Фильтры</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Поиск</label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Найти товар..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Категория</label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все категории" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Все категории</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Цена</label>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 6000]}
                        max={6000}
                        step={100}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="my-6"
                      />
                      <div className="flex justify-between text-sm">
                        <span>{priceRange[0]} ₽</span>
                        <span>{priceRange[1]} ₽</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Популярные категории</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge 
                      key={category}
                      variant={categoryFilter === category ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setCategoryFilter(category === categoryFilter ? "" : category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Список товаров */}
            <div className="w-full md:w-3/4">
              <div className="flex flex-wrap justify-between items-center mb-6">
                <p className="text-muted-foreground">Найдено товаров: {filteredProducts.length}</p>
                <Select defaultValue="popularity">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Сортировать по" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">По популярности</SelectItem>
                    <SelectItem value="price_asc">Цена: по возрастанию</SelectItem>
                    <SelectItem value="price_desc">Цена: по убыванию</SelectItem>
                    <SelectItem value="name">По названию</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">Товары не найдены</h3>
                  <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover-scale">
                      <div 
                        className="h-64 overflow-hidden cursor-pointer"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 
                          className="font-medium text-lg mb-1 hover:text-primary cursor-pointer"
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                        <p className="font-semibold">{product.price} ₽</p>
                      </CardContent>
                      <CardFooter className="px-4 pt-0 pb-4">
                        <Button 
                          className="w-full"
                          onClick={() => handleAddToCart(product.id)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
