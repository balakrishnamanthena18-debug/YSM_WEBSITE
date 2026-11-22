'use client';

import { useEffect } from 'react';

export function HashRedirectHandler() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Instant native redirect if page is loaded with #about
    if (window.location.hash === '#about') {
      window.location.replace('/about');
      return;
    }

    // Also listen for hashchange if user clicks a hash link in-page
    const handleHashChange = () => {
      if (window.location.hash === '#about') {
        window.location.replace('/about');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return null;
}
