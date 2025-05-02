
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  Calendar, 
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Панель управления</h2>
          <p className="text-muted-foreground">
            Обзор работы вашего салона
          </p>
        </div>
        <div className="flex space-x-4">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Новая запись
          </Button>
          <Button variant="outline">
            <Package className="mr-2 h-4 w-4" />
            Добавить товар
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего продаж</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₽124,550</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +12.5% с предыдущего месяца
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Новые клиенты</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+38</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +18.2% с предыдущего месяца
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Заказов</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                -2.5% с предыдущего месяца
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Записей</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +8.3% с предыдущего месяца
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          <TabsTrigger value="reports">Отчеты</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Обзор продаж</CardTitle>
                <CardDescription>
                  Продажи за текущий месяц по сравнению с предыдущим.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
                <TrendingUp className="mr-2 h-5 w-5" />
                График продаж
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Последние заказы</CardTitle>
                <CardDescription>
                  Последние 5 заказов в вашем магазине.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(order => (
                    <div key={order} className="flex items-center">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Package className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Заказ #{Math.floor(1000 + Math.random() * 9000)}</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.floor(1 + Math.random() * 5)} товаров • ₽{Math.floor(1000 + Math.random() * 9000)}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {`${Math.floor(1 + Math.random() * 28)}.05.2025`}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="h-[400px] flex items-center justify-center text-muted-foreground">
          Аналитические данные
        </TabsContent>
        <TabsContent value="reports" className="h-[400px] flex items-center justify-center text-muted-foreground">
          Отчеты и статистика
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
