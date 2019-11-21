import './scss/PostArticle.scss'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
//action
import {
  AppendTextarea,
  AppendImgInput,
  AppendImgElement,
  clearPostAritcleState,
} from './fmAction'
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
import Swal from 'sweetalert2'

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
  const [titleCheck, setTitleCheck] = useState(1) //title&subcate檢查
  const [textareaValue, setTextareaValue] = useState('')
  const [sectionElement, setSectionElement] = useState('')
  const [canIPost, setCanIPost] = useState(0)
  const [subcate, setSubcate] = useState([1, 2])
  const [mainImg, setMainImg] = useState(0)

  let { category, MR_number } = useParams()
  
  const Swal = require('sweetalert2')

  useEffect(() => {
    handelAsideFixed()
    handleSubCate()
    handleInsertTextarea()
  }, [])

  useEffect(() => {
    if (props.imgCount !== 0) {
      document.querySelector(`#file${props.imgCount - 1}`).click()
    }
  }, [props.imgCount])
  useEffect(() => {
    if (titleCheck !== 1) {
      handleSection()
    }
  }, [titleCheck])

  useEffect(() => {
    if (canIPost) {
      confirmPost()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canIPost])

  const confirmPost = () => {
    let formData = new FormData()
    for (let i = 0; i < mainImg; i++) {
      let file = document.querySelector(`#file${i}`).files[0]
      formData.append('imgFile[]', file)
    }
    let subcate1 = document.querySelector('#grouped-select').value
    let title = document.querySelector('#title').value
    formData.append('imgCount', mainImg)
    if (sectionElement !== '') {
      sectionElement.forEach(v => {
        formData.append('element[]', v)
      })
    }
    textareaValue.forEach(v => {
      formData.append('textareaValue[]', v)
    })
    formData.append('title', title)
    formData.append('cate', category)
    formData.append('subcate', subcate1)
    formData.append('MR_number', MR_number)
    // props.imgData.forEach(v => {
    //   formData.append('imgData[]', v)
    // })
    console.log('post')

    fetch('http://localhost:5555/forum/postNew/', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        console.log(response.status)
        return response.json()
      })
      .then(result => {
        console.log(result)
        if (result.message)
          Swal.fire({
            title: '新增成功!',
            text: '將回到個人首頁',
            icon: 'success',
            confirmButtonText: '太棒了',
          })
        props.dispatch(clearPostAritcleState())
        props.history.push('/forum')
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message
        )
      })
  }
  const handleInsertImg = e => {
    let element = (
      <div>
        <input
          type="file"
          id={`file${props.imgCount}`}
          onChange={handleUpload}
          accept="image/*"
          style={{ display: 'none' }}
        ></input>
      </div>
    )
    props.dispatch(AppendImgInput(element))
  }

  const handleUpload = e => {
    let inputId = `#file${props.imgCount}`
    let file = document.querySelector(inputId).files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', function(event) {
      let element = (
        <ImgDemo imgData={event.target.result} imgCount={props.imgCount} />
      )
      setMainImg(mainImg + 1)
      props.dispatch(AppendImgElement(element, event.target.result))
    })
  }

  const handleTitleCheck = () => {
    let allText1 = document.querySelectorAll('textarea')
    let allText = [...allText1]
    let titleCheck1 = []
    for (let i = 0; i < allText.length - 1; i++) {
      titleCheck1.push(allText[i].value)
    }
    let select = document.querySelector('#grouped-select')
    let title = document.querySelector('#title')

    if (select.value !== '' && title.value !== '') {
      document.querySelector('.selectControl').classList.remove('show')
      document.querySelector('#subcate-help').classList.remove('show')
      document.querySelector('#title').classList.remove('show')
      document.querySelector('#title-help').classList.remove('show')
      setTitleCheck(titleCheck1)
    } else {
      if (select.value === '') {
        document.querySelector('.selectControl').classList.add('show')
        document.querySelector('#subcate-help').classList.add('show')
      }
      if (title.value === '') {
        document.querySelector('#title').classList.add('show')
        document.querySelector('#title-help').classList.add('show')
      }
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

  const handleCancelPost = e => {
    swalWithBootstrapButtons
      .fire({
        title: '確定取消?',
        text: '剛剛輸入的內容將不會儲存喔!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '是的',
        cancelButtonText: '取消',
        reverseButtons: true,
      })
      .then(result => {
        if (result.value) {
          props.history.goBack()
        }
      })

    // props.history.push('/forum')
  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  })

  const confirmForPost = () => {
    swalWithBootstrapButtons
      .fire({
        title: '確定發文?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '是的',
        cancelButtonText: '取消',
        reverseButtons: true,
      })
      .then(result => {
        if (result.value) {
          handleTitleCheck()
        }
      })
  }
  const handleSection = () => {
    console.log('section')
    let content = document.querySelector('#ddd')
    let arr = [...content.childNodes]
    let textContent = arr
      .filter(item => {
        return item.nodeName === 'TEXTAREA'
      })
      .map(item => item.value)
    setTextareaValue(textContent)

    let nodeNameSelect = arr.map(item => {
      if (item.nodeName == 'DIV') {
        if (item.firstChild.nodeName === 'IMG') {
          return 'img'
        } else {
          return ''
        }
      } else if (item.nodeName === 'TEXTAREA') {
        if (item.value !== '') {
          return 'textarea'
        } else {
          return ''
        }
      }
    })
    let result = nodeNameSelect.filter(item => item !== '')
    // console.log(nodeNameSelect)
    setSectionElement(result)
    setCanIPost(1)
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
              <ListItem button onClick={handleInsertImg}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="插入圖片" />
              </ListItem>
              {/* <CustomizedDialogs handleImgFile={handleImgagefile} /> */}
              <ListItem button onClick={handleSection}>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Unsplash圖片" />
              </ListItem>
              <ListItem button onClick={confirmPost}>
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
              <ListItem button onClick={confirmForPost}>
                <ListItemIcon>
                  <PostAddIcon />
                </ListItemIcon>
                <ListItemText primary="發表文章" />
              </ListItem>
              <ListItem button onClick={handleCancelPost}>
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
          <span className="post-title">
            發表新文章
            <span id="subcate-help">請選擇子版</span>
            <div id="title-help">請輸入標題</div>
          </span>

          <div className="dis-play">
            <div className="title-control ">
              <div className="select">
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="grouped-select">請選擇子版</InputLabel>
                  <Select
                    defaultValue=""
                    input={<Input id="grouped-select" />}
                    className="selectControl "
                  >
                    <MenuItem>
                      <em>None</em>
                    </MenuItem>
                    {subcate.map(item => {
                      return (
                        <MenuItem key={item.sid} value={item.sid}>
                          {item.subname}
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
          <section id="inputTextToSave" id="ddd">
            {/* <input
              type="file"
              name="file1"
              id="file2"
              onChange={tryImg}
            ></input> */}

            {props.addElement}
          </section>
        </div>
      </div>
    </div>
  )
}
// const tryImg = event => {
//   let inputId = `#file2`
//   let file = document.querySelector(inputId).files[0]
//   const formdata = new FormData()
//   formdata.append('file1', file)
//   console.log(file)
//   fetch('http://localhost:5555/forum/postNew/', {
//     method: 'POST',
//     body: formdata,
//   })
//     .then(response => {
//       console.log('123')
//       return response.json()
//     })
//     .then(result => {
//       console.log(result)
//     })
//     .catch(error => console.log(error))
// }

const ImgDemo = props => {
  return (
    <div key={props.imgCount}>
      <img
        className="img-demo"
        src={props.imgData}
        id={`demoImg${props.imgCount - 1}`}
      ></img>
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
