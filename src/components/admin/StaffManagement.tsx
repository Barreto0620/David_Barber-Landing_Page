import { useState } from "react";
import { Plus, Edit, Trash2, User, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  specialties: string[];
  experience: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  avatar?: string;
  workingHours: {
    [key: string]: { start: string; end: string } | null;
  };
}

const mockStaff: Staff[] = [
  {
    id: "1",
    name: "Carlos Silva",
    email: "carlos@barbershop.com",
    phone: "(11) 99999-9999",
    role: "Barbeiro Master",
    specialties: ["Cortes clássicos", "Barbas elaboradas"],
    experience: "8 anos",
    rating: 4.9,
    reviewCount: 234,
    isActive: true,
    workingHours: {
      monday: { start: "09:00", end: "18:00" },
      tuesday: { start: "09:00", end: "18:00" },
      wednesday: { start: "09:00", end: "18:00" },
      thursday: { start: "09:00", end: "18:00" },
      friday: { start: "09:00", end: "18:00" },
      saturday: { start: "08:00", end: "17:00" },
      sunday: null,
    }
  },
  {
    id: "2",
    name: "Ana Costa",
    email: "ana@barbershop.com",
    phone: "(11) 88888-8888",
    role: "Cabeleireira",
    specialties: ["Cortes femininos", "Coloração"],
    experience: "5 anos",
    rating: 4.8,
    reviewCount: 156,
    isActive: true,
    workingHours: {
      monday: { start: "10:00", end: "19:00" },
      tuesday: { start: "10:00", end: "19:00" },
      wednesday: { start: "10:00", end: "19:00" },
      thursday: { start: "10:00", end: "19:00" },
      friday: { start: "10:00", end: "19:00" },
      saturday: { start: "09:00", end: "18:00" },
      sunday: null,
    }
  }
];

export const StaffManagement = () => {
  const [staff, setStaff] = useState(mockStaff);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    specialties: "",
    experience: "",
    isActive: true
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      specialties: "",
      experience: "",
      isActive: true
    });
    setEditingStaff(null);
  };

  const handleEdit = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    setFormData({
      name: staffMember.name,
      email: staffMember.email,
      phone: staffMember.phone,
      role: staffMember.role,
      specialties: staffMember.specialties.join(", "),
      experience: staffMember.experience,
      isActive: staffMember.isActive
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const staffData = {
      ...formData,
      specialties: formData.specialties.split(",").map(s => s.trim()),
      id: editingStaff?.id || Date.now().toString(),
      rating: editingStaff?.rating || 0,
      reviewCount: editingStaff?.reviewCount || 0,
      workingHours: editingStaff?.workingHours || {}
    };

    if (editingStaff) {
      setStaff(prev => prev.map(s => s.id === editingStaff.id ? { ...s, ...staffData } : s));
    } else {
      setStaff(prev => [...prev, staffData as Staff]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const toggleStaffStatus = (staffId: string) => {
    setStaff(prev => 
      prev.map(s => 
        s.id === staffId ? { ...s, isActive: !s.isActive } : s
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Equipe</h3>
          <p className="text-muted-foreground text-sm">
            {staff.filter(s => s.isActive).length} funcionários ativos
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-hero" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Funcionário
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingStaff ? "Editar Funcionário" : "Adicionar Funcionário"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Cargo</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Barbeiro">Barbeiro</SelectItem>
                      <SelectItem value="Barbeiro Master">Barbeiro Master</SelectItem>
                      <SelectItem value="Cabeleireira">Cabeleireira</SelectItem>
                      <SelectItem value="Esteticista">Esteticista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Experiência</Label>
                  <Input
                    id="experience"
                    placeholder="ex: 5 anos"
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialties">Especialidades</Label>
                  <Textarea
                    id="specialties"
                    placeholder="Separar por vírgula: Cortes clássicos, Barbas"
                    value={formData.specialties}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialties: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="isActive">Funcionário Ativo</Label>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="btn-hero">
                  {editingStaff ? "Salvar Alterações" : "Adicionar Funcionário"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((staffMember) => (
          <Card key={staffMember.id} className="card-service">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={staffMember.avatar} />
                    <AvatarFallback>
                      {staffMember.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{staffMember.name}</CardTitle>
                    <CardDescription>{staffMember.role}</CardDescription>
                  </div>
                </div>
                
                <Badge variant={staffMember.isActive ? "default" : "secondary"}>
                  {staffMember.isActive ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">{staffMember.rating}</span>
                <span className="text-muted-foreground text-sm">
                  ({staffMember.reviewCount} avaliações)
                </span>
              </div>
              
              {/* Specialties */}
              <div>
                <h4 className="font-medium text-sm mb-2">Especialidades:</h4>
                <div className="flex flex-wrap gap-1">
                  {staffMember.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Experience */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{staffMember.experience} de experiência</span>
              </div>
              
              {/* Contact */}
              <div className="text-sm text-muted-foreground space-y-1">
                <div>{staffMember.email}</div>
                <div>{staffMember.phone}</div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEdit(staffMember)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleStaffStatus(staffMember.id)}
                  className={staffMember.isActive ? "text-destructive" : "text-primary"}
                >
                  {staffMember.isActive ? "Desativar" : "Ativar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {staff.length === 0 && (
        <div className="text-center py-8">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum funcionário cadastrado</p>
        </div>
      )}
    </div>
  );
};