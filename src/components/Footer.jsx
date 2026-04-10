import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Instagram, Linkedin, Mail, Phone, Rocket, Zap, Heart, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Footer() {
    const { t } = useLanguage();
    const footerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"]
    });

    const rocketY = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer ref={footerRef} className="relative bg-slate-950 pt-32 pb-12 overflow-hidden border-t border-white/5">
            {/* Background cinematic elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Final CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative mb-32 p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl transition-all group-hover:scale-150" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl text-center md:text-left">
                            <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-6 uppercase">
                                {t.cta.dominate}
                            </h2>
                            <p className="text-xl text-slate-400 font-bold italic">
                                "{t.cta.subtitle}"
                            </p>
                        </div>
                        <motion.button
                            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-6 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-white/50 transition-all"
                        >
                            {t.cta.button} <ArrowRight size={20} />
                        </motion.button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20 items-start">

                    {/* Brand Section */}
                    <div className="md:col-span-12 lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-10"
                        >
                            <div className="relative group">
                                <img src="/logo.jpg" alt="Digital Karigor" className="w-16 h-16 rounded-[1.5rem] object-contain relative z-10 transition-transform group-hover:scale-110 shadow-2xl" />
                                <div className="absolute inset-0 bg-cyan-500/40 rounded-[1.5rem] blur-xl -z-10 group-hover:blur-2xl transition-all" />
                            </div>
                            <div>
                                <span className="text-white font-black text-3xl tracking-tighter uppercase italic block leading-none">Digital</span>
                                <span className="text-cyan-500 font-black text-3xl tracking-tighter uppercase italic block leading-none">Karigor</span>
                            </div>
                        </motion.div>
                        <p className="text-slate-400 max-w-sm mb-12 font-medium leading-relaxed text-lg">
                            {t.footer.bio}
                        </p>

                        {/* Magnetic Social Links */}
                        <div className="flex gap-5">
                            {[
                                { icon: Facebook, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: Linkedin, href: "#" }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    whileHover={{ y: -8, scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
                                    className="p-4 bg-white/[0.02] border border-white/5 rounded-3xl text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all shadow-2xl backdrop-blur-md relative group"
                                >
                                    <social.icon size={24} />
                                    <div className="absolute inset-0 bg-cyan-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-4 lg:col-span-3">
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                            {t.footer.services}
                        </h4>
                        <ul className="space-y-6 font-bold text-slate-500">
                            {t.footer.serviceList.map((item, i) => (
                                <motion.li key={i} whileHover={{ x: 10 }} className="transition-all">
                                    <a href="#" className="hover:text-cyan-400 transition-all flex items-center group">
                                        <div className="w-0 group-hover:w-4 h-0.5 bg-cyan-500 mr-0 transition-all group-hover:mr-3" />
                                        {item}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-4 lg:col-span-3">
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                            {t.footer.contact}
                        </h4>
                        <ul className="space-y-8">
                            <motion.li whileHover={{ x: 5 }} className="group">
                                <a href="mailto:hello@digitalkarigor.com" className="flex items-center gap-5 text-slate-400 group-hover:text-white transition-all">
                                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-purple-500/50 transition-all shadow-lg">
                                        <Mail size={20} className="text-purple-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">{t.footer.emailUs}</span>
                                        <span className="text-sm font-bold lowercase">hello@digitalkarigor.com</span>
                                    </div>
                                </a>
                            </motion.li>
                            <motion.li whileHover={{ x: 5 }} className="group">
                                <a href="tel:+8801890868955" className="flex items-center gap-5 text-slate-400 group-hover:text-white transition-all">
                                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-cyan-500/50 transition-all shadow-lg">
                                        <Phone size={20} className="text-cyan-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">{t.footer.callUs}</span>
                                        <span className="text-sm font-bold">+880 1890 868955</span>
                                    </div>
                                </a>
                            </motion.li>
                        </ul>
                    </div>

                    {/* Back to Top Rocket */}
                    <div className="md:col-span-4 lg:col-span-2 hidden lg:flex justify-end pt-12">
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.15, rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative group p-6 rounded-full bg-white/[0.03] border border-white/10 flex flex-col items-center gap-4 transition-all hover:border-cyan-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.2)]"
                        >
                            <motion.div style={{ y: rocketY }}>
                                <Rocket size={40} className="text-white group-hover:text-cyan-400 group-hover:animate-bounce transition-colors" />
                            </motion.div>
                            <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-white tracking-[0.3em] transition-colors">{t.footer.launch}</span>

                            {/* Animated ring */}
                            <div className="absolute inset-0 border-2 border-cyan-500/0 rounded-full group-hover:animate-ping opacity-20" />
                        </motion.button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4 text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] bg-white/[0.02] px-6 py-3 rounded-full border border-white/5">
                        <Zap size={16} className="text-amber-500 fill-amber-500 animate-pulse" />
                        {t.footer.excellence}
                    </div>

                    <div className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] flex flex-wrap items-center justify-center gap-6">
                        <span className="hover:text-slate-400 transition-colors cursor-default">© Digital Karigor. {t.footer.rights}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                        <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                            {t.footer.builtWith} <Heart size={12} className="text-red-500 fill-red-500 animate-beat" /> {t.footer.inDhaka}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                        <span className="text-slate-700">{t.footer.craftsmanship}</span>
                    </div>
                </div>
            </div>

            {/* Ultra-subtle custom cursor follower for footer */}
            <div className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none font-black text-9xl text-white select-none overflow-hidden uppercase">
                {t.hero.brand.split(' ')[1] || t.hero.brand}
            </div>
        </footer>
    );
}
