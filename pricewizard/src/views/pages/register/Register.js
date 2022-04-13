import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilKeyboard, cilLockLocked, cilUser } from '@coreui/icons'
import ToastComp from '../../../components/toast/ToastComp';
import { Auth } from 'aws-amplify';
import { setTimeout } from "core-js";
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [regMode, setRegMode] = useState("register");
  const [username, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdconfirm, setPwdConfirm] = useState("");
  const [emailadd, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [confirmmessage, setConfirmMsg] = useState('');
  const [toaststyle, setToastStyle] = useState('success');
  const [code, setCode] = useState("");
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    const form = evt.currentTarget
    if (form.checkValidity() === false) {
      evt.preventDefault()
      evt.stopPropagation()
    }
    evt.preventDefault()
    if (pwd === pwdconfirm) {
      setValidated(true);
      signUp();
    } else {
      alert("Passwords do not match!");
    }
  }

  const handleConfirm = (evt) => {
    evt.preventDefault();
    confirmMe();
  }

  async function signUp() {


    try {
        await Auth.signUp({
            username: username,
            password: pwd,
            attributes: {
                email: emailadd,          // optional
            }
        });

        setRegMode("confirm");
        
    } catch (error) {
        console.log('error signing up:', error);
    }
}

async function confirmMe() {
    try {
        await Auth.confirmSignUp(username, code)
        
        toastConfirm("success", "Account Confirmed! you will now be redirected to the login screen");

        setTimeout(function(){
          navigate("/login");
        }, 3500);
    } catch (error) {
        alert("Confirmation Code not recognized, please try again.");
        console.log('error confirming signing up:', error);
    }
}

function toastConfirm(tStyle, msg) {
  setConfirmMsg(msg);
  setToastStyle(tStyle);
  setShowToast(true);
}

function endToast() {
  setShowToast(false);
}

/*function checkPasswords() {
  var passvalid = true;

  if (username === "")
    passvalid = false;

  if (emailadd.indexOf("@") == -1)
    passvalid = false;

  if (pwd !== pwdconfirm)
    passvalid = false;
  
  if (pwd === "")
    passvalid = false;

  return passvalid;
}*/

  return (
    <>
    <ToastComp stopToast={endToast} message={confirmmessage} toaststyle={toaststyle} confirm={showToast} />
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
            {regMode === 'register' && <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit} validated={validated}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create a free Price Wizard account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username"
                        value={username} onChange={e => setName(e.target.value)} required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email"
                        value={emailadd} onChange={e => setEmail(e.target.value)} required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={pwd} onChange={e => setPwd(e.target.value)} required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={pwdconfirm} onChange={e => setPwdConfirm(e.target.value)} required
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type='submit'>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>}

              {regMode === 'confirm' && <CCardBody className="p-4">
                <CForm onSubmit={handleConfirm} >
                  <h3>User Created - Confirmation Needed</h3>
                  <p className="text-medium-emphasis">Check your email for a verification code and enter it below to activate your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilKeyboard} />
                    </CInputGroupText>
                    <CFormInput placeholder="Enter Validation Code" autoComplete="code"
                        value={code} onChange={e => setCode(e.target.value)} />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="info" type='submit'>Confirm Account</CButton>
                  </div>
                </CForm>
              </CCardBody>}
              
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    </>
  )
}

export default Register
