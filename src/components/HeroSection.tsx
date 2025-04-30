import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-salon-purple/10 to-salon-light min-h-[600px] flex items-center">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 px-4">
        <div className="flex flex-col justify-center space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-salon-dark">
            Преобразите свой образ с <span className="text-primary">СтильСалон</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-md">
            Профессиональные услуги парикмахеров, косметологов и мастеров маникюра. Эксклюзивные продукты для ухода за волосами и кожей.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/services">
              <Button size="lg" className="hover-scale">
                Записаться сейчас
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="lg" className="hover-scale">
                Смотреть товары
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center rounded-lg shadow-xl"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
