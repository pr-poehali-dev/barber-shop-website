
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Calendar, ShoppingBag, CreditCard, Printer } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  
  // В реальном приложении эти данные будут получены из состояния или API
  const orderData = {
    id: Math.floor(10000 + Math.random() * 90000),
    date: new Date().toLocaleDateString("ru-RU"),
    paymentMethod: "Банковская карта",
    items: [
      { name: "Женская стрижка", price: 2000, type: "service" },
      { name: "Маска для волос", price: 1800, quantity: 1, type: "product" },
    ],
    shipping: 300,
    total: 4100,
    deliveryAddress: "г. Москва, ул. Примерная, д. 123, кв. 45",
    estimatedDelivery: "3-5 рабочих дней"
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-16 px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl">Заказ оформлен!</CardTitle>
              <p className="text-muted-foreground mt-2">
                Ваш заказ #{orderData.id} был успешно оплачен и принят к обработке
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-primary/5 p-5 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Детали заказа</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Дата заказа</p>
                          <p className="font-medium">{orderData.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <CreditCard className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Способ оплаты</p>
                          <p className="font-medium">{orderData.paymentMethod}</p>
                        </div>
                      </div>
                    </div>
                    
                    {orderData.items.some(item => item.type === "product") && (
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <ShoppingBag className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Доставка</p>
                          <p className="font-medium">{orderData.deliveryAddress}</p>
                          <p className="text-sm text-muted-foreground">
                            Ожидаемая доставка: {orderData.estimatedDelivery}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Заказанные товары и услуги</h3>
                  <div className="space-y-3">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">
                            {item.name}
                            {item.quantity && item.quantity > 1 && ` x${item.quantity}`}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.type === "service" ? "Услуга" : "Товар"}
                          </p>
                        </div>
                        <p className="font-semibold">{item.price * (item.quantity || 1)} ₽</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Сумма</span>
                      <span>{orderData.total - orderData.shipping} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Доставка</span>
                      <span>{orderData.shipping} ₽</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Итого</span>
                      <span>{orderData.total} ₽</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Информация о заказе</strong>
                  </p>
                  <p className="text-blue-700 text-sm mt-1">
                    Мы отправили подтверждение заказа на вашу электронную почту. Вы можете отслеживать 
                    статус заказа в своем личном кабинете.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row gap-3">
              <Button variant="outline" className="w-full md:w-auto" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Распечатать чек
              </Button>
              <Link to="/" className="w-full md:w-auto">
                <Button variant="outline" className="w-full">
                  Вернуться на главную
                </Button>
              </Link>
              <Link to="/products" className="w-full md:w-auto">
                <Button className="w-full">
                  Продолжить покупки
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
