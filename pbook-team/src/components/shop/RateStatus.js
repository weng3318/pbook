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
    margin: '0 auto',
  },
  margin: {
    margin: theme.spacing(0.5),
    borderRadius: '20px',
    width: '180px',
  },
}))

export default function CustomizedProgressBars(props) {
  const classes = useStyles()
  //   const List = props.List
  return (
    <>
      <div key={1} className={classes.root}>
        <div className="d-flex">
          <span style={{ fontSize: '0.5rem' }}>5</span>
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={20}
          />
        </div>
        <div className="d-flex">
          <span style={{ fontSize: '0.5rem' }}>4</span>
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={50}
          />
        </div>
        <div className="d-flex">
          <span style={{ fontSize: '0.5rem' }}>3</span>
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={100}
          />
        </div>
        <div className="d-flex">
          <span style={{ fontSize: '0.5rem' }}>2</span>
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={55}
          />
        </div>
        <div className="d-flex">
          <span style={{ fontSize: '0.5rem' }}>1</span>
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={10}
          />
        </div>
      </div>
    </>
  )
}
