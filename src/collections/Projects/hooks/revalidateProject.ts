import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Project } from '@/payload-types'

const getProjectPath = (slug?: string | null): string => {
  return slug ? `/projects/${slug}` : ''
}

export const revalidateProject: CollectionAfterChangeHook<Project> = ({
  doc,
  previousDoc, // может быть undefined при создании
  req: { payload, context },
}) => {
  if (context?.disableRevalidate) return doc

  // Путь текущего документа
  const currentPath = getProjectPath(doc.slug)

  // 1. Если документ опубликован — инвалидируем его путь
  if (doc._status === 'published' && currentPath) {
    payload.logger.info(`Revalidating project at path: ${currentPath}`)
    revalidatePath(currentPath)
    revalidateTag('projects-sitemap')
  }

  // 2. Если ДО ЭТОГО документ был опубликован, а теперь — нет (например, черновик или удалён из публикации)
  if (previousDoc && previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = getProjectPath(previousDoc.slug)
    if (oldPath) {
      payload.logger.info(`Revalidating old (now unpublished) project at path: ${oldPath}`)
      revalidatePath(oldPath)
      revalidateTag('projects-sitemap')
    }
  }

  return doc
}

// Для удаления — отдельный хук (afterDelete)
export const revalidateProjectDelete: CollectionAfterDeleteHook<Project> = ({
  doc,
  req: { context },
}) => {
  if (context?.disableRevalidate) return doc

  const path = getProjectPath(doc?.slug)
  if (path) {
    revalidatePath(path)
    revalidateTag('projects-sitemap')
  }

  return doc
}
