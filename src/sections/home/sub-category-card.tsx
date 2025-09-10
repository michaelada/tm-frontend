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

export function SubCategoryCard({ category, setSelectedCategory }: Props) {
  const { name, image } = category;

  const selectCategory = () => {
    setSelectedCategory(undefined);
  }

  const renderImg = <Image alt={name} src={image} ratio="1/1" sx={{ borderRadius: 1.5 }} />;

  return (
    <Card onClick={selectCategory}>
      <CardActionArea>
        <CardContent>
        <Typography variant="h6" component="div"  align='center'>
            Click here to go back
          </Typography>
          <CardMedia>
            {renderImg}
          </CardMedia>
          <Typography variant="h4" component="div" align='center'>
            {category.name}
          </Typography>
        </CardContent>

      </CardActionArea>
    </Card>
  );
}
