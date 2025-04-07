import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="container not-found-container">
      <div className="error-code">404</div>
      <h1>Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>
      <p>Es posible que hayas escrito mal la dirección o que el enlace esté desactualizado.</p>

      <div className="error-actions">
        <Link href="/" className="cta-button">
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}
