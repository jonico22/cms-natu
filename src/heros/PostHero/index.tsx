import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative">
      <div className="container">
        <div className="article-header">
          <div className="uppercase text-sm mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="article-title text-center text-sm md:text-base">
            <h1 className="mb-6 text-3xl md:text-3xl lg:text-4xl">{title}</h1>
          </div>

          <p className="article-meta text-center text-sm md:text-base">
            {hasAuthors && (
              <>
                Publicado por <span className="author">{formatAuthors(populatedAuthors)} </span>
              </>
            )}
            {publishedAt && (
              <>
                {!hasAuthors && <span>Publicado </span>}
                el{' '}
                <time dateTime={publishedAt}>
                  {new Date(publishedAt).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </>
            )}
          </p>
        </div>
      </div>
      <div className=" select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}
      </div>
    </div>
  )
}
