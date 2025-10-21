import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white font-bold text-xl">
              $
            </div>
            <span className="text-xl font-bold text-slate-900">RoadRunner</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <a href="#how-it-works" className="text-blue-600 font-medium text-sm hover:text-blue-700">
              How it Works
            </a>
            <a href="#benefits" className="text-slate-600 font-medium text-sm hover:text-slate-900">
              Benefits
            </a>
          </nav>

          {/* CTA Button */}
          <Link href="/apply">
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
              Apply Now
            </button>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-slate-100/30 py-32">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-20 -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-teal-100 blur-3xl opacity-20 -z-10" />

          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-3 px-3 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6 w-fit">
                  <span className="text-blue-600 text-xs font-semibold">💰 Fast Funding for Gig Workers</span>
                </div>

                {/* Headline */}
                <h1 className="text-6xl font-bold text-slate-900 leading-tight mb-4">
                  Get Funded{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                    Today
                  </span>
                </h1>

                {/* Description */}
                <p className="text-xl text-slate-600 mb-8 max-w-md">
                  Merchant Cash Advance built for gig workers. Get the capital you need to grow your business, scale your operations, or handle unexpected expenses—fast.
                </p>

                {/* CTAs */}
                <div className="flex gap-4 mb-8">
                  <Link href="/apply">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                      Get Started
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                      </svg>
                    </button>
                  </Link>
                  <button className="bg-white border border-blue-200 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                    Learn More
                  </button>
                </div>

                {/* Stats */}
                <div className="flex gap-8 pt-4 border-t border-slate-200">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">10K+</div>
                    <div className="text-sm text-slate-600">Active Gig Workers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">$50M+</div>
                    <div className="text-sm text-slate-600">Funded</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">98%</div>
                    <div className="text-sm text-slate-600">Approval Rate</div>
                  </div>
                </div>
              </div>

              {/* Right - Hero Image Area */}
              <div className="relative h-96">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 border border-blue-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
                      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Fast Funding</h3>
                    <p className="text-sm text-slate-600">Approved in minutes, funded today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why RoadRunner Works Section */}
        <section className="border-t border-slate-200 py-32">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Why RoadRunner Works</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Designed specifically for the gig economy. Get the capital you need without the traditional bank hassles.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {[
                { icon: '⚡', title: 'Fast Approval', desc: 'Get approved in minutes, not weeks' },
                { icon: '💵', title: 'Flexible Amounts', desc: 'Borrow what you need, from $500 to $10,000' },
                { icon: '⏰', title: 'Easy Repayment', desc: 'Flexible terms based on your actual earnings' },
                { icon: '🛡️', title: 'Transparent Pricing', desc: 'No hidden fees, just honest pricing' },
                { icon: '📈', title: 'Earnings Based', desc: 'Repay as a percentage of your daily sales' },
                { icon: '📊', title: 'Real-Time Tracking', desc: 'Monitor your application and account status' },
              ].map((feature, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                        idx === 0 ? "M4 14a1 1 0 01-.78-1.63l9.9-10.2a.5.5 0 01.86.46l-1.92 6.02A1 1 0 0013 10h7a1 1 0 01.78 1.63l-9.9 10.2a.5.5 0 01-.86-.46l1.92-6.02A1 1 0 0011 14z" :
                        idx === 1 ? "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" :
                        idx === 2 ? "M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" :
                        idx === 3 ? "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 011-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 011.52 0C14.51 3.81 17 5 19 5a1 1 0 011 1z" :
                        idx === 4 ? "M16 7h6v6m-22 7l8.5-8.5 5 5L22 7" :
                        "M3 3v16a2 2 0 002 2h16M18 17V9M13 17V5M8 17v-3"
                      } />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-gradient-to-b from-slate-50/30 to-white border-t border-slate-200 py-32">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Three simple steps to get funded</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {[
                { num: '1', title: 'Apply Online', desc: 'Share your basic info and business details. Takes just 5 minutes.' },
                { num: '2', title: 'Quick Review', desc: 'We analyze your income and creditworthiness. Most decisions in minutes.' },
                { num: '3', title: 'Get Funded', desc: 'Funds hit your account the same day. Start growing immediately.' },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-lg mb-4">
                      {step.num}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                  {/* Connector line */}
                  {idx < 2 && (
                    <div className="absolute top-7 -right-8 w-8 h-1 bg-gradient-to-r from-blue-600 to-teal-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Built for Gig Workers Section */}
        <section id="benefits" className="border-t border-slate-200 py-32">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Built for Gig Workers</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">We understand the challenges of gig work</p>
            </div>

            <div className="grid grid-cols-2 gap-12">
              {[
                'No fixed monthly payments—repay as you earn',
                'Flexible terms from 3 to 12 months',
                'Transparent pricing with no hidden costs',
                'Same-day funding to your bank account',
                'Designed for variable income patterns',
                'Dedicated support team you can actually reach',
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-teal-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg text-slate-900 font-medium">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-blue-50/50 to-white border-t border-slate-200 py-24">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Ready to Scale Your Business?</h2>
            <p className="text-lg text-slate-600 mb-8">Join thousands of gig workers already growing with RoadRunner</p>
            <Link href="/apply">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100/50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">RoadRunner</h3>
              <p className="text-sm text-slate-600">Fast, flexible funding for gig workers</p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">How it Works</a></li>
                <li><a href="#benefits" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Benefits</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8">
            <p className="text-sm text-slate-600 text-center">© 2024 RoadRunner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
