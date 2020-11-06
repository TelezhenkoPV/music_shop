import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import IconButton from '@material-ui/core/IconButton'
import guitar_img from '../../assets/guitar_img.png'
import ClearIcon from '@material-ui/icons/Clear'
import Container from '@material-ui/core/Container'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  card_background: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  card_content: {
    border: '1px solid black',
    boxSizing: 'border-box',
    padding: '20px 60px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  card_radio: {
    display: 'flex',
    alignItems: 'center',
    padding: '0',
  },
}))

const BlueRadio = withStyles({
  root: {
    color: 'blue',
    '&$checked': {
      color: 'blue',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />)
const RedRadio = withStyles({
  root: {
    color: 'red',
    '&$checked': {
      color: 'red',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />)
const GreenRadio = withStyles({
  root: {
    color: 'lightgreen',
    '&$checked': {
      color: 'lightgreen',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />)

const BasketCard = (props) => {
  const { id, img, name, price, onRemove } = props
  const classes = useStyles()
  const [selectedValue, setSelectedValue] = React.useState('a')

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const handleRemoveClick = () => {
    onRemove(id)
  }

  return (
    <Container maxWidth="xm">
      <Box className={classes.card_background}>
        <IconButton aria-label="delete" style={{ marginRight: '5px' }}>
          <ClearIcon
            onClick={handleRemoveClick}
            color="primary"
            style={{ fontSize: 35 }}
          />
        </IconButton>
        <Grid className={classes.card_content} container direction="row">
          <Grid item xs={2}>
            <img src={guitar_img} alt="img" />
          </Grid>
          <Grid item xs={3}>
            <Typography>{name}</Typography>
          </Grid>
          <Grid item xs>
            <Box className={classes.card_radio}>
              <Typography variant="subtitle1">Цвет</Typography>
              <BlueRadio
                checked={selectedValue === 'a'}
                onChange={handleChange}
                value="a"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'A' }}
                style={{ padding: '2px' }}
              />
              <RedRadio
                checked={selectedValue === 'b'}
                onChange={handleChange}
                value="b"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'B' }}
                style={{ padding: '2px' }}
              />
              <GreenRadio
                checked={selectedValue === 'c'}
                onChange={handleChange}
                value="c"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'C' }}
                style={{ padding: '2px' }}
              />
            </Box>
          </Grid>
          <Grid item xs>
            <Typography variant="h6">${price}</Typography>
          </Grid>
          <Grid item xs>
            <Select native>
              <option aria-label="None" value="" />
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Select>
          </Grid>
          <Grid item xs>
            <Typography variant="h5">$5001</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default BasketCard
