
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Calendar, Clock, User, Phone } from "lucide-react";

const BookingSuccess = () => {
  // В реальном приложении эти данные пришли бы из состояния приложения
  // или из параметров URL после создания записи
  const bookingData = {
    id: Math.floor(1000 + Math.random() * 9000),
    service: "Женская стрижка",
    master: "Елена Петрова",
    date: "5 мая 2025",
    time: "14:30",
    duration: 60,
    price: 2000,
    name: "Анна Смирнова",
    phone: "+7 (910) 123-45-67"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-16 px-4">
          <Card className="max-w-xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl">Запись подтверждена!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-primary/5 p-5 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Детали записи</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Дата</p>
                          <p className="font-medium">{bookingData.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Время</p>
                          <p className="font-medium">{bookingData.time}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Мастер</p>
                        <p className="font-medium">{bookingData.master}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Услуга</p>
                      <div className="flex justify-between">
                        <p className="font-medium">{bookingData.service}</p>
                        <p className="font-semibold">{bookingData.price} ₽</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Продолжительность: {bookingData.duration} мин
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Контактная информация</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{bookingData.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{bookingData.phone}</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 text-sm">
                    <strong>Номер вашей записи: #{bookingData.id}</strong>
                  </p>
                  <p className="text-green-700 text-sm mt-1">
                    Мы отправили подтверждение на ваш номер телефона. Пожалуйста, приходите 
                    за 5-10 минут до начала записи.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row gap-3">
              <Link to="/" className="w-full">
                <Button variant="outline" className="w-full">
                  Вернуться на главную
                </Button>
              </Link>
              <Link to="/services" className="w-full">
                <Button className="w-full">
                  Записаться на другую услугу
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

export default BookingSuccess;
