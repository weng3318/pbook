import React from 'react'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import './BookCommodity.scss'

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#cde2d0', 0),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#ffc408',
  },
})(LinearProgress)

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '0 auto',
  },
  margin: {
    margin: theme.spacing(0.5),
    borderRadius: '20px',
    width: '180px',
  },
}))
let fiveStars = [],
  fourStars = [],
  threeStars = [],
  twoStars = [],
  oneStars = [],
  max = [],
  min = [],
  avg = []
const BookInfoRight = props => {
  const classes = useStyles()
  function countRate(pp) {
    if (!pp) return 'loading'
    for (let j = 1; j <= 124; j++) {
      fiveStars[j] = 0
      fourStars[j] = 0
      threeStars[j] = 0
      twoStars[j] = 0
      oneStars[j] = 0
      for (
        let i = 0;
        i < (props.ratingsPayload && props.ratingsPayload.total);
        i++
      ) {
        if (pp[i].book == j) {
          switch (pp[i].star) {
            case 5:
              fiveStars[j]++
              break
            case 4:
              fourStars[j]++
              break
            case 3:
              threeStars[j]++
              break
            case 2:
              twoStars[j]++
              break
            case 1:
              oneStars[j]++
              break
            default:
              break
          }
        }
      }
    }
    for (let j = 1; j <= 124; j++) {
      avg[j] = (
        (fiveStars[j] * 5 +
          fourStars[j] * 4 +
          threeStars[j] * 3 +
          twoStars[j] * 2 +
          oneStars[j]) /
        (fiveStars[j] +
          fourStars[j] +
          threeStars[j] +
          twoStars[j] +
          oneStars[j])
      ).toFixed(1)
      max[j] = fiveStars[j]
      min[j] = fiveStars[j]
      if (fourStars[j] > max[j]) max[j] = fourStars[j]
      else if (fourStars[j] < min[j]) min[j] = fourStars[j]

      if (threeStars[j] > max[j]) max[j] = threeStars[j]
      else if (threeStars[j] < min[j]) min[j] = threeStars[j]

      if (twoStars[j] > max[j]) max[j] = twoStars[j]
      else if (twoStars[j] < min[j]) min[j] = twoStars[j]

      if (oneStars[j] > max[j]) max[j] = oneStars[j]
      else if (oneStars[j] < min[j]) min[j] = oneStars[j]
    }
  }
  countRate(props.ratingsPayload && props.ratingsPayload.rows)
  return (
    <>
      <div className="d-flex book_star my-3 flex-column">
        <div className="d-flex flex-column align-items-center">
          <span className="book_rank">{avg[props.data && props.data.sid]}</span>
          <Box component="fieldset" mb={0} borderColor="transparent">
            <Rating value={avg[props.data && props.data.sid]} readOnly />
          </Box>
          <span className="book_review">
            {fiveStars[props.data && props.data.sid] +
              fourStars[props.data && props.data.sid] +
              threeStars[props.data && props.data.sid] +
              twoStars[props.data && props.data.sid] +
              oneStars[props.data && props.data.sid]}
            篇評論
          </span>
        </div>
      </div>
    </>
  )
}

export default BookInfoRight
