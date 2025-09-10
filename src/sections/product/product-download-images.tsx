import type { IProduct } from "src/utils/types";

import { Link } from "react-router-dom";

import { Box, Paper, Table, TableRow, TableBody, TableCell, TableHead, TableContainer } from "@mui/material";

import { useTable, emptyRows, TableEmptyRows } from "src/components/table";

type Props = {
    product?: IProduct;
};

export function ProductDownloadImages({ product }: Props) {
    const table = useTable({ defaultRowsPerPage: 10 });

    function srcset(image: string | undefined, size: number, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    if (!product || !product.product_images) {
        return (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <></>
        )
    }   

    return (
        <Box sx={{p:2}}>
            <TableContainer component={Paper}>
            <Table size={table.dense ? 'small' : 'medium'} sx={{  }}>
            <TableHead>
                <TableRow>
                    <TableCell>Click on Image To Download It</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {product?.product_images?.map((item, index) => (
                    <TableRow key={item.id}>
                        <TableCell>
                                <Link to={item.image || ''}>
                                    <img
                                        {...srcset(item.image, 121, 1, 1)}
                                        loading="lazy"
                                        alt={`${index + 1}`}
                                        width={121}
                                    />
                                
                                </Link>
                        </TableCell>
                    </TableRow>
                ))}
                <TableEmptyRows
                    height={table.dense ? 34 : 34 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, product?.product_images?.length)}
                />
            </TableBody>
        </Table>
        </TableContainer>
        </Box>
        // <ImageList
        //     sx={{ width: 500, height: 450 }}
        //     variant="quilted"
        //     cols={4}
        //     rowHeight={121}
        // >
        //     {product?.product_images?.map((item, index) => (
        //         <Link to={item.image || ''}><ImageListItem key={`image-${index}`} onClick={() => downloadImage()}>
        //             <img
        //                 {...srcset(item.image, 121, 1, 1)}
        //                 loading="lazy"
        //                 alt={`${index + 1}`}
        //             />
        //         </ImageListItem>
        //         </Link>
        //     ))}
        // </ImageList>
    )

}