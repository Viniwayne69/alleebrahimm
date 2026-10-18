'use client';

import { useEffect } from 'react';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
// Both section photos share this aspect ratio (height / width) and are drawn at 118% of the section width.
// The bottom 13% of each photo holds a watermark, so the parallax never scrolls that far down.
const BG_RATIO = 945 / 1418;
const BG_SCALE = 1.18;
const WATERMARK_SHARE = 0.13;

/** Desktop-only behaviour: scroll reveal, parallax and the mouse glow. Renders nothing. */
export function DesktopEffects() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.desktop');
    if (!root) return;

    const revealItems = root.querySelectorAll<HTMLElement>('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealItems.forEach((el) => el.classList.add('in'));
      return;
    }

    const wide = window.matchMedia('(min-width: 1024px)');
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -4% 0px' },
    );
    revealItems.forEach((el) => io.observe(el));

    const photo = root.querySelector<HTMLElement>('.d-hero-photo img');
    const backgrounds = Array.from(root.querySelectorAll<HTMLElement>('[data-parallax-bg]'));
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!wide.matches) return;
      if (photo) photo.style.transform = `translate3d(0, ${Math.min(window.scrollY * 0.14, 70)}px, 0)`;
      for (const el of backgrounds) {
        const rect = el.getBoundingClientRect();
        const imageHeight = el.clientWidth * BG_SCALE * BG_RATIO;
        const slack = Math.max(0, imageHeight * (1 - WATERMARK_SHARE) - rect.height);
        const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1);
        el.style.backgroundPositionY = `${-slack * progress}px`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    const hero = root.querySelector<HTMLElement>('.d-hero');
    const onMove = (event: MouseEvent) => {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      hero.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };
    hero?.addEventListener('mousemove', onMove);

    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      hero?.removeEventListener('mousemove', onMove);
    };
  }, []);

  return null;
}
