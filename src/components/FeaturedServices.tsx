import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors, Sparkles, Paintbrush } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Стрижка и укладка",
    icon: Scissors,
    description: "Профессиональные стрижки для любого типа волос, стильные укладки на каждый день или для особых случаев.",
    price: "от 1500 ₽"
  },
  {
    id: 2,
    title: "Окрашивание",
    icon: Paintbrush,
    description: "Широкий спектр услуг окрашивания – от классического тонирования до креативных техник и трендовых оттенков.",
    price: "от 3500 ₽"
  },
  {
    id: 3,
    title: "СПА-процедуры",
    icon: Sparkles,
    description: "Восстанавливающие процедуры для волос с использованием премиальных средств, глубокое питание и увлажнение.",
    price: "от 2800 ₽"
  }
];

const FeaturedServices = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Наши услуги</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Опытные специалисты нашего салона предлагают широкий спектр услуг,
            используя только профессиональные материалы и косметику высшего качества.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="hover-scale">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{service.description}</p>
              </CardContent>
              <CardFooter>
                <Link to="/services" className="w-full">
                  <Button variant="outline" className="w-full">Подробнее</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/services">
            <Button>Все услуги</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
