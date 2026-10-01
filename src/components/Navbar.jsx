const links = [
  { label: "Inicio", href: "#hero" },
  { label: "Stack", href: "#stack" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

// 1. Subcomponente para el Logo
function NavLogo({ name }) {
  return (
    <span className="font-heading text-xl font-bold text-primary cursor-pointer">
      {name}
    </span>
  );
}

// 2. Subcomponente para cada enlace de navegación
function NavLink({ href, children }) { 
  return (
    <li>
      <a
        href={href}
        className="text-muted hover:text-primary transition-colors font-body"
      >
        {children}
      </a>
    </li>
  );
}

// 3. Subcomponente para el botón de acción
function NavButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg bg-primary text-bg font-medium hover:opacity-90 transition-opacity"
    >
      {children}
    </button>
  );
}

// 4. Componente principal (mantiene el JSX limpio)
function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-bg/80 backdrop-blur-md border-b border-surface z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLogo name="Pablo Palacio" />

        <ul className="hidden md:flex gap-8">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </ul>

        <NavButton>Iniciar sesión</NavButton>
      </div>
    </nav>
  );
}


export default Navbar;