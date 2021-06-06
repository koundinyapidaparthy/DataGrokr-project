import React from 'react'
import styled from "styled-components";
import Confirm from "../images/Confirm.svg";

const ConformFile = () => {

    const Check=async()=>{
        const EV=document.querySelector('#Email');
        const regxE =/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        const Email=document.querySelector('#Email').value.trim();
        if(Email===""){
            alert("Enter Email");
            Email.style.borderColor="red";
        }
        else if(regxE.test(Email)===false){
            alert("Enter Valid Email");
            EV.style.borderColor="red";
        }
        else{
            const res = await fetch('/Check', {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                   Email
                })
            });
                const data = await res.json();
                if (data.status === 422 || !data) {
                    window.alert(data.error);
                } 
                else if(data.status===201){
                    window.alert(data.message);
                    }
        }
        
    }


    return (
        <Main>
            <IMAGE>
                <img src={Confirm} alt="Protection" />
            </IMAGE>
            <h2>User Verfication</h2>
            <CONTENT>
                <Verification>
                    <label>
                        <span>Email-Check:</span>
                        <input type="text"  id="Email"/>
                    </label>
                <button onClick={Check}>Check</button>
                </Verification>
            </CONTENT>
        </Main>
    )
}

const Reused={
    flex:(fd,js,ai)=>`display:flex;flex-direction:${fd};justify-content:${js};align-items:${ai}`,
}
const Main=styled.div`
    width: 100%;
    height:100vh;
    background-color:#99ff99;
    overflow: hidden;
    ${Reused.flex("row","space-around","center")};

    h2{  
    width:350px;
    height:40px;
    top:2%;
    text-align: center;
    text-transform:uppercase;
    color: #000000;
    font-family: 'Fugaz One', cursive;
    overflow: hidden;
    position: absolute;
}  
h2::before{
    position:absolute;
    content:"";
    width:2px;
    height:60px;
    background-color:#99ff99;
    margin-top: -10px;
    box-shadow: 0 0 15px 5px #99ff99;
    transform:rotate(-30deg); 
    animation: travel 4s linear infinite;
}
@keyframes travel {
    0%{
        margin-left:-200px;
    }
    100%{
        margin-left:450px;
    }
}
@media only screen and (max-width: 420px) {
    h2{
        font-size:20px;
        width:290px;
    }
}
`;

const IMAGE=styled.div`
    width:40%;
    height:90%;
    @media only screen and (max-width: 1444px) {
        display:none
    }
    img{
        width:140%;
        height:100vh;
        z-index:-1;
    }
`;
const CONTENT=styled.div`
    width:50%;
    height:90%;
    ${Reused.flex("column","center","center")};
    @media only screen and (max-width: 900px) {
        width:90%;
    }
 `;
 const Verification=styled.div`
     width:90%;
    display: grid;
    place-items: center;
    label{
        span{
            width:100%;
            font-size: 16px;
            margin-left:5px;
        }
        input{
            width:320px;
            padding-left:10px;
            height:30px;
            border-radius:5px;
            border:1px solid rgba(0,0,0,0.4);
        }
        ${Reused.flex("column","flex-start","center")};
    }
    button{
            margin-top: 20px;
            width:200px;
            height:45px;
            border:0px;
            border-radius:5px;
            font-weight: bold;
            font-size:16px;
            text-transform: uppercase;
            background-color:black;
            color:white;
            transform: scale(1);
            letter-spacing: 2px;
            cursor:pointer;
        }
 `
export default ConformFile
