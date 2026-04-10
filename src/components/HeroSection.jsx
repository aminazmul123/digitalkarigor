import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// --- Sub-components ---

// --- Sub-components ---

// Split Text Animation Component - Optimized for performance
const SplitText = ({ text, className, delay = 0 }) => {
    const words = text.split(' ');
    return (
        <span className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.2em] pb-[0.2em]">
                    <motion.span
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: delay + i * 0.05, // Faster stagger
                            ease: [0.2, 0.65, 0.3, 0.9],
                        }}
                        className="inline-block will-change-transform"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
};

// Floating Visual Element - Added hardware acceleration
const FloatingVisual = ({ icon: Icon, color, delay, position }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
            y: [0, -15, 0],
        }}
        transition={{
            duration: 6,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        className={`absolute hidden lg:flex items-center justify-center p-3 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md will-change-transform ${position}`}
    >
        <Icon size={24} className={color} />
        <div className={`absolute inset-0 blur-xl -z-10 opacity-10 ${color.replace('text', 'bg')}`} />
    </motion.div>
);

// Infinite Logo Marquee - Simplified animation
const LogoMarquee = ({ text }) => {
    const logos = ["LuxeFashion", "SpicyBites", "IronGym", "EcoClean", "TechFlow", "UrbanStyle"];
    return (
        <div className="w-full overflow-hidden py-8 border-y border-white/5 bg-white/[0.01]">
            <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">{text}</p>
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }} // Use % for better resizing performance
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex gap-20 items-center px-10 will-change-transform"
                >
                    {[...logos, ...logos, ...logos].map((logo, i) => (
                        <span key={i} className="text-xl md:text-2xl font-black text-slate-700/30 select-none uppercase italic tracking-tighter">
                            {logo}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

// Stats Counter - Simplified logic with numeral localization
const StatItem = ({ label, value, suffix }) => {
    const { language } = useLanguage();
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    // Convert numbers to Bengali if language is BN
    const toBengaliNumber = (num) => {
        if (language !== 'bn') return num;
        const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return num.toString().replace(/\d/g, (d) => bengaliDigits[d]);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let start = 0;
                const end = parseInt(value);
                const duration = 1500;
                const stepTime = 50;
                const totalSteps = duration / stepTime;
                const increment = end / totalSteps;

                let timer = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        setCount(end);
                        clearInterval(timer);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, stepTime);
                observer.unobserve(ref.current);
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value]);

    return (
        <div ref={ref} className="text-center px-2">
            <div className="text-2xl md:text-4xl font-black text-white mb-1">
                {toBengaliNumber(count)}{suffix}
            </div>
            <div className="text-[9px] md:text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">
                {label}
            </div>
        </div>
    );
};

// --- Main Section ---

export default function HeroSection() {
    const { t } = useLanguage();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Mouse Tracking - Optimized damping
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { damping: 40, stiffness: 150 });
    const springY = useSpring(mouseY, { damping: 40, stiffness: 150 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set((clientX - innerWidth / 2) * 0.05);
            mouseY.set((clientY - innerHeight / 2) * 0.05);
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section ref={containerRef} className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden select-none">

            {/* --- Interactive Background --- */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <motion.div
                    style={{ x: springX, y: springY }}
                    className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] will-change-transform"
                />
                <motion.div
                    style={{ x: useTransform(springX, x => -x), y: useTransform(springY, y => -y) }}
                    className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[60px] will-change-transform"
                />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            {/* --- Content --- */}
            <motion.div
                style={{ y, opacity }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 will-change-transform"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm mb-6"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        {t.hero.badge}
                    </span>
                </motion.div>

                {/* Main Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
                    <SplitText text={t.hero.title} delay={0.1} />
                    <br />
                    <span className="inline-block mt-2 py-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-[length:200%_auto] animate-gradient-x px-2">
                        {t.hero.brand}
                    </span>
                </h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-medium"
                >
                    {t.hero.subtitle}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <a
                        href="#packages"
                        className="w-full sm:w-auto px-10 py-5 bg-white text-slate-950 rounded-xl font-black uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                    >
                        {t.hero.cta}
                        <ArrowRight size={20} />
                    </a>
                    <button className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-all border border-white/10 backdrop-blur-sm">
                        {t.hero.portfolio}
                    </button>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto pb-16 border-t border-white/5 pt-10">
                    <StatItem label={t.hero.stats.clients} value="50" suffix="+" />
                    <StatItem label={t.hero.stats.projects} value="200" suffix="+" />
                    <StatItem label={t.hero.stats.roi} value="300" suffix="%" />
                    <StatItem label={t.hero.stats.adspend} value="10" suffix="M+" />
                </div>
            </motion.div>

            {/* --- Floating Visual Elements --- */}
            <FloatingVisual icon={TrendingUp} color="text-cyan-400" delay={0} position="top-[15%] left-[5%]" />
            <FloatingVisual icon={ShieldCheck} color="text-purple-400" delay={1} position="top-[25%] right-[5%]" />
            <FloatingVisual icon={Sparkles} color="text-amber-400" delay={2} position="bottom-[20%] right-[10%]" />

            {/* --- Logo Marquee --- */}
            <LogoMarquee text={t.hero.trusted} />

        </section>
    );
}
