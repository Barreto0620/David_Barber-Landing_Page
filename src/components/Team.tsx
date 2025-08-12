import { Star, Calendar, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";

const teamMembers = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "Barbeiro Master",
    experience: "8 anos",
    specialties: ["Cortes clássicos", "Barbas elaboradas", "Design capilar"],
    rating: 4.9,
    reviewCount: 234,
    image: barber1,
    status: "available", // available, busy, offline
    nextAvailable: "Hoje, 14:30",
    bio: "Especialista em cortes clássicos e modernos, com foco em barbas elaboradas e design personalizado.",
  },
  {
    id: 2,
    name: "Ana Costa",
    role: "Hair Stylist",
    experience: "6 anos",
    specialties: ["Cortes femininos", "Coloração", "Tratamentos"],
    rating: 5.0,
    reviewCount: 189,
    image: barber2,
    status: "busy",
    nextAvailable: "Amanhã, 09:00",
    bio: "Especializada em cortes femininos e técnicas avançadas de coloração e tratamentos capilares.",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    available: { class: "badge-available", text: "Disponível" },
    busy: { class: "badge-busy", text: "Ocupado" },
    offline: { class: "badge-offline", text: "Offline" },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.offline;

  return <span className={config.class}>{config.text}</span>;
};

export const Team = () => {
  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Nossa <span className="gradient-text">Equipe</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Profissionais experientes e qualificados para cuidar do seu visual
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="card-staff animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="w-full h-64 object-cover"
                />
                {/* Status Overlay */}
                <div className="absolute top-4 right-4">
                  <StatusBadge status={member.status} />
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-display font-semibold">
                    {member.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-primary fill-current mr-1" />
                    <span className="text-sm font-medium">{member.rating}</span>
                  </div>
                </div>

                <div className="text-primary font-medium mb-1">{member.role}</div>
                <div className="text-sm text-muted-foreground mb-4">
                  {member.experience} de experiência
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Especialidades:</div>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Next Available */}
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-2" />
                  Próximo horário: {member.nextAvailable}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    {member.reviewCount} avaliações
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(member.rating)
                            ? "text-primary fill-current"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full btn-hero"
                  disabled={member.status === "offline"}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {member.status === "available" 
                    ? "Agendar Agora" 
                    : member.status === "busy" 
                    ? "Agendar Próximo" 
                    : "Indisponível"
                  }
                </Button>
              </div>
            </div>
          ))}

          {/* Join Team Card */}
          <div className="card-staff border-dashed border-2 border-primary/30 flex items-center justify-center p-8 text-center animate-fade-in-up">
            <div>
              <div className="bg-primary/20 p-4 rounded-full w-fit mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                Junte-se ao Time
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Procuramos profissionais talentosos para nossa equipe
              </p>
              <Button variant="outline" className="btn-outline-copper">
                Ver Vagas
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};