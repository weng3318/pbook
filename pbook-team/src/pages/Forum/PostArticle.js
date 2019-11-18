import './scss/PostArticle.scss'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Link, useParams } from 'react-router-dom'
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

const vb_categories = {
  1: '文學小說',
  2: '商業理財',
  3: '藝術設計',
  4: '人文史地',
  5: '社會科學',
  6: '自然科普',
  7: '心理勵志',
  8: '醫療保健',
  9: '飲食',
  10: '生活風格',
  11: '美食旅遊',
  12: '宗教命理',
  13: '親子教養',
  14: ' 童書/青少年文學',
  15: '輕小說',
  16: '漫畫',
  17: '語言學習',
  18: '考試用書',
  19: '電腦資訊',
  20: '專業/教科書/政府出版品',
  21: '數位科技',
}

const PostAritcle = props => {
  const classes = useStyles()
  const [textareaCount, setTextareaCount] = useState(1)
  const [textValue, setTextValue] = useState(1)
  const [subcate, setSubcate] = useState([1, 2])
  const [imgfile, setImagefile] = useState('')

  let { category } = useParams()

  useEffect(() => {
    handelAsideFixed()
    handleSubCate()
    handleInsertTextarea()
  }, [])

  useEffect(() => {
    console.log(textValue)
    let formData = new FormData()
    formData.append('textareaCount', textareaCount)
    formData.append('textareaValue', textValue)
    formData.append('imgCount', props.imgCount)
    formData.append('imgData', [...props.imgData])
    formData.append('element', props.addElement)
    formData.append('title', props.addElement)

    fetch('http://localhost:5555/forum/postNew/', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        return response.text()
      })
      .then(result => {
        // console.log(result)
      })
  }, [textValue])

  const postNewArticle = () => {
    let allText1 = document.querySelectorAll('textarea')
    let allText = [...allText1]
    let textValue1 = []
    for (let i = 0; i < allText.length - 1; i++) {
      textValue1.push(allText[i].value)
    }
    let select = document.querySelector('#grouped-select').value
    let title = document.querySelector('#title').value

    if (select !== '' && title !== '') {
      setTextValue(textValue1)
    } else {
      console.log('title', title, 'select', select)
    }
  }
  const handelAsideFixed = () => {
    var sidePanel = document.querySelector('#side-panel')
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop

      if (scrollTop < 495) {
        // sidePanel.style.postion = 'relative'
        sidePanel.classList.remove('fixed')
      } else {
        // sidePanel.style.postion = 'fixed'
        sidePanel.classList.add('fixed')
      }
    })
  }
  const handleSubCate = () => {
    fetch(`http://localhost:5555/forum/cate/${category}`)
      .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then(result => {
        setSubcate(result.subcategory)
      })
  }
  const handleInsertTextarea = e => {
    let element = (
      <TextareaAutosize
        key={textareaCount}
        id={`textarea${textareaCount + 1}`}
        placeholder="..."
      ></TextareaAutosize>
    )
    setTextareaCount(textareaCount + 1)
    props.dispatch(AppendTextarea(element))
  }

  const handleImgagefile = imageFile => {
    setImagefile(imageFile)
  }
  const handleCancelPost = e => {
    props.history.push('/forum')
  }

  return (
    <div className="post-article">
      <div className="Navbar">
        <div className="container"> {vb_categories[category]}</div>
      </div>
      <div className="container end position-r">
        <div className=" aside position-a">
          <div className={classes.root}>
            <List
              component="nav"
              aria-label="main mailbox folders"
              id="side-panel"
            >
              <CustomizedDialogs handleImgFile={handleImgagefile} />
              <ListItem button>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Unsplash圖片" />
              </ListItem>
              <ListItem button onClick={postNewArticle}>
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
              <ListItem button onClick={postNewArticle}>
                <ListItemIcon>
                  <PostAddIcon />
                </ListItemIcon>
                <ListItemText primary="發表文章" />
              </ListItem>
              <ListItem button onClick={() => props.history.goBack()}>
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
                    <MenuItem>
                      <em>None</em>
                    </MenuItem>
                    {subcate.map(item => {
                      return (
                        <MenuItem key={item.sid} value={item.sid}>
                          {item.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
              <h2 className="title-title">
                <input type="text" placeholder="Title..." id="title"></input>
              </h2>
            </div>
          </div>
          <section id="inputTextToSave">{props.addElement}</section>
        </div>
      </div>
    </div>
  )
}

// 綁定props.todos <=> store.todos
const mapStateToProps = store => ({
  addElement: store.postArticle.addElement,
  imgData: store.postArticle.imgData,
  imgCount: store.postArticle.imgCount,
})

// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props
export default connect(mapStateToProps)(PostAritcle)
