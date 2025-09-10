import type { IOrder } from 'src/utils/types';

import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Alert, CardHeader } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import axios, { endpoints } from '../../../utils/axios';
import { AdminOrderRow } from '../admin-order-table-row';
import { Scrollbar } from '../../../components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../../components/table';

const TABLE_HEAD = [
  { id: 'id', label: 'Order', align: 'left' },
  { id: 'branchName', label: 'Branch', align: 'left', display: { xs: "none", md: "table-cell" } },
  { id: 'status', label: 'Status', align: 'left', display: { xs: "none", md: "table-cell" } },
  { id: 'accountCode', label: 'Account', align: 'left' },
  { id: 'date', label: 'Date', align: 'left' },
  { id: 'reference', label: 'Reference', align: 'left', display: { xs: "none", md: "table-cell" } },
  { id: 'numItems', label: 'Num Items', align: 'left', display: { xs: "none", md: "table-cell" } },
  { id: 'tax', label: 'Tax', align: 'right', display: { xs: "none", md: "table-cell" } },
  { id: 'total', label: 'Total', align: 'right', display: { xs: "none", md: "table-cell" } },
  { id: '' },
];


// ----------------------------------------------------------------------

export function AdminOrdersListView() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterName, setFilterName] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterStatus, setFilterStatus] = useState('all');

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    //
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'date', defaultOrder: 'desc', defaultDense: true, defaultRowsPerPage: 10 });

  useEffect(() => {
    getData();
  }, []);


  const dataFiltered = applyFilter({
    inputData: orders,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus);

  async function getData() {
    setLoading(true);
    setError('');
    axios.get(endpoints.admin.order.list)
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(`Problem fetching data: ${err}`);
        setLoading(false);
      });
  }


  if (loading) {
    return <LoadingScreen />
  }

  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      {error !== '' && <Alert severity="error">{error}</Alert>}
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          // height: { xs: 800, md: 2 },
          flexDirection: { md: 'column' },
        }}
      >
        <CardHeader title="Orders" sx={{ mb: 3 }} />
        <Scrollbar>
          <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={selected.length}
            // onSort={onSort}
            />
            <TableBody>
              {dataFiltered
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row: IOrder) => (
                  <AdminOrderRow key={row.id} row={row} />
                ))}
              <TableEmptyRows
                height={dense ? 34 : 34 + 20}
                emptyRows={emptyRows(page, rowsPerPage, orders.length)}
              />

              <TableNoData notFound={isNotFound} />

            </TableBody>
          </Table>
        </Scrollbar>
        <TablePaginationCustom
          page={page}
          dense={dense}
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onChangeDense={onChangeDense}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Card>

    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function applyFilter(FilterProps: {
  inputData: Array<IOrder>,
  comparator: Function,
  filterName: string,
  filterStatus: string,
}) {
  const stabilizedThis = FilterProps.inputData.map((el: any, index: number) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = FilterProps.comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  FilterProps.inputData = stabilizedThis.map((el) => el[0]);

  if (FilterProps.filterName) {
    const tFilterName = FilterProps.filterName.toLowerCase();
    FilterProps.inputData = FilterProps.inputData.filter(
      (Entry) => `${Entry.id}`.indexOf(tFilterName) !== -1 ||
        Entry.branchName?.toLowerCase().indexOf(tFilterName) !== -1 ||
        Entry.orderType?.toLowerCase().indexOf(tFilterName) !== -1 ||
        Entry.orderTakenBy?.toLowerCase().indexOf(tFilterName) !== -1 ||
        (Entry.orderReference !== undefined && Entry.orderReference.toLowerCase().indexOf(tFilterName) !== -1)
      // ||
      //   Entry.eventname.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
      //   Entry.ridername.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
      //   Entry.horsename.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
      //   Entry.status.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (FilterProps.filterStatus !== 'all') {
    FilterProps.inputData = FilterProps.inputData.filter(
      (order) =>
        order && order.orderType && order.orderType.toLowerCase().indexOf(FilterProps.filterStatus.toLowerCase()) !== -1
    );
  }

  return FilterProps.inputData;
}