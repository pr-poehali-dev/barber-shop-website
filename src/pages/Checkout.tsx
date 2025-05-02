
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CreditCard,
  Wallet,
  Landmark,
  ShieldCheck,
  Check,
  AlertCircle
} from "lucide-react";
import Icon from "@/components/ui/icon";
import { PaymentMethod } from "@/components/PaymentMethod";

// Форматирование номера карты с пробелами по 4 цифры
const formatCardNumber = (value: string) => {
  return value
    .replace(/\s/g, "") // Удаляем все пробелы
    .match(/.{1,4}/g)?.join(" ") // Добавляем пробелы после каждых 4 цифр
    || "";
};

// Схема валидации данных формы
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Введите полное имя" }),
  email: z.string().email({ message: "Введите корректный email" }),
  phone: z.string().min(6, { message: "Введите корректный номер телефона" }),
  address: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  paymentMethod: z.enum(["card", "bank", "cash"], { 
    required_error: "Выберите способ оплаты" 
  }),
  // Поля для оплаты картой
  cardNumber: z.string()
    .regex(/^(\d{4}\s?){4}$/, { message: "Введите 16 цифр номера карты" })
    .optional()
    .or(z.literal("")),
  cardName: z.string()
    .min(2, { message: "Введите имя владельца карты" })
    .optional()
    .or(z.literal("")),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, { message: "Формат: ММ/ГГ" })
    .optional()
    .or(z.literal("")),
  cvv: z.string()
    .regex(/^\d{3,4}$/, { message: "Введите 3 или 4 цифры" })
    .optional()
    .or(z.literal("")),
  savePaymentInfo: z.boolean().optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласиться с условиями" }),
  }),
}).refine((data) => {
  // Проверка, что для способа оплаты "card" заполнены все необходимые поля
  if (data.paymentMethod === "card") {
    return !!data.cardNumber && !!data.cardName && !!data.expiryDate && !!data.cvv;
  }
  return true;
}, {
  message: "Заполните все данные карты",
  path: ["paymentMethod"],
});

type CheckoutFormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Для демонстрации - в реальном приложении данные будут приходить из Redux/Context
  const orderItems = [
    { 
      id: 1, 
      name: "Женская стрижка", 
      price: 2000, 
      type: "service" 
    },
    { 
      id: 3, 
      name: "Маска для волос", 
      price: 1800, 
      quantity: 1, 
      type: "product" 
    }
  ];
  
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const discount = 0; // В реальном приложении может быть скидка
  const shipping = 300;
  const total = subtotal - discount + shipping;
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      paymentMethod: "card",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      savePaymentInfo: false,
      termsAccepted: false,
    },
  });
  
  // Отслеживаем изменение способа оплаты
  const paymentMethod = form.watch("paymentMethod");
  
  // Обработка ввода номера карты - форматирование с пробелами
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 16);
    const formattedValue = formatCardNumber(value);
    form.setValue("cardNumber", formattedValue);
  };
  
  // Обработка ввода даты действия карты
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    
    form.setValue("expiryDate", value);
  };
  
  // Обработка отправки формы
  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    try {
      // В реальном приложении здесь был бы запрос к API платежной системы
      console.log("Платежные данные:", data);
      
      // Имитация запроса к API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPaymentSuccess(true);
      
      // После успешной оплаты перенаправляем на страницу успеха через 3 секунды
      setTimeout(() => {
        navigate("/payment-success");
      }, 3000);
    } catch (error) {
      console.error("Ошибка при обработке платежа:", error);
      // Здесь можно показать сообщение об ошибке
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Оформление заказа</h1>
          
          {paymentSuccess ? (
            <Card className="max-w-xl mx-auto">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Платеж выполняется</h2>
                <p className="text-muted-foreground mb-6">
                  Мы обрабатываем ваш платеж. Пожалуйста, не закрывайте эту страницу...
                </p>
                <div className="flex justify-center mb-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Вы будете автоматически перенаправлены на страницу подтверждения заказа.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Форма оплаты */}
              <div className="lg:col-span-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Контактная информация</CardTitle>
                        <CardDescription>
                          Введите ваши контактные данные для оформления заказа
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ФИО*</FormLabel>
                                <FormControl>
                                  <Input placeholder="Иванов Иван Иванович" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Телефон*</FormLabel>
                                <FormControl>
                                  <Input placeholder="+7 (___) ___-__-__" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email*</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="example@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Адрес</FormLabel>
                              <FormControl>
                                <Input placeholder="Ваш адрес" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Город</FormLabel>
                                <FormControl>
                                  <Input placeholder="Город" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Индекс</FormLabel>
                                <FormControl>
                                  <Input placeholder="000000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Способ оплаты</CardTitle>
                        <CardDescription>
                          Выберите предпочтительный способ оплаты
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <FormField
                          control={form.control}
                          name="paymentMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid gap-4 grid-cols-1 md:grid-cols-3"
                                >
                                  <PaymentMethod
                                    value="card"
                                    name="Банковская карта"
                                    icon="CreditCard"
                                    description="Visa, MasterCard, Мир"
                                    checked={field.value === "card"}
                                  />
                                  <PaymentMethod
                                    value="bank"
                                    name="Банковский перевод"
                                    icon="Landmark"
                                    description="Оплата по реквизитам"
                                    checked={field.value === "bank"}
                                  />
                                  <PaymentMethod
                                    value="cash"
                                    name="При получении"
                                    icon="Wallet"
                                    description="Наличными или картой"
                                    checked={field.value === "cash"}
                                  />
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {paymentMethod === "card" && (
                          <div className="mt-6 space-y-4 p-4 border rounded-lg">
                            <div className="grid md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="cardNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Номер карты*</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="0000 0000 0000 0000" 
                                        value={field.value}
                                        onChange={handleCardNumberChange}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="cardName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Имя на карте*</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="IVAN IVANOV"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="expiryDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Срок действия*</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="MM/YY" 
                                        value={field.value}
                                        onChange={handleExpiryDateChange}
                                        maxLength={5}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="cvv"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>CVV/CVC*</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="password" 
                                        placeholder="***" 
                                        maxLength={4}
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <FormField
                                control={form.control}
                                name="savePaymentInfo"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      Сохранить данные карты для будущих покупок
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="flex items-center text-sm text-muted-foreground">
                              <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />
                              <span>Безопасная оплата с шифрованием данных</span>
                            </div>
                          </div>
                        )}
                        
                        {paymentMethod === "bank" && (
                          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                            <h3 className="font-medium mb-2">Реквизиты для оплаты:</h3>
                            <div className="space-y-2 text-sm">
                              <p><span className="text-muted-foreground">Получатель:</span> ООО "СтильСалон"</p>
                              <p><span className="text-muted-foreground">ИНН:</span> 7712345678</p>
                              <p><span className="text-muted-foreground">Р/счет:</span> 40702810123456789012</p>
                              <p><span className="text-muted-foreground">Банк:</span> АО "Сбербанк"</p>
                              <p><span className="text-muted-foreground">БИК:</span> 044525225</p>
                              <p><span className="text-muted-foreground">Назначение платежа:</span> Оплата услуг по заказу №{Math.floor(10000 + Math.random() * 90000)}</p>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-yellow-600">
                              <AlertCircle className="h-4 w-4 mr-2" />
                              <span>После оплаты пришлите, пожалуйста, копию платежного поручения на email info@stilsalon.ru</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <FormField
                          control={form.control}
                          name="termsAccepted"
                          render={({ field }) => (
                            <FormItem className="flex items-start space-x-2 mb-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal">
                                  Я согласен с <a href="#" className="text-primary hover:underline">условиями предоставления услуг</a> и <a href="#" className="text-primary hover:underline">политикой конфиденциальности</a>
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full"></div>
                              Обработка платежа...
                            </>
                          ) : (
                            <>
                              Оплатить {total} ₽
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </form>
                </Form>
              </div>
              
              {/* Сводка заказа */}
              <div>
                <div className="sticky top-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ваш заказ</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Список товаров */}
                      <div className="space-y-3">
                        {orderItems.map((item) => (
                          <div key={`${item.type}-${item.id}`} className="flex justify-between">
                            <div>
                              <p className="font-medium">
                                {item.name}
                                {item.quantity && item.quantity > 1 && ` x${item.quantity}`}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.type === "service" ? "Услуга" : "Товар"}
                              </p>
                            </div>
                            <p className="font-medium">{item.price * (item.quantity || 1)} ₽</p>
                          </div>
                        ))}
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Сумма:</span>
                          <span>{subtotal} ₽</span>
                        </div>
                        
                        {discount > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span>Скидка:</span>
                            <span>- {discount} ₽</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Доставка:</span>
                          <span>{shipping} ₽</span>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-between font-medium text-lg">
                          <span>Итого:</span>
                          <span>{total} ₽</span>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg text-sm space-y-2">
                        <div className="flex items-center">
                          <Icon name="Truck" className="h-4 w-4 mr-2 text-primary" />
                          <span>Доставка: 1-3 рабочих дня</span>
                        </div>
                        <div className="flex items-center">
                          <Icon name="Shield" className="h-4 w-4 mr-2 text-primary" />
                          <span>Безопасный платеж</span>
                        </div>
                        <div className="flex items-center">
                          <Icon name="RotateCcw" className="h-4 w-4 mr-2 text-primary" />
                          <span>14 дней на возврат</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
