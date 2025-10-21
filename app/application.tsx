"use client";

import { useState } from "react";
import Link from "next/link";

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
  
  // Address Information
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Employment Information
  gigPlatforms: string[];
  yearsInGigWork: number;
  primaryIncomeSource: string;
  
  // Income Information
  monthlyIncome: number;
  lastSixMonthsAvg: number;
  incomeVariability: string;
  
  // Financial Obligations
  monthlyExpenses: number;
  existingDebts: number;
  bankruptcyHistory: string;
  
  // Loan Details
  requestedAmount: number;
  loanPurpose: string;
  repaymentCapacity: number;
  
  // Banking Information
  bankName: string;
  accountType: string;
  avgMonthlyDeposits: number;
  avgMonthlyWithdrawals: number;
  
  // Risk Factors
  creditScore: string;
  delinquencyHistory: string;
  additionalNotes: string;
}

export default function ApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    ssn: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    gigPlatforms: [],
    yearsInGigWork: 0,
    primaryIncomeSource: "",
    monthlyIncome: 0,
    lastSixMonthsAvg: 0,
    incomeVariability: "moderate",
    monthlyExpenses: 0,
    existingDebts: 0,
    bankruptcyHistory: "no",
    requestedAmount: 0,
    loanPurpose: "",
    repaymentCapacity: 0,
    bankName: "",
    accountType: "checking",
    avgMonthlyDeposits: 0,
    avgMonthlyWithdrawals: 0,
    creditScore: "",
    delinquencyHistory: "no",
    additionalNotes: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checkboxElement = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        gigPlatforms: checkboxElement.checked 
          ? [...prev.gigPlatforms, value]
          : prev.gigPlatforms.filter(p => p !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value
      }));
    }
  };

  const calculateRiskScore = () => {
    let score = 50;
    
    if (formData.monthlyIncome > 3000) score += 15;
    if (formData.monthlyIncome > 5000) score += 10;
    
    const debtToIncomeRatio = formData.existingDebts / (formData.monthlyIncome || 1);
    if (debtToIncomeRatio < 0.5) score += 15;
    else if (debtToIncomeRatio > 1) score -= 20;
    
    const loanToIncomeRatio = formData.requestedAmount / (formData.monthlyIncome || 1);
    if (loanToIncomeRatio < 2) score += 10;
    else if (loanToIncomeRatio > 4) score -= 15;
    
    if (formData.yearsInGigWork >= 3) score += 10;
    
    if (formData.incomeVariability === "low") score += 10;
    else if (formData.incomeVariability === "high") score -= 10;
    
    if (formData.creditScore === "excellent") score += 15;
    else if (formData.creditScore === "fair") score -= 10;
    else if (formData.creditScore === "poor") score -= 20;
    
    if (formData.delinquencyHistory === "yes") score -= 25;
    if (formData.bankruptcyHistory === "yes") score -= 30;
    
    return Math.max(0, Math.min(100, score));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const riskScore = calculateRiskScore();
    const applicationData = {
      ...formData,
      riskScore,
      submittedDate: new Date().toISOString(),
      status: "pending"
    };
    console.log("Application submitted:", applicationData);
    alert(`Application submitted! Risk Score: ${riskScore}`);
  };

  const steps = [
    { number: 1, title: "Personal Info" },
    { number: 2, title: "Employment" },
    { number: 3, title: "Financial" },
    { number: 4, title: "Banking" },
    { number: 5, title: "Review" }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">SSN (last 4) *</label>
                <input
                  type="password"
                  name="ssn"
                  value={formData.ssn}
                  onChange={handleInputChange}
                  placeholder="****"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Street Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="CA"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Zip Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Gig Platforms Used *</label>
              <div className="space-y-2">
                {["Uber", "Lyft", "DoorDash", "Instacart", "Freelancer", "Fiverr", "TaskRabbit", "Other"].map(platform => (
                  <label key={platform} className="flex items-center">
                    <input
                      type="checkbox"
                      value={platform}
                      checked={formData.gigPlatforms.includes(platform)}
                      onChange={handleInputChange}
                      className="mr-3 w-4 h-4 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-slate-700">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Years in Gig Work *</label>
                <input
                  type="number"
                  name="yearsInGigWork"
                  value={formData.yearsInGigWork}
                  onChange={handleInputChange}
                  min="0"
                  max="50"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Income Source *</label>
                <select
                  name="primaryIncomeSource"
                  value={formData.primaryIncomeSource}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select...</option>
                  <option value="rideshare">Rideshare (Uber/Lyft)</option>
                  <option value="delivery">Food Delivery</option>
                  <option value="freelance">Freelance Services</option>
                  <option value="tasks">Task Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Income *</label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-slate-600">$</span>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Last 6 Months Average *</label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-slate-600">$</span>
                  <input
                    type="number"
                    name="lastSixMonthsAvg"
                    value={formData.lastSixMonthsAvg}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Income Variability *</label>
              <select
                name="incomeVariability"
                value={formData.incomeVariability}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="low">Low (Consistent income)</option>
                <option value="moderate">Moderate (Some fluctuation)</option>
                <option value="high">High (Variable income)</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Expenses *</label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-slate-600">$</span>
                  <input
                    type="number"
                    name="monthlyExpenses"
                    value={formData.monthlyExpenses}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Existing Debts *</label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-slate-600">$</span>
                  <input
                    type="number"
                    name="existingDebts"
                    value={formData.existingDebts}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Bankruptcy History *</label>
              <select
                name="bankruptcyHistory"
                value={formData.bankruptcyHistory}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Requested Loan Amount *</label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-slate-600">$</span>
                  <input
                    type="number"
                    name="requestedAmount"
                    value={formData.requestedAmount}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Purpose *</label>
                <select
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select...</option>
                  <option value="vehicle">Vehicle Purchase/Repair</option>
                  <option value="business">Business Expenses</option>
                  <option value="emergency">Emergency</option>
                  <option value="debt">Debt Consolidation</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Estimated Monthly Repayment Capacity *</label>
              <div className="relative">
                <span className="absolute left-4 top-2 text-slate-600">$</span>
                <input
                  type="number"
                  name="repaymentCapacity"
                  value={formData.repaymentCapacity}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Bank Name *</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Account Type *</label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Avg Monthly Deposits *</label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-slate-600">$</span>
                  <input
                    type="number"
                    name="avgMonthlyDeposits"
                    value={formData.avgMonthlyDeposits}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Avg Monthly Withdrawals *</label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-slate-600">$</span>
                  <input
                    type="number"
                    name="avgMonthlyWithdrawals"
                    value={formData.avgMonthlyWithdrawals}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Credit Score Range *</label>
                <select
                  name="creditScore"
                  value={formData.creditScore}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select...</option>
                  <option value="excellent">Excellent (750+)</option>
                  <option value="good">Good (700-749)</option>
                  <option value="fair">Fair (650-699)</option>
                  <option value="poor">Poor (&lt;650)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Delinquency History *</label>
                <select
                  name="delinquencyHistory"
                  value={formData.delinquencyHistory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any additional information that might affect credit decision..."
              />
            </div>
          </div>
        );

      case 5:
        const riskScore = calculateRiskScore();
        const debtToIncome = ((formData.existingDebts / (formData.monthlyIncome || 1)) * 100).toFixed(1);
        const loanToIncome = ((formData.requestedAmount / (formData.monthlyIncome || 1)) * 100).toFixed(1);
        const netIncome = formData.monthlyIncome - formData.monthlyExpenses;

        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Calculated Risk Score</h3>
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">{riskScore}</div>
                <p className="text-blue-700">
                  {riskScore >= 80 ? "Low Risk - Likely Approval" : riskScore >= 60 ? "Moderate Risk - May Require Review" : "High Risk - Likely Denial"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-slate-600 text-sm font-semibold">Monthly Income</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">${formData.monthlyIncome.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-slate-600 text-sm font-semibold">Monthly Expenses</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">${formData.monthlyExpenses.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-slate-600 text-sm font-semibold">Net Monthly Income</p>
                <p className={`text-2xl font-bold mt-1 ${netIncome >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ${netIncome.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-slate-600 text-sm font-semibold">Debt-to-Income Ratio</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{debtToIncome}%</p>
                <p className="text-xs text-slate-500 mt-1">{parseFloat(debtToIncome) < 50 ? "✓ Acceptable" : "⚠ High"}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-slate-600 text-sm font-semibold">Loan-to-Income Ratio</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{loanToIncome}%</p>
                <p className="text-xs text-slate-500 mt-1">{parseFloat(loanToIncome) < 200 ? "✓ Acceptable" : "⚠ High"}</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This risk score is calculated based on the information provided. Final approval decisions will be reviewed by our credit team.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Application Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">Name: <span className="text-slate-900 font-semibold">{formData.firstName} {formData.lastName}</span></p>
                  <p className="text-slate-600 mt-2">Email: <span className="text-slate-900 font-semibold">{formData.email}</span></p>
                  <p className="text-slate-600 mt-2">Phone: <span className="text-slate-900 font-semibold">{formData.phone}</span></p>
                </div>
                <div>
                  <p className="text-slate-600">Gig Platforms: <span className="text-slate-900 font-semibold">{formData.gigPlatforms.join(", ") || "None selected"}</span></p>
                  <p className="text-slate-600 mt-2">Years in Gig Work: <span className="text-slate-900 font-semibold">{formData.yearsInGigWork}</span></p>
                  <p className="text-slate-600 mt-2">Requested Amount: <span className="text-slate-900 font-semibold">${formData.requestedAmount.toLocaleString()}</span></p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">RR</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">RoadRunner</h1>
          </Link>
          <Link href="/" className="text-slate-600 hover:text-slate-900 font-semibold">
            ← Back to Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">New Application</h2>
          <p className="text-slate-600">Step {currentStep} of 5</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex justify-between">
          {steps.map(step => (
            <div key={step.number} className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
                  step.number <= currentStep
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {step.number}
              </div>
              <p className="text-xs text-slate-600 text-center">{step.title}</p>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <form onSubmit={handleSubmit}>
            {renderStep()}
          </form>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentStep === 1
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-slate-200 text-slate-900 hover:bg-slate-300"
            }`}
          >
            ← Previous
          </button>

          {currentStep === 5 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Submit Application
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Next →
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-600 text-sm">
          <p>RoadRunner © 2024 | All information is confidential and secure</p>
        </div>
      </main>
    </div>
  );
}
