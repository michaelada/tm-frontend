import type { SetStateAction} from 'react';
import type { IOrder } from 'src/utils/types';

import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Tab, Tabs, Alert, CardHeader } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label/label';
import { LoadingScreen } from 'src/components/loading-screen';

import { OrderRow } from '../order-table-row';
import OrderTableToolbar from '../order-table-toolbar';
import axios, { endpoints } from '../../../utils/axios';
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

import type { LabelColor } from '../../../components/label/types';

const TABLE_HEAD = [
  { id: 'id', label: 'Order', align: 'left' },
  { id: 'branchName', label: 'Branch', align: 'left', display: { xs: "none", md: "table-cell" } },
  { id: 'type', label: 'Type', align: 'left' },
  { id: 'date', label: 'Date', align: 'left' },
  { id: 'reference', label: 'Reference', align: 'left', display: { xs: "none", md: "table-cell" } },
  { id: 'numItems', label: 'Num Items', align: 'left', display: { xs: "none", md: "table-cell" } },
  { id: 'tax', label: 'Tax', align: 'right', display: { xs: "none", md: "table-cell" } },
  { id: 'total', label: 'Total', align: 'right', display: { xs: "none", md: "table-cell" } },
  { id: '' },
];


// ----------------------------------------------------------------------

export function OrdersListView() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'date', defaultOrder: 'desc', defaultDense: true, defaultRowsPerPage: 10 });

  const getLengthByType = (type: string) => orders.filter((item: IOrder) => item.orderType === type).length;

  const TABS = [
    { value: 'all', label: 'All', color: 'info', count: orders.length },
    { value: 'web', label: 'Web', color: 'success', count: getLengthByType('Web') },
    { value: 'offline', label: 'Offline', color: 'warning', count: getLengthByType('Offline') },
  ];

  const getColour = (colour: string) => {
    const warning:LabelColor = 'warning';
    const info:LabelColor = 'info';
    const def:LabelColor = 'error';

    switch (colour) {
        case 'info':
          return info;
        case 'warning':
          return warning;
        default:
          return def;

    }
  }

  useEffect(() => {
    getData();
  }, []);

  const isFiltered = filterStatus !== 'all' || filterName !== '';

  const handleFilterStatus = (event: any, newValue: string) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  
  const dataFiltered = applyFilter({
    inputData: orders,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus);

  const handleFilterName = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setPage(0);
    setFilterName('');
    setFilterStatus('all');
  };

  async function getData() {
    setLoading(true);
    setError('');
    axios.get(endpoints.order.list)
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
        <Tabs
          value={filterStatus}
          onChange={handleFilterStatus}
          sx={{
            px: 2,
            bgcolor: 'background.neutral',
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              icon={
                <Label color={getColour(tab.color)} sx={{ mr: 1 }}>
                  {tab.count}
                </Label>
              }
            />
          ))}
        </Tabs>
        <OrderTableToolbar
          filterName={filterName}
          isFiltered={isFiltered}
          onFilterName={handleFilterName}
          onResetFilter={handleResetFilter} />
        <Scrollbar>
          <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={selected.length}
              onSort={onSort}
            />
            <TableBody>
              {dataFiltered
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row: IOrder) => (
                  <OrderRow key={row.id} row={row} />
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