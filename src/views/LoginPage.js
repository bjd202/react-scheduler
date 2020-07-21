import React, { useEffect } from 'react'
import {withRouter} from 'react-router-dom'
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

function LoginPage() {

    useEffect(() => {
        document.body.classList.toggle("index-page");
    }, [])

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
                                />
                            </FormGroup>
                            <Button color="primary" type="submit">
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
