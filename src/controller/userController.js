const express = require("express");
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const userSchema = require("../model/userModel")
const studentSchema = require("../model/studentModel")
const { str, num, pass } = require("../validation/valid");

const createUser = async function (req, res) {
    try {
         const data=req.body
        //console.log(Object.keys(data).length == 0)
        if (Object.keys(data).length == 0) {
            return res.status(404).send({ status: false, message: "data must be in body" })
        }
        const { name, userName, password } = data
        if (!name) {
            return res.status(404).send({ status: false, message: "name must be in body" })
        }
        if (!str(name)) {
            return res.status(400).send({ status: false, message: "name must be string" })
        }


        if (!userName) {
            return res.status(404).send({ status: false, message: "userName must be in body" })
        }
        if (!str(userName)) {
            return res.status(400).send({ status: false, message: "userName must be string" })
        }


        if (!password) {
            return res.status(404).send({ status: false, message: "password must be in body" })
        }
        if (!pass(password)) {
            return res.status(400).send({ status: false, message: "password must be one string one number one spacial charector" })
        }

        const userAl = await userSchema.findOne({ userName: userName })
        if (userAl) {
            return res.status(400).send({ status: false, message: "userName already exist try another name" })
        }
        const createData = await userSchema.create(data);
        res.status(201).send({ status: true, message: createData })

    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


// login

const logInUser = async function (req, res) {
    try {
        const data = req.body
        //console.log(data)
        if (Object.keys(data).length == 0) {
            return res.status(404).send({ status: false, message: "data must be in body" })
        }
        const { userName, password } = data

        if (!userName) {
            return res.status(404).send({ status: false, message: "userName must be in body" })
        }
        if (!str(userName)) {
            return res.status(400).send({ status: false, message: "userName must be string" })
        }


        if (!password) {
            return res.status(404).send({ status: false, message: "password must be in body" })
        }
        if (!pass(password)) {
            return res.status(400).send({ status: false, message: "password must be one string one number one spacial charector" })
        }


        const getUser = await userSchema.findOne(data);
        if (!getUser) {
            return res.status(400).send({ status: false, message: "user does not exist" })
        }

        const token = jwt.sign({ userName: getUser.userName }, "backendTaskWithSonu");


        const studentlist = await studentSchema.find({ user: userName, isDeleted: false }).select({ _id: 0, isDeleted: 0, user: 0, _id: 0, createdAt: 0, updatedAt: 0,__v:0 }).sort({ name: 1 })

        return res.status(200).send({ status: true, message: studentlist, token: token })

        //  return  res.status(200).send({status:true,message:token}) 

    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



// add student marks

const addStudent = async function (req, res) {
    try {
        const data = req.body
        const userName = req.userName
        if (Object.keys(data).length == 0) {
            return res.status(404).send({ status: false, message: "data must be in body" })
        }

        const { name, subject, marks } = data

        if (!name) {
            return res.status(404).send({ status: false, message: "name must be in body" })
        }
        if (!str(name)) {
            return res.status(400).send({ status: false, message: "name must be string" })
        }

        if (!subject) {
            return res.status(404).send({ status: false, message: "subject must be in body" })
        }
        if (!['math', 'hindi', 'english'].includes(subject)) {
            return res.status(400).send({ status: false, message: "subject must be one of ['math','hindi','english'] " })
        }

        if (!marks) {
            return res.status(404).send({ status: false, message: "marks must be in body" })
        }
        if (!num(marks)) {
            return res.status(400).send({ status: false, message: "marks must be number" })
        }



        const student = await studentSchema.findOne({ user: userName, name: name, subject })

        // if student is exist than increase that marks
        if (student) {
            data.marks = student.marks + marks

            // if there is student isDeleted true
            if (student.isDeleted == true) {
                data.isDeleted = false
                data.marks = marks
            }

            const newData = await studentSchema.findOneAndUpdate({ user: userName, name: name, subject }, data, { new: true }).select({ _id: 0, createdAt: 0, updatedAt: 0, isDeleted: 0, __v: 0, user: 0 })
            return res.status(200).send({ status: true, message: newData })
        }


        // if student does not exist add new student
        data.user = req.userName
        const newStu = await studentSchema.create(data)

        const output = {
            name: newStu.name,
            subject: newStu.subject,
            marks: newStu.marks
        }

        return res.status(201).send({ status: true, message: output })

    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}




// edit the student file

const EditStudent = async function (req, res) {
    try {
        const data = req.body
        const userName = req.userName
        if (Object.keys(data).length == 0) {
            return res.status(404).send({ status: false, message: "there is no any data in the body to updated" })
        }

        const { name, subject, newName,newSubject,marks } = data

        if (!name) {
            return res.status(404).send({ status: false, message: "name must be in body" })
        }
        if (!str(name)) {
            return res.status(400).send({ status: false, message: "name must be string" })
        }

        if (!subject) {
            return res.status(404).send({ status: false, message: "subject must be in body" })
        }
        if (!['math', 'hindi', 'english'].includes(subject)) {
            return res.status(400).send({ status: false, message: "subject must be one of ['math','hindi','english'] " })
        }




        if (newName) {
            if (!str(newName)) {
                return res.status(400).send({ status: false, message: "newName must be string" })
            }
        }


        if (newSubject) {
            if (!['math', 'hindi', 'english'].includes(newSubject)) {
                return res.status(400).send({ status: false, message: "newSubject must be one of ['math','hindi','english'] " })
            }
        }


        if (marks) {
            if (!num(marks)) {
                return res.status(400).send({ status: false, message: "marks must be number" })
            }
        }

       
        const searchStudent={
            user:userName,
            name:name,
            subject:subject,
            isDeleted:false
        }
        
        const checkData={
            user:userName,
            name:newName,
            subject:newSubject
        }
        if(!newName){
            checkData["name"]=name
        }
        if(!newSubject){
            checkData['subject']=subject
        }

        
        const checkAlreadyUser=await studentSchema.findOne(checkData)
        if(checkAlreadyUser){
            return res.status(400).send({status:false,message:"new name and subject already exist"})
        }

      const updateData=await studentSchema.findOneAndUpdate(searchStudent,{name:newName,subject:newSubject,marks:marks},{new:true}).select({ _id: 0, createdAt: 0, updatedAt: 0, isDeleted: 0, __v: 0, user: 0 })
    
      if(updateData==null) {
        return res.status(404).send({status:false,message:"student did not found"})
      }


        return res.status(200).send({ status: true, message: updateData })

    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



// view

const viewData = async function (req, res) {
    try {
        const data = req.query
        const userName=req.userName
    
        const searchData={
            user: userName,
            isDeleted: false ,

        }
        if(data.name) searchData.name=data.name
        if(data.subject) searchData.subject=data.subject
        
        const studentlist = await studentSchema.find(searchData).select({ _id: 0, isDeleted: 0, user: 0 , createdAt: 0, updatedAt: 0, __v: 0}).sort({name:1})

        if(studentlist.length==0) return res.status(404).send({status:false,message:"student did not found"})
        return res.status(200).send({ status: true, message: studentlist})

    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


// delete

const deleteStudent = async function (req, res) {
    try {
        const data = req.body
        const userName=req.userName
    
        if (Object.keys(data).length == 0) {
            return res.status(404).send({ status: false, message: "data must be in body" })
        }

        const { name, subject} = data
        if (!name) {
            return res.status(404).send({ status: false, message: "name must be in body" })
        }
        if (!str(name)) {
            return res.status(400).send({ status: false, message: "name must be string" })
        }

        if (!subject) {
            return res.status(404).send({ status: false, message: "subject must be in body" })
        }
       
        const updateData=await studentSchema.findOneAndUpdate({user:userName,name:name,subject:subject,isDeleted:false},{isDeleted:true})

        if(updateData==null) return res.status(400).send({status:false,message:"student did not found"})
        res.status(200).send({status:true,message:"data has been deleted"})
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createUser, logInUser, addStudent ,EditStudent,viewData ,deleteStudent}