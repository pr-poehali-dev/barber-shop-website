
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero секция */}
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">О салоне СтильСалон</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Мы создаем красоту, подчеркиваем индивидуальность и помогаем вам выглядеть великолепно каждый день
            </p>
          </div>
        </section>

        {/* История салона */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Наша история</h2>
                <p className="text-lg mb-4">
                  СтильСалон был основан в 2010 году группой энтузиастов, объединенных общей целью — создать пространство, где каждый клиент получит не только профессиональный уход, но и персональный подход к своей красоте.
                </p>
                <p className="text-lg mb-4">
                  За годы работы мы выросли из небольшой студии в полноценный салон красоты с широким спектром услуг и собственной линейкой профессиональных средств для ухода за волосами.
                </p>
                <p className="text-lg">
                  Сегодня СтильСалон — это команда высококвалифицированных специалистов, современное оборудование и передовые технологии в сфере красоты и ухода.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="История салона" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Наши ценности */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Наши ценности</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Забота о клиентах</h3>
                <p>
                  Мы создаем атмосферу комфорта и внимательно относимся к пожеланиям каждого клиента, предлагая индивидуальные решения.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Medal" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Качество</h3>
                <p>
                  Мы используем только премиальные продукты и постоянно совершенствуем наши навыки, чтобы предоставлять услуги высочайшего уровня.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Sparkles" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Инновации</h3>
                <p>
                  Мы следим за трендами и внедряем передовые технологии, чтобы предлагать нашим клиентам самые современные решения.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Наша команда */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Наша команда</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  name: "Елена Петрова",
                  role: "Стилист-парикмахер",
                  photo: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Александр Иванов",
                  role: "Колорист",
                  photo: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Мария Сидорова",
                  role: "Мастер маникюра",
                  photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Дмитрий Козлов",
                  role: "Косметолог",
                  photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                }
              ].map((member, index) => (
                <div key={index} className="text-center hover-scale">
                  <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Наши партнеры */}
        <section className="py-16 bg-salon-dark text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Наши партнеры</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="bg-white/10 p-6 rounded-lg w-40 h-20 flex items-center justify-center">
                  <span className="text-lg font-semibold">Бренд {index + 1}</span>
                </div>
              ))}
            </div>
            <Separator className="bg-white/20" />
            <div className="text-center mt-12">
              <h3 className="text-2xl font-semibold mb-6">Готовы преобразиться?</h3>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Запишитесь на консультацию, и наши специалисты помогут вам выбрать идеальные услуги и продукты для ваших индивидуальных потребностей.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/services">
                  <Button size="lg" variant="default">
                    Записаться сейчас
                  </Button>
                </Link>
                <Link to="/contacts">
                  <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-salon-dark">
                    Связаться с нами
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
