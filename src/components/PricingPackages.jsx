import React, { useRef } from 'react';
import { CheckCircle2, Zap, PlayCircle, Star, Sparkles, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- Sub-components ---

const PricingCard = ({ pkg, index, t }) => {
    const { language } = useLanguage();
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { damping: 20, stiffness: 300 });
    const mouseYSpring = useSpring(y, { damping: 20, stiffness: 300 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Convert numbers to Bengali if language is BN
    const toBengaliNumber = (numStr) => {
        if (language !== 'bn') return numStr;
        const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return numStr.replace(/\d/g, (d) => bengaliDigits[d]);
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

    const handleSelect = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
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
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
            className={`group relative flex flex-col rounded-[2.5rem] border bg-slate-900/40 p-8 shadow-2xl transition-all duration-500 hover:bg-slate-900/60 ${pkg.border} ${pkg.popular ? 'md:scale-110 z-10 border-cyan-500/50' : ''}`}
        >
            {/* Holographic Shine Effect */}
            <motion.div
                style={{
                    background: useTransform(
                        [mouseXSpring, mouseYSpring],
                        ([x, y]) => `radial-gradient(circle at ${50 + x * 100}% ${50 + y * 100}%, rgba(255,255,255,0.15) 0%, transparent 70%)`
                    )
                }}
                className="absolute inset-0 pointer-events-none rounded-[2.5rem] transition-opacity opacity-0 group-hover:opacity-100"
            />

            {pkg.popular && (
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] shadow-xl shadow-cyan-500/30 whitespace-nowrap"
                >
                    <Sparkles size={14} className="animate-pulse" />
                    {pkg.badge}
                </motion.div>
            )}

            <div className="flex items-center gap-4 mb-8" style={{ transform: "translateZ(60px)" }}>
                <div className={`p-4 rounded-2xl bg-slate-950/50 border ${pkg.border} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:border-white/20`}>
                    {pkg.icon}
                </div>
                <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{pkg.name}</h3>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{t.packages.tier}</div>
                </div>
            </div>

            <div className="mb-10" style={{ transform: "translateZ(90px)" }}>
                <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-white tracking-tighter transition-transform group-hover:scale-105 inline-block text-nowrap">
                        {toBengaliNumber(pkg.price)}
                    </span>
                    <div className="flex flex-col">
                        <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">BDT</span>
                        <span className="text-cyan-500 font-black text-sm uppercase tracking-tighter">{t.packages.monthly}</span>
                    </div>
                </div>
            </div>

            <div className="h-px bg-white/5 w-full mb-8" />

            {/* Staggered Features */}
            <ul className="space-y-4 mb-10 flex-1" style={{ transform: "translateZ(40px)" }}>
                {pkg.features.map((feature, idx) => (
                    <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.1) + (idx * 0.1) + 0.5 }}
                        className="group/item flex items-start gap-4 text-slate-400 transition-colors hover:text-white"
                    >
                        <div className="mt-1 flex-shrink-0 relative">
                            <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                            <div className="absolute inset-0 bg-cyan-500/30 blur-md opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm md:text-base leading-relaxed font-semibold">{feature}</span>
                    </motion.li>
                ))}
            </ul>

            <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSelect}
                style={{ transform: "translateZ(50px)" }}
                className={`group/btn relative w-full py-5 rounded-[1.5rem] font-black text-lg text-white overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${pkg.buttonColor} transition-all duration-300`}
            >
                <div className="relative z-10 flex items-center justify-center gap-3">
                    {t.packages.choose}
                    <Navigation size={20} className="rotate-90 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </div>
                {/* Button Shine Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
            </motion.button>
        </motion.div>
    );
};

export default function PricingPackages() {
    const { t } = useLanguage();

    const packages = [
        {
            id: 'budget',
            ...t.packages.bugetSaver,
            icon: <Star className="w-8 h-8 text-amber-500" />,
            border: "border-amber-700/20",
            buttonColor: "bg-slate-800 hover:bg-slate-700"
        },
        {
            id: 'daily',
            ...t.packages.daily,
            popular: true,
            icon: <Zap className="w-8 h-8 text-cyan-400" />,
            border: "border-cyan-500/30",
            buttonColor: "bg-gradient-to-r from-blue-600 to-cyan-500"
        },
        {
            id: 'video',
            ...t.packages.videoPower,
            icon: <PlayCircle className="w-8 h-8 text-purple-400" />,
            border: "border-purple-600/20",
            buttonColor: "bg-slate-800 hover:bg-slate-700"
        }
    ];

    return (
        <section id="packages" className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-4"
                    >
                        {t.packages.starting}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-white leading-[0.9] tracking-tighter mb-6"
                    >
                        {t.packages.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto font-medium"
                    >
                        {t.packages.subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 relative z-10 perspective-[1000px]">
                    {packages.map((pkg, index) => (
                        <PricingCard key={index} pkg={pkg} index={index} t={t} />
                    ))}
                </div>

                {/* Footer simple text */}
                <div className="mt-20 text-center">
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-[0.2em]">
                        {t.packages.custom} <a href="#contact" className="text-cyan-500 hover:underline">{t.packages.contactUs}</a>
                    </p>
                </div>
            </div>
        </section>
    );
}
