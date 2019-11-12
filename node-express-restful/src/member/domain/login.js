

class Login{
    constructor(email, password){
        this.MR_email = email
        this.MR_password = password
        // console.log(this.MR_email, this.MR_password)
    }


    getLoginSql(){
        //讀取資料指回傳部分欄位
        let sql = `SELECT MR_number,MR_name,MR_nickname,MR_pic,MR_personLevel FROM mr_information WHERE MR_email = '${this.MR_email}' AND MR_password = '${this.MR_password}'`
        return sql
    }

}

export default Login