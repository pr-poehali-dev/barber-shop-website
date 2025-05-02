
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  EyeIcon,
  Pencil,
  Trash2,
  FilterIcon,
  PlusCircle,
  CalendarIcon,
  MoreVertical,
  Phone,
  Mail
} from "lucide-react";
import { format } from "date-fns";
import { ru } from 'date-fns/locale';
import { 
  appointments, 
  appointmentStatuses, 
  services, 
  masters 
} from "@/data/appointment-data";

const AppointmentsList = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  
  // Фильтры
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  
  // Отфильтрованные записи
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesStatus = statusFilter === "" || appointment.status === Number(statusFilter);
    const matchesSearch = search === "" || 
      appointment.clientName.toLowerCase().includes(search.toLowerCase()) ||
      appointment.clientPhone.includes(search);
    const matchesDate = !selectedDate || appointment.date === format(selectedDate, "yyyy-MM-dd");
    
    return matchesStatus && matchesSearch && matchesDate;
  });
  
  // Получение информации о статусе
  const getStatusInfo = (statusId: number) => {
    const status = appointmentStatuses.find(s => s.id === statusId);
    return status || { id: 0, name: "Неизвестно", color: "bg-gray-400" };
  };
  
  // Получение информации об услуге
  const getServiceInfo = (serviceId: number) => {
    return services.find(s => s.id === serviceId) || { name: "Неизвестно", price: 0 };
  };
  
  // Получение информации о мастере
  const getMasterInfo = (masterId: number) => {
    return masters.find(m => m.id === masterId) || { name: "Неизвестно" };
  };
  
  // Обработчики диалогов
  const handleViewAppointment = (id: number) => {
    setSelectedAppointment(id);
    setViewDialogOpen(true);
  };
  
  const handleDeleteDialog = (id: number) => {
    setSelectedAppointment(id);
    setDeleteDialogOpen(true);
  };
  
  const handleDelete = () => {
    // Здесь будет логика удаления записи
    console.log(`Удаление записи: ${selectedAppointment}`);
    setDeleteDialogOpen(false);
  };
  
  const getCurrentAppointment = () => {
    return appointments.find(a => a.id === selectedAppointment);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Управление записями</h2>
          <p className="text-muted-foreground">
            Просматривайте и управляйте записями клиентов на услуги
          </p>
        </div>
        <div className="flex space-x-4">
          <Link to="/booking">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Создать запись
            </Button>
          </Link>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Все записи</CardTitle>
          <CardDescription>Всего записей: {filteredAppointments.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Фильтры */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Поиск по имени или телефону..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Все статусы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все статусы</SelectItem>
                  {appointmentStatuses.map((status) => (
                    <SelectItem key={status.id} value={status.id.toString()}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[180px] pl-3 text-left font-normal flex justify-between items-center"
                  >
                    {selectedDate ? (
                      format(selectedDate, "d MMMM yyyy", { locale: ru })
                    ) : (
                      <span>Выберите дату</span>
                    )}
                    <div className="flex">
                      {selectedDate && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 mr-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate(undefined);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                      <CalendarIcon className="h-4 w-4 opacity-50" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {/* Таблица записей */}
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Услуга</TableHead>
                  <TableHead>Дата и время</TableHead>
                  <TableHead>Мастер</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      Записи не найдены
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAppointments.map((appointment) => {
                    const status = getStatusInfo(appointment.status);
                    const service = getServiceInfo(appointment.serviceId);
                    const master = getMasterInfo(appointment.masterId);
                    
                    return (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">#{appointment.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{appointment.clientName}</p>
                            <p className="text-xs text-muted-foreground">{appointment.clientPhone}</p>
                          </div>
                        </TableCell>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>
                          <div>
                            <p>{format(new Date(appointment.date), "d MMM yyyy", { locale: ru })}</p>
                            <p className="text-xs text-muted-foreground">{appointment.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>{master.name}</TableCell>
                        <TableCell>
                          <Badge className={`${status.color} hover:${status.color}`}>
                            {status.name}
                          </Badge>
                        </TableCell>
                        <TableCell>{appointment.price} ₽</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Открыть меню</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Действия</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewAppointment(appointment.id)}>
                                <EyeIcon className="mr-2 h-4 w-4" />
                                <span>Просмотр</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                <span>Изменить</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteDialog(appointment.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Удалить</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Диалог просмотра записи */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Информация о записи</DialogTitle>
            <DialogDescription>
              Подробная информация о записи клиента.
            </DialogDescription>
          </DialogHeader>
          
          {getCurrentAppointment() && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Дата</h4>
                  <p>{format(new Date(getCurrentAppointment()!.date), "d MMMM yyyy", { locale: ru })}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Время</h4>
                  <p>{getCurrentAppointment()!.time}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Клиент</h4>
                <p className="font-medium">{getCurrentAppointment()!.clientName}</p>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <Phone className="h-3 w-3 mr-1" />
                  <span>{getCurrentAppointment()!.clientPhone}</span>
                </div>
                {getCurrentAppointment()!.clientEmail && (
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3 mr-1" />
                    <span>{getCurrentAppointment()!.clientEmail}</span>
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Услуга</h4>
                <p>{getServiceInfo(getCurrentAppointment()!.serviceId).name}</p>
                <p className="text-sm text-muted-foreground">
                  Длительность: {getCurrentAppointment()!.duration} мин
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Мастер</h4>
                <p>{getMasterInfo(getCurrentAppointment()!.masterId).name}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Статус</h4>
                  <Badge className={`${getStatusInfo(getCurrentAppointment()!.status).color} hover:${getStatusInfo(getCurrentAppointment()!.status).color}`}>
                    {getStatusInfo(getCurrentAppointment()!.status).name}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Стоимость</h4>
                  <p className="font-bold">{getCurrentAppointment()!.price} ₽</p>
                </div>
              </div>
              
              {getCurrentAppointment()!.notes && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Заметки</h4>
                  <p className="text-sm">{getCurrentAppointment()!.notes}</p>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground mt-4">
                <p>Запись создана: {format(new Date(getCurrentAppointment()!.createdAt), "d MMMM yyyy, HH:mm", { locale: ru })}</p>
                {getCurrentAppointment()!.updatedAt && (
                  <p>Последнее обновление: {format(new Date(getCurrentAppointment()!.updatedAt), "d MMMM yyyy, HH:mm", { locale: ru })}</p>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Закрыть
            </Button>
            <Button>
              <Pencil className="mr-2 h-4 w-4" />
              Редактировать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Диалог удаления записи */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить запись?</DialogTitle>
            <DialogDescription>
              Вы действительно хотите удалить запись #{selectedAppointment}? 
              Это действие нельзя будет отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentsList;
