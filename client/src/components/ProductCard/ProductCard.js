import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '80%',
    display: 'flex',
    padding: 10,
    margin: 15,
    border: '1px solid #112667',
    justifyContent: 'space-between',
  },
  media: {
    width: '200px',
  },
  status: {
    border: '2px solid #112667',
    borderRadius: '20px',
    color: '#112667',
    padding: '4px 20px',
  },
  colorBlock: {
    width: 50,
    display: 'flex',
    flexDirection: 'column',
  },
  colorItem: {
    margin: 4,
    width: '10px',
    height: '20px',
    border: '1px solid #fff',
    borderRadius: '10px',
  },
  // className: {
  //   display: 'flex',
  //   color: 'red'
  // }
}))

// <div className={classes.className}> </div>

export const ProductCard = (props) => {
  const classes = useStyles()
  const { guitar } = props

  const [rated, setRated] = useState(false)

  const handleClickRate = () => {
    setRated(!rated)
  }

  return (
    <Card className={classes.root}>
      <div className={classes.colorBlock}>
        {guitar.availableColors.map((e) => (
          <div className={classes.colorItem} style={{ background: e }} />
        ))}
      </div>
      <img className={classes.media} src={guitar.img} alt={guitar.title} />
      <CardContent>
        <div style={{ display: 'flex' }}>
          <Typography variant="h4">{guitar.title}</Typography>
          <Typography variant="body1" className={classes.status}>
            {guitar.status}
          </Typography>
        </div>
        {guitar.rating.map((e) => {
          return rated ? (
            <StarBorderIcon onClick={handleClickRate} />
          ) : (
            <StarIcon onClick={handleClickRate} />
          )
        })}

        <Typography variant="body2"></Typography>
        {guitar.price}
        <Typography variant="body2">Тип конструкции: {guitar.type}</Typography>
        <Typography variant="body2">Корпус: {guitar.body}</Typography>
        <Typography variant="body2">Гриф: {guitar.griff}</Typography>
        <Typography variant="body2">
          Накладка грифа: {guitar.fretboard}
        </Typography>
      </CardContent>
      <div style={{ width: '15%' }}>
        <Button variant="contained" color="primary">
          Add to cart
        </Button>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
      </div>
    </Card>
  )
}
