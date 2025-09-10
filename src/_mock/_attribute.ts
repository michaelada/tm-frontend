import type { IAttributeType } from '../utils/types/product.interface';

export const ATTRIBUTE_NAMES = [
  'Box Size',
  'Colour',
  'Pencil Type',
  'Tin Size',
  'Type',
  'Thickness',
  'Case',
  'Size',
];

export const _attributeTypes: IAttributeType[] = ATTRIBUTE_NAMES.map((_, i) => ({
  id: i,
  name: ATTRIBUTE_NAMES[i],
}));
