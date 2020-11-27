import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { Table } from '@devexpress/dx-react-grid-material-ui'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import ArrowUpward from '@material-ui/icons/ArrowUpward'

const styles = (theme) => ({
  tableStriped: {
    '& tbody tr:nth-of-type(odd)': {
      backgroundColor: fade(theme.palette.primary.main, 0.05),
    },
  },
  headStyled: {
    backgroundColor: theme.palette.primary.dark,
    '& th': {
      color: theme.palette.primary.contrastText,
      [theme.breakpoints.only('xs')]: {
        fontSize: '10px',
      },
    },
  },
  cellStyled: {
    [theme.breakpoints.only('xs')]: {
      fontSize: '10px',
    },
  },
  cellStatusStyled: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    [theme.breakpoints.only('xs')]: {
      fontSize: '10px',
    },
  },
})

// Table
const TableComponentBase = ({ classes, ...restProps }) => (
  <Table.Table {...restProps} className={classes.tableStriped} />
)
export const TableComponent = withStyles(styles, { name: 'TableComponent' })(
  TableComponentBase
)

// Header
const HeadComponentBase = ({ classes, ...restProps }) => (
  <Table.TableHead {...restProps} className={classes.headStyled} />
)
export const HeadComponent = withStyles(styles, { name: 'HeadComponent' })(
  HeadComponentBase
)

const SortingIcon = ({ direction }) =>
  direction === 'asc' ? (
    <ArrowUpward style={{ margin: '0 4px', fontSize: '18px' }} />
  ) : (
    <ArrowDownward style={{ margin: '0 4px', fontSize: '18px' }} />
  )

export const SortLabel = ({ column, onSort, children, direction }) => (
  <div
    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
    onClick={column.name === 'date' ? onSort : undefined}
  >
    {children}
    {direction && column.name === 'date' && (
      <SortingIcon direction={direction} />
    )}
  </div>
)

// Cells
const CellComponentBase = ({ classes, ...props }) => (
  <Table.Cell {...props} className={classes.cellStyled} />
)
const CellComponent = withStyles(styles, { name: 'CellComponent' })(
  CellComponentBase
)

const HighlightedCell = ({ value, ...props }) => (
  <CellComponent {...props}>
    <span
      style={{
        color:
          value === 'new'
            ? '#002FCA'
            : value === 'in work'
            ? '#CA9D00'
            : value === 'done'
            ? '#04B000'
            : value === 'canceled'
            ? '#D10000'
            : 'black',
      }}
    >
      {value.toUpperCase()}
    </span>
  </CellComponent>
)

export const Cell = (props) => {
  const { column } = props
  if (column.name === 'status') {
    return <HighlightedCell {...props} />
  }
  return <CellComponent {...props} />
}
