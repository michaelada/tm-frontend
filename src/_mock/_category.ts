import { _mock } from './_mock';
import type { ICategory } from '../utils/types';

export const CATEGORY_NAMES = [
  'Graphite Pencils',
  'Children\'s Products',
  'Artist Products',
  'Office Products'
]

export const _categories: ICategory[] = CATEGORY_NAMES.map((_, i) => ({
  id: i,
  name: CATEGORY_NAMES[i],
  image: _mock.image.category(i)
}))
