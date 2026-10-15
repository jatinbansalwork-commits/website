import { mountNavDither, setBookDitherHover, setNavDitherActive } from "./nav-dither.js";

function initHeaderNav() {
  const nav = document.querySelector("[data-twostep-nav]");
  if (!nav) return;

  const toggle = nav.querySelector('[data-nav-toggle="toggle"]');
  const servicesCol = nav.querySelector(".tsnav__col--services");
  const servicesToggle = nav.querySelector("[data-nav-services-toggle]");

  const setServicesOpen = (open) => {
    if (!servicesCol) return;
    servicesCol.toggleAttribute("data-acc-open", open);
    servicesToggle?.setAttribute("aria-expanded", String(open));
  };

  const setStatus = (status) => {
    nav.setAttribute("data-nav-status", status);
    const open = status === "active";
    toggle?.setAttribute("aria-expanded", String(open));
    toggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.documentElement.classList.toggle("nav-open", open);
    setNavDitherActive(open);
  };

  const isOpen = () => nav.getAttribute("data-nav-status") === "active";
  const open = () => setStatus("active");
  const close = () => {
    const shouldRestoreFocus = nav.contains(document.activeElement);
    setServicesOpen(false);
    setStatus("not-active");
    if (shouldRestoreFocus) toggle?.focus();
  };
  const toggleMenu = () => (isOpen() ? close() : open());

  document.querySelectorAll('[data-nav-toggle="toggle"]').forEach((el) => {
    el.addEventListener("click", toggleMenu);
  });

  document.querySelectorAll('[data-nav-toggle="close"]').forEach((el) => {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) close();
  });

  servicesToggle?.addEventListener("click", () => {
    setServicesOpen(!servicesCol?.hasAttribute("data-acc-open"));
  });

  document.querySelectorAll("[data-nav-dither]").forEach(mountNavDither);

  document.querySelectorAll(".tsnav__book").forEach((book) => {
    const canvas = book.querySelector("[data-nav-dither]");
    if (!canvas) return;

    book.addEventListener("mouseenter", () => {
      if (!isOpen()) return;
      setBookDitherHover(canvas, true);
    });

    book.addEventListener("mouseleave", () => {
      setBookDitherHover(canvas, false);
    });

    book.addEventListener("focus", () => {
      if (!isOpen()) return;
      setBookDitherHover(canvas, true);
    });

    book.addEventListener("blur", () => {
      setBookDitherHover(canvas, false);
    });
  });
}

initHeaderNav();
