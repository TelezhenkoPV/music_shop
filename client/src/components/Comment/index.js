import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useStylesComment } from './styles'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default function Comment(props) {
  const { productId } = props
  const classes = useStylesComment()

  const [comments, setComments] = useState([])

  useEffect(() => {
    axios(`/api/comments/product/${productId}`)
      .then((response) => setComments(response.data))
      .catch((e) => console.log(e))
  }, [productId, setComments])

  const list = (comments.length > 0 &&
    comments.map((comment) => (
      <Card className={classes.comment} key={comment._id}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {comment.userName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {comment.content}
          </Typography>
        </CardContent>
      </Card>
    ))) || (
    <Typography variant="h4" style={{ textAlign: 'center' }}>
      Nobody bought it yet! Be first!!!
    </Typography>
  )

  return <div className={classes.root}>{list}</div>
}
