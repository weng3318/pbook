import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import './ResponsiveDialog.scss'
import Unsplash from 'unsplash-js';

export default function ResponsiveDialog(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [pictures, setPictures] = useState(false); //尚未搜尋時false 搜尋筆數為0筆:1 
    const [page, setPage] = useState(1);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    useEffect(() => {
        if (props.openUnsplash) {
            handleClickOpen()
        } else {
            handleClose()
        }
    }, [props.openUnsplash])

    useEffect(() => {
        if (page !== 1) {
            SearchUnsplash()
        }
    }, [page])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setPictures(false)
        props.closeUnsplash()
        setOpen(false);
    };

    const SearchUnsplash = () => {
        const unsplash = new Unsplash({ accessKey: "e713b2193dd6bad8b1dc342a4388e143c6c78a18281e29f57b3a7da7cf31fc1a" });
        const unsplashInput = document.querySelector('#unsplashInput').value
        if (unsplashInput === '') {
            setPictures(false)
        } else {
            unsplash.search.photos(unsplashInput, page, 12, { orientation: "landscape" })
                .then(toJson => (toJson.json()))
                .then(json => {
                    console.log(json)
                    if (json.total === 0) {
                        setPictures(1) //搜尋筆數為0
                    } else {
                        setPictures(json.results)

                    }
                }).catch(err => {
                    console.log(err)
                });
        }
    }
    const pickOne = (url) => {
        props.pickUnsplash(url)
        handleClose()
    }
    const pageChange = (count) => {
        console.log(count)
        let newPage = page + count
        if (newPage < 0) newPage = 1
        setPage(newPage)
    }
    return (
        <div className="unsplashDialog">
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    <span className="inputControl">
                        <span className="title">使用Unsplash圖片</span>
                        <ImageSearchIcon style={{ fontSize: 30, color: '#2d3a3a' }} />
                        <input type='text'
                            placeholder="請在此輸入搜尋關鍵字..."
                            className="unsplashInput"
                            id='unsplashInput'
                            onChange={SearchUnsplash}
                        >
                        </input>
                    </span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>

                        <div className="imgWindow" id="imgWindow">
                            {
                                pictures && pictures !== 1 ? pictures.map((item) => {
                                    return <img alt={item.description} src={item.urls.thumb} key={item.id}
                                        onClick={() => pickOne(item.urls.regular)}></img>
                                }) : pictures && pictures === 1 ?
                                        (<>
                                            <div className="blank2">查無符合關鍵字圖片，請重新輸入</div>

                                        </>)
                                        : (<>
                                            <div className="blank"></div>
                                            <div className="blank"></div>
                                            <div className="blank"></div>
                                            <div className="blank"></div>
                                        </>)
                            }
                        </div>
                        {pictures && pictures !== 1 ?
                            <div className="dis-flex dis-flex-between">
                                <ColorButton variant="outlined" className={classes.margin} onClick={() => pageChange(-1)}>
                                    上一頁
                            </ColorButton>
                                <ColorButton variant="outlined" className={classes.margin} onClick={() => pageChange(1)}>
                                    下一頁
                            </ColorButton>
                            </div>
                            : ''}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">取消</Button>
                    {/* <Button onClick={handleClose} color="primary" autoFocus>
                            Agree
              </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}

const ColorButton = withStyles(theme => ({
    root: {
        // color: theme.palette.getContrastText(purple[500]),
        // backgroundColor: '#333333',
        '&:hover': {
            // backgroundColor: purple[700],
        },
    },
}))(Button);

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));