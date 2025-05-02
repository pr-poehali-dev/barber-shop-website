
import { Master, Service, TimeSlot, AppointmentStatus, Appointment } from '@/types/appointment';

// Мастера салона
export const masters: Master[] = [
  {
    id: 1,
    name: 'Елена Петрова',
    position: 'Стилист-парикмахер',
    specialization: ['Стрижка', 'Окрашивание', 'Укладка'],
    photo: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    experience: 8,
    rating: 4.9,
    available: true
  },
  {
    id: 2,
    name: 'Александр Иванов',
    position: 'Колорист',
    specialization: ['Сложное окрашивание', 'Балаяж', 'Омбре'],
    photo: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    experience: 6,
    rating: 4.8,
    available: true
  },
  {
    id: 3,
    name: 'Мария Сидорова',
    position: 'Мастер маникюра',
    specialization: ['Маникюр', 'Педикюр', 'Наращивание'],
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    experience: 5,
    rating: 4.7,
    available: true
  },
  {
    id: 4,
    name: 'Дмитрий Козлов',
    position: 'Косметолог',
    specialization: ['Чистка лица', 'Массаж', 'Уход за кожей'],
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    experience: 7,
    rating: 4.9,
    available: true
  }
];

// Услуги салона
export const services: Service[] = [
  {
    id: 1,
    name: 'Женская стрижка',
    category: 'Волосы',
    duration: 60,
    price: 2000,
    description: 'Профессиональная стрижка с учетом структуры волос, формы лица и пожеланий клиента',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    availableMasters: [1]
  },
  {
    id: 2,
    name: 'Мужская стрижка',
    category: 'Волосы',
    duration: 45,
    price: 1500,
    description: 'Современная мужская стрижка с учетом индивидуальных особенностей и пожеланий',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    availableMasters: [1]
  },
  {
    id: 3,
    name: 'Окрашивание',
    category: 'Волосы',
    duration: 120,
    price: 3500,
    description: 'Профессиональное окрашивание с использованием премиальных красителей',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    availableMasters: [1, 2]
  },
  {
    id: 4,
    name: 'Балаяж',
    category: 'Волосы',
    duration: 180,
    price: 5000,
    description: 'Техника окрашивания, создающая эффект выгоревших на солнце волос',
    image: 'https://images.unsplash.com/photo-1620331317312-8f060a768eca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    availableMasters: [2]
  },
  {
    id: 5,
    name: 'Маникюр',
    category: 'Ногти',
    duration: 60,
    price: 1800,
    description: 'Маникюр с покрытием гель-лаком, выравнивание ногтевой пластины',
    image: 'https://images.unsplash.com/photo-1610992448611-7e31d9a65db6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    availableMasters: [3]
  },
  {
    id: 6,
    name: 'Педикюр',
    category: 'Ногти',
    duration: 75,
    price: 2200,
    description: 'Комплексный уход за ногами: обработка стоп, придание формы ногтям, покрытие',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    availableMasters: [3]
  },
  {
    id: 7,
    name: 'Чистка лица',
    category: 'Косметология',
    duration: 90,
    price: 3000,
    description: 'Профессиональная чистка лица с использованием косметики премиум-класса',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    availableMasters: [4]
  },
  {
    id: 8,
    name: 'Массаж лица',
    category: 'Косметология',
    duration: 40,
    price: 2000,
    description: 'Расслабляющий и омолаживающий массаж лица',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    availableMasters: [4]
  }
];

// Доступные временные слоты
export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  let id = 1;
  
  // Генерируем слоты с 9:00 до 20:00 с интервалом 30 минут
  for (let hour = 9; hour < 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({
        id: id++,
        time,
        available: Math.random() > 0.3, // Случайная доступность для демонстрации
      });
    }
  }
  
  return slots;
};

// Статусы записи
export const appointmentStatuses: AppointmentStatus[] = [
  {
    id: 1,
    name: 'Подтверждена',
    color: 'bg-green-500'
  },
  {
    id: 2,
    name: 'В ожидании',
    color: 'bg-yellow-500'
  },
  {
    id: 3,
    name: 'Отменена',
    color: 'bg-red-500'
  },
  {
    id: 4,
    name: 'Завершена',
    color: 'bg-blue-500'
  }
];

// Примеры существующих записей
export const appointments: Appointment[] = [
  {
    id: 1,
    clientName: 'Анна Смирнова',
    clientPhone: '+7 (910) 123-45-67',
    clientEmail: 'anna@example.com',
    masterId: 1,
    serviceId: 1,
    date: '2025-05-05',
    time: '10:00',
    duration: 60,
    price: 2000,
    status: 1,
    notes: 'Клиент просил учесть особенности структуры волос',
    createdAt: '2025-05-02T08:30:00Z',
    updatedAt: '2025-05-02T09:15:00Z'
  },
  {
    id: 2,
    clientName: 'Сергей Иванов',
    clientPhone: '+7 (925) 987-65-43',
    masterId: 2,
    serviceId: 4,
    date: '2025-05-06',
    time: '14:30',
    duration: 180,
    price: 5000,
    status: 2,
    createdAt: '2025-05-02T12:45:00Z'
  },
  {
    id: 3,
    clientName: 'Екатерина Петрова',
    clientPhone: '+7 (903) 456-78-90',
    clientEmail: 'ekaterina@example.com',
    masterId: 3,
    serviceId: 5,
    date: '2025-05-04',
    time: '16:00',
    duration: 60,
    price: 1800,
    status: 4,
    createdAt: '2025-05-01T17:20:00Z',
    updatedAt: '2025-05-04T16:55:00Z'
  },
  {
    id: 4,
    clientName: 'Михаил Соколов',
    clientPhone: '+7 (916) 111-22-33',
    masterId: 4,
    serviceId: 7,
    date: '2025-05-08',
    time: '11:30',
    duration: 90,
    price: 3000,
    status: 3,
    notes: 'Клиент отменил из-за болезни',
    createdAt: '2025-05-03T09:00:00Z',
    updatedAt: '2025-05-07T14:20:00Z'
  }
];
