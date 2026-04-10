import React, { useRef } from 'react';
import { Palette, Video, BarChart3, Zap, Globe, Shield, Rocket, Target, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- Sub-components ---

const BentoCard = ({ icon: Icon, title, desc, className, delay = 0, color = "cyan", t }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const colorVariants = {
        cyan: "from-cyan-500/10 to-blue-500/10 border-cyan-500/20 group-hover:border-cyan-500/50 text-cyan-400",
        purple: "from-purple-500/10 to-pink-500/10 border-purple-500/20 group-hover:border-purple-500/50 text-purple-400",
        amber: "from-amber-500/10 to-orange-500/10 border-amber-500/20 group-hover:border-amber-500/50 text-amber-400",
        green: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20 group-hover:border-emerald-500/50 text-emerald-400"
    };

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay }}
            className={`group relative overflow-hidden rounded-[2.5rem] border bg-slate-900/40 p-8 transition-all hover:bg-slate-900/60 shadow-2xl ${className} ${colorVariants[color]}`}
        >
            {/* Background Glow */}
            <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[100px] transition-opacity opacity-20 group-hover:opacity-40 bg-gradient-to-br ${colorVariants[color].split('text')[0]}`} />

            <div className="relative z-10 flex h-full flex-col justify-between" style={{ transform: "translateZ(50px)" }}>
                <div>
                    <motion.div
                        initial={{ scale: 0.8, rotate: -10 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: delay + 0.2
                        }}
                        className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/10`}
                    >
                        <Icon size={32} className="group-hover:animate-pulse" />
                    </motion.div>
                    <h3 className="mb-3 text-2xl font-black text-white tracking-tight leading-none">{title}</h3>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">{desc}</p>
                </div>

                {/* Decorative Element */}
                <div className="mt-8 flex items-center gap-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{t.features.approach}</span>
                    <div className="h-px flex-1 bg-white/10" />
                </div>
            </div>

            {/* Shine effect on mouse move */}
            <motion.div
                style={{
                    background: useTransform(
                        [mouseXSpring, mouseYSpring],
                        ([x, y]) => `radial-gradient(circle at ${50 + x * 100}% ${50 + y * 100}%, rgba(255,255,255,0.05) 0%, transparent 60%)`
                    )
                }}
                className="absolute inset-0 pointer-events-none rounded-[2.5rem]"
            />
        </motion.div>
    );
};

export default function WhyChooseUs() {
    const { t } = useLanguage();

    return (
        <section id="features" className="relative py-32 overflow-hidden bg-slate-950">
            {/* Perspective container for 3D cards */}
            <div className="absolute inset-0 z-0 pointer-events-none perspective-[2000px]" />

            {/* Background Accents */}
            <div className="absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-cyan-600/5 blur-[150px] -z-10" />
            <div className="absolute bottom-1/2 left-0 h-[600px] w-[600px] rounded-full bg-purple-600/5 blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="mb-24 text-center md:text-left flex flex-col md:flex-row items-end justify-between gap-12">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 backdrop-blur-md"
                        >
                            <Target size={14} className="animate-spin-slow" />
                            {t.features.badge}
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.85] tracking-tighter"
                        >
                            {t.features.title}
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-md md:text-right"
                    >
                        <p className="text-xl text-slate-400 font-bold mb-4 italic leading-tight">
                            "{t.features.desc}"
                        </p>
                        <div className="flex gap-2 md:justify-end">
                            <span className="w-12 h-1 bg-cyan-500 rounded-full" />
                            <span className="w-4 h-1 bg-cyan-500/20 rounded-full" />
                        </div>
                    </motion.div>
                </div>

                {/* Bento Grid Layout - Perspective Container */}
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 perspective-[2000px]">
                    {/* Featured Box 1 - Premium Designs */}
                    <BentoCard
                        icon={Palette}
                        title={t.features.items[0].title}
                        desc={t.features.items[0].desc}
                        className="md:col-span-3 lg:col-span-8"
                        color="cyan"
                        delay={0.1}
                        t={t}
                    />

                    {/* Featured Box 2 - Strategy */}
                    <BentoCard
                        icon={Shield}
                        title={t.features.items[3].title}
                        desc={t.features.items[3].desc}
                        className="md:col-span-3 lg:col-span-4"
                        color="purple"
                        delay={0.2}
                        t={t}
                    />

                    {/* Featured Box 3 - Videos */}
                    <BentoCard
                        icon={Video}
                        title={t.features.items[1].title}
                        desc={t.features.items[1].desc}
                        className="md:col-span-3 lg:col-span-4"
                        color="amber"
                        delay={0.3}
                        t={t}
                    />

                    {/* Featured Box 4 - Dominance */}
                    <BentoCard
                        icon={BarChart3}
                        title={t.features.items[2].title}
                        desc={t.features.items[2].desc}
                        className="md:col-span-3 lg:col-span-5"
                        color="green"
                        delay={0.4}
                        t={t}
                    />

                    {/* Featured Box 5 - ROI */}
                    <BentoCard
                        icon={Rocket}
                        title={t.features.items[4].title}
                        desc={t.features.items[4].desc}
                        className="md:col-span-6 lg:col-span-3"
                        color="cyan"
                        delay={0.5}
                        t={t}
                    />
                </div>

                {/* Floating Decorative Orbs */}
                <div className="absolute top-1/2 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-0 translate-x-1/3 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px] -z-10" />
            </div>
        </section>
    );
}
