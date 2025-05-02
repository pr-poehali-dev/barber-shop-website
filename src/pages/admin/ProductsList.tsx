
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Package, 
  Search, 
  MoreHorizontal, 
  PenLine, 
  Trash2, 
  Copy, 
  Eye,
  Plus
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Примерные данные для списка товаров
const products = [
  {
    id: 1,
    name: "Шампунь для сухих волос",
    price: 1200,
    category: "Шампуни",
    stock: 23,
    image: "https://images.unsplash.com/photo-1619021015210-3a39c84141ce?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 2,
    name: "Увлажняющая маска",
    price: 1800,
    category: "Маски",
    stock: 15,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 3,
    name: "Питательное масло",
    price: 1500,
    category: "Масла",
    stock: 18,
    image: "https://images.unsplash.com/photo-1590393802688-ab3fd7c152d8?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 4,
    name: "Кондиционер для окрашенных волос",
    price: 1350,
    category: "Кондиционеры",
    stock: 8,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 5,
    name: "Термозащитный спрей",
    price: 980,
    category: "Стайлинг",
    stock: 31,
    image: "https://images.unsplash.com/photo-1559529551-6d718564cd7d?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 6,
    name: "Сыворотка для секущихся кончиков",
    price: 1750,
    category: "Сыворотки",
    stock: 4,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=100&q=80"
  },
];

const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Товары</h2>
          <p className="text-muted-foreground">
            Управление каталогом товаров
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Добавить товар
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск товаров..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="hidden md:flex items-center gap-2 ml-4">
          <Button variant="outline" size="sm">Фильтры</Button>
          <Button variant="outline" size="sm">Экспорт</Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Товар</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead className="text-right">Цена</TableHead>
              <TableHead className="text-center">Наличие</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  <Package className="mx-auto h-8 w-8 mb-2" />
                  <p>Товары не найдены</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 rounded">
                        <img src={product.image} alt={product.name} />
                      </Avatar>
                      <div className="font-medium">{product.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">₽{product.price}</TableCell>
                  <TableCell className="text-center">
                    <span className={`text-sm rounded-full px-2 py-1 ${
                      product.stock > 10 
                        ? "bg-green-100 text-green-700" 
                        : product.stock > 5 
                        ? "bg-yellow-100 text-yellow-700" 
                        : "bg-red-100 text-red-700"
                    }`}>
                      {product.stock} шт.
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Открыть меню</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/products/${product.id}`} className="flex items-center cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Просмотр</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/products/${product.id}`} className="flex items-center cursor-pointer">
                            <PenLine className="mr-2 h-4 w-4" />
                            <span>Редактировать</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center cursor-pointer">
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Дублировать</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center text-destructive cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Удалить</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsList;
