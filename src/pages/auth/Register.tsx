
import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

// Схема валидации для регистрации
const registerSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов" }),
  email: z.string().email({ message: "Введите корректный email" }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона" }),
  password: z.string().min(8, { message: "Пароль должен содержать не менее 8 символов" }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, { message: "Необходимо принять условия" })
}).refine(data => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"]
});

// Схема валидации для входа
const loginSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z.string().min(1, { message: "Введите пароль" }),
  rememberMe: z.boolean().optional()
});

// Типы данных форм
type RegisterValues = z.infer<typeof registerSchema>;
type LoginValues = z.infer<typeof loginSchema>;

const Register = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("register");

  // Форма регистрации
  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false
    }
  });

  // Форма входа
  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  // Обработчик отправки формы регистрации
  const onRegisterSubmit = (data: RegisterValues) => {
    setIsRegistering(true);
    
    // Имитация запроса к API
    setTimeout(() => {
      console.log("Регистрация:", data);
      setIsRegistering(false);
      // После успешной регистрации можно автоматически перейти на вкладку входа
      setActiveTab("login");
    }, 1500);
  };

  // Обработчик отправки формы входа
  const onLoginSubmit = (data: LoginValues) => {
    setIsLoggingIn(true);
    
    // Имитация запроса к API
    setTimeout(() => {
      console.log("Вход:", data);
      setIsLoggingIn(false);
      // После успешного входа можно перенаправить на главную страницу
      // history.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 bg-muted/30">
        <div className="container max-w-md px-4">
          <Card className="w-full">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl text-center">Личный кабинет</CardTitle>
              <CardDescription className="text-center">
                {activeTab === "register" 
                  ? "Создайте учетную запись для доступа к заказам и скидкам" 
                  : "Войдите в свой аккаунт для доступа к заказам и личным данным"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Вход</TabsTrigger>
                  <TabsTrigger value="register">Регистрация</TabsTrigger>
                </TabsList>
                
                {/* Форма входа */}
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="example@mail.ru" 
                                {...field} 
                                type="email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="********" 
                                {...field} 
                                type="password"
                              />
                            </FormControl>
                            <FormDescription className="text-right">
                              <Link to="/reset-password" className="text-sm text-primary hover:underline">
                                Забыли пароль?
                              </Link>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">Запомнить меня</FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isLoggingIn}>
                        {isLoggingIn ? (
                          <>
                            <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                            Вход...
                          </>
                        ) : "Войти"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                {/* Форма регистрации */}
                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Имя</FormLabel>
                            <FormControl>
                              <Input placeholder="Иван Иванов" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="example@mail.ru" {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Телефон</FormLabel>
                            <FormControl>
                              <Input placeholder="+7 (___) ___-__-__" {...field} type="tel" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                              <Input placeholder="********" {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Подтверждение пароля</FormLabel>
                            <FormControl>
                              <Input placeholder="********" {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="acceptTerms"
                        render={({ field }) => (
                          <FormItem className="flex items-start space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-normal">
                                Я согласен с <Link to="/terms" className="text-primary hover:underline">условиями</Link> и <Link to="/privacy" className="text-primary hover:underline">политикой конфиденциальности</Link>
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isRegistering}>
                        {isRegistering ? (
                          <>
                            <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                            Регистрация...
                          </>
                        ) : "Зарегистрироваться"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                {activeTab === "register" ? (
                  <span>Уже есть аккаунт? <Button variant="link" className="p-0" onClick={() => setActiveTab("login")}>Войти</Button></span>
                ) : (
                  <span>Нет аккаунта? <Button variant="link" className="p-0" onClick={() => setActiveTab("register")}>Зарегистрироваться</Button></span>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
