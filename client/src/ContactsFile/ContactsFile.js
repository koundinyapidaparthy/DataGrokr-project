import React from 'react'
import styled from "styled-components";
import Protect from "../images/Protected.svg";
const ContactsFile = () => {

        // * To BackEnd Server

        const SendDATAToBackEnd=async(props)=>{
            const Firstname=props.FN;
            const Lastname=props.LN;
            const Email=props.EV;
            const ZipCode=parseInt(props.ZC);
            const Age=props.AV;
            const PhoneNumber=parseInt(props.PN);
            const StorageMedium=props.SM;
            console.log(props);
            if(StorageMedium==="DataBase"){
                const res = await fetch("/DataBase", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Firstname,Lastname,Email,ZipCode,Age,PhoneNumber,StorageMedium
                    })
                });
                    const data = await res.json();
                if (data.status === 422 || !data) {
                    window.alert(data.error);
                    console.log(data.error);
                } else if(data.status===201){
                    window.alert(data.message);
                    }
            }
            
        }
        // * To BackEnd LocalFile

        const SendDataToLocalFile=async(props)=>{
            const Firstname=props.FN;
            const Lastname=props.LN;
            const Email=props.EV;
            const ZipCode=parseInt(props.ZC);
            const Age=props.AV;
            const PhoneNumber=parseInt(props.PN);
            const StorageMedium=props.SM;
            console.log(props);
            if(StorageMedium==="LocalFile"){
                const res = await fetch("/LocalFile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Firstname,Lastname,Email,ZipCode,Age,PhoneNumber,StorageMedium
                    })
                });
                    const data = await res.json();
                if (data.status === 422 || !data) {
                    window.alert(data.error);
                    console.log(data.error);
                } else if(data.status===201){
                    window.alert(data.message);
                    }
            }
        }

    const DataFetch=()=>{
        // * Dom manipulation started

        const Firstname=document.querySelector('#Firstname');
        const Lastname=document.querySelector('#Lastname');
        const PhoneNumber=document.querySelector('#PhoneNumber');
        const Age=document.querySelector('#Age');
        const Email=document.querySelector('#Email');
        const ZipCode=document.querySelector('#ZipCode');
        const StorageMedium=document.querySelector('#StorageMedium');
        const FN=document.querySelector('#Firstname').value.trim();
        const LN=document.querySelector('#Lastname').value.trim();
        const PN=document.querySelector('#PhoneNumber').value.trim();
        const AV=document.querySelector('#Age').value.trim();
        const EV=document.querySelector('#Email').value.trim();
        const ZC=document.querySelector('#ZipCode').value.trim();
        const SM=document.querySelector('#StorageMedium').value.trim();
        const regxP = /^[6-9]\d{9}$/ ;
        const regxZ = /^([1-9]{6})$/;
        const regxE =/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

        // *  Used for front end validation

            if(FN==="" || LN==="" || PN==="" || AV==="" || EV==="" || ZC==="" || SM==="" || SM==="none"){
                alert("Enter every feild");
                if(FN==="" ){
                    Firstname.style.borderColor="red";
                }
                else if(LN===""){
                    Lastname.style.borderColor="red";
                }
                else if(PN===""){
                    PhoneNumber.style.borderColor="red";
                }
                else if(AV===""){
                    Age.style.borderColor="red";
                }
                else if(EV===""){
                    Email.style.borderColor="red";
                }
                else if(ZC===""){
                    ZipCode.style.borderColor="red";
                }
                else if(SM==="" || SM==="none"){
                    StorageMedium.style.borderColor="red";
                    StorageMedium.style.borderWidth="3px";
                }
            }
            else if(PN.length!==10  ){
                alert("Enter Valid 10 digit number");
                PhoneNumber.style.borderColor="red";
            }
            else if(regxP.test(PN)===false){
                alert("Enter Valid 10 digit number");
                PhoneNumber.style.borderColor="red";
            }
            else if(ZC.length!==6  ){
                alert("Enter Valid 6 digit PinCode");
                ZipCode.style.borderColor="red";
            }
            else if(regxZ.test(ZC)===false){
                alert("Enter Valid 6 digit PinCode");
                ZipCode.style.borderColor="red";
            }
            else if(regxE.test(EV)===false){
                alert("Enter Valid Email");
                Email.style.borderColor="red";
            }
            else{
                Firstname.style.borderColor="black";
                Lastname.style.borderColor="black";
                PhoneNumber.style.borderColor="black";
                Age.style.borderColor="black";
                Email.style.borderColor="black";
                ZipCode.style.borderColor="black";
                StorageMedium.style.borderColor="black";
                StorageMedium.style.borderWidth="1px";
                if(SM==="DataBase"){
                    SendDATAToBackEnd({FN , LN , PN , AV , EV , ZC , SM});
                }
                else if(SM==="LocalFile"){
                    SendDataToLocalFile({FN , LN , PN , AV , EV , ZC , SM});
                }
            }

           
    }

    return (
        <Main>
            <IMAGE>
                <img src={Protect} alt="Protection" />
            </IMAGE>
            <h2>User contact information</h2>
            <CONTENT>
                <span>
                        Personal Details
                    </span>
                <PersonalDetails>
                    
                    <label>
                        <span>Firstname :</span>
                        <input type="text" id="Firstname" />
                    </label>
                    <label>
                        <span>Lastname :</span>
                        <input type="text" id="Lastname" />
                    </label>
                    <label>
                        <span>PhoneNumber :</span>
                        <input type="tel" maxLength="10" id="PhoneNumber" />
                    </label>
                    <label>
                        <span>Date of birth :</span>
                        
                        <input type="date"   id="Age"/>
                    </label>
                </PersonalDetails>
                <span>
                        Account Details
                    </span>
                <AccountDetails>
                    <label>
                        <span>Email :</span>
                        <input type="text"  id="Email"/>
                    </label>
                    <label>
                        <span>Zip-Code :</span>
                        <input type="text" maxLength="6" id="ZipCode"/>
                    </label>
                    <div className="innerDATA">
                        <label>
                            <span>Storage Medium
                                 <b>
                                    i
                                    <div className="Hovering">
                                                lkasdlkjasdlj
                                    </div>
                                 </b>
                                 
                                </span>
                            <select id="StorageMedium">
                            <option value="none"  hidden> Select an Option</option>
                                <option value="DataBase">DataBase</option>
                                <option value="LocalFile">LocalFile</option>
                            </select>
                        </label>
                        <label><button onClick={DataFetch}>Submit</button></label>
                    </div>
                </AccountDetails>
            </CONTENT>
        </Main>
    )
}

