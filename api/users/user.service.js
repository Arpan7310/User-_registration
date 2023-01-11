const pool=require('../../config/database');


module.exports= {
    create:(data,callBack) =>{
        pool.query(
            `insert into registration (firstname,lastname,gender,email,password,number) values(?,?,?,?,?,?)`,
            [   
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
             ],
             (error,results,fields)=>{
                if(error){
                   return callBack(error)
                }
                return callBack(null,results.insertId)
             }
        )
    },
    getUsers:callBack =>{

        pool.query(`select id,firstName,lastName,gender,email,password,number from registration`,
        [],
        (error,results,fields)=>{

            if(error) {
                callBack(error)
            }

         return callBack(null,results)

        })
    },


    getUsersById:(id,callBack)=> {

        pool.query(`select id,firstName,lastName,gender,email,password,number from registration where id=? `,
        [id],
        (error,results,fields)=>{
             if(error) {
                callBack(error)
            }
            return callBack(null,results[0]);
        })
    },

    updatedUsers:(data,callBack) =>{
        pool.query(`update registration set firstName=?,lastName=?,gender=?,email=?,password=?,number=? where id=?`,
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
         ],
         (error,results,fields) =>{
            if(error)
            callBack(error)
         
         return callBack(null,results[0]);
         })
         
    },
   
    deleteUser:(data,callback)=>{
        pool.query(`delete from registration where id=? `,
        [data.id],
        (error,results,fields)=>{
            if(error){
                callback(error)
            }
            return callback(null,results[0])
        }
        )
    },

    getUserByUserEmail:(email,callBack) =>{
      pool.query(`select * from registration where email=?`,
      [email],
      (error,results,fields)=>{

        if(error)
        callBack(error);
        return callBack(null,results[0]);

      }
      )
    }
}