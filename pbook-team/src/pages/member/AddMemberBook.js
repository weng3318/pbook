import React from 'react'
import './lukeStyle.scss'


class AddMemberBook extends React.Component {
    constructor(){
      super()
      this.state = {
        name: '',
        email: '',
        number: '',
        nickname:'',
        birthday:'',
        mobile:'',
        address:'',
        member: {}
      }
    }


    handleSubmit = (e) => {
      e.preventDefault();
      const { categories } = this.form;
      console.log(categories, categories.value);
    }
  
    




      render(){
          return(
              <>
                  <div className="addMemberBook">
                      <section>
                        <div className="container big_container">
                            <div className="Book_title">新增會員書籍</div>

                            <div className="container" style={{margin:'15px 0px 0px 0px'}}>

                                <div style={{marginTop: '10px'}}>

                                    <section name="" id="" className="d-flex">
                                        <section style={{minWidth:'640px', margin:'0px 30px'}}>
                                            <div className="form-group">
                                                <label for="mb_isbn">ISBN</label>
                                                <span id="mb_isbnHelp" style={{margin:'0px 10px', color:'red'}}></span>
                                                <input type="text" className="form-control" id="mb_isbn" name="mb_isbn"/>
                                            </div>
                                            <div className="form-group">
                                                <label for="mb_name">書名</label>
                                                <span id="mb_nameHelp" style={{margin:'0px 10px',color:'red'}}></span>
                                                <input type="text" className="form-control" id="mb_name" name="mb_name"/>
                                            </div>
                                            <div className="form-group">
                                                <label for="mb_author">作者</label>
                                                <span id="mb_authorHelp" style={{margin:'0px 10px', color:'red'}}></span>
                                                <input type="text" className="form-control" id="mb_author" name="mb_author"/>
                                            </div>
                                            <div className="form-group">
                                                <label for="mb_publishing">出版社</label>
                                                <span id="mb_publishingHelp" style={{margin:'0px 10px', color:'red'}}></span>
                                                <input type="text" className="form-control" id="mb_publishing" name="mb_publishing" />
                                            </div>
                                            <div className="form-group">
                                                <label for="mb_publishDate">出版日期</label>
                                                <span id="mb_publishDateHelp" style={{margin:'0px 10px', color:'red'}}></span>
                                                <input type="text" className="form-control" id="mb_publishDate" name="mb_publishDate" />
                                            </div>
                                            <div className="form-group">
                                                <label for="mb_version">版本</label>
                                                <span id="mb_mb_versionHelp" style={{margin:'0px 10px', color:'red'}}></span>
                                                <input type="text" className="form-control" id="mb_version" name="mb_version" />
                                            </div>
                                            <div className="form-group">
                                                <label for="mb_fixedPrice">定價</label>
                                                <span id="mb_fixedPriceHelp" style={{margin:'0px 10px', color:'red'}}></span>
                                                <input type="text" className="form-control" id="mb_fixedPrice" name="mb_fixedPrice" />
                                            </div>
                                            <div className="form-group">
                                                <label for="mb_page">頁數</label>
                                                <span id="mb_pageHelp" style={{margin:'0px 10px', color:'red'}}></span>
                                                <input type="text" className="form-control" id="mb_page" name="mb_page" />
                                            </div>
                                        </section>
                                        <section style={{minWidth:'640px', margin:'0px 30px'}}>
                                            <div className="form-group">
                                                <label for="mb_savingStatus">書況</label>
                                                <span id="mb_savingStatusHelp" style={{margin:'0px 10px', color:'red'}}></span>
                                                <input type="text" className="form-control" id="mb_savingStatus" name="mb_savingStatus" />
                                            </div>
                                            <div className="form-group">
                                                <label for="mb_shelveMember">上架會員</label>
                                                <span id="mb_shelveMemberHelp" style={{margin:'0px 10px', color:'red'}}></span>
                                                <input type="text" className="form-control" id="mb_shelveMember" name="mb_shelveMember" />
                                            </div>

                                            <div className="form-group d-flex">
                                                <div id="chose_pic" className="col-lg-4">
                                                    <label for="mb_pic" style={{fontSize: '20px'}} >・請選擇書籍照片</label>
                                                    <input type="file" className="form-control-file" id="mb_pic" name="mb_pic[]" style={{display:'none'}} multiple />
                                                    <br />
                                                    <button className="btn btn-outline-primary my-2 my-sm-0" type="button" >
                                                        <i className="fas fa-plus-circle" style={{marginRight:'5px'}}></i>選擇檔案
                                                    </button>
                                                    <div style={{height:'50px',  marginTop:'10px'}}>
                                                        <span style={{margin:'0px 20px'}} className="my_text_blacktea_fifty">最多上傳三張圖片</span>
                                                    </div>
                                                </div>
                                                <div className="pre_pic col-lg-3">
                                                    <img style={{objectFit: 'contain', width: '100%', height: '100%'}} id="demo" /> 
                                                </div>

                                            </div>
                                            <div className="form-group" style={{margin: '0px 10px 10px 0px'}}>
                                                <label for="mb_categories" className="update_label">分類</label>
                                                <span id="mb_categoriesHelp" style={{margin:'0px 10px',color:'red'}}></span>
                                                <div className="d-flex flex-wrap">
                                                <form
                                                    onChange={this.handleSubmit}
                                                    ref={categories => this.form = categories}>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="文學小說" name="categories" />
                                                      文學小說
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="商業理財" name="categories" />
                                                      商業理財
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="藝術設計" name="categories" />
                                                      藝術設計
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="人文史地" name="categories" />
                                                      人文史地
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="社會科學" name="categories" />
                                                      社會科學
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="自然科普" name="categories" />
                                                      自然科普
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="心理勵志" name="categories" />
                                                      心理勵志
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="醫療保健" name="categories" />
                                                      醫療保健
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="飲食" name="categories" />
                                                      飲食
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="生活風格" name="categories" />
                                                      生活風格
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="美食旅遊" name="categories" />
                                                      美食旅遊
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="宗教命理" name="categories" />
                                                      宗教命理
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="親子教養" name="categories" />
                                                      親子教養
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="輕小說" name="categories" />
                                                      輕小說
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="童書/青少年文學" name="categories" />
                                                      童書/青少年文學
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="漫畫" name="categories" />
                                                      漫畫
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="語言學習" name="categories" />
                                                      語言學習
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="考試用書" name="categories" />
                                                      考試用書
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="電腦資訊" name="categories" />
                                                      電腦資訊
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="專業/教科書/政府出版品" name="categories" />
                                                      專業/教科書/政府出版品
                                                    </label>
                                                    <label style={{padding: "0 5px"}}>
                                                      <input type="radio" value="數位科技" name="categories" />
                                                      數位科技
                                                    </label>
                                                  </form>
                                                </div>
                                            </div>
                                            <div className="from-group" style={{margin: '10px 20px 0px 0px'}}>
                                                <label for="mb_remarks" className="update_label">備註</label>
                                                <textarea className="update form-control" name="mb_remarks" id="mb_remarks" rows="5" style={{width:'680px', height:'90px', resize:'none'}}></textarea>
                                            </div>
                                        </section>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
              </>
          )
      }
    }  




    export default AddMemberBook 