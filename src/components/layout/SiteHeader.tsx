import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Studio" },
  { href: "/studio/aes", label: "AES" },
  { href: "/studio/des", label: "DES" },
  { href: "/studio/diffie-hellman", label: "Diffie-Hellman" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell site-header__inner">
        <Link className="brand-mark" href="/">
          <span className="brand-mark__badge">CA</span>
          <div>
            <strong>Cipher Atlas</strong>
            <span>Cryptography learning studio</span>
          </div>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
