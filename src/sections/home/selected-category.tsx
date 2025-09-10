import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardContent, CardActionArea, Grid, Stack } from '@mui/material';

import { Image } from 'src/components/image';

import { paths } from '../../routes/paths';
import { useRouter } from '../../routes/hooks';

import type { ICategory } from '../../utils/types';
import { SubCategoryCard } from './sub-category-card';

type Props = {
  category: ICategory;
  setSelectedCategory: (
    value: ((prevState: ICategory | undefined) => ICategory | undefined) | ICategory | undefined
  ) => void;
};

export function SelectedCategory({ category, setSelectedCategory }: Props) {
  const router = useRouter();
  const { id, name, image } = category;

  const linkTo = (scId: number) => `${paths.product.root}?categoryId=${id}&subcategoryId=${scId}`;

  const selectSubCategory = (scId: number) => {
    router.push(linkTo(scId));
  }

  const getName = (cat: ICategory) => cat.name?.replace("&amp;", "&");


  const renderImg = <Image alt={name} src={image} ratio="1/1" sx={{ borderRadius: 1.5 }} />;

  return (
    <Grid container
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "flex-start",
      }} spacing={2}>
      <Grid item>
        <Stack direction="column" spacing={2}>
        <Typography variant="h6" component="div">
            Select the subcategory you are interested in!
          </Typography>
        {category.children?.map((subcategory) => <Card variant="outlined" onClick={() => selectSubCategory(subcategory.id)} >
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" component="div">
                {getName(subcategory)}
              </Typography>

            </CardContent>
          </CardActionArea>
        </Card>
        )}
        </Stack>
      </Grid>
      <Grid item>
        <Box gap={3} display="flex" flexDirection="row">
          <SubCategoryCard category={category} setSelectedCategory={setSelectedCategory} />
        </Box>

        {/* <Button variant='text' onClick={() => setSelectedCategory(undefined)}>Back</Button> */}
      </Grid>
    </Grid>
  );
}
