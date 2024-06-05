import Link from 'next/link'

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link legacyBehavior href={href}>
            <span className="nav-link">{label}</span>
          </Link>
        </li>
      )
    })

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <span className="navbar-brand">GitTix</span>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  )
}

export default Header