const Reused={
    flex:(fd,js,ai)=>`display:flex;flex-direction:${fd};justify-content:${js};align-items:${ai}`,
    
}
const details={
    AccountPersonal:`
    width:90%;
    display: grid;
    grid-template-columns: auto auto;
    grid-row-gap: 10px;
    label{
        span{
            width:100%;
            font-size: 16px;
        }
        input{
            width:80%;
            padding-left:10px;
            height:30px;
            margin-left:-55px;
        }
        display: grid;
        ${Reused.flex("column","flex-start","center")};
        margin-top:15px;
        margin-left:15px;
    }
    @media only screen and (max-width: 900px) {
        width:100%;
    }
    ` 
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
    span{
        margin-top:20px;
        width:90%;
        font-size: 25px;
    }
    @media only screen and (max-width: 900px) {
        width:90%;
    }
 `;

const PersonalDetails=styled.div`
    ${details.AccountPersonal};

`;
const AccountDetails=styled.div`
      ${details.AccountPersonal};
      .innerDATA{
        ${Reused.flex("column","space-around","center")};

        width:175%;
            label{
                margin-left:0px;
                width:90%;
                
                span{
                    ${Reused.flex("row","center","center")};
                    width:100%;
                    b{
                        font-size:10px;
                        padding:1px;
                        padding-left:5px;
                        padding-right:5px;
                        border-radius:50%;
                        border:2px solid black;
                        cursor:pointer;
                       margin-left: 10px;

                        .Hovering{
                            margin-top:-60px;
                            margin-left: 20px;
                            min-width:20%;
                            min-height:70px;
                            position:absolute;
                            border:1px solid black;
                            z-index:2;
                            background-color: white;
                            text-align:start;
                            padding:10px;
                            &:before{
                                position:absolute;
                                content:"";
                                width:10px;
                                height:10px;
                                background-color: white;
                                margin-top: 30px;
                                margin-left:-16px;
                                transform: rotate(45deg);
                                border-left: 1px solid black;
                                border-bottom: 1px solid black;
                            }
                            visibility: hidden;
                        }

                        @media only screen and (max-width:900px){
                            .Hovering{
                            min-width:320px;
                            margin-top:-120px;
                            margin-left: -160px;
                                &:before{
                                    margin-top:75px;
                                    margin-left:150px;
                                    transform: rotate(-45deg);
                                }
                            }
                        }
                        @media only screen and (max-width:510px){
                            .Hovering{
                            min-width:300px;
                            margin-top:-120px;
                            margin-left: -260px;
                                &:before{
                                    margin-top:75px;
                                    margin-left:250px;
                                    transform: rotate(-45deg);
                                }
                            }
                        }
                    }
                    b:hover{
                        .Hovering{
                            visibility:visible
                        }
                    }
                    
                }
                select{
                    border:1px solid black;
                    width:150px;
                    height:30px;
                }
            }
        button{
            width:200px;
            height:45px;
            border:0px;
            font-weight: bold;
            font-size:16px;
            text-transform: uppercase;
            background-color:black;
            color:white;
            transform: scale(1);
            letter-spacing: 2px;
            cursor:pointer;
        }
      }

`;


export default ContactsFile
