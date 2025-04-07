import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="site-footer-simple">
      <div className="container footer-grid-simple">
        <div className="footer-logo-simple">
          <Logo />
        </div>
        <div className="footer-contact-simple">
          <h4>Comunícate</h4>
          <p>
            <a href="https://wa.me/51973681101" target="_blank">
              <svg
                className="footer-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.1.2-.2.2-.4.1-.6-.2-1.2-.5-2.1-1.2-.8-.7-1.3-1.5-1.5-1.8-.2-.3 0-.5.1-.6.1-.1.2-.2.4-.4.1-.1.2-.2.3-.4.1-.2 0-.4-.1-.5C9.6 9.1 9 7.6 8.8 7.1c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.3.3-.9 1-.9 2.3 0 1.4 1 2.7 1.1 2.9.1.2 1.8 2.8 4.4 3.9.6.2 1.1.4 1.5.5.6.2 1.1.1 1.5-.1.5-.2 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.4-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18.4c-4.6 0-8.4-3.8-8.4-8.4 0-4.6 3.8-8.4 8.4-8.4 4.6 0 8.4 3.8 8.4 8.4 0 4.6-3.8 8.4-8.4 8.4z" />
              </svg>{' '}
              +51 973681101
            </a>
          </p>
          <p>
            <a href="mailto:contacto@naturalezahermana.com">
              <svg
                className="footer-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
              </svg>{' '}
              contacto@naturalezahermana.com
            </a>
          </p>
        </div>
        <div className="footer-links-simple">
          <h4>Enlaces</h4>
          <ul>
            {navItems.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink className="text-white" {...link} />
                </li>
              )
            })}
          </ul>
        </div>
        <div className="footer-social-simple">
          <h4>Síguenos</h4>
          <div className="social-icons-simple">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg
                className="footer-icon social-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.14H6.11v4.03h3.4v8.2h4.03v-8.2h3.38l.6-4.03z" />
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg
                className="footer-icon social-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.4 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z" />
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg
                className="footer-icon social-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2c2.7 0 3 .01 4.1.06 1.1.05 1.8.2 2.4.4.6.3 1.1.7 1.6 1.2s.9 1 1.2 1.6c.3.6.4 1.3.4 2.4.05 1.1.06 1.4.06 4.1s-.01 3-.06 4.1c-.05 1.1-.2 1.8-.4 2.4-.3.6-.7 1.1-1.2 1.6-.5.5-1 .9-1.6 1.2-.6.3-1.3.4-2.4.4-1.1.05-1.4.06-4.1.06s-3-.01-4.1-.06c-1.1-.05-1.8-.2-2.4-.4-.6-.3-1.1-.7-1.6-1.2-.5-.5-.9-1-1.2-1.6-.3-.6-.4-1.3-.4-2.4-.05-1.1-.06-1.4-.06-4.1s.01-3 .06-4.1c.05-1.1.2-1.8.4-2.4.3-.6.7-1.1 1.2-1.6.5-.5 1-.9 1.6-1.2.6-.3 1.3-.4 2.4-.4 1.1-.05 1.4-.06 4.1-.06zm0 1.9c-2.6 0-3 .01-4 .06-1 .05-1.5.2-1.9.4-.5.2-.8.5-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.3 1-.4 1.9-.05 1-.06 1.4-.06 4s.01 3 .06 4c.05 1 .2 1.5.4 1.9.2.5.5.8.8 1.2.4.4.7.6 1.2.8.4.2 1 .3 1.9.4 1 .05 1.4.06 4 .06s3-.01 4-.06c1-.05 1.5-.2 1.9-.4.5-.2.8-.5 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-1 .4-1.9.05-1 .06-1.4.06-4s-.01-3-.06-4c-.05-1-.2-1.5-.4-1.9-.2-.5-.5-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-1-.3-1.9-.4-1-.05-1.4-.06-4-.06zm0 4.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.5c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3zm5.3-8.5c-.9 0-1.6-.7-1.6-1.6s.7-1.6 1.6-1.6 1.6.7 1.6 1.6-.7 1.6-1.6 1.6z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-copyright-simple">
        <p>© {new Date().getFullYear()} Naturaleza Hermana. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
