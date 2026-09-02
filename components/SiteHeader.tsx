'use client';

// components/SiteHeader.tsx — LEAD-OWNED SHELL FILE. Frozen after Prompt 5 (A-6).
// No section agent edits this. An agent that needs a change here stops and hands it back.
//
// Implements docs/behavior/01-mobile-nav-drawer.md and 02-sticky-header.md exactly.
// Both the stickiness and the drawer's scroll-lock construction are specified there for
// reasons that are written down; read the spec before changing a number in this file.

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, X } from 'lucide-react';
import { siteHeader } from '@/content/copy';
import { business } from '@/lib/business';

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // ---- spec 02: sticky state from an IntersectionObserver on a zero-height sentinel.
  // NOT a scroll listener — this is the one element on screen during every scroll on the
  // site, and an observer fires twice per page instead of once per frame.
  useLayoutEffect(() => {
    setStuck(false); // reset BEFORE paint of the new route, or /privacy renders stuck
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), {
      threshold: 0,
      rootMargin: '0px',
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pathname]);

  // ---- spec 01: scroll lock. position:fixed + top:-scrollY, with a SYNCHRONOUS restore.
  // NOT overflow:hidden — iOS Safari ignores it and the page scrolls under the drawer.
  const lock = useCallback(() => {
    const y = window.scrollY;
    const b = document.body;
    b.style.position = 'fixed';
    b.style.top = `-${y}px`;
    b.style.left = '0';
    b.style.right = '0';
    b.dataset.scrollY = String(y);
  }, []);

  const unlock = useCallback(() => {
    const b = document.body;
    if (b.dataset.scrollY === undefined) return;
    const y = Number(b.dataset.scrollY || 0);
    b.style.position = '';
    b.style.top = '';
    b.style.left = '';
    b.style.right = '';
    delete b.dataset.scrollY;
    window.scrollTo(0, y); // synchronous, NOT smooth, NOT rAF-deferred
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      unlock();
      return;
    }
    lock();
    // Focus the first focusable element in the panel.
    const first = drawerRef.current?.querySelector<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      // Focus trap: Tab from the last wraps to the first, Shift+Tab from the first wraps
      // to the last. Only while open.
      const nodes = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!nodes || nodes.length === 0) return;
      const list = Array.from(nodes);
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    // Viewport crossing 768px upward while open -> close and release in the same frame.
    // Otherwise a rotated phone leaves position:fixed on the body at desktop width and
    // the page cannot be scrolled at all.
    const mq = window.matchMedia('(min-width: 768px)');
    const onMq = (e: MediaQueryListEvent) => { if (e.matches) close(); };

    // The page behind is aria-hidden AND inert while open, so a screen reader's virtual
    // cursor cannot walk out of the panel and focus cannot tab into the call bar the user
    // cannot see (spec 03: the bar is inert while the drawer is open).
    const outside = Array.from(
      document.querySelectorAll<HTMLElement>('main, footer, .call-bar')
    );
    for (const el of outside) {
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
    }

    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
      for (const el of outside) {
        el.removeAttribute('inert');
        el.removeAttribute('aria-hidden');
      }
    };
  }, [open, lock, unlock, close]);

  // Client-side route change -> close unconditionally. The header lives in the layout and
  // survives a <Link> navigation, so without this the drawer stays open over the new page
  // with the old page's scroll position restored underneath it.
  useEffect(() => { setOpen(false); }, [pathname]);

  // Release the lock if the component is ever torn down while open.
  useEffect(() => unlock, [unlock]);

  return (
    <>
      {/* Zero-height sentinel for the sticky observer. Must precede the header. */}
      <div ref={sentinelRef} aria-hidden="true" style={{ height: 0 }} />

      <header
        className="site-header band"
        data-section="site-header"
        {...(stuck ? { 'data-stuck': '' } : {})}
      >
        <div className="header-inner">
          <Link href="/" className="wordmark">
            {business.name.split(' ')[0]}
            <span>Garage Door Repairs</span>
          </Link>

          <nav className="nav-desktop" aria-label="Primary">
            {siteHeader.nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                {...(pathname === n.href ? { 'aria-current': 'page' as const } : {})}
              >
                {n.label}
              </Link>
            ))}
            <a className="btn btn--call" href={business.phoneHref}>
              <Phone size={18} aria-hidden="true" focusable="false" />
              {siteHeader.ctaLabel}
            </a>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            {open
              ? <X size={20} aria-hidden="true" focusable="false" />
              : <Menu size={20} aria-hidden="true" focusable="false" />}
            {siteHeader.menuLabel}
          </button>
        </div>

        {/* Failure mode, spec 01: if the JavaScript never runs the drawer must not swallow
            the navigation. The <nav> is in the DOM with [hidden]; this reveals it as a
            plain static list and hides the dead toggle. */}
        <noscript>
          <style>{`#site-drawer{display:flex !important;position:static;transform:none;opacity:1;width:auto}.nav-toggle{display:none !important}`}</style>
        </noscript>
      </header>

      {/* Scrim and panel are ALWAYS in the DOM (spec 01) — never conditionally rendered
          away, or the open transition has no start state and the first frame is a jump. */}
      <div
        className="drawer-scrim"
        hidden={!open}
        {...(open ? { 'data-open': '' } : {})}
        onClick={close}
        aria-hidden="true"
      />
      <nav
        ref={drawerRef}
        id="site-drawer"
        aria-label="Site"
        className="drawer"
        hidden={!open}
        {...(open ? { 'data-open': '' } : {})}
      >
        {siteHeader.nav.map((n) => (
          <Link key={n.href} href={n.href} onClick={close}>
            {n.label}
          </Link>
        ))}
        <a className="btn btn--call" href={business.phoneHref} onClick={close}>
          <Phone size={18} aria-hidden="true" focusable="false" />
          {business.phone}
        </a>
      </nav>
    </>
  );
}
