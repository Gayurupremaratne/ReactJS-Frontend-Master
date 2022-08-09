import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  FilteringState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

//import { generateRows } from '../../../demo-data/generator';
import plans from './plans';

export default () => {
  const [columns] = useState([
    { name: 'Publisher', title: 'Publisher' },
    { name: 'No.of Articles', title: 'No.of Articles' },
    { name: 'Category', title: 'Category' },

  ]);
  //const [rows] = useState(generateRows({ length: 8 }));

  return (
    <Paper>
      <Grid
        rows={plans}
        columns={columns}
      >
        <PagingState
          defaultCurrentPage={0}
          pageSize={5}
        />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <IntegratedPaging />
        <Table />
        <TableHeaderRow />
        <TableFilterRow />
        <PagingPanel />
      </Grid>
    </Paper>
  );
};