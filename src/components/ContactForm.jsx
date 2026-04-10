import React, { useState } from 'react';
import { Send, MessageSquare, Phone, User, Layout, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function ContactForm() {
    const { t } = useLanguage();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        package: 'Daily Package'
    });
    const [isHovered, setIsHovered] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate a small delay for feedback
        await new Promise(resolve => setTimeout(resolve, 800));

        triggerConfetti();

        const phoneNumber = "8801890868955";
        const message = `Hello Digital Karigor!%0AMy Name: ${formData.name}%0APhone: ${formData.phone}%0AInterested Package: ${formData.package}%0APlease let me know more details.`;
        const url = `https://wa.me/${phoneNumber}?text=${message}`;

        // Open WhatsApp
        window.open(url, '_blank');

        setIsSubmitting(false);
        // Reset or show success state
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const stepVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    };

    return (
        <section id="contact" className="relative py-32 bg-slate-950 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[120px]" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Visual Content Column */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black uppercase tracking-[0.2em] mb-6"
                        >
                            <Sparkles size={14} className="fill-green-400" />
                            {t.contact.badge}
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8"
                        >
                            {t.cta.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-slate-400 font-medium leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0"
                        >
                            {t.cta.subtitle}
                        </motion.p>

                        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mx-0">
                            {[
                                { icon: MessageSquare, label: t.contact.chat, sub: t.contact.subChat },
                                { icon: Phone, label: t.contact.call, sub: t.contact.subCall }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md"
                                >
                                    <item.icon size={24} className="text-cyan-400 mb-4" />
                                    <div className="text-sm font-black text-white uppercase tracking-tighter">{item.label}</div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">{item.sub}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="lg:w-1/2 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Form Card */}
                            <div className="relative z-10 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden">

                                {/* Progress Bar */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                                    <motion.div
                                        className="h-full bg-cyan-500"
                                        initial={{ width: "33%" }}
                                        animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
                                    />
                                </div>

                                <motion.form onSubmit={handleSubmit} className="space-y-8 mt-4">
                                    <AnimatePresence mode="wait">
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                variants={stepVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="space-y-6"
                                            >
                                                <div className="space-y-4">
                                                    <h3 className="text-2xl font-black text-white uppercase italic">{t.contact.step1}</h3>
                                                    <div className="group space-y-2">
                                                        <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-[0.2em] px-2 transition-colors group-focus-within:text-cyan-400">
                                                            <User size={14} /> {t.contact.nameLabel}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            required
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            placeholder={t.contact.namePlaceholder}
                                                            className="w-full px-8 py-5 bg-white/[0.03] border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all placeholder:text-slate-700 font-bold"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    disabled={!formData.name}
                                                    className="w-full py-5 rounded-2xl bg-white/10 text-white font-black uppercase tracking-widest hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {t.contact.next}
                                                </button>
                                            </motion.div>
                                        )}

                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                variants={stepVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="space-y-6"
                                            >
                                                <div className="space-y-4">
                                                    <h3 className="text-2xl font-black text-white uppercase italic">{t.contact.step2}</h3>
                                                    <div className="group space-y-2">
                                                        <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-[0.2em] px-2 transition-colors group-focus-within:text-cyan-400">
                                                            <Phone size={14} /> {t.contact.phoneLabel}
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            required
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            placeholder={t.contact.phonePlaceholder}
                                                            className="w-full px-8 py-5 bg-white/[0.03] border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all placeholder:text-slate-700 font-bold"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <button type="button" onClick={prevStep} className="flex-1 py-5 rounded-2xl bg-white/5 text-slate-400 font-black uppercase tracking-widest hover:bg-white/10 transition-all text-xs">{t.contact.prev}</button>
                                                    <button
                                                        type="button"
                                                        onClick={nextStep}
                                                        disabled={!formData.phone}
                                                        className="flex-[2] py-5 rounded-2xl bg-white/10 text-white font-black uppercase tracking-widest hover:bg-white/20 transition-all disabled:opacity-50"
                                                    >
                                                        {t.contact.final}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                variants={stepVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="space-y-6"
                                            >
                                                <div className="space-y-4">
                                                    <h3 className="text-2xl font-black text-white uppercase italic">{t.contact.step3}</h3>
                                                    <div className="grid grid-cols-1 gap-3">
                                                        {[
                                                            { id: 'Budget Saver', label: t.packages.bugetSaver.name },
                                                            { id: 'Daily Package', label: t.packages.daily.name },
                                                            { id: 'Video Power', label: t.packages.videoPower.name },
                                                            { id: 'Custom', label: t.contact.packageCustom }
                                                        ].map((item) => (
                                                            <label
                                                                key={item.id}
                                                                className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${formData.package === item.id
                                                                    ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                                                                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/30'
                                                                    }`}
                                                            >
                                                                <span className="font-bold uppercase tracking-tight text-sm">{item.label}</span>
                                                                <input
                                                                    type="radio"
                                                                    name="package"
                                                                    value={item.id}
                                                                    checked={formData.package === item.id}
                                                                    onChange={handleChange}
                                                                    className="hidden"
                                                                />
                                                                {formData.package === item.id && <CheckCircle2 size={18} className="text-cyan-400" />}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex gap-4 pt-4">
                                                    <button type="button" onClick={prevStep} className="flex-1 py-5 rounded-2xl bg-white/5 text-slate-400 font-black uppercase tracking-widest hover:bg-white/10 transition-all text-xs">{t.contact.prev}</button>

                                                    <motion.button
                                                        type="submit"
                                                        onHoverStart={() => setIsHovered(true)}
                                                        onHoverEnd={() => setIsHovered(false)}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        disabled={isSubmitting}
                                                        className="flex-[2] relative overflow-hidden rounded-2xl bg-green-600 py-5 font-black text-white shadow-2xl transition-all hover:bg-green-500 disabled:opacity-50"
                                                    >
                                                        <AnimatePresence mode="wait">
                                                            <motion.div
                                                                key={isSubmitting ? 'submitting' : isHovered ? 'hover' : 'initial'}
                                                                initial={{ y: 20, opacity: 0 }}
                                                                animate={{ y: 0, opacity: 1 }}
                                                                exit={{ y: -20, opacity: 0 }}
                                                                className="flex items-center justify-center gap-3"
                                                            >
                                                                {isSubmitting ? (
                                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                                ) : (
                                                                    <Send size={22} className={isHovered ? 'animate-bounce' : ''} />
                                                                )}
                                                                <span className="text-sm uppercase tracking-widest">{t.contact.submit}</span>
                                                            </motion.div>
                                                        </AnimatePresence>
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.form>
                            </div>

                            {/* Background Elements behind card */}
                            <div className="absolute -inset-10 bg-gradient-to-tr from-green-500/20 via-transparent to-blue-500/20 blur-[100px] -z-10" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
