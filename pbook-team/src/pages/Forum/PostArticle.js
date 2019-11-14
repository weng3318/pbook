import './scss/PostArticle.scss'
import React from 'react'
import ForumNavBar from './ForumNavBar'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SearchIcon from '@material-ui/icons/Search'
import InboxIcon from '@material-ui/icons/Inbox'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline'
import TextareaAutosize from 'react-textarea-autosize'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />
}

const PostAritcle = props => {
  const classes = useStyles()

  const handleClick = e => {
    console.log(e.target)
  }

  const handleChange = e => {}

  return (
    <div className="post-article">
      <div className="Navbar">
        <div className="container"> 商業理財</div>
      </div>
      <div className="container end position-r">
        <div className=" aside position-a">
          <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="插入圖片" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Unsplash圖片" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <VideoLibraryIcon />
                </ListItemIcon>
                <ListItemText primary="插入影片" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ViewHeadlineIcon />
                </ListItemIcon>
                <ListItemText primary="插入新段落" />
              </ListItem>
            </List>
            <List component="nav" aria-label="secondary mailbox folders"></List>
          </div>
        </div>
        <div className="container-m">
          <div className="title-line"></div>
          <div className="post-title">發表新文章</div>
          <div className="dis-play">
            <div className="title-control ">
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="grouped-select">請選擇子版</InputLabel>
                  <Select defaultValue="" input={<Input id="grouped-select" />}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Option 1</MenuItem>
                    <MenuItem value={2}>Option 2</MenuItem>
                    <MenuItem value={3}>Option 3</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <h2
                className="title-title"
                contentEditable="true"
                id="title"
                onClick={handleChange}
              >
                <input type="text" placeholder="Title"></input>
              </h2>
            </div>
          </div>
          <section>
            <TextareaAutosize />
          </section>
        </div>
      </div>
    </div>
  )
}
export default PostAritcle
