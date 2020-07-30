import React, { useEffect, useState } from 'react'
import {withRouter, useHistory} from 'react-router-dom'
import { Container } from "reactstrap";
import {
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
    Card,
    CardBody
  } from "reactstrap";
import Axios from 'axios';

function LoginPage() {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    useEffect(() => {
        //document.body.classList.toggle("index-page");
    }, [])

    const onChangeId = (e) => {
        setId(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = () => {
        Axios.post('http://localhost:5000/api/user/login', {id : id, password : password})
        .then((res) => {
            if(res.data.success){
                window.sessionStorage.setItem('id', res.data.data.id)
                window.sessionStorage.setItem('name', res.data.data.name)
                history.push('/');
            }else{
                alert('login error')
            }
            
        })
        .catch((err) => {
            alert(err)
        })
    }

    return (
        <div className="wrapper">
            <div className="page-header header-filter">
                <div className="squares square1" />
                <div className="squares square2" />
                <div className="squares square3" />
                <div className="squares square4" />
                <div className="squares square5" />
                <div className="squares square6" />
                <div className="squares square7" />
                <Container>
                    <div className="content-center brand">
                        <Card>
                        <CardBody>
                            <form>
                            <FormGroup>
                                <Label for="exampleEmail">아이디</Label>
                                <Input
                                type="text"
                                name="id"
                                id="id"
                                placeholder="Enter ID"
                                onChange={onChangeId}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">비밀번호</Label>
                                <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                autoComplete="off"
                                onChange={onChangePassword}
                                />
                            </FormGroup>
                            <Button color="primary" onClick={handleLogin}>
                                로그인
                            </Button>
                            </form>
                        </CardBody>
                        </Card>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default withRouter(LoginPage)
