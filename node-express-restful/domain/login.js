import encryption from '../models/encryption'

class Login{
    constructor(email, password){
        this.MR_email = email
        this.MR_password = password
        console.log(this.MR_name, this.MR_email, this.MR_password)
    }


    getLoginSql(){
        let sql = `SELECT * FROM 'mr_information' WHERE MR_email = '${this.MR_email}' && MR_password = '${this.MR_password}'`
        return sql
    }


}

export default Login