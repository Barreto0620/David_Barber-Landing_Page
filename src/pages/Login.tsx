import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, signupSchema, type LoginFormData, type SignupFormData } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [userType, setUserType] = useState<'client' | 'admin'>('client');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, user, profile, loading: authLoading } = useAuth();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (user && profile && !authLoading) {
      if (profile.user_type === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/client/dashboard');
      }
    }
  }, [user, profile, authLoading, navigate]);

  // Form for login
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form for signup
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle login form submission
  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password);
    } catch (error) {
      // Error handling is done in the useAuth hook
    }
  };

  // Handle signup form submission
  const onSignupSubmit = async (data: SignupFormData) => {
    try {
      await signUp(data.email, data.password, userType, data.name, data.phone);
      // Switch to login mode after successful signup
      setIsSignup(false);
      loginForm.setValue('email', data.email);
    } catch (error) {
      // Error handling is done in the useAuth hook
    }
  };

  // Format phone number input
  const formatPhoneNumber = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length <= 10) {
      return cleanedValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return cleanedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const isLoading = authLoading || loginForm.formState.isSubmitting || signupForm.formState.isSubmitting;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Brand */}
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-foreground">
            BarberShop Pro
          </h1>
          <p className="text-muted-foreground mt-2">
            Sistema completo para barbearias
          </p>
        </div>

        {/* User Type Selection */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant={userType === 'client' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setUserType('client')}
          >
            <User className="h-4 w-4 mr-2" />
            Cliente
          </Button>
          <Button
            type="button"
            variant={userType === 'admin' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setUserType('admin')}
          >
            <Building2 className="h-4 w-4 mr-2" />
            Administrador
          </Button>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle>
              {isSignup ? 'Criar Conta' : 'Entrar'}
              <Badge variant="secondary" className="ml-2">
                {userType === 'admin' ? 'Admin' : 'Cliente'}
              </Badge>
            </CardTitle>
            <CardDescription>
              {isSignup 
                ? `Crie sua conta como ${userType === 'admin' ? 'administrador' : 'cliente'}`
                : `Entre com suas credenciais`
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isSignup ? (
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Seu nome completo"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(11) 99999-9999"
                            {...field}
                            onChange={(e) => {
                              const formatted = formatPhoneNumber(e.target.value);
                              field.onChange(formatted);
                            }}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="seu@email.com"
                              className="pl-10"
                              {...field}
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Sua senha"
                              className="pl-10 pr-10"
                              {...field}
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Senha</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirme sua senha"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
                    {isLoading ? "Criando conta..." : "Criar Conta"}
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="seu@email.com"
                              className="pl-10"
                              {...field}
                              disabled={isLoading}
                            />
                          </div>
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
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Sua senha"
                              className="pl-10 pr-10"
                              {...field}
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </Form>
            )}

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-2 text-xs text-muted-foreground">
                  OU
                </span>
              </div>
            </div>

            {/* Demo Login Buttons */}
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  if (userType === 'admin') {
                    loginForm.setValue('email', 'admin@barbershoppro.com');
                    loginForm.setValue('password', 'admin123');
                  } else {
                    loginForm.setValue('email', 'cliente@exemplo.com');
                    loginForm.setValue('password', 'cliente123');
                  }
                }}
                disabled={isLoading || isSignup}
              >
                <User className="h-4 w-4 mr-2" />
                Login Demo {userType === 'admin' ? 'Admin' : 'Cliente'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => toast({
                  title: "Funcionalidade em desenvolvimento",
                  description: "Login com Microsoft será implementado em breve.",
                })}
                disabled={isLoading}
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Entrar com Microsoft
              </Button>
            </div>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsSignup(!isSignup)}
                className="text-sm"
              >
                {isSignup 
                  ? "Já tem uma conta? Entre aqui" 
                  : "Não tem conta? Cadastre-se"
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;