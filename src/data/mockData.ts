import { Policy, ActivityItem, InsuranceProvider, QuotePlan, Claim, UserNotification } from '../types';

export const HOTLINKED_IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3wPVz72BvMiH1Vg7JbC61Sp8dBoGqVV1ztmPZ-A9AzXzFtYkUCpoZCIF51UceDUg_6iy_koJPN5Ix2ZlJqx4tfg6A0Zx26oQobWduJBK7oOUexzwCeADHnAriJl10FJBj2nP0ADdeimIPE476Uz3pIiNcCwRMstMnvA_0c6zkh870Do2CqlNUhC5kJdrZHl4hL0V_EyRVRlgcyOo_D9Y1w2cWJDf6q5eqjTHpHAFEID1bhFDbKqMY7lSp2m7w8ow05O2HAsUOvUg',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNLubkhEQ-ZFE4MZmukNy9BlnrNH0PDofrFvufuiq2OV-pfVQofqVEDQQAutiIyikC7KxFzo4-2faMrw0Gw5oyrSyyyncWT_M9KTTdLghQlIfOoLDUKvmM3PQAZDQl-lMuBKubXCA8BlgojYlmwo_DWFfPJ_jLjkKSDjY3XqBUMOEVSKsXWYQD67IWHpNuZ4smxndvuDqRprYcmvrM9S803Q8urHwbsF2nb8xtm79n-iZqwVIsOy0Swi9HJjRh5xXwoNb6Podr6EA',
  avatarAlt1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMkpA68EIWjMXfw3BcoU1nEc-hJs8IF7tXArP55vrhD-PozxxWLF0SuKa2D-rz2NwybAEValS_fI8RwDOOYIAP5xDa8QpHdYKvu-nWVEMc8KZfrMGmn9BAVJFLSppYHbAU3wwIshjmhk5swkoiPnogcp7bWdNrY6OD2yqnR8xZgzBSJy99zRAPL1MQjncuHImn0hi0VBeiDvYEcejkKwzhZz1UIZgSmFyPONqZ280YUk42bAEbygIPmQ0ArUkjtppM1GSUay5PNAg',
  avatarAlt2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATkQCYv_ZQxz-nrwblG4hG7TmN0AAGH_ZZJBT0o21oNW44jslLYOLUt1AVsQsB5V2LA_25Jc6VKwFS2xzXg_MMYdgi_XtL_e2DvA0M0-lhfotFhFrcpVI6j4Eqi9wlmohcqPnZkwni718vmY8XDn8XnnhUY3PlvxqlaFrNTK7S5OWoYJYcC-GYfA0Fyu60h4UwLFL-aLce9mIa5TaRV2Y2rFoN3OdiUEuzVFPfwWwUGljYK6D36Bj1m8aEk7pUjPlHdMWUzRS_RPs',
  avatarAlt3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhnjelOFYMuppgUlmt3vpWl4Vux_s5cf_rCkjPgTZZgTPGGgW2wjS0W6JaxNYI7zgaNCusKyF-U0LQ57exdhPxkD-cnmurGskJikkHsr1qSetjoQrY3lo84PvnTRhW-c4xIaz_uxad-85eSXax5m4TZP2OQUba5IgTCpH5HuRq3QKT7-_qt2gCIn19-MPX2oiax2Uj5ecctHItH7SOCzgac3IsfGG4c5Q4lynKB_q2kHzSRqYM9ABagDiGcUY6h53uWMXbbWASGHE',
  healthHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN0fM8bP7ybJBIK6-kF8vtTjbcsJQqOZdvTzo5YKirA4BLlkK_j7kfbwJ7SlVWSk_TN815PVXAdlO6DTjohOsyLWX8e36bfbS3rhSRwcyxE9Ezlu5XUrcwG6AeFFqCBpR36O0rjb3rL8q-V2MG_3xcRbVc5EGuFtlAXNR1gckN1Q7wA69FXzaPZUIXI13pnpZCVfJlrzojalDLF-Imm_vWZqxT03tlPCRxUmXIszX3-VnGQ27ZKzC_4L0iEx_u09QUm7tWlQW8u1w',
  zainLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlogKpfLE5dDgp8daWUocxDxYdyXykKDogwiqomwr1dSjOHfDSsYY0z3ORCDir-UdJnP8kn0i1k2TawoZUAj9dqauibRi31RSrtsgUgqqq1UWKtXmXTGs3EXQV1L35u_TqM4dBi7w2UszqUrurZwHIbDy1xAQpeHFWa263c54vcJzcNe8eHQwSRDsiMSWsJFWCq4FuuH8u6tb03LK3dW6C3Lwms5xND5u150zCg3fTWlUGQqbru0NFbocBDe8o4-K5-ow0SUigb0Y',
  alAmeenLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb_BJl8U29U2NJA3RrC01R5cvjT9tvIsvolx_hJD88_vp2hK5pkoM24HnQvFvwHSup552TpJ9CYSk9UzaVLaQ1YuXAk__BMfBxGCSaFMUvU6hN9GQKOx60DGJfrDMZk9NbS455fLy6K4DGl5qiOTIGpuY91r_-w0w4XkP3bmLYE7couUMI6b_7fOOElzJLizEjOdfcSx0583ygo6lhRNnAJdTH2k4e4BS2CUtAlKVpKlv8O_rBTuXmXSlb5m2EqTLxOH1xPXi4MCU'
};

