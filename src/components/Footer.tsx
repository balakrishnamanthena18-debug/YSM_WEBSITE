import React from 'react';
import Link from 'next/link';
import { Container } from './ui/Container';

export function Footer() {
  return (
    <footer className="w-full bg-[#102E2D] text-white/80 border-t border-white/10 pt-16 pb-12 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#16B6B8] flex items-center justify-center text-[#102E2D] font-bold text-sm shadow-sm">
                <span>Y</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                YSM <span className="font-normal text-[#5BC4CC]">Infotech</span>
              </span>
            </div>
            <p className="text-sm font-normal text-white/70 max-w-sm leading-relaxed">
              Empowering ambitious professionals and graduates in Data Analytics, AI/ML, and Cloud Computing through industry-led enterprise training. ISO 9001:2015 Certified.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white/90">Programs</h4>
            <ul className="space-y-2 text-sm text-white/65">
              <li><Link href="/#programs" className="hover:text-[#5BC4CC] transition-colors duration-200">Course Explorer</Link></li>
              <li><Link href="/#what-to-expect" className="hover:text-[#5BC4CC] transition-colors duration-200">Our Approach</Link></li>
              <li><Link href="/#audience" className="hover:text-[#5BC4CC] transition-colors duration-200">Suitable For</Link></li>
              <li><Link href="/#why-ysm" className="hover:text-[#5BC4CC] transition-colors duration-200">Why Choose Us</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white/90">Organization</h4>
            <ul className="space-y-2 text-sm text-white/65">
              <li><Link href="/about" className="hover:text-[#5BC4CC] transition-colors duration-200">About YSM</Link></li>
              <li><Link href="/e-learning" className="hover:text-[#5BC4CC] transition-colors duration-200">E-Learning</Link></li>
              <li><Link href="/contact" className="hover:text-[#5BC4CC] transition-colors duration-200">Contact Us</Link></li>
              <li><a href="https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20know%20more%20about%20your%20courses." target="_blank" rel="noopener noreferrer" className="hover:text-[#5BC4CC] transition-colors duration-200">Admissions &amp; Help</a></li>
              <li><a href="tel:+917997791456" className="hover:text-[#5BC4CC] transition-colors duration-200">+91 79977 91456</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} YSM Infotech. All rights reserved. ISO 9001:2015 Certified.</p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
