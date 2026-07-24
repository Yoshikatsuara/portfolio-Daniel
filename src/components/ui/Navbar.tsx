export default function Navbar() {
  return (
    <nav className="home-nav">
      <div className="home-nav-inner">
        <span className="home-brand">DANIEL@ARA:~$</span>
        <div className="home-links">
          <a href="#sobre">./sobre</a>
          <a href="#cases">./cases</a>
          <a href="#stack">./stack</a>
          <a href="#contato">./contato</a>
        </div>
        <span className="home-badge">
          <span className="dot" />
          Atualmente: Retail Media Analyst @ Cadastra
        </span>
      </div>
    </nav>
  );
}
