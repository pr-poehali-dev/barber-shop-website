
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown, 
  Bell,
  UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface SidebarItem {
  icon: string;
  label: string;
  path: string;
  notifications?: number;
}

const sidebarItems: SidebarItem[] = [
  {
    icon: "LayoutDashboard",
    label: "Панель управления",
    path: "/admin",
  },
  {
    icon: "ShoppingBag",
    label: "Заказы",
    path: "/admin/orders",
    notifications: 3,
  },
  {
    icon: "Package",
    label: "Товары",
    path: "/admin/products",
  },
  {
    icon: "Calendar",
    label: "Записи",
    path: "/admin/appointments",
    notifications: 5,
  },
  {
    icon: "Users",
    label: "Клиенты",
    path: "/admin/clients",
  },
  {
    icon: "Settings",
    label: "Настройки",
    path: "/admin/settings",
  },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    // Здесь будет логика выхода из админ-панели
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Мобильная версия сайдбара */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4 z-50">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-sidebar border-sidebar-border w-72">
          <MobileSidebar 
            items={sidebarItems} 
            onClose={() => setIsSidebarOpen(false)} 
            isActive={isActive}
          />
        </SheetContent>
      </Sheet>
      
      {/* Десктопная версия сайдбара */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border shrink-0">
        <DesktopSidebar items={sidebarItems} isActive={isActive} />
      </aside>

      {/* Основной контент */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Верхняя панель навигации */}
        <header className="h-16 border-b flex items-center justify-between px-4 lg:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu />
          </Button>
          
          <div className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Уведомления</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  {[1, 2, 3].map((_, i) => (
                    <DropdownMenuItem key={i} className="cursor-pointer py-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Новая запись на услугу</p>
                          <p className="text-xs text-muted-foreground">
                            Клиент Анна С. записалась на стрижку на 15:30
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">2 мин назад</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer justify-center">
                  <span className="text-primary text-sm">Просмотреть все</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 flex items-center gap-2 pl-2 pr-1">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                      alt="Аватар" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="hidden md:inline">Администратор</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Профиль</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Настройки</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Основное содержимое */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// Мобильный сайдбар
const MobileSidebar = ({ 
  items, 
  onClose, 
  isActive 
}: { 
  items: SidebarItem[]; 
  onClose: () => void; 
  isActive: (path: string) => boolean; 
}) => {
  return (
    <div className="flex flex-col h-full text-sidebar-foreground">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-sidebar-primary">Стиль</span>
          <span className="text-salon-accent font-bold text-xl">Салон</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <Separator className="bg-sidebar-border" />
      
      <div className="flex-1 py-4 px-2">
        <nav className="space-y-1">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors hover:bg-sidebar-accent",
                isActive(item.path) ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
              )}
              onClick={onClose}
            >
              <Icon name={item.icon} className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
              {item.notifications && (
                <span className="ml-auto bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {item.notifications}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start text-sidebar-foreground"
          onClick={() => {
            onClose();
            window.location.href = "/";
          }}
        >
          <Icon name="LogOut" className="h-5 w-5 mr-2" />
          Вернуться на сайт
        </Button>
      </div>
    </div>
  );
};

// Десктопный сайдбар
const DesktopSidebar = ({ 
  items, 
  isActive 
}: { 
  items: SidebarItem[]; 
  isActive: (path: string) => boolean; 
}) => {
  return (
    <div className="flex flex-col h-full text-sidebar-foreground">
      <div className="p-6">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-sidebar-primary">Стиль</span>
          <span className="text-salon-accent font-bold text-xl">Салон</span>
        </Link>
      </div>
      
      <div className="flex-1 py-6 px-4">
        <nav className="space-y-1">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors hover:bg-sidebar-accent",
                isActive(item.path) ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
              )}
            >
              <Icon name={item.icon} className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
              {item.notifications && (
                <span className="ml-auto bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {item.notifications}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-6 mt-auto">
        <Button 
          variant="outline" 
          className="w-full justify-start text-sidebar-foreground"
          onClick={() => window.location.href = "/"}
        >
          <Icon name="LogOut" className="h-5 w-5 mr-2" />
          Вернуться на сайт
        </Button>
      </div>
    </div>
  );
};

export default AdminLayout;
