import { Gift, Star, Trophy, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface LoyaltyCardProps {
  points: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  discount: string;
  icon: any;
  available: boolean;
}

const rewards: Reward[] = [
  {
    id: "1",
    title: "Desconto de 10%",
    description: "10% de desconto em qualquer serviço",
    pointsRequired: 50,
    discount: "10%",
    icon: Gift,
    available: true
  },
  {
    id: "2",
    title: "Corte Grátis",
    description: "Um corte clássico gratuito",
    pointsRequired: 150,
    discount: "R$ 45",
    icon: Star,
    available: true
  },
  {
    id: "3",
    title: "Combo Premium",
    description: "Corte + Barba com 30% de desconto",
    pointsRequired: 200,
    discount: "30%",
    icon: Trophy,
    available: false
  },
  {
    id: "4",
    title: "Mês VIP",
    description: "Serviços ilimitados por um mês",
    pointsRequired: 500,
    discount: "Unlimited",
    icon: Calendar,
    available: false
  }
];

export const LoyaltyCard = ({ points }: LoyaltyCardProps) => {
  const nextReward = rewards.find(reward => reward.pointsRequired > points);
  const pointsToNextReward = nextReward ? nextReward.pointsRequired - points : 0;
  const progressPercentage = nextReward ? (points / nextReward.pointsRequired) * 100 : 100;

  const redeemReward = (rewardId: string) => {
    // Handle reward redemption
    console.log('Redeeming reward:', rewardId);
  };

  const pointsHistory = [
    { date: "2024-08-10", description: "Corte + Barba", points: 85 },
    { date: "2024-07-25", description: "Corte Premium", points: 75 },
    { date: "2024-07-10", description: "Bonus de cadastro", points: 50 },
    { date: "2024-06-20", description: "Corte Clássico", points: 45 }
  ];

  return (
    <div className="space-y-6">
      {/* Current Points Card */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Programa de Fidelidade
          </CardTitle>
          <CardDescription>
            Acumule pontos e ganhe recompensas incríveis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{points}</div>
            <div className="text-muted-foreground">Pontos Disponíveis</div>
          </div>

          {nextReward && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Próxima recompensa: {nextReward.title}</span>
                <span>{pointsToNextReward} pontos restantes</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-bold">15</div>
              <div className="text-xs text-muted-foreground">Agendamentos</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-bold">3</div>
              <div className="text-xs text-muted-foreground">Recompensas</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-bold">VIP</div>
              <div className="text-xs text-muted-foreground">Status</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Rewards */}
      <Card>
        <CardHeader>
          <CardTitle>Recompensas Disponíveis</CardTitle>
          <CardDescription>
            Use seus pontos para resgatar benefícios exclusivos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward) => {
              const canRedeem = points >= reward.pointsRequired;
              const Icon = reward.icon;
              
              return (
                <Card key={reward.id} className={`${canRedeem ? 'border-primary' : 'border-muted'} transition-colors`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${canRedeem ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="font-semibold">{reward.title}</span>
                      </div>
                      <Badge variant={canRedeem ? "default" : "secondary"}>
                        {reward.discount}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {reward.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {reward.pointsRequired} pontos
                      </span>
                      
                      <Button
                        size="sm"
                        variant={canRedeem ? "default" : "outline"}
                        disabled={!canRedeem || !reward.available}
                        onClick={() => redeemReward(reward.id)}
                        className={canRedeem ? "btn-hero" : ""}
                      >
                        {canRedeem ? "Resgatar" : "Indisponível"}
                        {canRedeem && <ArrowRight className="h-3 w-3 ml-1" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Points History */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pontos</CardTitle>
          <CardDescription>
            Acompanhe como você ganhou seus pontos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pointsHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div>
                  <div className="font-medium">{entry.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">+{entry.points}</span>
                  <Star className="h-4 w-4 text-primary" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How to Earn Points */}
      <Card>
        <CardHeader>
          <CardTitle>Como Ganhar Pontos</CardTitle>
          <CardDescription>
            Descubra as formas de acumular mais pontos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Agendamento completado</span>
              <Badge variant="outline">Valor do serviço = pontos</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Indicação de amigos</span>
              <Badge variant="outline">+50 pontos</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Avaliação do serviço</span>
              <Badge variant="outline">+10 pontos</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Aniversário</span>
              <Badge variant="outline">+100 pontos</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};