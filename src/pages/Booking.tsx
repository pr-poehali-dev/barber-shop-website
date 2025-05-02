
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays, isWeekend } from "date-fns";
import { ru } from 'date-fns/locale';
import { CalendarIcon, Clock, CheckCircle2, ArrowLeft } from "lucide-react";
import { services, masters, generateTimeSlots } from "@/data/appointment-data";
import { Service, Master } from "@/types/appointment";

// Схема валидации формы
const formSchema = z.object({
  serviceId: z.string(),
  masterId: z.string(),
  date: z.date({
    required_error: "Пожалуйста, выберите дату",
  }),
  time: z.string({
    required_error: "Пожалуйста, выберите время",
  }),
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов" }),
  phone: z.string().min(6, { message: "Введите корректный номер телефона" }),
  email: z.string().email({ message: "Введите корректный email" }).optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Booking = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [availableMasters, setAvailableMasters] = useState<Master[]>([]);
  const [timeSlots, setTimeSlots] = useState(generateTimeSlots());
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const minDate = new Date();
  const maxDate = addDays(new Date(), 30);
  
  // Инициализация формы
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: serviceId || "",
      masterId: "",
      name: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  // Загружаем данные выбранного сервиса
  useEffect(() => {
    if (serviceId) {
      const service = services.find(s => s.id === Number(serviceId));
      if (service) {
        setSelectedService(service);
        form.setValue("serviceId", service.id.toString());
        
        // Фильтруем мастеров, которые оказывают эту услугу
        const availableMastersForService = masters.filter(master => 
          service.availableMasters.includes(master.id)
        );
        setAvailableMasters(availableMastersForService);
      }
    } else {
      setAvailableMasters(masters);
    }
  }, [serviceId, form]);

  // Функция выбора сервиса
  const handleServiceChange = (serviceId: string) => {
    const service = services.find(s => s.id === Number(serviceId));
    if (service) {
      setSelectedService(service);
      
      // Сбрасываем выбранного мастера, если он не может выполнить эту услугу
      const selectedMasterId = form.getValues("masterId");
      const masterAvailableForService = service.availableMasters.includes(Number(selectedMasterId));
      if (!masterAvailableForService) {
        form.setValue("masterId", "");
      }
      
      // Обновляем список доступных мастеров
      const availableMastersForService = masters.filter(master => 
        service.availableMasters.includes(master.id)
      );
      setAvailableMasters(availableMastersForService);
    }
  };

  // Генерируем временные слоты на выбранную дату
  const handleDateChange = (date: Date) => {
    // Генерируем новые слоты с учетом выходных (меньше доступных слотов)
    const isWeekendDay = isWeekend(date);
    const newSlots = generateTimeSlots().map(slot => ({
      ...slot,
      available: isWeekendDay ? Math.random() > 0.5 : Math.random() > 0.3
    }));
    
    setTimeSlots(newSlots);
    
    // Если уже было выбрано время, проверяем, доступно ли оно для новой даты
    const selectedTime = form.getValues("time");
    if (selectedTime) {
      const isTimeStillAvailable = newSlots.find(slot => 
        slot.time === selectedTime && slot.available
      );
      
      if (!isTimeStillAvailable) {
        form.setValue("time", "");
      }
    }
  };

  const onSubmit = (values: FormValues) => {
    console.log("Форма отправлена:", values);
    setIsSubmitted(true);
    
    // В реальном приложении здесь был бы запрос к API
    setTimeout(() => {
      navigate("/booking-success");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4">
          <Link to="/services" className="inline-flex items-center text-sm text-primary mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Назад к услугам
          </Link>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Запись на прием</h1>
            <p className="text-muted-foreground">
              Выберите услугу, мастера и удобное для вас время
            </p>
          </div>
          
          {isSubmitted ? (
            <Card className="max-w-lg mx-auto">
              <CardContent className="pt-6 text-center">
                <div className="mb-4">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Запись оформляется</h2>
                <p className="text-muted-foreground mb-6">
                  Мы обрабатываем вашу заявку. Пожалуйста, подождите...
                </p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Форма записи */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Детали записи</CardTitle>
                    <CardDescription>
                      Заполните форму для записи на услугу
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Выбор услуги */}
                        <FormField
                          control={form.control}
                          name="serviceId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Услуга</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  handleServiceChange(value);
                                }}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите услугу" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {services.map((service) => (
                                    <SelectItem 
                                      key={service.id} 
                                      value={service.id.toString()}
                                    >
                                      {service.name} - {service.price} ₽
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Выбор мастера */}
                        <FormField
                          control={form.control}
                          name="masterId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Мастер</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={!form.getValues("serviceId")}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите мастера" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {availableMasters.map((master) => (
                                    <SelectItem 
                                      key={master.id} 
                                      value={master.id.toString()}
                                    >
                                      {master.name} - {master.position}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Выбор даты */}
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Дата</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="w-full pl-3 text-left font-normal"
                                      disabled={!form.getValues("serviceId") || !form.getValues("masterId")}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP", { locale: ru })
                                      ) : (
                                        <span>Выберите дату</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => {
                                      if (date) {
                                        field.onChange(date);
                                        handleDateChange(date);
                                      }
                                    }}
                                    disabled={(date) => 
                                      date < minDate || 
                                      date > maxDate || 
                                      date.getDay() === 0 // Воскресенье выходной
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Выбор времени */}
                        <FormField
                          control={form.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Время</FormLabel>
                              <div className="grid grid-cols-4 gap-2">
                                {timeSlots.map((slot) => (
                                  <Button
                                    key={slot.id}
                                    type="button"
                                    variant={field.value === slot.time ? "default" : "outline"}
                                    className={`flex items-center justify-center ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!slot.available || !form.getValues("date")}
                                    onClick={() => field.onChange(slot.time)}
                                  >
                                    <Clock className="mr-2 h-4 w-4" />
                                    {slot.time}
                                  </Button>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Контактная информация */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Имя</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ваше имя" {...field} />
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
                                <FormLabel>Телефон</FormLabel>
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
                              <FormLabel>Email (необязательно)</FormLabel>
                              <FormControl>
                                <Input placeholder="example@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Комментарий (необязательно)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Дополнительная информация..." 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="pt-4">
                          <Button type="submit" className="w-full" size="lg">
                            Записаться на прием
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
              
              {/* Сводка записи */}
              <div>
                <div className="sticky top-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ваша запись</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedService ? (
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <h3 className="font-medium text-lg mb-1">{selectedService.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{selectedService.description}</p>
                          <div className="flex justify-between text-sm">
                            <span>Длительность:</span>
                            <span>{selectedService.duration} мин</span>
                          </div>
                          <div className="flex justify-between font-medium text-primary">
                            <span>Стоимость:</span>
                            <span>{selectedService.price} ₽</span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-muted/30 rounded-lg text-center">
                          <p className="text-muted-foreground">
                            Выберите услугу из списка
                          </p>
                        </div>
                      )}
                      
                      {form.getValues("masterId") && (
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <h3 className="font-medium mb-2">Мастер</h3>
                          {availableMasters.map((master) => 
                            master.id === Number(form.getValues("masterId")) && (
                              <div key={master.id} className="flex items-center">
                                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                  <img 
                                    src={master.photo} 
                                    alt={master.name} 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{master.name}</p>
                                  <p className="text-xs text-muted-foreground">{master.position}</p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                      
                      {form.getValues("date") && form.getValues("time") && (
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <h3 className="font-medium mb-2">Дата и время</h3>
                          <div className="flex items-center text-sm">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>
                              {format(form.getValues("date"), "d MMMM yyyy", { locale: ru })}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{form.getValues("time")}</span>
                          </div>
                        </div>
                      )}
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

export default Booking;
