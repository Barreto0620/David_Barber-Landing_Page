import { useState, useEffect } from "react";
import { Wifi, WifiOff, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { realtimeApi } from "@/lib/api";

type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

export const RealtimeStatus = () => {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    // Initialize real-time connection
    const initializeConnection = async () => {
      try {
        setStatus('connecting');
        
        // Mock connection to Azure Web PubSub
        await realtimeApi.connect('user-id'); // In real app, get from auth context
        
        // Subscribe to booking updates
        await realtimeApi.subscribeToBookings((data) => {
          console.log('Real-time booking update:', data);
          setLastUpdate(new Date());
        });

        setStatus('connected');
      } catch (error) {
        console.error('Failed to connect to real-time service:', error);
        setStatus('disconnected');
      }
    };

    initializeConnection();

    // Simulate connection status changes for demo
    const interval = setInterval(() => {
      // In a real app, this would be handled by the WebSocket connection
      if (Math.random() > 0.95) { // 5% chance to simulate disconnection
        setStatus('disconnected');
        setTimeout(() => setStatus('connected'), 2000);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      // Clean up real-time connection
    };
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <Wifi className="h-3 w-3" />;
      case 'disconnected':
        return <WifiOff className="h-3 w-3" />;
      case 'connecting':
        return <Loader2 className="h-3 w-3 animate-spin" />;
    }
  };

  const getStatusVariant = (): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'connected':
        return 'default';
      case 'disconnected':
        return 'destructive';
      case 'connecting':
        return 'secondary';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Tempo Real Ativo';
      case 'disconnected':
        return 'Desconectado';
      case 'connecting':
        return 'Conectando...';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-40">
      <Badge 
        variant={getStatusVariant()} 
        className="flex items-center gap-2 animate-fade-in"
      >
        {getStatusIcon()}
        <span className="text-xs">{getStatusText()}</span>
      </Badge>
      
      {lastUpdate && status === 'connected' && (
        <div className="text-xs text-muted-foreground mt-1 text-right">
          Última atualização: {lastUpdate.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};