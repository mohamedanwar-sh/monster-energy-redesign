import { useState } from "react";
import { useGSAP } from "@gsap/react";

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [energyOpen, setEnergyOpen] = useState(false);

  // Scroll hide/show
  useGSAP(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      const navbar = document.querySelector('nav');
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const navLinks = [
    { label: "ENERGY DRINKS", hasDropdown: true },
    { label: "STORE LOCATOR", hasDropdown: false },
    { label: "NEWS", hasDropdown: false },
    { label: "ATHLETES", hasDropdown: false },
    { label: "PROMOS", hasDropdown: false },
    { label: "EVENTS", hasDropdown: false },
  ];

  const energyDropdownItems = [
    { label: "Original Monster", href: "#choose-energy" },
    { label: "Monster Ultra", href: "#choose-energy" },
    { label: "Monster Juice", href: "#choose-energy" },
    { label: "Java Monster", href: "https://www.monsterenergy.com/en-us/energy-drinks/" },
    { label: "Monster Hydro", href: "https://www.monsterenergy.com/en-us/energy-drinks/" },
    { label: "Reign", href: "https://www.reignbodyfuel.com/" },
  ];

  const iconClass = "flex items-center justify-center p-[0.35rem] bg-transparent border-none cursor-pointer text-[#888888] transition-colors duration-200 hover:text-[#7CB701]";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-[#1e1e1e] font-['Barlow_Condensed',sans-serif] transition-transform duration-300"
      data-testid="site-nav"
    >

      {/* ════════════════════════════════════════════════════════
          DESKTOP — max-w-[1026px] centered · h-20 (80px)
      ════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex items-center justify-between max-w-256.5 mx-auto px-6 h-20">

        {/* Desktop logo */}
        <a href="/" className="shrink-0">
          <img src="/images/monster-logo.png" alt="Monster Energy" className="h-10 w-auto" />
        </a>

        {/* Nav links */}
        <ul className="flex items-center h-20 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.label} className="relative h-full flex items-center group">
              <button className="
                relative flex items-center gap-1 px-4 h-full
                text-white text-[0.75rem] font-bold tracking-[0.08em] uppercase
                bg-transparent border-none cursor-pointer whitespace-nowrap
                transition-colors duration-200 hover:text-monster-green
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0
                after:h-0.5 after:bg-monster-green
                after:scale-x-0 after:transition-transform after:duration-200
                hover:after:scale-x-100
              "
                aria-haspopup={link.hasDropdown ? "true" : undefined}
              >
                {link.label}
                {link.hasDropdown && (
                  <svg
                    className="w-2 h-2 fill-none stroke-current stroke-2 transition-transform duration-200 group-hover:rotate-180"
                    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </button>

              {link.hasDropdown && (
                <div className="
                  absolute top-full left-0 min-w-45
                  bg-reserve-bg border border-[#1e1e1e] border-t-2 border-t-monster-green
                  opacity-0 invisible -translate-y-1
                  transition-all duration-200
                  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                  z-100
                ">
	                  {energyDropdownItems.map((item) => (
	                    <a key={item.label} href={item.href} className="
	                      block px-4 py-[0.6rem]
	                      text-[#888888] text-[0.72rem] font-semibold tracking-[0.06em] uppercase
	                      no-underline transition-colors duration-150
	                      hover:text-monster-green hover:bg-monster-green/6
	                    ">
	                      {item.label}
	                    </a>
	                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop icons */}
        <div className="flex items-center gap-2">
          <button aria-label="Language" className={iconClass}><GlobeIcon /></button>
          <button aria-label="Location" className={iconClass}><PinIcon /></button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          MOBILE — hamburger left · M logo center · icons right
      ════════════════════════════════════════════════════════ */}
      <div className="lg:hidden flex items-center justify-between px-4 h-14">

        {/* Hamburger */}
        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          data-testid="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col justify-center gap-1.25 bg-transparent border-none cursor-pointer p-[0.4rem]"
        >
          <span className={`block w-5.5 h-0.5 bg-white rounded-sm transition-transform duration-300 ${menuOpen ? "translate-y-1.75 rotate-45" : ""}`} />
          <span className={`block w-5.5 h-0.5 bg-white rounded-sm transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5.5 h-0.5 bg-white rounded-sm transition-transform duration-300 ${menuOpen ? "-translate-y-1.75 -rotate-45" : ""}`} />
        </button>

        {/* Mobile logo */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2">
          <img src="/images/m.png" alt="Monster Energy" className="h-10 w-auto" />
        </a>

        {/* Icons */}
        <div className="flex items-center gap-1">
          <button aria-label="Language" className={iconClass}><GlobeIcon /></button>
          <button aria-label="Location" className={iconClass}><PinIcon /></button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════════════════════ */}
      <div
        id="mobile-navigation"
        data-testid="mobile-navigation"
        className={`lg:hidden flex-col bg-reserve-bg border-t border-[#1e1e1e] py-2 ${menuOpen ? "flex" : "hidden"}`}
      >
        {navLinks.map((link) => (
          <div key={link.label}>
              <button
                onClick={() => link.hasDropdown && setEnergyOpen(!energyOpen)}
                aria-expanded={link.hasDropdown ? energyOpen : undefined}
                className="
                flex justify-between items-center w-full text-left
                px-6 py-3 bg-transparent border-none cursor-pointer
                text-white text-[0.85rem] font-bold tracking-[0.08em] uppercase
                transition-colors duration-200 hover:text-monster-green
              "
            >
              {link.label}
              {link.hasDropdown && (
                <svg
                  width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className={`transition-transform duration-200 ${energyOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
            </button>

            {link.hasDropdown && energyOpen && (
              <div className="flex flex-col ml-6 border-l-2 border-monster-green bg-main-bg">
	                {energyDropdownItems.map((item) => (
	                  <a key={item.label} href={item.href} className="
	                    px-4 py-[0.6rem]
	                    text-[#888888] text-[0.78rem] font-semibold tracking-[0.06em] uppercase
	                    no-underline transition-colors duration-150 hover:text-monster-green
	                  ">
	                    {item.label}
	                  </a>
	                ))}
              </div>
            )}
          </div>
        ))}
      </div>

    </nav>
  );
};

export default NavBar;
