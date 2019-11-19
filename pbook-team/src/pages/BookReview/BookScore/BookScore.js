/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import axios from 'axios'

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating)

function getLabelText(value) {
  return `${value} Heart${value !== 1 ? 's' : ''}`
}

export default function CustomizedRatings(props) {
  const [score, setScore] = useState([])
  useEffect(() => {
    reviewList()
  }, [score])

  //書評分頁資料ajax
  const reviewList = () => {
    axios
      .get(`http://localhost:5555/reviews/book_reviews/${props.urlParams}`)
      .then(res => {
        let s = res.data.data[0]
        // console.log(res.data)
        setScore(
          s.five_star + s.four_star + s.three_star + s.two_star + s.one_star ===
            0 ||
            Math.round(
              ((s.five_star * 5 +
                s.four_star * 4 +
                s.three_star * 3 +
                s.two_star * 2 +
                s.one_star) /
                (s.five_star +
                  s.four_star +
                  s.three_star +
                  s.two_star +
                  s.one_star)) *
                10
            ) / 10
        )
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <>
      <Box component="fieldset" mt={0} borderColor="transparent">
        <Typography component="legend"></Typography>
        <StyledRating
          name="customized-color"
          value={5}
          readOnly={true}
          getLabelText={getLabelText}
          precision={0.1}
          size="small"
          icon={<FavoriteIcon fontSize="inherit" />}
        />
      </Box>
    </>
  )
}
