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
import data from './data';

export default () => {
  const [columns] = useState([
   
    { name: 'name', title: 'name' },
    { name: 'date', title: 'date' },
  ]);
  //const [rows] = useState(generateRows({ length: 8 }));

  return (
    <Paper>
      <Grid
        rows={data}
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