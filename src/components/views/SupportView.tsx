import React, { useState } from 'react';

interface SupportViewProps {
  onOpenEmergency: () => void;
}

export const SupportView: React.FC<SupportViewProps> = ({ onOpenEmergency }) => {
  const [messages, setMessages] = useState<
    { sender: 'bot' | 'user'; text: string; time: string }[]
  >([
    {
      sender: 'bot',
      text: 'Marhaba! Welcome to Super Key AI Support. How can I assist you with your insurance policy, claims, or rates in Iraq today?',
      time: 'Just now',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: now },
    ]);
    setInputMsg('');

    // Simulate smart bot response
    setTimeout(() => {
      let botAnswer =
        'Thank you for contacting Super Key. For immediate claims, you can file directly under the Claims tab. All policies include digital QR codes accepted by traffic authorities across Iraq.';

      const lower = userText.toLowerCase();
      if (lower.includes('zain') || lower.includes('pay') || lower.includes('fib') || lower.includes('iqd')) {
        botAnswer =
          'We support Zain Cash, Qi Card, FIB (First Iraqi Bank), and Visa/Mastercard. Payments in IQD are processed instantly with automatic policy issuance.';
      } else if (lower.includes('claim') || lower.includes('accident')) {
        botAnswer =
          'In case of a traffic accident, please call Traffic Police (144) or tap "Emergency Hotline" in Super Key. Then upload photos under the Claims tab for 24-hour reimbursement.';
      } else if (lower.includes('health') || lower.includes('clinic') || lower.includes('doctor')) {
        botAnswer =
          'Our Family Health Plus policy provides direct billing at 500+ clinics across Baghdad, Erbil, Basra, and Sulaymaniyah. Just present your digital QR code!';
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: botAnswer, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    }, 800);
  };

  const faqs = [
    {
      q: 'How do I pay for my insurance in Iraqi Dinars (IQD)?',
      a: 'Super Key integrates with Zain Cash, First Iraqi Bank (FIB), Qi Card, and standard Credit/Debit Cards. You can complete payments in seconds and receive your official digital certificate instantly.',
    },
    {
      q: 'Are Super Key digital insurance certificates accepted in Iraq?',
      a: 'Yes! Super Key digital policy certificates include anti-tamper QR codes that are officially recognized by Iraqi Traffic Police, customs border posts, and participating private hospital networks.',
    },
    {
      q: 'What is the Claim Guarantee policy?',
      a: 'We guarantee claim reviews within 24 hours of submission. If approved, funds are transferred directly to your Zain Cash or bank account without delay.',
    },
    {
      q: 'What should I do in an emergency or roadside breakdown?',
      a: 'Tap the red "Emergency" button in the app to immediately trigger roadside towing, contact nearest traffic police, or dispatch ambulance support to your exact GPS coordinates.',
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#191c1f] mb-1">
            Support & Customer Service
          </h1>
          <p className="text-sm text-[#434654]">
            24/7 assistance in Arabic and English across all Iraqi governorates.
          </p>
        </div>

        <button
          onClick={onOpenEmergency}
          className="bg-[#ffdad6] text-[#ba1a1a] px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#ba1a1a] hover:text-white transition-all active:scale-95 shadow-sm text-sm"
        >
          <span className="material-symbols-outlined text-[20px] fill-1">emergency</span>
          24/7 Emergency Dispatch
        </button>
      </div>

      {/* Call Hotlines Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <a
          href="tel:6644"
          className="bg-white p-5 rounded-2xl border border-[#c3c6d7]/50 shadow-sm hover:border-[#004bc5] transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-xl bg-[#004bc5]/10 text-[#004bc5] flex items-center justify-center group-hover:bg-[#004bc5] group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-2xl">call</span>
          </div>
          <div>
            <p className="text-xs text-[#434654] font-semibold">Baghdad Headquarters</p>
            <p className="text-lg font-extrabold text-[#004bc5] font-mono">6644 (Toll-Free)</p>
          </div>
        </a>

        <a
          href="tel:6645"
          className="bg-white p-5 rounded-2xl border border-[#c3c6d7]/50 shadow-sm hover:border-[#004bc5] transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-xl bg-[#004bc5]/10 text-[#004bc5] flex items-center justify-center group-hover:bg-[#004bc5] group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-2xl">call</span>
          </div>
          <div>
            <p className="text-xs text-[#434654] font-semibold">Erbil / Kurdistan Branch</p>
            <p className="text-lg font-extrabold text-[#004bc5] font-mono">6645 (Toll-Free)</p>
          </div>
        </a>

        <a
          href="tel:6646"
          className="bg-white p-5 rounded-2xl border border-[#c3c6d7]/50 shadow-sm hover:border-[#004bc5] transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-xl bg-[#004bc5]/10 text-[#004bc5] flex items-center justify-center group-hover:bg-[#004bc5] group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-2xl">call</span>
          </div>
          <div>
            <p className="text-xs text-[#434654] font-semibold">Basra & South Hub</p>
            <p className="text-lg font-extrabold text-[#004bc5] font-mono">6646 (Toll-Free)</p>
          </div>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Assistant Chat Window */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#c3c6d7]/50 shadow-sm p-6 flex flex-col h-[480px]">
          <div className="flex items-center gap-3 pb-4 border-b border-[#e6e8ec] mb-4">
            <div className="w-10 h-10 rounded-full bg-[#004bc5] text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-[#191c1f]">Super Key AI Assistant</h3>
              <p className="text-xs text-[#00722f] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#00722f] animate-pulse" />
                Online (Arabic & English)
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 no-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#004bc5] text-white rounded-tr-none'
                      : 'bg-[#f2f4f7] text-[#191c1f] rounded-tl-none border border-[#c3c6d7]/30'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#434654] mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="mt-4 pt-3 border-t border-[#e6e8ec] flex gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask a question about coverage, claims, or rates..."
              className="flex-1 px-4 py-2.5 bg-[#f2f4f7] border border-[#c3c6d7]/60 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#004bc5]"
            />
            <button
              type="submit"
              className="bg-[#004bc5] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#003ea7] transition-all active:scale-95 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </form>
        </div>

        {/* FAQs Section */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#c3c6d7]/50 shadow-sm p-6">
          <h3 className="text-lg font-bold text-[#191c1f] mb-4">Frequently Asked Questions</h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#c3c6d7]/40 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#191c1f] flex justify-between items-center bg-[#f2f4f7]/50 hover:bg-[#f2f4f7] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`material-symbols-outlined text-lg text-[#004bc5] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-white text-xs text-[#434654] leading-relaxed border-t border-[#c3c6d7]/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
