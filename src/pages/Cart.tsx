
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus,
  CreditCard
} from "lucide-react";
import { Product } from "@/types/product";
import { productData } from "@/data/products";

// Интерфейс для элемента корзины
interface CartItem {
  product: Product;
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  // В реальном приложении эти данные будут храниться в Redux или Context
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: productData[0], quantity: 2 },
    { product: productData[2], quantity: 1 },
  ]);
  
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  
  // Расчет суммы корзины
  const subtotal = cartItems.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0);
  
  // Скидка (в реальном приложении была бы логика проверки промокода)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  
  // Доставка (просто для примера)
  const shipping = subtotal > 5000 ? 0 : 500;
  
  // Итого
  const total = subtotal - discount + shipping;
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => prev.map(item => 
      item.product.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };
  
  const handleRemoveItem = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };
  
  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "скидка10") {
      setPromoApplied(true);
    } else {
      alert("Недействительный промокод");
    }
  };
  
  const handleCheckout = () => {
    // В реальном приложении здесь можно было бы сохранить данные корзины в Redux/Context
    navigate("/checkout");
  };
  
  // Если корзина пуста
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-16 px-4">
          <div className="text-center max-w-md mx-auto">
            <ShoppingCart className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Ваша корзина пуста</h1>
            <p className="text-muted-foreground mb-8">
              Добавьте товары в корзину, чтобы продолжить покупки
            </p>
            <Link to="/products">
              <Button size="lg">Перейти в каталог</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Корзина</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Список товаров в корзине */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Товары в корзине</CardTitle>
                  <CardDescription>
                    {cartItems.length} {cartItems.length === 1 ? "товар" : 
                      cartItems.length < 5 ? "товара" : "товаров"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">Фото</TableHead>
                          <TableHead>Товар</TableHead>
                          <TableHead>Цена</TableHead>
                          <TableHead>Количество</TableHead>
                          <TableHead className="text-right">Сумма</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item.product.id}>
                            <TableCell>
                              <div className="w-16 h-16 rounded overflow-hidden">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <Link to={`/products/${item.product.id}`} className="font-medium hover:text-primary">
                                {item.product.name}
                              </Link>
                              <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                            </TableCell>
                            <TableCell>{item.product.price} ₽</TableCell>
                            <TableCell>
                              <div className="flex items-center border rounded-md w-fit">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {item.product.price * item.quantity} ₽
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleRemoveItem(item.product.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link to="/products">
                    <Button variant="outline">Продолжить покупки</Button>
                  </Link>
                  <Button variant="destructive" onClick={() => setCartItems([])}>
                    Очистить корзину
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Итоговая сумма и оформление заказа */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Итого</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Сумма товаров</span>
                    <span>{subtotal} ₽</span>
                  </div>
                  
                  {promoApplied && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Скидка (10%)</span>
                      <span>- {discount} ₽</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>{shipping > 0 ? `${shipping} ₽` : "Бесплатно"}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-medium text-lg">
                    <span>Итого к оплате</span>
                    <span>{total} ₽</span>
                  </div>
                  
                  <div className="pt-4">
                    <label className="text-sm font-medium mb-2 block">Промокод</label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Введите промокод" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                      />
                      <Button 
                        variant="outline"
                        onClick={handleApplyPromo}
                        disabled={promoApplied || !promoCode}
                      >
                        Применить
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-xs text-green-600 mt-1">Промокод применен! Скидка 10%</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Оформить заказ
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
