const mysql=require('mysql');
const express=require('express');
const  config=require('config');
const   cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

const connectiondetails=config.get("connection");
const excutequery=(querytext,respons)=>{
    const conn=mysql.createConnection(connectiondetails);
    conn.query(querytext,(error,result)=>{
        if(error==null){
            respons.send(result);
        }else{
            respons.send(error);
        }
        conn.end();
    })
  
   
}
app.get("/",(request,respons)=>{
    let querytext=`select * from protable`;
    excutequery(querytext,respons);
})

app.post("/",(request,respons)=>{
    let querytext=`insert into protable values('${request.body.oname}','${request.body.ptype}','${request.body.plocation}','${request.body.nbed}','${request.body.ftype}','${request.body.mrent}','${request.body.adate}','${request.body.cno}')`
    excutequery(querytext,respons);
})
app.delete("/:oname",(request,respons)=>{
    let querytext=`delete from protable  where oname='${request.params.oname}'`;
    excutequery(querytext,respons);

})
app.put("/:oname",(request,respons)=>{
    let querytext=`update protable set ptype='${request.body.ptype}',plocation='${request.body.plocation}',nbed='${request.body.nbed}',ftype='${request.body.ftype}',mrent='${request.body.mrent}',adate='${request.body.adate}',cno='${request.body.cno}'  where oname='${request.params.oname}'`;
    excutequery(querytext,respons);
})
const port=config.get("applicationport");
app.listen(port,()=>{console.log("server started at port 9999")})