/* Lohit — portfolio interactions
   Parallax, scroll reveals, progress bar, custom cursor.
   No dependencies. Respects prefers-reduced-motion. */

(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll reveals ---------- */
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const d = el.dataset.delay;
    if (d) el.style.setProperty('--d', `${d}ms`);
  });
  if (reduced) {
    reveals.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  }

  /* ---------- Parallax + progress (single rAF loop) ---------- */
  const layers = [...document.querySelectorAll('[data-speed]')].map(el => ({
    el, speed: parseFloat(el.dataset.speed)
  }));
  const bar = document.querySelector('.progress span');
  let current = window.scrollY;
  let target = current;
  let running = false;

  const frame = () => {
    target = window.scrollY;
    // lerp toward the real scroll position for a soft, weighty feel
    current += (target - current) * 0.085;
    if (Math.abs(target - current) < 0.05) current = target;

    for (const { el, speed } of layers) {
      el.style.transform = `translate3d(0, ${current * speed}px, 0)`;
    }
    if (bar) {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? target / max : 0})`;
    }

    if (current !== target) {
      requestAnimationFrame(frame);
    } else {
      running = false;
    }
  };
  const wake = () => {
    if (!running) { running = true; requestAnimationFrame(frame); }
  };
  if (!reduced) {
    addEventListener('scroll', wake, { passive: true });
    addEventListener('resize', wake);
    wake();
  } else if (bar) {
    addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    }, { passive: true });
  }

  /* ---------- Custom cursor ---------- */
  const cursor = document.querySelector('.cursor');
  if (cursor && matchMedia('(hover: hover)').matches && !reduced) {
    let cx = -100, cy = -100, tx = cx, ty = cy, cursorRunning = false;

    const cursorFrame = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        requestAnimationFrame(cursorFrame);
      } else {
        cursorRunning = false;
      }
    };
    addEventListener('mousemove', e => {
      tx = e.clientX; ty = e.clientY;
      document.body.classList.add('cursor-on');
      if (!cursorRunning) { cursorRunning = true; requestAnimationFrame(cursorFrame); }
    }, { passive: true });

    for (const link of document.querySelectorAll('a')) {
      link.addEventListener('mouseenter', () => cursor.classList.add('is-link'));
      link.addEventListener('mouseleave', () => cursor.classList.remove('is-link'));
    }
  }
})();
