import { ChangeEvent, ReactElement, useMemo, useState } from 'react';
import {
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import { DataGrid, GridApi, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import IconifyIcon from 'components/base/IconifyIcon';
import { debounce } from 'lodash';

// Hardcoded data for the new table
const rows = [
  {
    id: 1,
    product: 'Credito N°1',
    status: 'Moroso',
    dateExecuted: '2024-12-05',
    dateRequested: '2024-12-01',
    priority: true,
  },
  {
    id: 2,
    product: 'Credito N°2',
        status: 'Al Dia',
        dateExecuted: '2024-12-04',
    dateRequested: '2024-12-02',
    priority: false,
  },
  {
    id: 3,
    product: 'Credito N°3',
    status: 'Moroso',
    dateExecuted: '2024-12-06',
    dateRequested: '2024-12-03',
    priority: true,
  },
  {
    id: 4,
    product: 'Credito N°4',
    status: 'Al Dia',
    dateExecuted: '2024-12-07',
    dateRequested: '2024-12-04',
    priority: true,
  },
  {
    id: 5,
    product: 'Credito N°5',
    status: 'Moroso',
    dateExecuted: '2024-12-08',
    dateRequested: '2024-12-05',
    priority: true,
  },
];

// Function to calculate the difference in days between two dates
const calculateDaysDifference = (dateExecuted: string, dateRequested: string): number => {
  const executedDate = new Date(dateExecuted);
  const requestedDate = new Date(dateRequested);
  const timeDifference = executedDate.getTime() - requestedDate.getTime();
  return Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
};

// Columns configuration
const columns: GridColDef[] = [
  {
    field: 'product',
    headerName: 'Credito',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'status',
    headerName: 'Estado',
    flex: 1,
    minWidth: 180,
    renderCell: (params: any) => {
      const status = params.value;
      const isRealizado = status === 'Moroso';

      return (
        <Chip
          label={status}
          color={isRealizado ? 'error' : 'success'}
          sx={{
            backgroundColor: isRealizado ? 'rgb(245, 79, 95)' : 'rgb(31, 166, 119)',
            color: 'white',
            fontWeight: 'bold',
          }}
          size="small"
        />
      );
    },
  },
  {
    field: 'dateRequested',
    headerName: 'Solicitado',
    flex: 1,
    minWidth: 180,
  },
  {
    field: 'dateExecuted',
    headerName: 'Abjudicado',
    flex: 1,
    minWidth: 180,
  },
  {
    field: 'demora',
    headerName: 'Demora (días)',
    flex: 1,
    minWidth: 180,
    renderCell: (params: any) => {
      const { dateExecuted, dateRequested } = params.row;
      const daysDifference = calculateDaysDifference(dateExecuted, dateRequested);
      return (
        <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          {daysDifference}
        </Typography>
      );
    },
  },
  {
    field: 'priority',
    headerName: 'Prioridad',
    flex: 0.75,
    minWidth: 120,
    renderCell: (params: any) => {
      const [isPriority, setIsPriority] = useState(params.value);

      const handleClick = () => {
        setIsPriority(!isPriority);
      };

      return (
        <IconButton
          color={isPriority ? 'primary' : 'default'}
          size="small"
          onClick={handleClick}
          sx={{
            backgroundColor: isPriority ? 'yellow' : 'transparent',
            borderRadius: '50%',
            padding: 0.5,
            boxShadow: 'none', // Optional: To remove any outline shadow
          }}
        >
          <IconifyIcon
            icon={isPriority ? 'mdi:flash' : 'mdi:star-outline'}
            width={20}
            height={20}
            sx={{ color: isPriority ? 'black' : 'inherit' }}
          />
        </IconButton>
      );
    },
  },
];

const HomeSellingProduct = (): ReactElement => {
  const apiRef = useGridApiRef<GridApi>();
  const [search, setSearch] = useState('');

  const handleGridSearch = useMemo(() => {
    return debounce((searchValue: string) => {
      apiRef.current.setQuickFilterValues(searchValue.split(' ').filter((word) => word !== ''));
    }, 250);
  }, [apiRef]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearch(searchValue);
    handleGridSearch(searchValue);
  };

  return (
    <Stack
      bgcolor="background.paper"
      borderRadius={5}
      width={1}
      boxShadow={(theme) => theme.shadows[4]}
      height={1}
    >
      <Stack
        direction={{ sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        padding={3.75}
        gap={3.75}
      >
        <Typography variant="h5" color="text.primary">
        Estado de Morosidad
        </Typography>
        <TextField
          variant="filled"
          placeholder="Buscar..."
          onChange={handleChange}
          value={search}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ width: 24, height: 24 }}>
                <IconifyIcon icon="mdi:search" width={1} height={1} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Divider />
      <Stack height={1}>
        <DataGrid
          apiRef={apiRef}
          columns={columns}
          rows={rows}
          getRowHeight={() => 70}
          hideFooterSelectedRowCount
          disableColumnResize
          disableColumnSelector
          disableRowSelectionOnClick
          rowSelection={false}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          pageSizeOptions={[5]}
          sx={{
            height: 1,
            width: 1,
          }}
        />
      </Stack>
    </Stack>
  );
};
  
export default HomeSellingProduct;
