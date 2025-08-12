import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/lib/api";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [userType, setUserType] = useState<'client' | 'admin'>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignup) {
        // Mock signup flow - would integrate with Azure AD B2C
        console.log("Signing up:", formData, "as", userType);
        await authApi.login(); // Placeholder
      } else {
        // Mock login flow - would integrate with Azure AD B2C
        console.log("Logging in:", formData.email, "as", userType);
        await authApi.login(); // Placeholder
      }

      // Redirect based on user type
      if (userType === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/client/dashboard');
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAzureLogin = async () => {
    setIsLoading(true);
    try {
      await authApi.login(); // Azure AD B2C integration
      // Redirect will be handled by the auth provider
    } catch (error) {
      console.error("Azure login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
                {isLoading ? "Carregando..." : (isSignup ? "Criar Conta" : "Entrar")}
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-2 text-xs text-muted-foreground">
                  OU
                </span>
              </div>
            </div>

            {/* Azure AD B2C Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleAzureLogin}
              disabled={isLoading}
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Entrar com Microsoft
            </Button>

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