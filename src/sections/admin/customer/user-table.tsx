import { Button, Chip, Stack } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useCallback } from 'react';
import { impersonate } from 'src/auth/context/jwt/action';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { RouterLink } from 'src/routes/components';
import { adminpaths } from '../../../routes/adminpaths';
import { paths } from '../../../routes/paths';

import {
  emptyRows,
  TableEmptyRows,
  TableNoData,
  TablePaginationCustom,
  TableSkeleton,
  useTable,
} from '../../../components/table';
import { useRouter } from '../../../routes/hooks';

import type { IUser } from '../../../utils/types';

type UserTableProps = {
  users?: IUser[];
  isLoading?: boolean;
};

export function UserTable({
  users,
  isLoading
}: UserTableProps) {
  const table = useTable({ defaultRowsPerPage: 10 });

  const notFound = !users?.length;

  return (
    <>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }} size="small" >
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Is Admin</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && <TableSkeleton />}

            {users?.slice(
              table.page * table.rowsPerPage,
              table.page * table.rowsPerPage + table.rowsPerPage
            )
              .map((row, index) => (
                <UserTableRow key={row.id} row={row} />
              ))}

            <TableEmptyRows
              height={table.dense ? 56 : 56 + 20}
              emptyRows={emptyRows(table.page, table.rowsPerPage, users?.length || 0)}
            />

            <TableNoData notFound={notFound} />
          </TableBody>
        </Table>
      </Scrollbar>

      <TablePaginationCustom
        page={table.page}
        count={users?.length || 0}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </>
  );
}


type UserRowProps = {
  row: IUser;
};

function UserTableRow({ row }: UserRowProps) {
  const router = useRouter();

  const onImpersonate = useCallback(async () => {
    await impersonate({ userid: row.id });
    router.push(paths.dashboard.products);
    router.refresh();
  }, [router, row.id]);


  return (
    <TableRow hover>
      <TableCell>{row.username}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell align="center">{row.isActive ? <Chip size="small" label="Active" color="success" variant="outlined" /> : <Chip size="small" label="InActive" color="error" variant="outlined" />}</TableCell>
      <TableCell align='center'>{row.isAdmin ? 'Yes' : ''}</TableCell>
      <TableCell align='right'>
        <Stack direction="row">
          <Button
            component={RouterLink}
            size="small" color="primary" variant="outlined"
            href={adminpaths.dashboard.user.reset(`${row?.id}`)}
            startIcon={<Iconify width={16} icon="eva:edit-outline" />}
            sx={{ mr: 1 }}
          >
            Reset Pwd
          </Button>
          <Button size="small" variant="outlined" color="warning" onClick={onImpersonate} startIcon={<Iconify icon='eva:people-outline' />}>Impersonate</Button>
        </Stack>
      </TableCell>
    </TableRow>
  )
}