export const INITIAL_POLICIES: Policy[] = [
  {
    id: 'p-1',
    policyNumber: 'SK-AU-88210',
    title: 'Comprehensive Auto',
    category: 'auto',
    subTitle: 'Toyota Camry - بغداد 12345',
    status: 'active',
    expiryDate: '12 Oct 2024',
    daysRemaining: 82,
    coverageLimit: '$25,000',
    limitIQD: '32,500,000 IQD',
    premiumAmount: '125,000 IQD/mo',
    iconName: 'directions_car',
    vehicleDetails: {
      makeModel: '2023 Toyota Camry LE',
      plateNumber: 'بغداد 12345',
      city: 'Baghdad'
    }
  },
  {
    id: 'p-2',
    policyNumber: 'SK-HL-55412',
    title: 'Family Health Plus',
    category: 'health',
    subTitle: 'Coverage for 4 members',
    status: 'active',
    expiryDate: '28 Nov 2024',
    daysRemaining: 45,
    coverageLimit: '$38,000',
    limitIQD: '50,000,000 IQD',
    premiumAmount: '180,000 IQD/mo',
    iconName: 'health_and_safety',
    membersCount: 4
  },
  {
    id: 'p-3',
    policyNumber: 'SK-HOME-44582',
    title: 'Home Protection Elite',
    category: 'home',
    subTitle: 'Mansour Villa, Block 601',
    status: 'active',
    expiryDate: '15 Jan 2025',
    daysRemaining: 176,
    coverageLimit: '$100,000',
    limitIQD: '130,000,000 IQD',
    premiumAmount: '95,000 IQD/mo',
    iconName: 'home'
  },
  {
    id: 'p-4',
    policyNumber: 'SK-TRAV-11029',
    title: 'Travel Guard Basic',
    category: 'travel',
    subTitle: 'Middle East & Schengen Area',
    status: 'expired',
    expiryDate: '01 Jun 2024',
    daysRemaining: 0,
    coverageLimit: '$15,000',
    limitIQD: '20,000,000 IQD',
    premiumAmount: '35,000 IQD/trip',
    iconName: 'flight'
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Premium Payment',
    subtitle: 'Car Insurance - Jan 2024',
    date: '10 Jan 2024',
    type: 'payment',
    amount: '125,000 IQD',
    status: 'successful',
    iconName: 'payments'
  },
  {
    id: 'act-2',
    title: 'Claim Filed',
    subtitle: 'Health - Medical Checkup',
    date: '2 hours ago',
    type: 'claim',
    status: 'under_review',
    iconName: 'history'
  },
  {
    id: 'act-3',
    title: 'Policy Renewed',
    subtitle: 'Comprehensive Auto (Toyota Camry)',
    date: '15 Dec 2023',
    type: 'renewal',
    amount: '1,500,000 IQD',
    status: 'successful',
    iconName: 'autorenew'
  }
];

export const QUOTE_PLANS: QuotePlan[] = [
  {
    id: 'plan-standard',
    level: 'ENTRY LEVEL',
    name: 'Standard',
    monthlyPriceUSD: 45,
    monthlyPriceIQD: 'Approx. 60,000 IQD',
    yearlyPriceUSD: 480,
    yearlyPriceIQD: 'Approx. 630,000 IQD (Save $60)',
    popular: false,
    features: [
      { text: 'Theft Protection', included: true },
      { text: 'Third Party Liability', included: true },
      { text: 'Collision Damage', included: false },
      { text: 'Fire & Natural Disasters', included: false },
      { text: '24/7 Roadside Assist', included: false }
    ]
  },
  {
    id: 'plan-premium',
    level: 'BALANCED PROTECTION',
    name: 'Premium',
    monthlyPriceUSD: 85,
    monthlyPriceIQD: 'Approx. 112,000 IQD',
    yearlyPriceUSD: 920,
    yearlyPriceIQD: 'Approx. 1,200,000 IQD (Save $100)',
    popular: true,
    features: [
      { text: 'Theft Protection', included: true },
      { text: 'Third Party Liability', included: true },
      { text: 'Collision Damage', included: true },
      { text: 'Accident Coverage', included: true },
      { text: '24/7 Roadside Assist', included: false }
    ]
  },
  {
    id: 'plan-executive',
    level: 'FULL LUXURY',
    name: 'Executive',
    monthlyPriceUSD: 140,
    monthlyPriceIQD: 'Approx. 185,000 IQD',
    yearlyPriceUSD: 1500,
    yearlyPriceIQD: 'Approx. 1,980,000 IQD (Save $180)',
    popular: false,
    features: [
      { text: 'Everything in Premium', included: true },
      { text: 'Fire & Natural Disasters', included: true },
      { text: '24/7 Roadside Assistance', included: true },
      { text: 'Replacement Vehicle', included: true },
      { text: 'International Coverage', included: true }
    ]
  }
];

