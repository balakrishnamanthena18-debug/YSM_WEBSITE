import React from 'react';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Card } from './ui/Card';

export function FoundationHero() {
  return (
    <section className="py-20 md:py-32 flex-1 flex flex-col justify-center">
      <Container>
        <div className="max-w-4xl space-y-8">
          {/* Subtle status tag */}
          <div className="flex items-center gap-3">
            <Badge variant="teal">Foundation Ready</Badge>
            <span className="text-xs text-[#071B1C]/50 font-normal">Next.js App Router • Design Tokens Configured</span>
          </div>

          {/* Large Editorial Headline (Weight 400, lightweight, premium feel) */}
          <h1 className="editorial-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#071B1C]">
            Architecting intelligent digital infrastructure for modern enterprises.
          </h1>

          {/* Editorial Subtitle (Weight 400/500, spacious, readable) */}
          <p className="editorial-subhead text-lg sm:text-xl text-[#071B1C]/75 max-w-2xl font-normal leading-relaxed">
            A clean, precision-engineered digital experience built on high-concurrency systems, modular component architecture, and modern typography.
          </p>

          {/* Actions with restrained styling */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button variant="primary" size="lg">
              Explore Capabilities
            </Button>
            <Button variant="outline" size="lg">
              Architecture Overview
            </Button>
            {/* Minimal accent indicator demo */}
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#071B1C]/60 pl-2">
              <span className="w-2 h-2 rounded-full bg-[#16B6B8] border border-[#176B68]/30 inline-block" />
              Design System v1.0
            </span>
          </div>
        </div>

        {/* Foundation Token Verification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
          <Card hoverable className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#006B68]/10 text-[#006B68] flex items-center justify-center font-semibold text-sm">
              01
            </div>
            <h3 className="text-base font-semibold text-[#071B1C]">Engineered Tokens</h3>
            <p className="text-sm text-[#071B1C]/70 font-normal leading-relaxed">
              Curated teal palette, deep ink typography, and custom CSS variables configured for cross-platform scalability.
            </p>
          </Card>

          <Card hoverable className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#008F8B]/10 text-[#008F8B] flex items-center justify-center font-semibold text-sm">
              02
            </div>
            <h3 className="text-base font-semibold text-[#071B1C]">Refined Typography</h3>
            <p className="text-sm text-[#071B1C]/70 font-normal leading-relaxed">
              Plus Jakarta Sans with lightweight editorial headlines, accessible contrast ratios, and responsive optical scaling.
            </p>
          </Card>

          <Card hoverable className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#12AFA8]/10 text-[#12AFA8] flex items-center justify-center font-semibold text-sm">
              03
            </div>
            <h3 className="text-base font-semibold text-[#071B1C]">Modular Architecture</h3>
            <p className="text-sm text-[#071B1C]/70 font-normal leading-relaxed">
              Server-first React components, zero bloated dependencies, and clean boundary separation across components.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
