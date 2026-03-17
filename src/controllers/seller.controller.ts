


import{NextFunction, Request, Response} from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

const memberService=new MemberService();
const sellerController:T={};
sellerController.goHome =(req:Request, res:Response) =>{
    try {
        console.log("goHome");
        res.render("home");
        // send, json, end, render,redirect
    } catch (err) {
        console.log("Error, goHome:", err);
        res.redirect("/admin");
    }
};

sellerController.getLogin =(req:Request, res:Response) =>{
    try {
        console.log("getLogin");
        res.render("login");
    } catch (err) {
        console.log("Error, getLogin:", err);
        res.redirect("/admin");
    }
};

sellerController.getSignup =(req:Request, res:Response) =>{
    try {
        console.log("getSignup");
        res.render("signup");
    } catch (err) {
        console.log("Error, getSignup:", err);
        res.redirect("/admin");
    }
};

sellerController.processLogin = async (req:AdminRequest, res:Response) =>{
    try {
        console.log("processLogin");
        console.log("body:", req.body);
        const input:LoginInput=req.body;

        
        const result= await memberService.processLogin(input);

        req.session.member=result;
        req.session.save(function(){
            res.redirect("/admin/product/all");
        });


        
    } catch (err) {
        console.log("Error, processLogin:", err);
        const message=err instanceof Error ? err.message:Message.SOMETHING_WENT_WRONG;
        res.send(`<script> alert ("${message}"); window.location.replace("/admin/login") <script>`);
    }
};

sellerController.processSignup = async (req:AdminRequest, res:Response) =>{
    try {
        console.log("procesSignup");
        const file = req.file;
        if(!file) throw new Errors(HttpCode.Bad_Request, Message.SOMETHING_WENT_WRONG);
       

        const newMember:MemberInput=req.body;
        newMember.memberImage=file?.path.replace(/\\/g, "/");
        newMember.memberType=MemberType.SELLER;

        //const memberService= new MemberService();
        const result=await memberService.processSignup(newMember);

       req.session.member = result;
       req.session.save(function () {
       res.redirect("/admin/product/all");
      //return res.status(201).send(result);
      });
        
    } catch (err) {
        console.log("Error, procesSignup:", err);
         const message=err instanceof Error ? err.message:Message.SOMETHING_WENT_WRONG;
        res.send(`<script> alert ("${message}"); window.location.replace("/admin/signup") </script>`);
    }
};


sellerController.logout = async (req:AdminRequest, res:Response) =>{
    try {
        console.log("logout");
        req.session.destroy(function(){
            res.redirect("/admin");
        });


        
    } catch (err) {
        console.log("Error, logout:", err);
        res.redirect("/admin");
    }
};

sellerController.getUsers = async (req:Request, res:Response) =>{
    try {
        console.log("getUsers");
        const result = await memberService.getUsers();
        console.log("result:", result);

        res.render("users", {users:result});
    } catch (err) {
        console.log("Error, getUsers:", err);
        res.redirect("/admin/login");
    }
};

sellerController.updateChosenUser = async (req:Request, res:Response) =>{
    try {
        console.log("updateChosenUser");
        const result = await memberService.updateChosenUser(req.body);
        res.status(HttpCode.OK).json({data : result});
    } catch (err) {
        console.log("Error, updateChosenUser:", err);
        
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};



sellerController.checkAuthSession = async (req:AdminRequest, res:Response) =>{
    try {
        console.log("checkAuthSession");
        if(req.session?.member) res.send(`<script> alert ("${req.session.member.memberNick}") <script>`);
        else res.send(`<script> alert ("${Message.NOT_AUTHENTICATED}") <script>`);


        
    } catch (err) {
        console.log("Error, checkAuthSession:", err);
        res.send(err);
    }
};

sellerController.verifySeller=(req:AdminRequest, res:Response, next: NextFunction) =>{
    
     if(req.session?.member?.memberType===MemberType.SELLER)  {
            req.member = req.session.member;
            next();
  } else {
    const message =Message.NOT_AUTHENTICATED;
     res.send(`<script> alert ("${message}"); window.location.replace("/admin/login"); <script>`);
  }
    
};

export default sellerController;