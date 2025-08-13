import { useState } from "react";
import { Menu, X, Calendar, Phone, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDashboardClick = () => {
    if (profile?.user_type === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/client/dashboard');
    }
  };

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-display font-bold gradient-text">
              BarberShop Pro
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#home"
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                Início
              </a>
              <a
                href="#services"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                Serviços
              </a>
              <a
                href="#team"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                Equipe
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                Contato
              </a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="btn-outline-copper">
              <Phone className="h-4 w-4 mr-2" />
              (11) 9999-9999
            </Button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDashboardClick}
                  className="btn-outline-copper"
                >
                  <User className="h-4 w-4 mr-2" />
                  {profile?.user_type === 'admin' ? 'Painel Admin' : 'Minha Conta'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  disabled={loading}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="btn-outline-copper">
                    <User className="h-4 w-4 mr-2" />
                    Entrar
                  </Button>
                </Link>
                <Button className="btn-hero">
                  <Calendar className="h-4 w-4 mr-2" />
                  Reservar Agora
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card-secondary rounded-lg mt-2 border border-border">
              <a
                href="#home"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-300 font-medium"
                onClick={toggleMenu}
              >
                Início
              </a>
              <a
                href="#services"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                onClick={toggleMenu}
              >
                Serviços
              </a>
              <a
                href="#team"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                onClick={toggleMenu}
              >
                Equipe
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                onClick={toggleMenu}
              >
                Contato
              </a>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" size="sm" className="btn-outline-copper">
                  <Phone className="h-4 w-4 mr-2" />
                  (11) 9999-9999
                </Button>
                
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleDashboardClick();
                        toggleMenu();
                      }}
                      className="btn-outline-copper"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {profile?.user_type === 'admin' ? 'Painel Admin' : 'Minha Conta'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        signOut();
                        toggleMenu();
                      }}
                      disabled={loading}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={toggleMenu}>
                      <Button variant="outline" size="sm" className="btn-outline-copper w-full">
                        <User className="h-4 w-4 mr-2" />
                        Entrar
                      </Button>
                    </Link>
                    <Button className="btn-hero">
                      <Calendar className="h-4 w-4 mr-2" />
                      Reservar Agora
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};