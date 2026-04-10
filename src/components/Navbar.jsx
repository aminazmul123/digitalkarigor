import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, Phone, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

// Magnetic Button Component
function MagneticButton({ children, className, ...props }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.15);
        y.set((e.clientY - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={className}
            {...props}
        >
            {children}
        </motion.a>
    );
}

// Language Flip Toggle
function LanguageToggle({ language, toggleLanguage }) {
    return (
        <motion.button
            onClick={toggleLanguage}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Globe size={14} className="relative z-10" />
            <AnimatePresence mode="wait">
                <motion.span
                    key={language}
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium relative z-10"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {language === 'en' ? 'বাংলা' : 'EN'}
                </motion.span>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
    );
}

export default function Navbar() {
    const { t, language, toggleLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();

    // Performance: Use transforms instead of re-renders where possible
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsScrolled(latest > 20);
        });
    }, [scrollY]);

    const navLinks = [
        { name: t.nav.home, href: '#' },
        { name: t.nav.packages, href: '#packages' },
        { name: t.nav.features, href: '#features' },
    ];

    // Smooth scroll progress for the top bar
    const scrollProgress = useSpring(useTransform(scrollY, [0, 500, 2000], [0, 0.5, 1]), {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            {/* Background Overlay - Optimized with Framer Motion opacity */}
            <motion.div
                className="fixed top-0 left-0 right-0 z-40 h-20 bg-slate-950/60 backdrop-blur-xl pointer-events-none"
                style={{ opacity: useTransform(scrollY, [0, 20], [0, 1]) }}
            />

            {/* Main Navigation */}
            <motion.nav
                layout
                initial={false}
                className={`fixed z-50 left-0 right-0 will-change-transform ${isScrolled ? 'top-4 px-4 h-14' : 'top-0 px-0 h-20'
                    }`}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    layout
                    className={`mx-auto h-full flex items-center justify-between relative will-change-transform ${isScrolled
                            ? 'bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-full shadow-2xl px-6 max-w-4xl'
                            : 'max-w-7xl px-4 sm:px-6 lg:px-8'
                        }`}
                >
                    {/* Rainbow Border Container - Optimized */}
                    {isScrolled && (
                        <motion.div
                            layoutId="rainbow-border"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            className="absolute -inset-[1px] rounded-full -z-10 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                        />
                    )}

                    {/* Logo Area */}
                    <div className="flex-shrink-0 flex items-center gap-2 mr-4">
                        <div className="relative">
                            <img
                                src="/logo.jpg"
                                alt="Digital Karigor"
                                className={`rounded-xl object-contain relative z-10 ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'}`}
                            />
                            <div className="absolute inset-0 bg-cyan-500/20 rounded-xl blur-md -z-10" />
                        </div>
                        <motion.span
                            layout
                            className={`font-bold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent origin-left ${isScrolled ? 'text-base hidden sm:block' : 'text-xl'
                                }`}
                        >
                            Digital Karigor
                        </motion.span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`px-3 py-1.5 rounded-full transition-all text-sm font-medium ${isScrolled
                                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                                    : 'text-slate-300 hover:text-white'
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}

                        <div className="w-px h-4 bg-slate-700/50 mx-2" />

                        <LanguageToggle language={language} toggleLanguage={toggleLanguage} />

                        <MagneticButton
                            href="#contact"
                            className="ml-2 relative overflow-hidden bg-blue-600 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-lg hover:bg-blue-500 flex items-center gap-2 text-sm group"
                        >
                            <Phone size={14} />
                            <span>{t.nav.contact}</span>
                        </MagneticButton>
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center gap-2">
                        <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-slate-300 hover:text-white"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </motion.div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="md:hidden absolute top-full left-0 right-0 mt-4 mx-4 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 shadow-2xl"
                        >
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-slate-300 hover:text-white py-2"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <a
                                    href="#contact"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-blue-600 text-white text-center py-3 rounded-2xl font-bold mt-2"
                                >
                                    {t.nav.contact}
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Scroll Progress Indicator - Fixed Performance */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-0.5 bg-cyan-500 z-[60] origin-left"
                style={{ scaleX: scrollProgress }}
            />
        </>
    );
}

