import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useGetCategories } from '../../actions/category';
import { ProductGroupSkeleton } from '../product/product-skeleton';
import { CategoryCard } from './category-card';
import { ICategory } from '../../utils/types';
import { SelectedCategory } from './selected-category';

export function HomeCategories({ sx, ...other }: BoxProps) {
  const { categories, categoriesLoading } = useGetCategories();

  const [selectedCategory, setSelectedCategory]  = useState<ICategory>();

  const renderLoading = <ProductGroupSkeleton />;

  const renderList = categories.map((category) => (
    <CategoryCard setSelectedCategory={setSelectedCategory} key={category.id} category={category} />
  ));

  const renderParentCategories = () => (
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
      >
        {categoriesLoading ? renderLoading : renderList}
      </Box>
    )

  const renderSelectedCategory = (c: ICategory) => <SelectedCategory setSelectedCategory={setSelectedCategory} category={c} />

  if (categoriesLoading) {
    return renderLoading;
  }
  if (selectedCategory) {
    return renderSelectedCategory(selectedCategory);
  }

  return renderParentCategories();
}
