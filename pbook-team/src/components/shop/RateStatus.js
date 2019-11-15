import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import { rtFetch } from './ShopActions'
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
let a = [],
  b = [],
  c = [],
  d = [],
  e = [],
  max = [],
  min = []
const CustomizedProgressBars = props => {
  useEffect(() => {
    props.dispatch(rtFetch())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const classes = useStyles()
  if (!props.ratings.payload) return 'loading'
  let pp = props.ratings.payload
  let pb = props.ratings.payload.book
  for (let j = 1; j <= 124; j++) {
    a[j] = 0
    b[j] = 0
    c[j] = 0
    d[j] = 0
    e[j] = 0
    for (let i = 0; i < 3500; i++) {
      if (pp[i].book == j) {
        switch (pp[i].star) {
          case 5:
            a[j]++
            break
          case 4:
            b[j]++
            break
          case 3:
            c[j]++
            break
          case 2:
            d[j]++
            break
          case 1:
            e[j]++
            break
          default:
            break
        }
      }
    }
  }

  for (let j = 1; j <= 124; j++) {
    max[j] = a[j]
    min[j] = a[j]
    if (b[j] > max[j]) max[j] = b[j]
    else if (b[j] < min[j]) min[j] = b[j]

    if (c[j] > max[j]) max[j] = c[j]
    else if (c[j] < min[j]) min[j] = c[j]

    if (d[j] > max[j]) max[j] = d[j]
    else if (d[j] < min[j]) min[j] = d[j]

    if (e[j] > max[j]) max[j] = e[j]
    else if (e[j] < min[j]) min[j] = e[j]
  }

  console.log(a[1], b[1], c[1], d[1], e[1])

  return (
    <>
      <div key={1} className={classes.root}>
        <div className="d-flex">
          <span style={{ fontSize: '0.5rem' }}>5</span>
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={(a[1] / max[1]) * 100}
          />
        </div>
        <div className="d-flex">
          <span style={{ fontSize: '0.5rem' }}>4</span>
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={(b[1] / max[1]) * 100}
          />
        </div>
        <div className="d-flex">
          <span style={{ fontSize: '0.5rem' }}>3</span>
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={(c[1] / max[1]) * 100}
          />
        </div>
        <div className="d-flex">
          <span style={{ fontSize: '0.5rem' }}>2</span>
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={(d[1] / max[1]) * 100}
          />
        </div>
        <div className="d-flex">
          <span style={{ fontSize: '0.5rem' }}>1</span>
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={(e[1] / max[1]) * 100}
          />
        </div>
      </div>
    </>
  )
}
const mapStateToProps = state => ({
  ratings: state.ratings,
})
export default connect(mapStateToProps)(CustomizedProgressBars)
