import { Category } from "@prisma/client"
import { prisma } from "../prisma/client"

export const getCatergories = async (): Promise<Category[]> => {
  const categories = await prisma.category.findMany()
  return categories
}

export const createCategory = async (
  name: string
): Promise<Category | null> => {
  const category = await prisma.category.create({
    data: { name },
  })
  return category
}

export const deleteCategory = async (name: string): Promise<boolean> => {
  const category = await prisma.category.findUnique({ where: { name } })
  if (!category) {
    return false
  }
  await prisma.category.delete({
    where: { name },
  })
  return true
}
