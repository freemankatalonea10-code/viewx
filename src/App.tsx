/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tv, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  MessageCircle, 
  Zap, 
  ShieldCheck, 
  Clock,
  ChevronRight,
  Star,
  PlayCircle
} from 'lucide-react';

// Types
interface Plan {
  id: string;
  name: string;
  duration: string;
  price: string;
  features: string[];
}

interface Server {
  id: string;
  name: string;
  description: string;
  logo: string;
  color: string;
  plans: Plan[];
}

const SERVERS: Server[] = [
  {
    id: 'elia_pro',
    name: 'ايليا برو',
    description: 'سيرفر متميز بجودة عالية وثبات فائق لجميع القنوات.',
    logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop&q=80',
    color: 'from-blue-600 to-cyan-500',
    plans: [
      { id: 'e1', name: 'باقة الشهر', duration: '1 شهر', price: '10$', features: ['جودة 4K/UHD', 'ثبات عالي جداً', 'دعم فني 24/7'] },
      { id: 'e2', name: 'باقة 6 أشهر', duration: '6 أشهر', price: '45$', features: ['جودة 4K/UHD', 'ثبات عالي جداً', 'توفير 15%'] },
      { id: 'e3', name: 'باقة السنة', duration: '12 شهر', price: '75$', features: ['جودة 4K/UHD', 'ثبات عالي جداً', 'توفير 35%'] },
    ]
  },
  {
    id: 'maxtv_pro',
    name: 'ماكس تي في برو',
    description: 'تجربة ترفيهية متكاملة لجميع أفراد العائلة مع مكتبة ضخمة.',
    logo: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=400&fit=crop&q=80',
    color: 'from-purple-600 to-indigo-500',
    plans: [
      { id: 'mp1', name: 'باقة الشهر', duration: '1 شهر', price: '12$', features: ['مكتبة أفلام ضخمة', 'قنوات أطفال متنوعة', 'جودة FHD/4K'] },
      { id: 'mp2', name: 'باقة 6 أشهر', duration: '6 أشهر', price: '55$', features: ['مكتبة أفلام ضخمة', 'قنوات أطفال متنوعة', 'توفير 20%'] },
      { id: 'mp3', name: 'باقة السنة', duration: '12 شهر', price: '90$', features: ['مكتبة أفلام ضخمة', 'قنوات أطفال متنوعة', 'توفير 40%'] },
    ]
  },
  {
    id: 'cobra',
    name: 'كوبرا',
    description: 'السيرفر الأشهر للمباريات والأفلام بجودة 4K وثبات ممتاز.',
    logo: 'https://images.unsplash.com/photo-1534531173927-aeb928d54385?w=400&h=400&fit=crop&q=80',
    color: 'from-orange-600 to-red-500',
    plans: [
      { id: 'c1', name: 'باقة الشهر', duration: '1 شهر', price: '10$', features: ['أكثر من 8000 قناة', 'ثبات وقت المباريات', 'جودة 4K/UHD'] },
      { id: 'c2', name: 'باقة 6 أشهر', duration: '6 أشهر', price: '45$', features: ['أكثر من 8000 قناة', 'ثبات وقت المباريات', 'توفير 15%'] },
      { id: 'c3', name: 'باقة السنة', duration: '12 شهر', price: '75$', features: ['أكثر من 8000 قناة', 'ثبات وقت المباريات', 'توفير 35%'] },
    ]
  },
  {
    id: 'pablo',
    name: 'بابلو',
    description: 'سيرفر قوي وسريع مع مكتبة ضخمة من المحتوى المتجدد.',
    logo: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop&q=80',
    color: 'from-emerald-600 to-teal-500',
    plans: [
      { id: 'p1', name: 'باقة الشهر', duration: '1 شهر', price: '10$', features: ['سرعة في التنقل', 'تحديثات يومية', 'جودة FHD/4K'] },
      { id: 'p2', name: 'باقة 6 أشهر', duration: '6 أشهر', price: '45$', features: ['سرعة في التنقل', 'تحديثات يومية', 'توفير 15%'] },
      { id: 'p3', name: 'باقة السنة', duration: '12 شهر', price: '75$', features: ['سرعة في التنقل', 'تحديثات يومية', 'توفير 35%'] },
    ]
  },
  {
    id: 'family',
    name: 'فاميلي',
    description: 'باقات عائلية متنوعة وقنوات أطفال آمنة ومحتوى ترفيهي.',
    logo: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop&q=80',
    color: 'from-pink-600 to-rose-500',
    plans: [
      { id: 'f1', name: 'باقة الشهر', duration: '1 شهر', price: '8$', features: ['محتوى عائلي آمن', 'سهولة الاستخدام', 'جودة HD/FHD'] },
      { id: 'f2', name: 'باقة 6 أشهر', duration: '6 أشهر', price: '35$', features: ['محتوى عائلي آمن', 'سهولة الاستخدام', 'توفير 25%'] },
      { id: 'f3', name: 'باقة السنة', duration: '12 شهر', price: '60$', features: ['محتوى عائلي آمن', 'سهولة الاستخدام', 'توفير 40%'] },
    ]
  },
  {
    id: 'hydra',
    name: 'هايدرا',
    description: 'قوة وثبات في البث المباشر لأهم الأحداث الرياضية العالمية.',
    logo: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=400&fit=crop&q=80',
    color: 'from-blue-700 to-indigo-600',
    plans: [
      { id: 'h1', name: 'باقة الشهر', duration: '1 شهر', price: '12$', features: ['بث مباشر بدون تأخير', 'قنوات رياضية حصرية', 'جودة 4K'] },
      { id: 'h2', name: 'باقة 6 أشهر', duration: '6 أشهر', price: '55$', features: ['بث مباشر بدون تأخير', 'قنوات رياضية حصرية', 'توفير 20%'] },
      { id: 'h3', name: 'باقة السنة', duration: '12 شهر', price: '90$', features: ['بث مباشر بدون تأخير', 'قنوات رياضية حصرية', 'توفير 40%'] },
    ]
  },
  {
    id: 'dar',
    name: 'دار',
    description: 'محتوى عربي وأجنبي متنوع يلبي جميع الأذواق والاهتمامات.',
    logo: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=400&fit=crop&q=80',
    color: 'from-amber-600 to-yellow-500',
    plans: [
      { id: 'd1', name: 'باقة الشهر', duration: '1 شهر', price: '9$', features: ['تنوع في القنوات', 'مكتبة أفلام مترجمة', 'جودة FHD'] },
      { id: 'd2', name: 'باقة 6 أشهر', duration: '6 أشهر', price: '40$', features: ['تنوع في القنوات', 'مكتبة أفلام مترجمة', 'توفير 25%'] },
      { id: 'd3', name: 'باقة السنة', duration: '12 شهر', price: '70$', features: ['تنوع في القنوات', 'مكتبة أفلام مترجمة', 'توفير 35%'] },
    ]
  },
  {
    id: 'tayara',
    name: 'طيارة',
    description: 'سرعة في التنقل بين القنوات وجودة بث مستقرة جداً.',
    logo: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400&h=400&fit=crop&q=80',
    color: 'from-sky-600 to-blue-500',
    plans: [
      { id: 't1', name: 'باقة الشهر', duration: '1 شهر', price: '10$', features: ['سرعة فائقة', 'ثبات دائم', 'جودة 4K'] },
      { id: 't2', name: 'باقة 6 أشهر', duration: '6 أشهر', price: '45$', features: ['سرعة فائقة', 'ثبات دائم', 'توفير 15%'] },
      { id: 't3', name: 'باقة السنة', duration: '12 شهر', price: '75$', features: ['سرعة فائقة', 'ثبات دائم', 'توفير 35%'] },
    ]
  }
];

