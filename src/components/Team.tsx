// src/components/Team.tsx

import { Star, Award, Clock, TrendingUp, Scissors, Users, Heart, Target, Sparkles, Trophy, Calendar } from "lucide-react";

export const Team = () => {
    // Dados do profissional - virá do Supabase
    const barber = {
        name: "Carlos Silva",
        role: "Fundador & Barbeiro Master",
        experience: 8,
        rating: 4.9,
        reviewCount: 234,
        totalClients: 500,
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop",
        bio: "Com 8 anos de experiência e mais de 500 clientes atendidos, transformo cada corte em uma experiência única. Especialista em cortes clássicos, modernos e barbas elaboradas.",
        certifications: [
            "Certificado Internacional de Barbeiro",
            "Especialização em Design de Barba",
            "Formação em Tricologia Capilar"
        ],
        specialties: [
            { name: "Cortes Clássicos", icon: Scissors, level: 95 },
            { name: "Barbas Elaboradas", icon: Sparkles, level: 98 },
            { name: "Design Capilar", icon: Target, level: 92 },
            { name: "Atendimento Premium", icon: Heart, level: 100 }
        ],
        achievements: [
            { icon: Trophy, title: "Melhor Barbeiro 2023", description: "Prêmio Regional" },
            { icon: Users, title: "500+ Clientes", description: "Atendidos com excelência" },
            { icon: Star, title: "4.9 Estrelas", description: "Média de avaliações" },
            { icon: TrendingUp, title: "98% Retorno", description: "Taxa de fidelização" }
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

    const openBooking = () => {
        // Dispara o evento global 'openBooking' para abrir o modal de agendamento.
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
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
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
                                        alt={barber.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold shadow-lg flex items-center">
                                            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                                            Disponível Agora
                                        </span>
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
                                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                                            <span className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {barber.experience} anos
                                            </span>
                                            <span className="flex items-center">
                                                <Users className="h-4 w-4 mr-1" />
                                                {barber.totalClients}+ clientes
                                            </span>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center mb-6 pb-6 border-b border-slate-700">
                                        <div className="flex mr-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-5 w-5 text-amber-400 fill-amber-400"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-white font-bold text-lg">{barber.rating}</span>
                                        <span className="text-slate-400 ml-2">({barber.reviewCount} avaliações)</span>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-slate-300 leading-relaxed mb-6">
                                        {barber.bio}
                                    </p>

                                    {/* CTA Button */}
                                    <button
                                        onClick={openBooking}
                                        className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 font-bold flex items-center justify-center text-lg"
                                    >
                                        <Calendar className="h-5 w-5 mr-2" />
                                        Agendar com {barber.name.split(' ')[0]}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Specialties */}
                        <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-8 mt-8">
                            <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <Sparkles className="h-6 w-6 text-amber-400 mr-2" />
                                Especialidades
                            </h4>
                            <div className="space-y-6">
                                {barber.specialties.map((specialty, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <specialty.icon className="h-5 w-5 text-amber-400 mr-2" />
                                                <span className="font-semibold text-white">{specialty.name}</span>
                                            </div>
                                            <span className="text-amber-400 font-bold">{specialty.level}%</span>
                                        </div>
                                        <div className="w-full bg-slate-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all duration-1000"
                                                style={{ width: `${specialty.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Achievements */}
                        <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6">
                            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Award className="h-5 w-5 text-amber-400 mr-2" />
                                Conquistas
                            </h4>
                            <div className="space-y-4">
                                {barber.achievements.map((achievement, index) => (
                                    <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                                        <div className="bg-amber-500/20 p-2 rounded-lg">
                                            <achievement.icon className="h-5 w-5 text-amber-400" />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-white text-sm">{achievement.title}</h5>
                                            <p className="text-xs text-slate-400">{achievement.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6">
                            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Trophy className="h-5 w-5 text-amber-400 mr-2" />
                                Certificações
                            </h4>
                            <ul className="space-y-3">
                                {barber.certifications.map((cert, index) => (
                                    <li key={index} className="flex items-start text-sm">
                                        <span className="text-amber-400 mr-2">✓</span>
                                        <span className="text-slate-300">{cert}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick CTA */}
                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white text-center">
                            <div className="text-4xl mb-3">⚡</div>
                            <h4 className="font-bold text-lg mb-2">Vagas Limitadas!</h4>
                            <p className="text-sm mb-4 text-white/90">Agende agora e garanta seu horário</p>
                            <button
                                onClick={openBooking}
                                className="w-full px-6 py-3 bg-white text-orange-600 rounded-lg hover:bg-slate-100 transition-all duration-300 font-bold"
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
                                    <div className="flex">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                                        ))}
                                    </div>
                                    <span className="text-xs text-slate-500">{testimonial.date}</span>
                                </div>
                                <p className="text-slate-300 mb-4 italic">"{testimonial.comment}"</p>
                                <p className="text-white font-semibold">— {testimonial.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};