import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import Link from 'next/link'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <>
      {slug === 'home' && (
        <>
          <section className="image-banner">
            <div className="banner-content">
              <h2>
                Generar conciencia social e involucrar a la sociedad en la defensa de nuestros
                recursos naturales
              </h2>
            </div>
          </section>
          <section className="purpose-section">
            <div className="container purpose-grid">
              <div className="purpose-image">
                <img
                  src="/proposito.webp"
                  alt="Imagen representativa del propósito de Naturaleza Hermana"
                  loading={'lazy'}
                  fetchPriority={'auto'}
                  decoding="async"
                />
              </div>
              <div className="purpose-text">
                <h2>Nuestro Propósito</h2>
                <p>
                  Defender nuestro medioambiente de la contaminación ambiental ocasionada por las
                  empresas transnacionales que cuando se ven involucradas en casos de catástrofes
                  ambientales o la violación de derechos humanos, la justicia tarda en llegar.
                </p>
                <Link href="/nuestros-propositos" className="cta-button purpose-cta">
                  Saber Más
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
      <article className={slug === 'home' ? 'container' : 'container about-container'}>
        <PageClient />
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} />
        {slug === 'sobre-nosotros' && (
          <section className="container values-section">
            <h2>Nuestros Valores Fundamentales</h2>
            <div className="value-item">
              <h3>
                <span className="value-icon">🤝</span> Respeto
              </h3>
              <p>
                Consideramos el respeto como un valor imprescindible que promueve la paz y la
                convivencia entre las personas. Y reconocemos y defendemos la diversidad cultural y
                ambiental.
              </p>
            </div>
            <div className="value-item">
              <h3>
                <span className="value-icon">💖</span> Solidaridad
              </h3>
              <p>
                Entendemos que la responsabilidad conjunta en el desarrollo integral del ser humano
                es el valor esencial para el logro del bien común.
              </p>
            </div>
            <div className="value-item">
              <h3>
                <span className="value-icon">🎯</span> Compromiso
              </h3>
              <p>
                Actuamos comprometidos en el cumplimiento de nuestra misión y visión y con la
                integridad, como principio fundamental de nuestras actuaciones.
              </p>
            </div>
            <div className="value-item">
              <h3>
                <span className="value-icon">🌍</span> Justicia Global
              </h3>
              <p>
                Defendemos un enfoque de desarrollo basado en los Derechos Humanos y la justicia
                climática, orientado a su cumplimiento y a erradicar las desigualdades globales.
              </p>
            </div>
            <div className="value-item">
              <h3>
                <span className="value-icon">⚖️</span> Igualdad
              </h3>
              <p>
                Creemos que todas las personas tienen derecho a recibir un trato justo y a gozar de
                los mismos derechos y oportunidades.
              </p>
            </div>
          </section>
        )}
      </article>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
