import { Box } from '@mui/material';
import { useGetFavourites } from '../../actions/favourite';

// material
// ----------------------------------------------------------------------


export default function FavouriteSize() {
  const { productGroups } = useGetFavourites();


    if (productGroups.length > 0) {
        return (
            <Box color="error"> ({productGroups.length})</Box>
        )
    }
    return <></>;

}

