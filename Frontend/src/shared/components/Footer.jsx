import { Link } from 'react-router'
import { SiOpslevel } from 'react-icons/si'

const Footer = () => {
  return (
    <footer className="relative bg-bg border-t border-border overflow-hidden pt-24 pb-8">
      {/* Huge tilted background icon on the right */}
      <div className="absolute -right-10 top-0 md:-top-20 text-primary opacity-[0.15] -rotate-12 pointer-events-none select-none z-0 transform transition-transform duration-1000 hover:rotate-0">
        <SiOpslevel className="w-[400px] h-[400px] md:w-[800px] md:h-[800px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-24">

          {/* Logo & Main Info */}
          <div className="lg:col-span-2 flex flex-col pr-8">
            <Link to="/" className="items-center gap-3 text-3xl font-extrabold text-text mb-6 group inline-flex w-fit">
              <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <SiOpslevel className="text-2xl" />
              </div>
              <span className="tracking-light">MayDayOps</span>
            </Link>
            <p className="text-text-muted text-lg mb-8 leading-relaxed font-medium">
              The incident response platform for modern engineering teams. Turn production chaos into controlled, autonomous recovery.
            </p>

            {/* Social links (styled as pills) */}
            <div className="flex flex-wrap gap-2">
              {['BlueSky', 'LinkedIn', 'X', 'Facebook', 'Youtube', 'Slack Community'].map((social) => (
                <a key={social} href="#" className="px-4 py-2 rounded-full border border-border bg-bg text-sm font-bold text-text-muted hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all hover:-translate-y-1 shadow-sm">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-text mb-6 uppercase tracking-widest text-md flex items-center gap-2">
              Product
            </h3>
            <ul className="space-y-4">
              {['On-call', 'Incident Response', 'Status Pages', 'AI', 'Changelog'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-text-muted hover:text-primary transition-colors font-semibold relative inline-block group">
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Links */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-text mb-6 uppercase tracking-widest text-md flex items-center gap-2">
              Learn
            </h3>
            <ul className="space-y-4">
              {['Blog', 'Customer Stories', 'Documentation', 'Alternatives', 'Community'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-text-muted hover:text-primary transition-colors font-semibold relative inline-block group">
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-text mb-6 uppercase tracking-widest text-md flex items-center gap-2">
              Company
            </h3>
            <ul className="space-y-4">
              {['Legal', 'Privacy Choices', 'Security and Compliance', 'Careers', 'Status'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-text-muted hover:text-primary transition-colors font-semibold relative inline-block group">
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="logo h-full w-full flex items-center justify-center text-text-muted">
            <SiOpslevel className="text-9xl text-primary/90" />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-center items-center gap-6">
          <p className="text-text-muted text-sm font-semibold">
            © 2026 MayDayOps Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer