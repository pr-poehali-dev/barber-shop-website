
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { 
  ShoppingBag, 
  Users, 
  Calendar, 
  Settings, 
  BarChart, 
  Package, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Определение пунктов меню
const menuItems = [
  { 
    icon: BarChart, 
    label: "Дашборд", 
    path: "/admin" 
  },
  { 
    icon: Package, 
    label: "Товары", 
    path: "/admin/products" 
  },
  { 
    icon: ShoppingBag, 
    label: "Заказы", 
    path: "/admin/orders" 
  },
  { 
    icon: Calendar, 
    label: "Записи", 
    path: "/admin/appointments" 
  },
  { 
    icon: Users, 
    label: "Клиенты", 
    path: "/admin/clients" 
  },
  { 
    icon: Settings, 
    label: "Настройки", 
    path: "/admin/settings" 
  }
];

const AdminLayout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const currentPage = menuItems.find(item => 
    location.pathname === item.path || 
    (item.path !== "/admin" && location.pathname.startsWith(item.path))
  );

  const MenuItem = ({ icon: IconComponent, label, path }: {
    icon: typeof ShoppingBag;
    label: string;
    path: string;
  }) => {
    const isActive = 
      location.pathname === path || 
      (path !== "/admin" && location.pathname.startsWith(path));
    
    return (
      <Link 
        to={path}
        onClick={() => setOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-md w-full transition-colors ${
          isActive 
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent"
        }`}
      >
        <IconComponent size={18} />
        <span>{label}</span>
      </Link>
    );
  };

  // Компонент для десктоп-сайдбара
  const DesktopSidebar = () => (
    <aside className="hidden md:flex flex-col bg-sidebar w-64 border-r border-sidebar-border h-screen sticky top-0">
      <div className="p-6">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-primary">Стиль</span>
          <span className="text-accent font-bold text-xl">Салон</span>
          <span className="text-xs ml-2 text-muted-foreground">Админ</span>
        </Link>
      </div>
      
      <Separator className="bg-sidebar-border" />
      
      <nav className="flex-1 p-4 space-y-1 overflow-auto">
        {menuItems.map((item) => (
          <MenuItem 
            key={item.path} 
            icon={item.icon} 
            label={item.label} 
            path={item.path} 
          />
        ))}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent gap-3">
          <LogOut size={18} />
          <span>Выйти</span>
        </Button>
      </div>
    </aside>
  );

  // Компонент для мобильного сайдбара
  const MobileSidebar = () => (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden ml-2">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-sidebar">
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
            <span className="text-xl font-bold text-primary">Стиль</span>
            <span className="text-accent font-bold text-xl">Салон</span>
            <span className="text-xs ml-2 text-muted-foreground">Админ</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X size={18} />
          </Button>
        </div>
        
        <Separator className="bg-sidebar-border" />
        
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <MenuItem 
              key={item.path} 
              icon={item.icon} 
              label={item.label} 
              path={item.path} 
            />
          ))}
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent gap-3 mt-4"
          >
            <LogOut size={18} />
            <span>Выйти</span>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="flex min-h-screen">
      <DesktopSidebar />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-background border-b h-16 flex items-center px-4">
          <MobileSidebar />
          
          <div className="md:ml-6 ml-4 font-medium">
            {currentPage?.label || "Панель управления"}
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              На сайт
            </Link>
          </div>
        </header>
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
