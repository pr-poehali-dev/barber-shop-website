import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-salon-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center mb-6">
              <span className="text-2xl font-bold text-primary">Стиль</span>
              <span className="text-accent font-bold text-2xl">Салон</span>
            </Link>
            <p className="text-gray-300 mb-6">
              Профессиональный уход за волосами, лицом и телом. 
              Мы работаем, чтобы вы выглядели великолепно.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Навигация</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">Главная</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary transition-colors">Услуги</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-primary transition-colors">Магазин</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors">О нас</Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-300 hover:text-primary transition-colors">Контакты</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <span className="text-gray-300">ул. Примерная, 123, Москва</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span className="text-gray-300">+7 (123) 456-78-90</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span className="text-gray-300">info@stilsalon.ru</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 mt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} СтильСалон. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
