import encryption from '../models/encryption'
import db from '../db/database'

class Member{
    constructor(name, email, password,filename, nickname, birthday, mobile, address, number){
        this.MR_name = name
        this.MR_email = email
        //進行加密
        // this.MR_password = encryption(password)
        this.MR_password = password,
        this.MR_pic = filename
    }  
    
    //判斷email格式
    checkEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = re.test(email);
        return result;
    }
    
    //查詢分類
    queryCategories(){
        let sql = `SELECT * FROM vb_categories WHERE 1 `
        return sql
    }

    queryEmail(){
        let sql = `SELECT MR_email FROM mr_information WHERE MR_email = '${this.MR_email}'`
        return sql
    }

    getMemberInfo(MR_number){
        let sql = `SELECT * FROM mr_information WHERE MR_number = '${MR_number}'`
        return sql
    }

    //合併表單查詢， b跟bc是自訂的篩選
    queryBooks(number){
        let sql = `SELECT b.* FROM vb_books b
                    JOIN br_bookcase bc ON b.name=bc.name
                    WHERE bc.number='${number}'`
        return sql
    }
    
    
    getAddMemberSql(new_number){
        //進行加密
        // this.MR_password = encryption(this.MR_password)
        //塞入資料
        let sql = `INSERT INTO mr_information(MR_name, MR_number , MR_email, MR_password, MR_pic,  MR_personLevel, MR_createdDate) 
                        VALUES('${this.MR_name}', '${new_number}', '${this.MR_email}', '${this.MR_password}', '${this.MR_pic}', 1, now()) `
        return sql
    }

    //修改資料
    modifyMemberInfoSql(number, email, name, nickname, birthday, mobile, address, filename){
        let sql = `UPDATE mr_information SET MR_email = '${email}',MR_name = '${name}', MR_nickname = '${nickname}',MR_birthday = '${birthday}',MR_mobile = '${mobile}',MR_address = '${address}',MR_pic='${filename}' WHERE MR_number = '${number}' `
        return sql
    }


    //修改密碼
    changePassword(number,password){
        let sql = `UPDATE mr_information SET MR_password = '${password}' WHERE MR_number = '${number}' `
        return sql
    }

    //新增會員書籍
    addMemberBoos(isbn, name, author, publishing, publishDate, version, price, pages, savingStatus, memberNo, imgs, categories, remark){
        let sql = `INSERT INTO mb_books(mb_isbn, mb_name, mb_author, mb_publishing, mb_publishDate, mb_version, mb_fixedPrice, mb_page, mb_savingStatus, 
                mb_shelveMember, mb_categories,mb_pic, mb_remarks, mb_shelveDate)
        VALUES('${isbn}', '${name}', '${author}', '${publishing}', '${publishDate}', '${version}','${price}', '${pages}','${savingStatus}', '${memberNo}','${categories}',' ${imgs}', '${remark}',now()) `
        return sql 

        // INSERT INTO mb_books(mb_isbn, mb_name, mb_author, mb_publishing, mb_publishDate, mb_version, mb_fixedPrice, mb_page, mb_savingStatus, 
        //     mb_shelveMember, mb_categories, mb_remarks, mb_shelveDate) 
        // VALUES('9789861795720', '解壓放空店', '八耐舜子', '大田', '2019/11/01', 
        //     '初版','380', '578', '良好', 'MR00166','生活風格', ' ', '2019-11-15')
    }


    //把書籍加入最愛的sql
    // let sql = `INSERT INTO `br_bookcase`(`number`, `pic`, `name`, `info`, `like`, `read`, `created_time`) VALUES ("MR00166","","一見峮心 峮峮個人寫真書","",999,1288,now())`


    //修改會員照片
    modifyMemberImg(img, number){
        let sql = `UPDATE mr_information SET MR_pic = '${img}' WHERE MR_number = '${number}' `
        return sql
    }
    
    
}

export default Member