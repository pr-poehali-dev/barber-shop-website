
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Схема валидации формы бронирования
const bookingFormSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать не менее 2 символов",
  }),
  phone: z.string().min(6, {
    message: "Введите корректный номер телефона",
  }),
  email: z.string().email({
    message: "Введите корректный email",
  }),
  date: z.date({
    required_error: "Пожалуйста, выберите дату",
  }),
  time: z.string({
    required_error: "Пожалуйста, выберите время",
  }),
  master: z.string({
    required_error: "Пожалуйста, выберите мастера",
  }),
  notes: z.string().optional(),
});

// Моковые данные мастеров
const mastersData = [
  { id: "1", name: "Елена Петрова" },
  { id: "2", name: "Александр Иванов" },
  { id: "3", name: "Мария Сидорова" },
  { id: "4", name: "Дмитрий Козлов" },
];

// Доступные временные слоты
const timeSlots = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
];

interface BookingFormProps {
  service: {
    id: number;
    name: string;
    price: number;
    duration: number;
  };
}

export const BookingForm = ({ service }: BookingFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  // Получаем сегодняшнюю дату и дату через 30 дней для ограничения календаря
  const today = new Date();
  const thirtyDaysLater = new Date(today);
  thirtyDaysLater.setDate(today.getDate() + 30);

  const onSubmit = (data: z.infer<typeof bookingFormSchema>) => {
    console.log("Данные бронирования:", {
      ...data,
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
    });
    
    // В реальном приложении здесь был бы запрос к API
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Запись подтверждена!</h2>
        <p className="text-muted-foreground mb-4">
          Спасибо за бронирование. Мы отправили подтверждение на ваш email.
        </p>
        <div className="bg-muted/30 p-4 rounded-lg max-w-sm mx-auto mb-6">
          <p className="font-medium">Детали записи:</p>
          <p>Услуга: {service.name}</p>
          <p>Цена: {service.price} ₽</p>
          <p>Дата и время: {format(form.getValues().date, "dd MMMM yyyy", { locale: ru })}, {form.getValues().time}</p>
          <p>Мастер: {mastersData.find(m => m.id === form.getValues().master)?.name}</p>
        </div>
        <Button>Закрыть</Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Запись на услугу</h2>
      <div className="bg-muted/30 p-4 rounded-lg mb-6">
        <p className="font-medium">{service.name}</p>
        <div className="flex justify-between items-center">
          <p>Стоимость: <span className="font-semibold">{service.price} ₽</span></p>
          <p>Длительность: {service.duration} мин.</p>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={formЯ создам систему бронирования услуг и административную панель для управления записями. Это будет первый важный шаг в развитии функционала салона красоты.

<pp-write filepath="src/types/appointment.ts">
export interface Master {
  id: number;
  name: string;
  position: string;
  specialization: string[];
  photo: string;
  experience: number; // в годах
  rating: number;
  available: boolean;
}

export interface Service {
  id: number;
  name: string;
  category: string;
  duration: number; // в минутах
  price: number;
  description: string;
  image?: string;
  availableMasters: number[]; // ID мастеров, которые оказывают эту услугу
}

export interface TimeSlot {
  id: number;
  time: string; // '09:00', '09:30', etc.
  available: boolean;
}

export interface AppointmentStatus {
  id: number;
  name: string;
  color: string;
}

export interface Appointment {
  id: number;
  clientId?: number;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  masterId: number;
  serviceId: number;
  date: string; // '2025-05-10'
  time: string; // '14:30'
  duration: number; // в минутах
  price: number;
  status: number; // ID статуса
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}
