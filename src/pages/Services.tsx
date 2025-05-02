
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { BookingForm } from "@/components/BookingForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { servicesData } from "@/data/services";

// Типы услуг
const categories = [
  { id: "haircuts", name: "Стрижки и укладки" },
  { id: "coloring", name: "Окрашивание" },
  { id: "treatments", name: "Уход и лечение" },
  { id: "styling", name: "Стайлинг" },
  { id: "spa", name: "SPA-процедуры" }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero секция */}
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Профессиональные услуги от опытных мастеров нашего салона.
              Запишитесь онлайн и получите скидку 10% на первое посещение.
            </p>
          </div>
        </section>
        
        {/* Секция услуг */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue={categories[0].id} className="space-y-8">
              <div className="flex justify-center">
                <TabsList className="mb-8">
                  {categories.map(category => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {categories.map(category => (
                <TabsContent key={category.id} value={category.id} className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">{category.name}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Выберите услугу и запишитесь к нашим профессиональным мастерам
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData
                      .filter(service => service.category === category.id)
                      .map(service => (
                        <Card key={service.id} className="overflow-hidden hover-scale">
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={service.image} 
                              alt={service.name} 
                              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                            />
                          </div>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <CardTitle>{service.name}</CardTitle>
                              {service.popular && (
                                <Badge className="bg-accent">Популярная</Badge>
                              )}
                            </div>
                            <CardDescription>{service.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Длительность</p>
                                <div className="flex items-center">
                                  <Icon name="Clock" className="h-4 w-4 mr-1 text-primary" />
                                  <span>{service.duration} мин.</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Стоимость</p>
                                <p className="font-bold text-lg">{service.price} ₽</p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  className="w-full"
                                  onClick={() => setSelectedService(service)}
                                >
                                  Записаться
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                {selectedService && <BookingForm service={selectedService} />}
                              </DialogContent>
                            </Dialog>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        
        {/* Блок преимуществ */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Почему выбирают нас</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "Award",
                  title: "Опытные мастера",
                  description: "Наши специалисты имеют многолетний опыт работы и регулярно повышают квалификацию"
                },
                {
                  icon: "Gem",
                  title: "Премиум продукты",
                  description: "Мы используем только профессиональную косметику высшего качества от ведущих брендов"
                },
                {
                  icon: "Clock",
                  title: "Удобная запись",
                  description: "Онлайн-бронирование услуг в любое время с возможностью выбора мастера"
                }
              ].map((item, index) => (
                <div key={index} className="bg-background p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name={item.icon} className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Часто задаваемые вопросы */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Часто задаваемые вопросы</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  question: "Как заранее записаться на услугу?",
                  answer: "Запись доступна через наш сайт, по телефону или через администратора салона. Рекомендуем бронировать услуги за 2-3 дня."
                },
                {
                  question: "Что делать, если я опаздываю?",
                  answer: "Пожалуйста, сообщите нам, если вы опаздываете. Мы постараемся вас принять, но если опоздание превышает 15 минут, может потребоваться перенос записи."
                },
                {
                  question: "Можно ли отменить запись?",
                  answer: "Да, вы можете отменить запись не позднее чем за 12 часов до назначенного времени без штрафа."
                },
                {
                  question: "Как выбрать подходящую услугу?",
                  answer: "Вы можете проконсультироваться с нашими специалистами, которые помогут подобрать оптимальные услуги исходя из ваших пожеланий и особенностей."
                }
              ].map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Призыв к действию */}
        <section className="py-16 bg-salon-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Готовы преобразиться?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Запишитесь на консультацию прямо сейчас и получите скидку 10% на первое посещение
            </p>
            <Button size="lg" variant="default">
              Записаться онлайн
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
