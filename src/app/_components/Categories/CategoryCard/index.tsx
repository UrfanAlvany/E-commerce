'use client'
import React from 'react'
import Link from 'next/link'

import {Category, Media} from '../../../../payload/payload-types'

import classes from './index.module.scss'
import {useFilter} from "../../../_providers/Filter";

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const media = category.media as Media
  const { setCategoryFilters} =useFilter()

  return (
    <Link
      href="/products"
      className={classes.card}
      style={{ backgroundImage: `url(${media?.url})` }}
      onClick = {() => setCategoryFilters([category.id])}
    >
      <p className={classes.title}>{category.title}</p>
    </Link>
  )
}

export default CategoryCard
