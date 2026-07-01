const Footer = () => {
  const companyLinks = [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "https://www.monsterenergy.com/en-us/careers/" },
    { label: "Sustainability", href: "https://www.monsterenergy.com/en-us/sustainability/" },
    { label: "Energy Drink Info", href: "#energy-profile" },
    { label: "Monster Army", href: "https://www.monsterarmy.com/" },
  ];

  const supportLinks = [
    { label: "FAQs", href: "https://www.monsterenergy.com/en-us/contact-us/" },
    { label: "Contact Us", href: "https://www.monsterenergy.com/en-us/contact-us/" },
    { label: "Where To Buy", href: "https://www.monsterenergy.com/en-us/where-to-buy/" },
  ];

  const exploreLinks = [
    { label: "Promotions", href: "https://www.monsterenergy.com/en-us/promotions/" },
    { label: "Gaming", href: "https://www.monsterenergy.com/en-us/gaming/" },
    { label: "Energy Drinks", href: "#choose-energy" },
  ];

  const socialIcons = [
    { name: "Facebook", href: "https://www.facebook.com/MonsterEnergy", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
    { name: "Instagram", href: "https://www.instagram.com/monsterenergy/", path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.69 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.69-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85.15-3.25 1.68-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.58.07 4.95.2 4.35 2.63 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.58-.01 4.95-.07 4.35-.2 6.78-2.63 6.98-6.98.06-1.37.07-1.7.07-4.95 0-3.26-.01-3.58-.07-4.95-.2-4.35-2.63-6.78-6.98-6.98C15.58.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" },
    { name: "YouTube", href: "https://www.youtube.com/user/monsterenergy", path: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.81zM9.55 15.5V8.5l6.27 3.5-6.27 3.5z" },
    { name: "X", href: "https://x.com/monsterenergy", path: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23zm-1.16 13.12h1.84L7.08 4.18H5.12l12.96 11.19z" },
    { name: "TikTok", href: "https://www.tiktok.com/@monsterenergy", path: "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 2.8 1.63 3.83 1 1.03 2.3 1.58 3.91 1.62v3.54c-1.35-.05-2.53-.28-3.54-.78-1.01-.5-1.84-1.18-2.48-2.04v8.16c0 2.22-.77 4.14-2.31 5.76-1.54 1.62-3.39 2.43-5.55 2.43-1.14 0-2.22-.22-3.23-.66-1.01-.44-1.88-1.06-2.61-1.86-.73-.8-1.3-1.72-1.71-2.76-.41-1.04-.61-2.14-.61-3.3 0-1.14.2-2.24.61-3.3.41-1.06.98-1.98 1.71-2.76.73-.8 1.6-1.42 2.61-1.86 1.01-.44 2.09-.66 3.23-.66.39 0 .78.03 1.17.09.39.06.76.15 1.12.27V7.13c-.64-.22-1.31-.33-2.01-.33-1.55 0-2.87.55-3.96 1.64-1.09 1.09-1.64 2.41-1.64 3.96 0 1.55.55 2.87 1.64 3.96 1.09 1.09 2.41 1.64 3.96 1.64 1.14 0 2.14-.32 3.01-.97.87-.65 1.47-1.48 1.8-2.49V.02z" },
    { name: "Snapchat", href: "https://www.snapchat.com/add/monsterenergy", path: "M12.21.02C12.1.02 11.99.02 11.88.03c-.86.07-1.7.3-2.48.67-.78.37-1.48.87-2.06 1.47-.58.6-1.04 1.3-1.35 2.07-.31.77-.47 1.59-.47 2.42 0 .83.16 1.65.47 2.42.31.77.77 1.47 1.35 2.07.58.6 1.28 1.1 2.06 1.47.78.37 1.62.6 2.48.67.11.01.22.01.33.01.11 0 .22 0 .33-.01.86-.07 1.7-.3 2.48-.67.78-.37 1.48-.87 2.06-1.47.58-.6 1.04-1.3 1.35-2.07.31-.77.47-1.59.47-2.42 0-.83-.16-1.65-.47-2.42-.31-.77-.77-1.47-1.35-2.07-.58-.6-1.28-1.1-2.06-1.47-.78-.37-1.62-.6-2.48-.67-.11-.01-.22-.01-.33-.01zM8.5 14.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm7 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-3.5 2c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" },
    { name: "Twitch", href: "https://www.twitch.tv/monsterenergy", path: "M11.57 2h.43c.36.02.71.1 1.03.24.32.14.6.34.84.58.24.24.43.52.56.84.13.32.2.67.2 1.03v7.66c0 .36-.07.71-.2 1.03-.13.32-.32.6-.56.84-.24.24-.52.43-.84.56-.32.13-.67.2-1.03.2h-.43c-.36-.02-.71-.1-1.03-.24-.32-.14-.6-.34-.84-.58-.24-.24-.43-.52-.56-.84-.13-.32-.2-.67-.2-1.03V4.69c0-.36.07-.71.2-1.03.13-.32.32-.6.56-.84.24-.24.52-.43.84-.56.32-.13.67-.2 1.03-.2zm4.86 0h.43c.36.02.71.1 1.03.24.32.14.6.34.84.58.24.24.43.52.56.84.13.32.2.67.2 1.03v7.66c0 .36-.07.71-.2 1.03-.13.32-.32.6-.56.84-.24.24-.52.43-.84.56-.32.13-.67.2-1.03.2h-.43c-.36-.02-.71-.1-1.03-.24-.32-.14-.6-.34-.84-.58-.24-.24-.43-.52-.56-.84-.13-.32-.2-.67-.2-1.03V4.69c0-.36.07-.71.2-1.03.13-.32.32-.6.56-.84.24-.24.52-.43.84-.56.32-.13.67-.2 1.03-.2zM2 5.5v11l3.5 3.5h3l2.5-2.5H14v-8H9.5l-2.5-2.5V5.5H2z" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/monster-energy/", path: "M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2zM7.91 18.18H5.27V9.5h2.64v8.68zM6.59 8.35a1.53 1.53 0 1 1 0-3.06 1.53 1.53 0 0 1 0 3.06zM18.18 18.18h-2.64v-4.23c0-1.01-.02-2.31-1.41-2.31-1.41 0-1.62 1.1-1.62 2.23v4.31H9.88V9.5h2.53v1.18h.04c.35-.66 1.21-1.36 2.49-1.36 2.66 0 3.15 1.75 3.15 4.03v4.83z" },
  ];

  return (
    <footer
      className="bg-black text-white pt-16 pb-6 px-6 md:px-12 lg:px-20"
      data-testid="site-footer"
    >
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* Logo + Social */}
        <div className="flex flex-col items-start gap-8">
          <img 
            src="/images/monster-energy-logo.webp" 
            alt="Monster Energy" 
            loading="lazy"
            decoding="async"
            className="h-24 w-auto"
          />
          
          <div className="flex flex-wrap gap-3">
            {socialIcons.map((social) => (
	              <a
	                key={social.name}
	                href={social.href}
	                aria-label={social.name}
                  target="_blank"
                  rel="noreferrer"
	                className="w-11 h-11 flex items-center justify-center rounded-full border border-[#333] text-white hover:border-monster-green hover:text-monster-green transition-all duration-200"
	              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold tracking-wide mb-2">Company</h2>
          {companyLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#888] text-sm hover:text-monster-green transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Support Links */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold tracking-wide mb-2">Support</h2>
          {supportLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#888] text-sm hover:text-monster-green transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Explore Links */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold tracking-wide mb-2">Explore</h2>
          {exploreLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#888] text-sm hover:text-monster-green transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-350 mx-auto mt-16 pt-6 border-t border-[#1e1e1e] flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-[#777] text-xs">

        <span>All Rights Reserved</span>
        <span>Redesigned by <span className="text-monster-green font-semibold">Mohamed Anwar</span></span>
        <a href="https://www.monsterenergy.com/en-us/privacy-policy/" className="hover:text-monster-green transition-colors">Privacy Policy</a>
        <a href="https://www.monsterenergy.com/en-us/cookie-policy/" className="hover:text-monster-green transition-colors">Cookies Policy</a>
        <a href="https://www.monsterenergy.com/en-us/terms-of-use/" className="hover:text-monster-green transition-colors">Terms of Use</a>
        <a href="https://www.monsterenergy.com/en-us/privacy-policy/" className="hover:text-monster-green transition-colors">Do Not Sell or Share My Personal Information</a>
      </div>
    </footer>
  );
};

export default Footer;
