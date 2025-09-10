import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardMedia, CardContent, CardActionArea } from '@mui/material';

import { Image } from 'src/components/image';

import type { ICategory } from '../../utils/types';

type Props = {
  category: ICategory;
  setSelectedCategory: (
    value: ((prevState: ICategory | undefined) => ICategory | undefined) | ICategory | undefined
  ) => void;
};

export function CategoryCard({ category, setSelectedCategory }: Props) {
  const { name, image } = category;


  const selectCategory = () => {
    setSelectedCategory(category)
  }

  const renderImg = <Image alt={name} src={image} ratio="1/1" sx={{ borderRadius: 1.5 }} />;

  return (
    <Card onClick={selectCategory} >
      <CardActionArea>
        <CardContent>
          <Typography variant="h6" component="div">
            {category.name}
          </Typography>
          <CardMedia>
            {renderImg}
          </CardMedia>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