const WHATSAPP_NUMBER = '9647856358181'; // Updated with user provided number

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Gray Ring - Broken at top and bottom */}
    <circle cx="50" cy="50" r="38" stroke="#94a3b8" strokeWidth="6" strokeDasharray="160 80" strokeLinecap="round" transform="rotate(-45 50 50)" />
    {/* Stylized X - Orange */}
    {/* Left parallel bars */}
    <path d="M35 65 L55 35" stroke="#f97316" strokeWidth="8" strokeLinecap="round" />
    <path d="M45 70 L65 40" stroke="#f97316" strokeWidth="8" strokeLinecap="round" />
    {/* Crossing bar */}
    <path d="M35 45 L75 65" stroke="#f97316" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

export default function App() {
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  const handleSubscribe = (serverName: string, planName: string, price: string) => {
    const message = `مرحباً، أود الاشتراك في سيرفر ${serverName} - باقة ${planName} بسعر ${price}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500/30" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="w-10 h-10" />
            <span className="text-xl font-bold tracking-tight">View <span className="text-orange-500">X</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#home" className="hover:text-white transition-colors">الرئيسية</a>
            <a href="#servers" className="hover:text-white transition-colors">السيرفرات</a>
            <a href="#features" className="hover:text-white transition-colors">المميزات</a>
            <button 
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
              className="px-5 py-2 bg-white text-black rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              تواصل معنا
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/10 rounded-full text-orange-400">
              View X - أفضل خدمة IPTV في المنطقة
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1]">
              عالم الترفيه <br /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-purple-600">
                بين يديك الآن
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              استمتع بمشاهدة جميع القنوات العالمية، المباريات المباشرة، وأضخم مكتبة أفلام ومسلسلات بجودة 4K وبدون تقطيع.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#servers"
                className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-700 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group"
              >
                اختر سيرفرك
                <ChevronRight className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
              </a>
              <button 
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
                استفسار سريع
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black">
              <img 
                src="https://picsum.photos/seed/iptv-hero/1200/600" 
                alt="IPTV Interface" 
                className="w-full h-auto object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <PlayCircle className="w-10 h-10 text-white fill-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "سرعة فائقة", desc: "سيرفرات قوية تضمن لك مشاهدة بدون تقطيع حتى مع الانترنت الضعيف." },
              { icon: ShieldCheck, title: "ثبات تام", desc: "نضمن لك استقرار الخدمة بنسبة 99.9% خاصة وقت المباريات الكبرى." },
              { icon: Clock, title: "دعم فني", desc: "فريق متخصص متواجد على مدار الساعة لمساعدتك في أي وقت." },
              { icon: Star, title: "جودة 4K", desc: "جميع القنوات والأفلام متوفرة بأعلى جودة ممكنة لتجربة سينمائية." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all"
              >
                <feature.icon className="w-10 h-10 text-orange-500 mb-6" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Servers Section */}
      <section id="servers" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">اختر السيرفر المناسب لك</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              نوفر لك أفضل السيرفرات العالمية الموثوقة، كل سيرفر يتميز بمميزات خاصة تناسب احتياجاتك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVERS.map((server) => (
              <motion.div
                key={server.id}
                layoutId={server.id}
                onClick={() => setSelectedServer(server)}
                className="group relative cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${server.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity rounded-3xl`} />
                <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all h-full flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${server.color} flex items-center justify-center mb-6 shadow-lg overflow-hidden`}>
                    <img 
                      src={server.logo} 
                      alt={server.name} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{server.name}</h3>
                  <p className="text-gray-400 text-sm mb-8 flex-grow">{server.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-orange-400">عرض الباقات</span>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal / Plans View */}
      <AnimatePresence>
        {selectedServer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedServer(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#121212] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border border-white/10 p-8 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <h2 className="text-4xl font-bold mb-2">{selectedServer.name}</h2>
                  <p className="text-gray-400">اختر الباقة التي تناسبك للاشتراك</p>
                </div>
                <button 
                  onClick={() => setSelectedServer(null)}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium transition-colors"
                >
                  إغلاق
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedServer.plans.map((plan) => (
                  <div 
                    key={plan.id}
                    className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col hover:border-orange-500/50 transition-all group"
                  >
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-gray-400 mb-2">{plan.name}</h4>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                        <span className="text-gray-500">/ {plan.duration}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-4 mb-10 flex-grow">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                          <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleSubscribe(selectedServer.name, plan.name, plan.price)}
                      className="w-full py-4 bg-orange-600 hover:bg-orange-700 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                    >
                      <MessageCircle className="w-5 h-5" />
                      اشترك عبر واتساب
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Devices Section */}
      <section className="py-24 bg-gradient-to-b from-transparent to-orange-500/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">يعمل على جميع أجهزتك</h2>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            <div className="flex flex-col items-center gap-4">
              <Monitor className="w-16 h-16 text-gray-500" />
              <span className="font-medium">Smart TV</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Smartphone className="w-16 h-16 text-gray-500" />
              <span className="font-medium">Mobile & Tablet</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Tv className="w-16 h-16 text-gray-500" />
              <span className="font-medium">TV Box</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Monitor className="w-16 h-16 text-gray-500" />
              <span className="font-medium">Laptop & PC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="text-xl font-bold">View <span className="text-orange-500">X</span></span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 جميع الحقوق محفوظة. View X</p>
          <div className="flex gap-6">
            <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')} className="text-gray-400 hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
        className="fixed bottom-8 left-8 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 hover:bg-green-600 transition-colors"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
}