export const TOP_PROVIDERS: InsuranceProvider[] = [
  {
    id: 'prov-1',
    name: 'Zain Insurance Solutions',
    tag: 'PARTNER',
    description: 'Specialized travel coverage for religious pilgrimages and international business trips.',
    startingPrice: 'From 8,000 IQD',
    categories: ['LIFE', 'TRAVEL'],
    imageUrl: HOTLINKED_IMAGES.zainLogo
  },
  {
    id: 'prov-2',
    name: 'Al-Ameen General Insurance',
    tag: 'VERIFIED',
    description: 'High-limit protection for luxury vehicles and commercial property in urban centers.',
    startingPrice: 'Custom Quote',
    categories: ['AUTO', 'PROPERTY'],
    imageUrl: HOTLINKED_IMAGES.alAmeenLogo
  }
];

export const INITIAL_CLAIMS: Claim[] = [
  {
    id: 'clm-101',
    claimNumber: 'CLM-2024-8841',
    policyId: 'p-1',
    policyTitle: 'Comprehensive Auto (Toyota Camry)',
    category: 'auto',
    incidentDate: '18 Jul 2024',
    location: 'Karrada, Baghdad',
    status: 'under_review',
    estimatedAmountIQD: '450,000 IQD',
    description: 'Minor rear bumper collision near Karrada street intersection.',
    timeline: [
      { step: 'Claim Submitted', date: '18 Jul, 02:15 PM', completed: true },
      { step: 'Initial Assessment', date: '18 Jul, 04:30 PM', completed: true },
      { step: 'Surveyor Inspection', date: 'In Progress', completed: false, active: true },
      { step: 'Payout Disbursement', date: 'Estimated 20 Jul', completed: false }
    ]
  },
  {
    id: 'clm-102',
    claimNumber: 'CLM-2024-3312',
    policyId: 'p-2',
    policyTitle: 'Family Health Plus',
    category: 'health',
    incidentDate: '02 May 2024',
    location: 'Ibn Al-Nafees Hospital, Baghdad',
    status: 'paid',
    estimatedAmountIQD: '320,000 IQD',
    description: 'Outpatient diagnostic scans and prescribed medication reimbursement.',
    timeline: [
      { step: 'Claim Submitted', date: '02 May', completed: true },
      { step: 'Medical Review', date: '03 May', completed: true },
      { step: 'Approved', date: '04 May', completed: true },
      { step: 'Paid via Zain Cash', date: '04 May', completed: true }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: UserNotification[] = [
  {
    id: 'notif-1',
    title: 'Claim Update: Under Review',
    message: 'Your auto claim CLM-2024-8841 is being evaluated by an inspector.',
    time: '2 hours ago',
    read: false,
    type: 'claim'
  },
  {
    id: 'notif-2',
    title: 'Policy Renewal Reminder',
    message: 'Family Health Plus policy expires in 45 days. Tap to renew.',
    time: '1 day ago',
    read: false,
    type: 'policy'
  },
  {
    id: 'notif-3',
    title: 'Payment Receipt',
    message: '125,000 IQD received for SK-AU-88210. Certificate updated.',
    time: '3 days ago',
    read: true,
    type: 'payment'
  }
];

export const IRAQ_GOVERNORATES = [
  'Baghdad',
  'Erbil (Kurdistan)',
  'Basra',
  'Sulaymaniyah',
  'Duhok',
  'Najaf',
  'Karbala',
  'Mosul (Ninawa)',
  'Kirkuk',
  'Hilla (Babil)',
  'Anbar',
  'Diyala',
  'Nasiriyah (Dhi Qar)',
  'Amarah (Maysan)',
  'Diwaniyah (Qadisiyyah)',
  'Kut (Wasit)',
  'Samawah (Muthanna)',
  'Tikrit (Saladin)'
];
