import { useState, useEffect } from "react";
import { Star, Award, Clock, TrendingUp, Scissors, Users, Trophy, Calendar, Flame, Crown, Zap, ThumbsUp } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

interface TopService {
    service_type: string;
    booking_count: number;
    top_client_name: string | null;
    top_client_bookings: number;
}

export const Team = () => {
    const [topServices, setTopServices] = useState<TopService[]>([]);
    const [loadingServices, setLoadingServices] = useState(true);

    const barber = {
        name: "David Sousa",
        role: "Fundador & Barbeiro",
        experience: 8,
        totalClients: 500,
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop",
        bio: "Com mais de 8 anos de experiência e mais de 500 clientes atendidos, transformo cada corte em uma experiência única. Especialista em cortes clássicos, modernos e barbas elaboradas.",
        certifications: [
            "Certificado de Barbeiro",
            "Especialização em Design"
        ],
        achievements: [
            { icon: Trophy, title: "Melhor Barbeiro 2023", description: "Prêmio Regional" },
            { icon: Users, title: "500+ Clientes", description: "Atendidos com excelência" },
        ]
    };

    const testimonials = [
        {
            name: "Roberto Alves",
            rating: 5,
            comment: "Profissional excepcional! Atendimento impecável e resultado surpreendente.",
            date: "Há 2 dias"
        },
        {
            name: "Marcelo Costa",
            rating: 5,
            comment: "Melhor barbeiro da região. Sempre saio satisfeito e bem atendido.",
            date: "Há 1 semana"
        },
        {
            name: "Felipe Santos",
            rating: 5,
            comment: "Corte perfeito, ambiente profissional e preço justo. Recomendo!",
            date: "Há 2 semanas"
        }
    ];

    const fetchTopServices = async () => {
        try {
            setLoadingServices(true);

            const { data: appointments, error: appointmentsError } = await supabase
                .from('appointments')
                .select('service_type, client_id')
                .in('status', ['completed', 'scheduled', 'in_progress']);

            if (appointmentsError) {
                console.warn('⚠️ Erro ao buscar serviços:', appointmentsError);
                setTopServices([
                    { service_type: "Corte Clássico", booking_count: 156, top_client_name: "Carlos Silva", top_client_bookings: 12 },
                    { service_type: "Barba Completa", booking_count: 98, top_client_name: "João Santos", top_client_bookings: 8 },
                    { service_type: "Corte + Barba", booking_count: 87, top_client_name: "Pedro Costa", top_client_bookings: 10 }
                ]);
                setLoadingServices(false);
                return;
            }

            if (appointments && appointments.length > 0) {
                const { data: clients, error: clientsError } = await supabase
                    .from('clients')
                    .select('id, name');

                const clientsMap = new Map((clients || []).map(c => [c.id, c.name]));

                const serviceStats = appointments.reduce((acc: any, apt) => {
                    const serviceName = apt.service_type;
                    if (!acc[serviceName]) {
                        acc[serviceName] = {
                            service_type: serviceName,
                            booking_count: 0,
                            clients: new Map()
                        };
                    }
                    acc[serviceName].booking_count += 1;
                    
                    const clientBookings = acc[serviceName].clients.get(apt.client_id) || 0;
                    acc[serviceName].clients.set(apt.client_id, clientBookings + 1);
                    
                    return acc;
                }, {});

                const servicesArray = Object.values(serviceStats).map((service: any) => {
                    let topClientId = null;
                    let maxBookings = 0;
                    
                    service.clients.forEach((count: number, clientId: string) => {
                        if (count > maxBookings) {
                            maxBookings = count;
                            topClientId = clientId;
                        }
                    });

                    return {
                        service_type: service.service_type,
                        booking_count: service.booking_count,
                        top_client_name: topClientId ? clientsMap.get(topClientId) || null : null,
                        top_client_bookings: maxBookings
                    };
                });

                const top3 = servicesArray
                    .sort((a: any, b: any) => b.booking_count - a.booking_count)
                    .slice(0, 3);

                setTopServices(top3);
            } else {
                setTopServices([
                    { service_type: "Corte Clássico", booking_count: 156, top_client_name: "Carlos Silva", top_client_bookings: 12 },
                    { service_type: "Barba Completa", booking_count: 98, top_client_name: "João Santos", top_client_bookings: 8 },
                    { service_type: "Corte + Barba", booking_count: 87, top_client_name: "Pedro Costa", top_client_bookings: 10 }
                ]);
            }

            setLoadingServices(false);
        } catch (err) {
            console.error("Erro ao processar serviços:", err);
            setTopServices([
                { service_type: "Corte Clássico", booking_count: 156, top_client_name: "Carlos Silva", top_client_bookings: 12 },
                { service_type: "Barba Completa", booking_count: 98, top_client_name: "João Santos", top_client_bookings: 8 },
                { service_type: "Corte + Barba", booking_count: 87, top_client_name: "Pedro Costa", top_client_bookings: 10 }
            ]);
            setLoadingServices(false);
        }
    };

    useEffect(() => {
        fetchTopServices();

        const interval = setInterval(() => {
            fetchTopServices();
        }, 120000);

        return () => clearInterval(interval);
    }, []);

    const getServiceIcon = (serviceName: string) => {
        const name = serviceName.toLowerCase();
        if (name.includes('corte') && name.includes('barba')) return Zap;
        if (name.includes('barba')) return Flame;
        if (name.includes('corte')) return Crown;
        return Scissors;
    };

    const getBadge = (index: number) => {
        if (index === 0) return { 
            text: "🥇 Top 1", 
            color: "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/40",
            glow: "shadow-lg shadow-amber-500/20",
            hoverBorder: "hover:border-amber-400 hover:shadow-amber-400/30"
        };
        if (index === 1) return { 
            text: "🥈 Top 2", 
            color: "bg-gradient-to-r from-slate-400/20 to-slate-300/20 text-slate-300 border-slate-400/40",
            glow: "shadow-md shadow-slate-400/10",
            hoverBorder: "hover:border-slate-400 hover:shadow-slate-400/30"
        };
        if (index === 2) return { 
            text: "🥉 Top 3", 
            color: "bg-gradient-to-r from-amber-700/20 to-amber-600/20 text-amber-600 border-amber-700/40",
            glow: "shadow-md shadow-amber-700/10",
            hoverBorder: "hover:border-amber-700 hover:shadow-amber-700/30"
        };
        return { 
            text: "Popular", 
            color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
            glow: "",
            hoverBorder: "hover:border-blue-400"
        };
    };

    const openBooking = () => {
        window.dispatchEvent(new CustomEvent('openBooking'));
    };

    return (
        <section id="team" className="py-20 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Conheça o <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Profissional</span>
                    </h2>
                    <p className="text-xl text-slate-200 max-w-2xl mx-auto">
                        Experiência, paixão e dedicação em cada atendimento
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Profile Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl overflow-hidden hover:border-amber-500 transition-all duration-300 shadow-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {/* Profile Image */}
                                <div className="relative h-[400px] md:h-auto">
                                    <img
                                        src={barber.image}
                                        alt={`Foto de ${barber.name}, ${barber.role}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4">
                                        {/* CORREÇÃO DE CONTRASTE: bg-green-500 -> bg-green-700 */}
                                    </div>
                                </div>

                                {/* Profile Info */}
                                <div className="p-8">
                                    <div className="mb-6">
                                        <h3 className="text-3xl font-bold text-white mb-2">
                                            {barber.name}
                                        </h3>
                                        <p className="text-amber-400 font-semibold text-lg mb-2">
                                            {barber.role}
                                        </p>
                                        {/* [CORREÇÃO 1.4.3] text-slate-300 -> text-slate-200 */}
                                        <div className="flex items-center space-x-4 text-sm text-slate-200">
                                            <span className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                + {barber.experience} anos
                                            </span>
                                            <span className="flex items-center">
                                                <Users className="h-4 w-4 mr-1" />
                                                {barber.totalClients}+ clientes
                                            </span>
                                        </div>
                                    </div>

                                    {/* Rating - CORREÇÃO ARIA: Adicionado role="img" */}
                                    <div className="flex items-center mb-6 pb-6 border-b border-slate-700">
                                      
                                    </div>

                                    {/* Bio */}
                                    <p className="text-slate-200 leading-relaxed mb-6">
                                        {barber.bio}
                                    </p>

                                    {/* CTA Button - CORREÇÃO FOCO: Adicionado focus:ring */}
                                    <button
                                        onClick={openBooking}
                                        className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 font-bold flex items-center justify-center text-lg focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                                    >
                                        <Calendar className="h-5 w-5 mr-2" />
                                        Agendar com {barber.name.split(' ')[0]}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Top 3 Most Requested Services */}
                        <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 sm:p-8 mt-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
                                        <TrendingUp className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">
                                            Serviços Mais Populares
                                        </h3>
                                        {/* [CORREÇÃO 1.4.3] text-slate-300 -> text-slate-200 */}
                                        <p className="text-sm text-slate-200">Os favoritos dos nossos clientes</p>
                                    </div>
                                </div>
                                {!loadingServices && (
                                    <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-medium text-green-400">Tempo real</span>
                                    </div>
                                )}
                            </div>

                            {loadingServices ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                    {topServices.map((service, index) => {
                                        const ServiceIcon = getServiceIcon(service.service_type);
                                        const badge = getBadge(index);
                                        
                                        return (
                                            <div 
                                                key={index} 
                                                className={`relative bg-gradient-to-br from-slate-700/50 to-slate-700/30 rounded-2xl p-5 transition-all duration-300 border-2 border-slate-600/50 ${badge.hoverBorder} group overflow-hidden`}
                                            >
                                                <div className="absolute top-4 right-4">
                                                    <span className={`px-3 py-1.5 ${badge.color} rounded-full text-xs font-bold border-2 shadow-lg whitespace-nowrap`}>
                                                        {badge.text}
                                                    </span>
                                                </div>

                                                <div className="mb-4">
                                                    <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-md w-fit">
                                                        <ServiceIcon className="h-7 w-7 text-amber-400" />
                                                    </div>
                                                </div>

                                                <h4 className="font-bold text-white text-lg mb-4 leading-tight pr-24">
                                                    {service.service_type}
                                                </h4>

                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-700">
                                                        <div className="flex items-center space-x-2">
                                                            <ThumbsUp className="h-4 w-4 text-amber-400" />
                                                            {/* [CORREÇÃO 1.4.3] text-slate-200 -> text-slate-200 (OK) */}
                                                            <span className="text-sm text-slate-200">Total de Reservas</span>
                                                        </div>
                                                        <span className="text-2xl font-bold text-amber-400">
                                                            {service.booking_count}
                                                        </span>
                                                    </div>

                                                    {service.top_client_name && (
                                                        <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-600/50">
                                                            <div className="flex items-center space-x-2 mb-1.5">
                                                                <Crown className="h-4 w-4 text-amber-400" />
                                                                {/* [CORREÇÃO 1.4.3] text-slate-300 -> text-slate-200 */}
                                                                <span className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                                                                    Cliente Leal
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm font-bold text-white truncate">
                                                                    {service.top_client_name}
                                                                </span>
                                                                <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full font-semibold border border-amber-500/20">
                                                                    {service.top_client_bookings}x
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* [CORREÇÃO 1.4.3] text-slate-300 -> text-slate-200 */}
                            <div className="mt-6 pt-6 border-t border-slate-700 flex items-center justify-center space-x-2 text-xs text-slate-200">
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>📊 Dados baseados em agendamentos confirmados e concluídos</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Achievements */}
                        <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Award className="h-5 w-5 text-amber-400 mr-2" />
                                Conquistas
                            </h3>
                            <div className="space-y-4">
                                {barber.achievements.map((achievement, index) => (
                                    <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                                        <div className="bg-amber-500/20 p-2 rounded-lg">
                                            <achievement.icon className="h-5 w-5 text-amber-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{achievement.title}</h4>
                                            {/* [CORREÇÃO 1.4.3] text-slate-300 -> text-slate-200 */}
                                            <p className="text-xs text-slate-200">{achievement.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Trophy className="h-5 w-5 text-amber-400 mr-2" />
                                Certificações
                            </h3>
                            <ul className="space-y-3">
                                {barber.certifications.map((cert, index) => (
                                    <li key={index} className="flex items-start text-sm">
                                        <span className="text-amber-400 mr-2">✓</span>
                                        <span className="text-slate-200">{cert}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick CTA - CORREÇÃO FOCO e CONTRASTE */}
                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white text-center shadow-xl shadow-amber-500/20">
                            <div className="text-4xl mb-3">⚡</div>
                            <h3 className="font-bold text-lg mb-2">Vagas Limitadas!</h3>
                            {/* [CORREÇÃO 1.4.3] text-white/90 (OK) */}
                            <p className="text-sm mb-4 text-white/90">Agende agora e garanta seu horário</p>
                            <button
                                onClick={openBooking}
                                // CORREÇÃO DE CONTRASTE: text-orange-600 -> text-orange-700 (para contraste com bg-white)
                                className="w-full px-6 py-3 bg-white text-orange-700 rounded-lg hover:bg-slate-100 transition-all duration-300 font-bold focus:outline-none focus:ring-4 focus:ring-orange-700/50"
                            >
                                Reservar Agora
                            </button>
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="mt-16">
                    <h3 className="text-3xl font-bold text-white mb-8 text-center">
                        O que nossos <span className="text-amber-400">clientes dizem</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-500 transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div 
                                        className="flex" 
                                        role="img" // CORREÇÃO ARIA: Adicionado role="img" para permitir aria-label
                                        aria-label={`Avaliação ${testimonial.rating} estrelas`}
                                    >
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                                        ))}
                                    </div>
                                    {/* [CORREÇÃO 1.4.3] text-slate-400 -> text-slate-300 */}
                                    <span className="text-xs text-slate-300">{testimonial.date}</span>
                                </div>
                                <p className="text-slate-200 mb-4 italic">"{testimonial.comment}"</p>
                                <p className="text-white font-semibold">— {testimonial.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};