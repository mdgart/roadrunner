"use client";

import { useState } from "react";
import Link from "next/link";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "pending" | "approved" | "rejected" | "under-review";
  appliedDate: string;
  monthlyIncome: number;
  riskScore: number;
  loanAmount: number;
}

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "APP001",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 123-4567",
      status: "under-review",
      appliedDate: "2024-01-15",
      monthlyIncome: 3500,
      riskScore: 72,
      loanAmount: 5000,
    },
    {
      id: "APP002",
      name: "Marcus Chen",
      email: "m.chen@example.com",
      phone: "(555) 234-5678",
      status: "approved",
      appliedDate: "2024-01-10",
      monthlyIncome: 4200,
      riskScore: 85,
      loanAmount: 7500,
    },
    {
      id: "APP003",
      name: "Elena Rodriguez",
      email: "elena.r@example.com",
      phone: "(555) 345-6789",
      status: "pending",
      appliedDate: "2024-01-20",
      monthlyIncome: 2800,
      riskScore: 58,
      loanAmount: 3500,
    },
  ]);

  const statusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "under-review":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const riskColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const totalPending = applications.filter((a) => a.status === "pending").length;
  const totalApproved = applications.filter((a) => a.status === "approved").length;
  const avgIncome = Math.round(applications.reduce((sum, a) => sum + a.monthlyIncome, 0) / applications.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">RR</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">RoadRunner</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-600 hover:text-slate-900">Dashboard</button>
            <button className="text-slate-600 hover:text-slate-900">Settings</button>
            <button className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
              <span className="text-slate-700 font-semibold">U</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Applications</h2>
            <p className="text-slate-600">Manage and review merchant cash advance applications</p>
          </div>
          <Link
            href="/application"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            + New Application
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <p className="text-slate-600 text-sm font-medium">Total Applications</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{applications.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <p className="text-slate-600 text-sm font-medium">Pending Review</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{totalPending}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <p className="text-slate-600 text-sm font-medium">Approved</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{totalApproved}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <p className="text-slate-600 text-sm font-medium">Avg Monthly Income</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">${avgIncome.toLocaleString()}</p>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Applicant</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Monthly Income</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Loan Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Risk Score</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Applied</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">{app.name}</p>
                        <p className="text-sm text-slate-500">{app.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <p>{app.email}</p>
                      <p className="text-slate-500">{app.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">${app.monthlyIncome.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">${app.loanAmount.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`font-bold text-lg ${riskColor(app.riskScore)}`}>{app.riskScore}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusBadgeClass(app.status)}`}>
                        {app.status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{app.appliedDate}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                        Review →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-600 text-sm">
          <p>RoadRunner © 2024 | Fast financing for gig economy workers</p>
        </div>
      </main>
    </div>
  );
}
