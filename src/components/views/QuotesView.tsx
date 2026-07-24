import React, { useState } from 'react';
import { QUOTE_PLANS, TOP_PROVIDERS, HOTLINKED_IMAGES } from '../../data/mockData';
import { QuotePlan } from '../../types';

interface QuotesViewProps {
  onSelectPlan: (plan: QuotePlan, billingCycle: 'monthly' | 'yearly') => void;
  onSelectProvider: (providerName: string) => void;
  onOpenNewQuoteWizard: () => void;
}

export const QuotesView: React.FC<QuotesViewProps> = ({
  onSelectPlan,
  onSelectProvider,
  onOpenNewQuoteWizard,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'life' | 'auto' | 'health' | 'travel'>('all');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Filter providers or plans based on search/category
  const filteredProviders = TOP_PROVIDERS.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'all' ||
      provider.categories.some((c) => c.toLowerCase() === activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-12 pt-6 pb-32">
      {/* Progress Indicator */}
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-[#004bc5] uppercase tracking-wider">
            Comparison
          </span>
          <span className="text-xs font-semibold text-[#434654]">Step 2 of 4</span>
        </div>
        <div className="w-full bg-[#e6e8ec] h-2 rounded-full overflow-hidden">
          <div className="bg-[#004bc5] h-full transition-all duration-500 w-1/2 rounded-full" />
        </div>
      </div>

      {/* Search Section */}
      <section className="mb-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#737686]">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search insurance, providers, or policies..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#c3c6d7] rounded-xl focus:ring-2 focus:ring-[#004bc5] focus:border-transparent transition-all outline-none text-base shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-4 flex items-center text-[#737686] hover:text-[#191c1f]"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>

        {/* Recent Searches */}
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-[#434654]">Recent:</span>
          <button
            onClick={() => setSearchQuery('Comprehensive Auto')}
            className="px-3 py-1 bg-[#f2f4f7] rounded-full text-xs font-semibold text-[#004bc5] hover:bg-[#e6e8ec] transition-colors"
          >
            Comprehensive Auto
          </button>
          <button
            onClick={() => setSearchQuery('Health Iraq')}
            className="px-3 py-1 bg-[#f2f4f7] rounded-full text-xs font-semibold text-[#004bc5] hover:bg-[#e6e8ec] transition-colors"
          >
            Health Iraq
          </button>
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="mb-8 overflow-x-auto no-scrollbar">
        <div className="flex gap-2.5 pb-2">
          {[
            { id: 'all', label: 'All', icon: 'grid_view' },
            { id: 'life', label: 'Life', icon: 'favorite' },
            { id: 'auto', label: 'Auto', icon: 'directions_car' },
            { id: 'health', label: 'Health', icon: 'medical_services' },
            { id: 'travel', label: 'Travel', icon: 'flight' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm active:scale-95 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#004bc5] text-white shadow-md shadow-[#004bc5]/20 font-bold'
                    : 'bg-[#eceef1] text-[#191c1f] hover:bg-[#e6e8ec]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Plans Comparison Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#191c1f]">3 Plans Found</h2>
          <p className="text-sm text-[#434654]">
            Tailored insurance options for your 2023 Toyota Corolla (or selected asset).
          </p>
        </div>

        {/* Monthly / Yearly Toggle */}
        <div className="flex items-center gap-1 bg-[#e6e8ec] p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-[#004bc5] shadow-sm'
                : 'text-[#434654] hover:text-[#004bc5]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${
              billingCycle === 'yearly'
                ? 'bg-white text-[#004bc5] shadow-sm'
                : 'text-[#434654] hover:text-[#004bc5]'
            }`}
          >
            Yearly (Save 15%)
          </button>
        </div>
      </div>

      {/* Quote Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-12">
        {QUOTE_PLANS.map((plan) => {
          const isMonthly = billingCycle === 'monthly';
          const priceDisplay = isMonthly ? `$${plan.monthlyPriceUSD}` : `$${plan.yearlyPriceUSD}`;
          const periodDisplay = isMonthly ? '/month' : '/year';
          const approxIQD = isMonthly ? plan.monthlyPriceIQD : plan.yearlyPriceIQD;

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col transition-all duration-300 relative ${
                plan.popular
                  ? 'border-2 border-[#004bc5] shadow-md md:-translate-y-2'
                  : 'border-[#c3c6d7]/60 hover:border-[#004bc5]/40'
              }`}
            >
              {plan.popular && (
                <div className="bg-[#004bc5] py-1 text-center">
                  <span className="text-white font-bold text-[10px] uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`p-6 border-b border-[#e6e8ec] ${
                  plan.popular ? 'bg-[#2a64e6]/10 pt-7' : ''
                }`}
              >
                <span className="text-[10px] font-bold text-[#434654] uppercase tracking-wider block mb-1">
                  {plan.level}
                </span>
                <h3 className="text-2xl font-bold text-[#191c1f]">{plan.name}</h3>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#191c1f]">
                        {priceDisplay}
                      </span>
                      <span className="text-sm font-semibold text-[#434654]">{periodDisplay}</span>
                    </div>
                    <div className="text-xs font-semibold text-[#004bc5] mt-1">{approxIQD}</div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f, idx) => (
                      <li
                        key={idx}
                        className={`flex items-center gap-3 text-sm ${
                          !f.included ? 'opacity-40' : ''
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[20px] ${
                            f.included ? 'text-[#006e2c] fill-1' : 'text-[#737686]'
                          }`}
                        >
                          {f.included ? 'check_circle' : 'cancel'}
                        </span>
                        <span className="text-[#191c1f] font-medium">{f.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectPlan(plan, billingCycle)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-sm ${
                    plan.popular
                      ? 'bg-[#004bc5] text-white hover:bg-[#003ea7]'
                      : 'bg-[#e6e8ec] text-[#191c1f] hover:bg-[#b4c5ff] hover:text-[#00174a]'
                  }`}
                >
                  Select Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Options & Guarantee Banner */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        {/* Featured Health Card */}
        <div className="md:col-span-8 group relative overflow-hidden rounded-2xl bg-white border border-[#c3c6d7]/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="h-56 sm:h-64 w-full overflow-hidden relative">
            <img
              src={HOTLINKED_IMAGES.healthHero}
              alt="Iraqi National Health Elite"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-[#86f898] text-[#00722f] font-bold text-xs rounded-full shadow-sm">
                Top Rated
              </span>
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[#004bc5]">Iraqi National Health Elite</h3>
                <div className="flex items-center text-[#006e2c]">
                  <span className="material-symbols-outlined text-[18px] fill-1">star</span>
                  <span className="ml-1 font-bold text-sm">4.9</span>
                </div>
              </div>
              <p className="text-sm text-[#434654] mb-4">
                Comprehensive coverage for families across all Iraqi provinces with access to 500+ private clinics in Baghdad, Erbil, & Basra.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 border-t border-[#e6e8ec]">
              <span className="text-lg font-bold text-[#004bc5]">Starts at 45,000 IQD/mo</span>
              <button
                onClick={onOpenNewQuoteWizard}
                className="w-full sm:w-auto px-8 py-3 bg-[#004bc5] text-white rounded-xl font-bold text-sm hover:bg-[#003ea7] transition-all shadow-sm active:scale-95"
              >
                View Plan
              </button>
            </div>
          </div>
        </div>

        {/* Side Cards: Asiacell & Guarantee */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex-1 bg-[#f2f4f7] rounded-2xl border border-[#c3c6d7]/50 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#004bc5] border border-[#c3c6d7]">
                <span className="material-symbols-outlined text-3xl">directions_car</span>
              </div>
              <div>
                <h4 className="font-bold text-base text-[#004bc5]">Asiacell Partner Policy</h4>
                <p className="text-xs text-[#434654]">Instant Digital Auto</p>
              </div>
            </div>
            <p className="text-xs text-[#434654] mb-4 leading-relaxed">
              Quick activation through your mobile wallet (Zain Cash / FIB). Covers accidental damage and third-party liability.
            </p>
            <div className="pt-3 border-t border-[#c3c6d7]/40 flex justify-between items-center">
              <span className="font-bold text-sm text-[#004bc5]">12,500 IQD/mo</span>
              <button
                onClick={onOpenNewQuoteWizard}
                className="text-[#004bc5] hover:text-[#003ea7] flex items-center font-bold text-xs"
              >
                Apply <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="flex-1 bg-[#004bc5] text-white rounded-2xl p-6 shadow-md relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>
                verified_user
              </span>
            </div>
            <h4 className="text-xl font-bold mb-2">Claim Guarantee</h4>
            <p className="text-xs text-[#eeefff] opacity-90 mb-4 leading-relaxed">
              We promise 24-hour claim processing in Iraq or we refund your monthly premium.
            </p>
            <button
              onClick={onOpenNewQuoteWizard}
              className="text-xs font-bold underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              Learn about our promise
            </button>
          </div>
        </div>
      </section>

      {/* Other Top Providers List */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-[#004bc5] mb-4">Other Top Providers in Iraq</h2>
        <div className="space-y-4">
          {filteredProviders.map((prov) => (
            <div
              key={prov.id}
              onClick={() => onSelectProvider(prov.name)}
              className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-white border border-[#c3c6d7]/50 rounded-2xl hover:bg-[#f2f4f7] transition-all cursor-pointer shadow-sm group"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#f2f4f7] border border-[#c3c6d7]">
                <img src={prov.imageUrl} alt={prov.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h4 className="text-lg font-bold text-[#191c1f] group-hover:text-[#004bc5] transition-colors">
                    {prov.name}
                  </h4>
                  <span className="px-2 py-0.5 bg-[#e6e8ec] text-[#434654] rounded text-[10px] uppercase font-bold tracking-wider">
                    {prov.tag}
                  </span>
                </div>
                <p className="text-xs text-[#434654]">{prov.description}</p>
              </div>

              <div className="text-center sm:text-right flex flex-col items-center sm:items-end gap-2">
                <span className="font-bold text-sm text-[#004bc5]">{prov.startingPrice}</span>
                <div className="flex gap-1.5">
                  {prov.categories.map((cat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#e6e8ec] rounded-full text-[10px] font-bold text-[#434654]"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Super Key? Bento Grid */}
      <section className="mb-8">
        <h4 className="text-xl font-bold text-[#191c1f] mb-6">Why Choose Super Key?</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 bg-[#f2f4f7] p-6 rounded-2xl flex items-center gap-4 border border-[#c3c6d7]/40">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm border border-[#c3c6d7]">
              <span className="material-symbols-outlined text-[#004bc5] text-3xl">
                verified_user
              </span>
            </div>
            <div>
              <h5 className="font-bold text-xs text-[#004bc5] uppercase tracking-wider mb-1">
                INSTANT POLICY
              </h5>
              <p className="text-xs sm:text-sm text-[#434654]">
                Get covered in under 3 minutes with digital QR certificates accepted nationwide.
              </p>
            </div>
          </div>

          <div className="bg-[#f2f4f7] p-6 rounded-2xl border border-[#c3c6d7]/40">
            <span className="material-symbols-outlined text-[#006e2c] mb-2 text-2xl">
              support_agent
            </span>
            <h5 className="font-bold text-xs text-[#004bc5] uppercase tracking-wider mb-1">
              24/7 IRAQI SUPPORT
            </h5>
            <p className="text-xs text-[#434654]">
              Local experts in Baghdad, Erbil, & Basra ready whenever you need.
            </p>
          </div>

          <div className="bg-[#f2f4f7] p-6 rounded-2xl border border-[#c3c6d7]/40">
            <span className="material-symbols-outlined text-[#004bc5] mb-2 text-2xl">
              speed
            </span>
            <h5 className="font-bold text-xs text-[#004bc5] uppercase tracking-wider mb-1">
              FAST CLAIMS
            </h5>
            <p className="text-xs text-[#434654]">Approved within 48 hours directly to Zain Cash.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
