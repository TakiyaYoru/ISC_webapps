import { journalVietnamese } from './journalVietnamese'

export type JournalEntry = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  readingTime: string
  image: string
  imageAlt: string
  date: string
  body: string[]
}

export const journal: JournalEntry[] = journalVietnamese

export const findArticle = (slug: string) => journal.find((j) => j.slug === slug)
