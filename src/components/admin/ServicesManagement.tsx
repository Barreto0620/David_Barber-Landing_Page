import { useState } from "react";
import { Plus, Edit, Trash2, Clock, DollarSign, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'cut' | 'beard' | 'treatment' | 'coloring';
  isActive: boolean;
  image?: string;
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Corte Clássico",
    description: "Corte tradicional com acabamento impecável",
    price: 45,
    duration: 30,
    category: "cut",
    isActive: true
  },
  {
    id: "2",
    name: "Corte + Barba",
    description: "Combo completo com design personalizado",
    price: 85,
    duration: 50,
    category: "cut",
    isActive: true
  },
  {
    id: "3",
    name: "Barba Completa",
    description: "Aparar, modelar e finalizar com óleos especiais",
    price: 55,
    duration: 35,
    category: "beard",
    isActive: true
  },
  {
    id: "4",
    name: "Corte Premium",
    description: "Corte moderno com técnicas avançadas e styling",
    price: 75,
    duration: 60,
    category: "cut",
    isActive: true
  },
  {
    id: "5",
    name: "Tratamento Capilar",
    description: "Hidratação profunda e cuidados especiais",
    price: 120,
    duration: 90,
    category: "treatment",
    isActive: false
  }
];

export const ServicesManagement = () => {
  const [services, setServices] = useState(mockServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "cut" as Service['category'],
    isActive: true
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "cut",
      isActive: true
    });
    setEditingService(null);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
      category: service.category,
      isActive: service.isActive
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceData = {
      ...formData,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      id: editingService?.id || Date.now().toString()
    };

    if (editingService) {
      setServices(prev => prev.map(s => s.id === editingService.id ? { ...s, ...serviceData } : s));
    } else {
      setServices(prev => [...prev, serviceData as Service]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const toggleServiceStatus = (serviceId: string) => {
    setServices(prev => 
      prev.map(s => 
        s.id === serviceId ? { ...s, isActive: !s.isActive } : s
      )
    );
  };

  const deleteService = (serviceId: string) => {
    setServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const getCategoryLabel = (category: Service['category']) => {
    const labels = {
      cut: 'Corte',
      beard: 'Barba',
      treatment: 'Tratamento',
      coloring: 'Coloração'
    };
    return labels[category];
  };

  const getCategoryColor = (category: Service['category']) => {
    const colors = {
      cut: 'default',
      beard: 'secondary',
      treatment: 'outline',
      coloring: 'destructive'
    } as const;
    return colors[category];
  };

  const filteredServices = services.filter(service => {
    if (filter === 'active') return service.isActive;
    if (filter === 'inactive') return !service.isActive;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Serviços</h3>
          <p className="text-muted-foreground text-sm">
            {services.filter(s => s.isActive).length} serviços ativos
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-hero" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Serviço
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? "Editar Serviço" : "Adicionar Serviço"}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Serviço</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value: Service['category']) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cut">Corte</SelectItem>
                        <SelectItem value="beard">Barba</SelectItem>
                        <SelectItem value="treatment">Tratamento</SelectItem>
                        <SelectItem value="coloring">Coloração</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (minutos)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o serviço..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="isActive">Serviço Disponível</Label>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="btn-hero">
                    {editingService ? "Salvar Alterações" : "Adicionar Serviço"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="card-service">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription className="mt-1">{service.description}</CardDescription>
                </div>
                
                <div className="flex items-center gap-1">
                  <Badge variant={getCategoryColor(service.category)} className="text-xs">
                    {getCategoryLabel(service.category)}
                  </Badge>
                  {service.isActive ? (
                    <Eye className="h-4 w-4 text-primary" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Price and Duration */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="font-bold text-xl text-primary">
                    R$ {service.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{service.duration} min</span>
                </div>
              </div>
              
              {/* Status */}
              <div className="flex items-center gap-2">
                <Badge variant={service.isActive ? "default" : "secondary"}>
                  {service.isActive ? "Disponível" : "Indisponível"}
                </Badge>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEdit(service)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleServiceStatus(service.id)}
                  className={service.isActive ? "text-orange-600" : "text-primary"}
                >
                  {service.isActive ? "Ocultar" : "Ativar"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteService(service.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-8">
          <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {filter === 'all' ? 'Nenhum serviço cadastrado' : `Nenhum serviço ${filter === 'active' ? 'ativo' : 'inativo'} encontrado`}
          </p>
        </div>
      )}
    </div>
  );
};