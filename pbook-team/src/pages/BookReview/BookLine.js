import React from 'react'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

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
    margin: '50px auto',
  },
  margin: {
    margin: theme.spacing(1.5),
    borderRadius: '20px',
    width: '180px',
  },
}))

export default function CustomizedProgressBars(props) {
  const classes = useStyles()
  const List = props.List
  return (
    <>
      {List.map((data, index) => (
        <div key={index} className={classes.root}>
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={data.five_star}
          />
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={data.four_star}
          />
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={data.three_star}
          />
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={data.two_star}
          />
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={data.one_star}
          />
        </div>
      ))}
    </>
  )
}
