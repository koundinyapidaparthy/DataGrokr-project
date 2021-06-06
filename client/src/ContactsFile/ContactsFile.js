import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ProtectImage from "../images/Protected.svg";
import DatabaseImage from "../images/Database.png";
import FileImage from "../images/File.png";
const ContactsFile = () => {
    // ? history hook

    const history=useHistory();
    //  ? state hook
    const [state, setstate] = useState("");


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
                        if(data.error==="Email already Exist"){
                            setstate("DataBase");
                        }
                    } 
                    else if(data.status===201){
                        window.alert(data.message);
                        setstate("DataBase");
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
                } 
                else if(data.status===201){
                    window.alert(data.message);
                    setstate("LocalFile");
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
        const regxZ = /^([0-9]{6})$/;
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


    const stateChange=()=>{
        setstate("");
    }

    const confirmFun=()=>{
        history.push("/confirmation");
    }

    return (
        <Main>
            <IMAGE>
                <img src={ProtectImage} alt="Protection" />
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
                                        <div className="innerHover">
                                          <img src={FileImage} alt="DataBase.png" />
                                          <span> {"->>"} Store The Data In Your LocalFile</span>
                                        </div>
                                        <div className="innerHover">
                                          <img src={DatabaseImage} alt="DataBase.png" />
                                          <span> {"->>"} Store The Data In our Database</span>
                                        </div>
                                    </div>
                                 </b>
                                 
                                </span>
                            <select id="StorageMedium">
                            <option value="none"  hidden> Select an Option</option>
                                <option value="LocalFile">LocalFile</option>
                                <option value="DataBase">DataBase</option>
                            </select>
                        </label>
                        <label><button onClick={DataFetch}>Submit</button></label>
                    </div>
                </AccountDetails>

            </CONTENT>
            <POPUP>
                    {
                        !state ? <></> : 
                        <>
                            <div className="Cover">
                            { state==="DataBase" ? 
                            <>
                                <div className="dbpopup">
                                <div className="Cross" onClick={stateChange}>❌</div>
                                    <span>successfully resgistered on {state}</span>
                                    <button onClick={confirmFun}>Click Me To Check Your Data </button>
                                </div>
                            </>:<></>
                                
                            }
                            { state==="LocalFile" ? 
                            <>
                                <div className="dbpopup">
                                <div className="Cross" onClick={stateChange}>❌</div>
                                    <span>successfully resgistered on {state}</span>
                                    <a href="http://localhost:5000/LocalFile">http://localhost:5000</a>
                                </div>
                            </>:<></>
                                
                            }
                            </div>
                        </>
                    }
                </POPUP>
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
                            
                            .innerHover{
                                margin-top:10px;
                                ${Reused.flex("row","center","center")};
                                    img{
                                    width:25px;
                                    height:25px;
                                    }
                                    span{
                                        margin-top: -1px;
                                        margin-left:5px;
                                        text-transform:capitalize;
                                        font-weight:100 !important;
                                    }

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
const POPUP=styled.div`
    .Cover{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100vh;
        background: rgba(0,0,0, 0.5);
    }
    .dbpopup{
           position: absolute;
           top:50%;
           left:50%;
           transform: translate(-50%, -50%);
           width:300px;
           height:150px;
           background-color: white;
           border-radius:10px;
           box-shadow:15px 15px 15px 3px rgba(0,0,0,0.6);
           border:0px;
           ${Reused.flex("column","space-evenly","center")};
           span{
               text-transform:capitalize;
               font-size:15px;
               justify-content:center;
           }
           button{
                width:80%;
                height:40px;
                text-transform: uppercase;
                font-weight:bold;
                background-color: #6c63ff;
                border:0px;
                color:white;
                cursor: pointer;
           }
           a{
               transform: scale(1);
                transition:all 1s linear;
                &:hover {
                    transform: scale(1.1);
                    
               }
           }
           .Cross{
               position:absolute;
               border-radius:50%;
               padding:3px;
               border: 1px solid black;
               font-family: Arial, Helvetica, sans-serif;
               font-size: 10px;
               top:5px;
               cursor:pointer;
               animation: rotate 1s linear;
               right:5px;
               transform: rotate(0deg);
               transition: all 1s linear;
               &:hover{
                   transform: rotate(90deg);
               }
           }
    }
`;


export default ContactsFile
