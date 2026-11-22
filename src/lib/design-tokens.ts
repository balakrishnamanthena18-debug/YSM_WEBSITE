/**
 * YSM Infotech Design System Tokens
 * Source of truth for brand colors, layout constraints, motion, and typography.
 *
 * Brand Palette Discipline:
 * - Primary Palette: Deep Forest Teal (#006B68), Origami Turquoise (#12AFA8 / #00B2B6), Deep Obsidian Ink (#071B1C), and White (#FFFFFF).
 * - Surfaces: Calibrated Soft Canvas (#F5FAF9) and Clean White (#FFFFFF).
 * - Strict Exclusions: No generic purple SaaS gradients, no loud neon gimmicks.
 */

export const colors = {
  // Core Interface Palette
  primaryTeal: '#006B68',    // Core primary action & corporate anchor
  secondaryTeal: '#008F8B',  // Intermediate depth & hover states
  brightTeal: '#12AFA8',     // Vibrant turquoise highlight & focus rings
  deepInk: '#071B1C',        // Editorial typography & deep slate surfaces
  deepNavy: '#082C35',       // Secondary dark containers
  softBackground: '#F5FAF9', // Canvas background tint
  white: '#FFFFFF',          // Card surfaces & clean canvas
  accent: '#5BC4CC',         // Aqua brand token

  // Exact Facet Palette from Official Origami Logo (ysm-logo.svg)
  logo: {
    vibrantTurquoise: '#00B2B6', // Origami top-left & top-right wings
    deepTeal: '#005A58',         // Origami center fold facet
    cyanFacet: '#38C6C3',        // Lower stem primary facet
    highlightFacet: '#4DD6D3',   // Lower stem secondary facet
    wordmarkInk: '#071B1C',      // Signature serif logotype
    accreditationText: '#071B1C', // "AN ISO 9001: 2015 CERTIFIED"
  },

  // Monochromatic Slate Ramp
  slate: {
    50: '#F8FAFA',
    100: '#EEF4F4',
    200: '#DDE7E7',
    300: '#C0D2D2',
    400: '#8EA8A7',
    500: '#5E7F7E',
    600: '#3D5B5A',
    700: '#233E3E',
    800: '#142B2B',
    900: '#071B1C',
  },
} as const;

export const motionTokens = {
  fast: '200ms cubic-bezier(0.16, 1, 0.3, 1)',
  normal: '300ms cubic-bezier(0.16, 1, 0.3, 1)',
  slow: '600ms cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

export const layoutTokens = {
  maxWidth: '1380px',
  gutter: 'clamp(1.25rem, 5vw, 3rem)',
} as const;
