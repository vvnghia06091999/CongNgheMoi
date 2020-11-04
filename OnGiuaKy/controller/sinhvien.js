//Khai bao thu vien
var AWS = require("aws-sdk");
var _ = require('lodash');

// Cai dat DynamoDB
let awsConfig = {
    "region": "ap-southeast-1",
    "endpoint": "http://dynamodb.ap-southeast-1.amazonaws.com",
    "accessKeyId": "AKIAVZSCGYN3AP56XIM2", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();

//get toan bo sinh vien
module.exports.getAllSinhVien = function(req,res){
    let parmas = {
        TableName:"SinhVien"
    };
    docClient.scan(parmas,function(err,data){
        if(err){
            res.end(JSON.stringify({ error : 'Khong load duoc tu DynamoDB'}));
        }else{
            res.render('index',{data: data});
        }
    });
};
//test 
module.exports.hello = function(req,res){
    res.render('hello')
}
//them sinh vien
module.exports.getAddSinhVien = function(req,res){
    res.render('add');
};
module.exports.addSinhVien = function(req,res){
    const {id,tenSV} = req.body;

    let parmas ={
        TableName: 'SinhVien',
        Item :{
            id: id,
            tenSV: tenSV
        }
    };
    docClient.put(parmas,function(err,data){
        if(err){
            res.send({
                success: false,
                message:err
            });
        }else{
            const {Item} = data;
            res.redirect('/sinhvien');
        }
    }); 
}
//xoa sinh vien
module.exports.deleteSV = function(req,res){
    var parmas = {
        TableName: 'SinhVien',
        Key: {
            "id": req.parmas.id
        }
    };
    docClient.delete(parmas,function(err,data){
        if(err){
            res.send("users::delete::error - " + JSON.stringify(err, null, 2));
        }else{
            res.redirect('/sinhvien');
        }
    });
};
