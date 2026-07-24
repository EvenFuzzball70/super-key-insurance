import React, { useState } from 'react';
import { Policy, QuotePlan } from '../../types';
import { QUOTE_PLANS, IRAQ_GOVERNORATES } from '../../data/mockData';

interface NewQuoteWizardModalProps {
  isOpen: boolean;
  preselectedPlan?: QuotePlan | null;
  onClose: () => void;
  onPolicyCreated: (newPolicy: Policy) => void;
}

export const NewQuoteWizardModal: React.FC<NewQuoteWizardModalProps> = ({
  isOpen,
  preselectedPlan,
  onClose,
  onPolicyCreated,
}) => {
  const [step, setStep] = useState<number>(preselectedPlan ? 3 : 1);
  const [category, setCategory] = useState<'auto' | 'health' | 'home' | 'travel'>('auto');
  const [assetTitle, setAssetTitle] = useState('2024 Toyota Corolla LE');
  const [governorate, setGovernorate] = useState('Baghdad');
  const [selectedPlan, setSelectedPlan] = useState<QuotePlan>(
    preselectedPlan || QUOTE_PLANS[1]
  );
  const [paymentMethod, setPaymentMethod] = useState<'zain_cash' | 'fib' | 'card'>('zain_cash');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleCompletePurchase = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const randomDigits = Math.floor(10000 + Math.random() * 90000);
      const randomPlate = Math.floor(10000 + Math.random() * 80000);

      const categoryPrefixes: Record<string, string> = {
        auto: 'SK-AU-',
        health: 'SK-HL-',
        home: 'SK-HM-',
        travel: 'SK-TR-',
      };

      const categoryIcons: Record<string, string> = {
        auto: 'directions_car',
        health: 'health_and_safety',
        home: 'home',
        travel: 'flight',
      };

      const categoryNames: Record<string, string> = {
        auto: `Comprehensive ${selectedPlan.name} Auto`,
        health: `Family Health ${selectedPlan.name}`,
        home: `Home Protection ${selectedPlan.name}`,
        travel: `Travel Guard ${selectedPlan.name}`,
      };

      const createdPolicy: Policy = {
        id: `p-${Date.now()}`,
        policyNumber: `${categoryPrefixes[category]}${randomDigits}`,
        title: categoryNames[category],
        category: category,
        subTitle:
          category === 'auto'
            ? `${assetTitle} - ${governorate} ${randomPlate}`
            : category === 'health'
            ? 'Coverage for 4 family members'
            : `${assetTitle}, ${governorate}`,
        status: 'active',
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        daysRemaining: 365,
        coverageLimit: '$50,000',
        limitIQD: `${selectedPlan.monthlyPriceUSD * 1300 * 12} IQD`,
        premiumAmount: selectedPlan.monthlyPriceIQD,
        iconName: categoryIcons[category],
      };

      setIsProcessing(false);
      onPolicyCreated(createdPolicy);
      alert(`Congratulations! Policy ${createdPolicy.policyNumber} activated successfully.`);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#c3c6d7] p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#f2f4f7] hover:bg-[#e6e8ec] flex items-center justify-center text-[#434654]"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Stepper indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-xs font-bold text-[#004bc5] mb-2 uppercase">
            <span>Step {step} of 4</span>
            <span>
              {step === 1
                ? 'Category'
                : step === 2
                ? 'Asset Specs'
                : step === 3
                ? 'Select Plan'
                : 'Instant Payment'}
            </span>
          </div>
          <div className="w-full bg-[#e6e8ec] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#004bc5] h-full transition-all duration-500 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: CATEGORY */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold text-[#191c1f] mb-1">Select Insurance Category</h3>
            <p className="text-xs text-[#434654] mb-6">
              Choose what you want to protect today in Iraq.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { id: 'auto', label: 'Car Insurance', icon: 'directions_car' },
                { id: 'health', label: 'Family Health', icon: 'health_and_safety' },
                { id: 'home', label: 'Home Protection', icon: 'home' },
                { id: 'travel', label: 'Travel Guard', icon: 'flight' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id as any)}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all ${
                    category === c.id
                      ? 'border-[#004bc5] bg-[#004bc5]/10 font-bold text-[#004bc5]'
                      : 'border-[#c3c6d7]/60 hover:bg-[#f2f4f7] text-[#191c1f]'
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl">{c.icon}</span>
                  <span className="text-xs">{c.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-[#004bc5] text-white font-bold rounded-xl hover:bg-[#003ea7]"
            >
              Continue to Details
            </button>
          </div>
        )}

        {/* STEP 2: ASSET SPECS */}
        {step === 2 && (
          <div className="space-y-4 text-xs sm:text-sm">
            <h3 className="text-xl font-bold text-[#191c1f] mb-1">Specify Details</h3>
            <p className="text-xs text-[#434654] mb-4">
              Enter vehicle, member, or home details for quote calculation.
            </p>

            <div>
              <label className="block font-bold text-[#191c1f] mb-1">
                {category === 'auto'
                  ? 'Vehicle Make & Model'
                  : category === 'health'
                  ? 'Primary Member Name'
                  : 'Property Description'}
              </label>
              <input
                type="text"
                value={assetTitle}
                onChange={(e) => setAssetTitle(e.target.value)}
                className="w-full p-3 bg-[#f2f4f7] border border-[#c3c6d7] rounded-xl outline-none focus:ring-2 focus:ring-[#004bc5]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#191c1f] mb-1">Governorate / City</label>
              <select
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                className="w-full p-3 bg-[#f2f4f7] border border-[#c3c6d7] rounded-xl outline-none focus:ring-2 focus:ring-[#004bc5]"
              >
                {IRAQ_GOVERNORATES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 border border-[#c3c6d7] text-[#434654] font-semibold rounded-xl"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-[#004bc5] text-white font-bold rounded-xl hover:bg-[#003ea7]"
              >
                View Calculated Rates
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SELECT PLAN */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold text-[#191c1f] mb-1">Choose Protection Tier</h3>
            <p className="text-xs text-[#434654] mb-4">
              Calculated rates for {assetTitle} ({governorate}).
            </p>

            <div className="space-y-3 mb-6">
              {QUOTE_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedPlan.id === plan.id
                      ? 'border-[#004bc5] bg-[#004bc5]/10 ring-2 ring-[#004bc5]'
                      : 'border-[#c3c6d7]/60 hover:bg-[#f2f4f7]'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#434654]">
                      {plan.level}
                    </span>
                    <h4 className="font-bold text-base text-[#191c1f]">{plan.name}</h4>
                    <p className="text-xs text-[#004bc5] font-semibold">{plan.monthlyPriceIQD}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-[#191c1f]">
                      ${plan.monthlyPriceUSD}/mo
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 border border-[#c3c6d7] text-[#434654] font-semibold rounded-xl"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3 bg-[#004bc5] text-white font-bold rounded-xl hover:bg-[#003ea7]"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PAYMENT */}
        {step === 4 && (
          <div className="space-y-4 text-xs sm:text-sm">
            <h3 className="text-xl font-bold text-[#191c1f] mb-1">Instant Digital Payment</h3>
            <p className="text-xs text-[#434654] mb-2">
              Select payment method to instantly activate policy certificate.
            </p>

            <div className="bg-[#f2f4f7] p-4 rounded-2xl border border-[#c3c6d7]/40 mb-4 space-y-1">
              <p className="text-[#434654]">
                <strong>Plan:</strong> {selectedPlan.name} ({category.toUpperCase()})
              </p>
              <p className="text-[#434654]">
                <strong>Asset:</strong> {assetTitle}
              </p>
              <p className="text-[#004bc5] font-bold text-sm">
                Total Due: {selectedPlan.monthlyPriceIQD}
              </p>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-[#191c1f]">Payment Gateway</label>

              {[
                { id: 'zain_cash', name: 'Zain Cash Iraq Wallet', desc: 'Instant 1-tap PIN authorization' },
                { id: 'fib', name: 'First Iraqi Bank (FIB)', desc: 'Direct bank account transfer' },
                { id: 'card', name: 'Qi Card / Visa / Mastercard', desc: 'Secure local card processing' },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === m.id
                      ? 'border-[#00722f] bg-[#86f898]/20 font-bold'
                      : 'border-[#c3c6d7]/60 hover:bg-[#f2f4f7]'
                  }`}
                >
                  <div>
                    <p className="text-sm text-[#191c1f] font-bold">{m.name}</p>
                    <p className="text-[11px] text-[#434654]">{m.desc}</p>
                  </div>
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === m.id ? 'border-[#00722f] bg-[#00722f]' : 'border-[#737686]'
                    }`}
                  >
                    {paymentMethod === m.id && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 border border-[#c3c6d7] text-[#434654] font-semibold rounded-xl"
              >
                Back
              </button>
              <button
                onClick={handleCompletePurchase}
                disabled={isProcessing}
                className="flex-1 py-3.5 bg-[#006e2c] text-white font-bold rounded-xl hover:bg-[#005320] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-lg">refresh</span>
                    Activating Policy...
                  </>
                ) : (
                  'Pay & Activate Now'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
