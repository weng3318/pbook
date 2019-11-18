import './scss/PostArticle.scss'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
//action
import { AppendTextarea } from './fmAction'
//UI componet
import CustomizedDialogs from '../../components/Material-UI/Dialog'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import SearchIcon from '@material-ui/icons/Search'
import InboxIcon from '@material-ui/icons/Inbox'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import PostAddIcon from '@material-ui/icons/PostAdd'
import CancelIcon from '@material-ui/icons/Cancel'
//textarea
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

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let sidePanel = document.querySelector('#side-panel')
      let scrollTop = document.documentElement.scrollTop;

      if (scrollTop < 495) {
        sidePanel.style.postion = 'relative';
        sidePanel.style.top = 0;
        console.log(sidePanel.style.postion,sidePanel.style.top)
      } else {
        console.log(sidePanel.style.postion,sidePanel.style.top)
        sidePanel.style.postion = "fixed";
        sidePanel.style.top = 0;
      }
    });
  });

  const handleInsertTextarea = (e) => {
    let element = <TextareaAutosize />
    props.dispatch(AppendTextarea(element))
  }


  const handleChange = e => {
    console.log('hi')
  }

  return (
    <div className="post-article">
      <div className="Navbar">
        <div className="container"> 商業理財</div>
      </div>
      <div className="container end position-r">
        <div className=" aside position-a">
          <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders" id="side-panel">
              {/* <CustomizedDialogs
                handleImgInput={
                  {
                    insert: handleInsertImgDemo,
                    upload: handleUpload,
                    count: props.imgCount
                  }} /> */}
              <CustomizedDialogs />
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
              <ListItem button onClick={handleInsertTextarea}>
                <ListItemIcon>
                  <ViewHeadlineIcon />
                </ListItemIcon>
                <ListItemText primary="插入新段落" />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <PostAddIcon />
                </ListItemIcon>
                <ListItemText primary="發表文章" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CancelIcon />
                </ListItemIcon>
                <ListItemText primary="取消發表" />
              </ListItem>
            </List>
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
              <h2 className="title-title" id="title" onClick={handleChange}>
                <input type="text" placeholder="Title..."></input>
              </h2>
            </div>
          </div>
          <section>
            <TextareaAutosize >...</TextareaAutosize>
            {props.addElement}
          </section>
        </div>
      </div>
    </div>
  )
}

const ImgComponent = (props, handleUpload, data) => {
  return (
    <div>
      <input type="file" onChange={handleUpload} id="file1"></input>
      <img src={data} id="demoImg"></img>
    </div>
  )
}
const ImgDemo = (props) => {
  return (<div key={props.imgCount}><img src={props.imgData} id="demoImg"></img></div>)
}
const AppendExample = props => {
  return <div>789</div>
}

// 綁定props.todos <=> store.todos
const mapStateToProps = store => ({
  addElement: store.postArticle.addElement,
  imgData: store.postArticle.imgData,
  imgCount: store.postArticle.imgCount
})

// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props
export default connect(mapStateToProps)(PostAritcle)