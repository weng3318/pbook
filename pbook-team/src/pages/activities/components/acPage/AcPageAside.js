/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import './acPageAside.scss'
import { withRouter } from 'react-router'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import FacebookIcon from '@material-ui/icons/Facebook'
import { FacebookProvider, ShareButton } from 'react-facebook'

// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const AcPageAside = props => {
  return (
    <>
      <aside className="col-md-3 acPageAside">
        <span className="share d-flex mt-3 justify-content-around align-items-center">
          <button title="收藏活動">
            <FavoriteBorderIcon />
          </button>
          <button title="聯絡主辦方">
            <MailOutlineIcon />
          </button>
          <FacebookProvider appId="468465107359578">
            <ShareButton href="http://www.facebook.com">
              <div title="分享到臉書">
                <FacebookIcon />
              </div>
            </ShareButton>
          </FacebookProvider>
        </span>
        <div className="ac-sign">
          <button>我要報名</button>
        </div>
      </aside>
    </>
  )
}
export default withRouter(AcPageAside)
