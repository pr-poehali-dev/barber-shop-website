
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  ImagePlus,
  Save,
  Trash2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Примерные категории
const categories = [
  "Шампуни",
  "Кондиционеры",
  "Маски",
  "Масла",
  "Сыворотки",
  "Стайлинг",
  "Краски",
  "Аксессуары"
];

// Шаблонные данные товара для нового товара и редактирования
const productTemplate = {
  id: 0,
  name: "",
  price: "",
  description: "",
  category: "",
  stock: "",
  images: [] as string[],
  featured: false,
  details: {
    volume: "",
    brand: "",
    origin: "",
    ingredients: ""
  }
};

// Загрузить товар по ID для редактирования
const getProductById = (id: string) => {
  const productId = parseInt(id, 10);
  
  if (productId === 1) {
    return {
      id: 1,
      name: "Шампунь для сухих волос",
      price: "1200",
      description: "Профессиональный шампунь, восстанавливающий сухие и поврежденные волосы. Подходит для ежедневного использования.",
      category: "Шампуни",
      stock: "23",
      images: ["https://images.unsplash.com/photo-1619021015210-3a39c84141ce?auto=format&fit=crop&w=300&q=80"],
      featured: true,
      details: {
        volume: "250 мл",
        brand: "LuxuryHair",
        origin: "Франция",
        ingredients: "Вода, глицерин, масло арганы..."
      }
    };
  }
  
  return {...productTemplate};
};

const ProductEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Определяем, новый товар или редактирование существующего
  const isNewProduct = id === "new";
  
  const [product, setProduct] = useState(
    isNewProduct ? {...productTemplate} : getProductById(id || "0")
  );
  
  const [images, setImages] = useState<string[]>(product.images);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value
      }
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageUpload = () => {
    // В реальном приложении здесь будет загрузка изображения на сервер
    // Сейчас добавим случайное изображение из Unsplash для демонстрации
    const demoImages = [
      "https://images.unsplash.com/photo-1619021015210-3a39c84141ce?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1590393802688-ab3fd7c152d8?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=300&q=80"
    ];
    
    const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
    setImages(prev => [...prev, randomImage]);
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSave = () => {
    // Сохраняем изображения в объект товара
    const updatedProduct = {
      ...product,
      images: images
    };
    
    // Здесь был бы код для сохранения товара на сервере
    console.log("Сохранение товара:", updatedProduct);
    
    // Возвращаемся к списку товаров
    navigate("/admin/products");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate("/admin/products")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {isNewProduct ? "Новый товар" : "Редактирование товара"}
            </h2>
            <p className="text-muted-foreground">
              {isNewProduct 
                ? "Создание нового товара в каталоге" 
                : `Редактирование товара #${id}`}
            </p>
          </div>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Сохранить
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название товара</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={product.name} 
                  onChange={handleChange} 
                  placeholder="Введите название товара" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={product.description} 
                  onChange={handleChange}
                  placeholder="Детальное описание товара"
                  rows={5}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Категория</Label>
                  <Select 
                    value={product.category} 
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="featured">Рекомендуемый</Label>
                  <Select 
                    value={product.featured ? "true" : "false"} 
                    onValueChange={(value) => handleSelectChange("featured", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Рекомендуемый товар?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Да</SelectItem>
                      <SelectItem value="false">Нет</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Детальная информация</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="volume">Объем</Label>
                  <Input 
                    id="volume" 
                    name="volume" 
                    value={product.details.volume} 
                    onChange={handleDetailsChange} 
                    placeholder="напр. 250 мл" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="brand">Бренд</Label>
                  <Input 
                    id="brand" 
                    name="brand" 
                    value={product.details.brand} 
                    onChange={handleDetailsChange} 
                    placeholder="Название бренда" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="origin">Страна производства</Label>
                  <Input 
                    id="origin" 
                    name="origin" 
                    value={product.details.origin} 
                    onChange={handleDetailsChange} 
                    placeholder="напр. Франция" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ingredients">Состав</Label>
                  <Textarea 
                    id="ingredients" 
                    name="ingredients" 
                    value={product.details.ingredients} 
                    onChange={handleDetailsChange}
                    placeholder="Ключевые ингредиенты"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-medium mb-4">Цена и наличие</h3>
              
              <div className="space-y-2">
                <Label htmlFor="price">Цена (₽)</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  value={product.price} 
                  onChange={handleChange}
                  placeholder="0.00" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stock">Количество в наличии</Label>
                <Input 
                  id="stock" 
                  name="stock" 
                  type="number" 
                  value={product.stock} 
                  onChange={handleChange}
                  placeholder="0" 
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Изображения</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleImageUpload}
                >
                  <ImagePlus className="h-4 w-4 mr-2" />
                  Добавить
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                {images.length === 0 ? (
                  <div 
                    onClick={handleImageUpload}
                    className="border-2 border-dashed rounded-md h-32 flex items-center justify-center text-muted-foreground cursor-pointer hover:border-primary transition-colors"
                  >
                    <div className="text-center">
                      <ImagePlus className="h-8 w-8 mx-auto mb-2" />
                      <p>Загрузите изображение</p>
                    </div>
                  </div>
                ) : (
                  images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`Товар ${index + 1}`} 
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <button 
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                          Главное
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductEditor;
