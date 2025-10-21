'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    ssn: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    zip: '',
    
    // Work Info
    gigPlatforms: [] as string[],
    yearsActive: 0,
    primaryIncome: '',
    
    // Income
    monthlyIncome: 0,
    lastSixMonthsAvg: 0,
    incomeStability: 'moderate',
    
    // Financial
    monthlyExpenses: 0,
    existingDebt: 0,
    bankruptcy: 'no',
    
    // Loan Details
    loanAmount: 0,
    loanPurpose: '',
    repaymentCapacity: 0,
    
    // Banking
    bankName: '',
    accountType: 'checking',
    monthlyDeposits: 0,
    monthlyWithdrawals: 0,
    
    // Credit
    creditScore: '',
    delinquency: 'no',
    notes: '',
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'gigPlatforms') {
        setFormData(prev => ({
          ...prev,
          gigPlatforms: checked 
            ? [...prev.gigPlatforms, value]
            : prev.gigPlatforms.filter(p => p !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      }));
    }
  };

  const calculateRiskScore = () => {
    let score = 50;
    
    // Income factors
    if (formData.monthlyIncome > 5000) score += 20;
    else if (formData.monthlyIncome > 3000) score += 15;
    
    // Debt to income
    const dti = formData.existingDebt / (formData.monthlyIncome || 1);
    if (dti < 0.3) score += 15;
    else if (dti > 0.8) score -= 20;
    
    // Loan to income
    const lti = formData.loanAmount / (formData.monthlyIncome || 1);
    if (lti < 2) score += 10;
    else if (lti > 5) score -= 15;
    
    // Experience
    if (formData.yearsActive >= 3) score += 10;
    
    // Stability
    if (formData.incomeStability === 'low') score += 10;
    else if (formData.incomeStability === 'high') score -= 10;
    
    // Credit score
    if (formData.creditScore === 'excellent') score += 20;
    else if (formData.creditScore === 'good') score += 10;
    else if (formData.creditScore === 'poor') score -= 20;
    
    // Negative factors
    if (formData.delinquency === 'yes') score -= 25;
    if (formData.bankruptcy === 'yes') score -= 30;
    
    return Math.max(10, Math.min(100, score));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const risk = calculateRiskScore();
    alert(`Application submitted!\n\nRisk Score: ${risk}\nStatus: ${risk >= 80 ? 'Likely Approved' : risk >= 60 ? 'Under Review' : 'Likely Denied'}`);
  };

  const riskScore = calculateRiskScore();
  const getRiskLabel = (score: number) => {
    if (score >= 80) return { label: 'Low Risk - Likely Approval', color: 'text-green-600' };
    if (score >= 60) return { label: 'Moderate Risk - Under Review', color: 'text-yellow-600' };
    return { label: 'High Risk - Likely Denial', color: 'text-red-600' };
  };

  const steps = [
    { num: 1, title: 'Personal' },
    { num: 2, title: 'Work' },
    { num: 3, title: 'Financial' },
    { num: 4, title: 'Banking' },
    { num: 5, title: 'Review' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white font-bold text-xl">
              $
            </div>
            <span className="text-xl font-bold text-slate-900">RoadRunner</span>
          </Link>
          <Link href="/" className="text-slate-600 font-medium hover:text-slate-900">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Apply for Funding</h1>
          <p className="text-slate-600">Step {step} of 5</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12 flex justify-between">
          {steps.map(s => (
            <div key={s.num} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
                s.num <= step
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {s.num}
              </div>
              <span className="text-xs text-slate-600 text-center">{s.title}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-xl p-8 mb-8">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth *</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">SSN (Last 4) *</label>
                  <input type="password" name="ssn" placeholder="****" value={formData.ssn} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Street Address *</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">State *</label>
                  <input type="text" name="state" placeholder="CA" value={formData.state} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Zip Code *</label>
                  <input type="text" name="zip" value={formData.zip} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Work Info */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Work Information</h2>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Which platforms do you use? *</label>
                <div className="space-y-2">
                  {['Uber', 'Lyft', 'DoorDash', 'Instacart', 'Upwork', 'Fiverr', 'TaskRabbit', 'Other'].map(platform => (
                    <label key={platform} className="flex items-center">
                      <input type="checkbox" name="gigPlatforms" value={platform} checked={formData.gigPlatforms.includes(platform)} onChange={handleChange} className="w-4 h-4 border-slate-300 rounded" />
                      <span className="ml-3 text-slate-700">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Years Active in Gig Work *</label>
                  <input type="number" name="yearsActive" value={formData.yearsActive} onChange={handleChange} min="0" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Income Source *</label>
                  <select name="primaryIncome" value={formData.primaryIncome} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Select...</option>
                    <option value="rideshare">Rideshare</option>
                    <option value="delivery">Food Delivery</option>
                    <option value="freelance">Freelance</option>
                    <option value="tasks">Task Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Income *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-slate-600">$</span>
                    <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Last 6 Months Average *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-slate-600">$</span>
                    <input type="number" name="lastSixMonthsAvg" value={formData.lastSixMonthsAvg} onChange={handleChange} className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Income Stability *</label>
                <select name="incomeStability" value={formData.incomeStability} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="low">Consistent (Low variation)</option>
                  <option value="moderate">Moderate (Some fluctuation)</option>
                  <option value="high">Variable (High fluctuation)</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Financial */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Financial Information</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Expenses *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-slate-600">$</span>
                    <input type="number" name="monthlyExpenses" value={formData.monthlyExpenses} onChange={handleChange} className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Existing Debt *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-slate-600">$</span>
                    <input type="number" name="existingDebt" value={formData.existingDebt} onChange={handleChange} className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Bankruptcy History *</label>
                <select name="bankruptcy" value={formData.bankruptcy} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Requested Loan Amount *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-slate-600">$</span>
                    <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Purpose *</label>
                  <select name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Select...</option>
                    <option value="equipment">Equipment/Vehicle</option>
                    <option value="operating">Operating Expenses</option>
                    <option value="emergency">Emergency</option>
                    <option value="debt">Debt Consolidation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Repayment Capacity *</label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-slate-600">$</span>
                  <input type="number" name="repaymentCapacity" value={formData.repaymentCapacity} onChange={handleChange} className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Banking */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Banking Information</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Bank Name *</label>
                  <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Account Type *</label>
                  <select name="accountType" value={formData.accountType} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Avg Monthly Deposits *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-slate-600">$</span>
                    <input type="number" name="monthlyDeposits" value={formData.monthlyDeposits} onChange={handleChange} className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Avg Monthly Withdrawals *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-slate-600">$</span>
                    <input type="number" name="monthlyWithdrawals" value={formData.monthlyWithdrawals} onChange={handleChange} className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Credit Score Range *</label>
                  <select name="creditScore" value={formData.creditScore} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Select...</option>
                    <option value="excellent">Excellent (750+)</option>
                    <option value="good">Good (700-749)</option>
                    <option value="fair">Fair (650-699)</option>
                    <option value="poor">Poor (&lt;650)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Delinquency History *</label>
                  <select name="delinquency" value={formData.delinquency} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} placeholder="Any additional information we should know..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Application Review</h2>

              {/* Risk Score */}
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-lg p-6">
                <p className="text-sm text-slate-600 mb-2 font-semibold">Calculated Risk Score</p>
                <div className="flex items-baseline gap-4">
                  <div className="text-5xl font-bold text-blue-600">{riskScore}</div>
                  <p className={`text-lg font-semibold ${getRiskLabel(riskScore).color}`}>
                    {getRiskLabel(riskScore).label}
                  </p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 font-semibold mb-1">Monthly Income</p>
                  <p className="text-2xl font-bold text-slate-900">${formData.monthlyIncome.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 font-semibold mb-1">Requested Loan</p>
                  <p className="text-2xl font-bold text-slate-900">${formData.loanAmount.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 font-semibold mb-1">Debt-to-Income</p>
                  <p className="text-2xl font-bold text-slate-900">{((formData.existingDebt / (formData.monthlyIncome || 1)) * 100).toFixed(0)}%</p>
                </div>
              </div>

              {/* Summary */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-slate-900 mb-4">Application Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600">Name: <span className="text-slate-900 font-semibold">{formData.firstName} {formData.lastName}</span></p>
                    <p className="text-slate-600 mt-2">Email: <span className="text-slate-900 font-semibold">{formData.email}</span></p>
                    <p className="text-slate-600 mt-2">Platforms: <span className="text-slate-900 font-semibold">{formData.gigPlatforms.join(', ') || 'None'}</span></p>
                  </div>
                  <div>
                    <p className="text-slate-600">Years Active: <span className="text-slate-900 font-semibold">{formData.yearsActive}</span></p>
                    <p className="text-slate-600 mt-2">Primary Income: <span className="text-slate-900 font-semibold">{formData.primaryIncome || 'Not specified'}</span></p>
                    <p className="text-slate-600 mt-2">Loan Purpose: <span className="text-slate-900 font-semibold">{formData.loanPurpose || 'Not specified'}</span></p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> By submitting this application, you certify that the information provided is accurate and complete. Your application will be reviewed by our credit team within 24 hours.
                </p>
              </div>
            </div>
          )}
        </form>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              step === 1
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
            }`}
          >
            ← Previous
          </button>

          {step === 5 ? (
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Submit Application
            </button>
          ) : (
            <button
              onClick={() => setStep(Math.min(5, step + 1))}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Next →
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
