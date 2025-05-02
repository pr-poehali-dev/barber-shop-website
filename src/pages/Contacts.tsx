
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react";
import Icon from "@/components/ui/icon";

// Схема валидации формы
const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов" }),
  email: z.string().email({ message: "Введите корректный email" }),
  phone: z.string().min(6, { message: "Введите корректный номер телефона" }),
  message: z.string().min(10, { message: "Сообщение должно содержать не менее 10 символов" }),
});

const Contacts = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Инициализация формы
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setIsSubmitted(true);
    // В реальном приложении здесь был бы запрос к API
    setTimeout(() => {
      form.reset();
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero секция */}
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Мы всегда рады помочь вам и ответить на любые вопросы. Свяжитесь с нами удобным для вас способом.
            </p>
          </div>
        </section>

        {/* Контактная информация и форма */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Контактная информация */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Наши контакты</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Адрес</h3>
                      <p className="text-muted-foreground">ул. Примерная, 123, Москва, 123456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Телефон</h3>
                      <p className="text-muted-foreground">+7 (123) 456-78-90</p>
                      <p className="text-muted-foreground">+7 (987) 654-32-10</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Email</h3>
                      <p className="text-muted-foreground">info@stilsalon.ru</p>
                      <p className="text-muted-foreground">support@stilsalon.ru</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Часы работы</h3>
                      <p className="text-muted-foreground">Пн-Пт: 9:00 - 20:00</p>
                      <p className="text-muted-foreground">Сб-Вс: 10:00 - 18:00</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-4">Мы в социальных сетях</h3>
                  <div className="flex space-x-4">
                    {["Instagram", "Facebook", "Twitter", "Youtube"].map((network) => (
                      <a 
                        key={network} 
                        href="#" 
                        className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      >
                        <Icon name={network} className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Форма обратной связи */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Связаться с нами</CardTitle>
                    <CardDescription>
                      Заполните форму, и мы свяжемся с вами в ближайшее время
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="bg-green-50 p-6 rounded-lg text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-green-800 mb-2">Сообщение отправлено!</h3>
                        <p className="text-green-700">
                          Спасибо за обращение. Мы свяжемся с вами в ближайшее время.
                        </p>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Имя</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ваше имя" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="example@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Телефон</FormLabel>
                                <FormControl>
                                  <Input placeholder="+7 (___) ___-__-__" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Сообщение</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Опишите ваш вопрос или запрос..." 
                                    rows={5} 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" className="w-full">Отправить сообщение</Button>
                        </form>
                      </Form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Карта */}
        <section className="py-8 pb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Как нас найти</h2>
            <div className="h-96 bg-muted rounded-lg overflow-hidden">
              {/* В реальном проекте здесь была бы карта Google Maps или Яндекс.Карты */}
              <div className="w-full h-full flex items-center justify-center bg-muted/50">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-xl font-medium">Интерактивная карта</p>
                  <p className="text-muted-foreground">ул. Примерная, 123, Москва</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;
