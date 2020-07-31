import React, { useEffect, useState, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from 'reactstrap';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Input, Label, Card, CardBody, Navbar, NavbarBrand,
    Collapse, Nav, NavItem, NavLink
} from 'reactstrap';
import Datetime from 'react-datetime';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import moment from 'moment'

function MainPage() {

    const [toggleModalDemo, setToggleModalDemo] = useState(false);
    const [startDate, setstartDate] = useState(new Date())
    const [endDate, setendDate] = useState(new Date())
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [desc, setDesc] = useState("");
    const [Events, setEvents] = useState([])
    const [selectDate, setSelectDate] = useState(new Date())
    const [user, setUser] = useState({
        id : null,
        name : null
    })

    const [_id, set_ID] = useState("");


    const calendarRef = useRef(null)

    const history = useHistory();

    useEffect(() => {
        //document.body.classList.toggle("index-page");
        let id = window.sessionStorage.getItem('id')
        let name = window.sessionStorage.getItem('name');

        if(id === null){
            history.push('/login');
        }else{
            setUser({
                id : id,
                name : name
            })
        }

        Axios.post('http://localhost:5000/api/event/list', {id : id})
        .then(res => {
            console.dir(res.data)

            if(res.data.success){
                setEvents([
                    ...Events,
                    ...res.data.events
                ])
            }
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    const toggle = (arg) => {
        setToggleModalDemo(!toggleModalDemo)
        console.dir(arg)
        setstartDate(arg.date);
        setendDate(arg.date);
        set_ID("")
    };

    const eventClick = (arg) => {
        console.dir(arg)
        setToggleModalDemo(!toggleModalDemo)

        setstartDate(arg.event.start);
        setendDate(arg.event.end);
        setTitle(arg.event.title)
        setContent(arg.event.extendedProps.content)
        setDesc(arg.event.extendedProps.desc)
        set_ID(arg.event.extendedProps._id)
        console.log(_id)

    }

    const createEvent = (arg) => {
        // const start_dt = document.getElementsByClassName('start_dt')[0].children[0].value
        // const end_dt = document.getElementsByClassName('end_dt')[0].children[0].value
        // const title = document.getElementById('title').value
        // const content = document.getElementById('content').value
        // const desc = document.getElementById('desc').value
        const id = window.sessionStorage.getItem('id');

        if(_id !== "") {
            console.log(_id)
            Axios.patch(`http://localhost:5000/api/event/update/${_id}`, {
                title : title,
                content : content,
                desc : desc,
                start : startDate,
                end : endDate
            }).then(res => {
                if(res.data.success){
                    console.dir(res.data.event)
                    setEvents([
                        ...Events.filter(obj => obj._id !== _id),
                        {
                            title: title,
                            start: startDate,
                            end: endDate,
                            content: content,
                            desc: desc,
                            _id : _id
                        }
                    ])
                    setToggleModalDemo(!toggleModalDemo)
                }else{
                    alert('update fail')
                }
            }).catch(err => {
                alert('update error')
            })

        }else{
            Axios.put('http://localhost:5000/api/event/create', {
                title : title,
                content : content,
                desc : desc,
                start : startDate,
                end : endDate,
                id : id
            })
            .then((res) => {
                console.log('then')
                if(res.data.success){
                    console.dir(res.data.event)
                    setEvents([
                        ...Events,
                        {
                            title: title,
                            start: startDate,
                            end: endDate,
                            content: content,
                            desc: desc,
                            _id : res.data.event._id
                        }
                    ])
                    setToggleModalDemo(!toggleModalDemo)
                }else{
                    alert('event insert fail')
                }
            })
            .catch(err => console.dir(err))
        }

        

        
    }

    const logoutNavLink = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:5000/api/user/logout')
        .then((res) => {
            if(res.data.success){
                window.sessionStorage.clear()
                console.log(window.sessionStorage.getItem('id'))
                setUser({
                    id : null,
                    name : null
                })
                history.push("/login");
            }else{
                alert('logout error')
            }

        })
    }

    

    const onChangeSelectDate = (e) => {
        const curruntApi = calendarRef.current.getApi();
        curruntApi.gotoDate(e._d)
        setSelectDate(e._d)
    }

    const onChangeTitle = e => {
        setTitle(e.target.value)
    }

    const onChangeContent = e => {
        setContent(e.target.value)
    }

    const onChangeDesc = e => {
        setDesc(e.target.value)
    }

    const onChagneStart = e =>{
        console.dir(e)
        setstartDate(e._d)
    }

    const onChagneEnd = e =>{
        setendDate(e._d)
    }

    return (
        <>
            <Navbar className="bg-info fixed-top" expand="lg">
                <Container>
                    <div className="navbar-translate">
                        <NavbarBrand href="" onClick={e => e.preventDefault()}>
                            {user.id}({user.name})
                        </NavbarBrand>
                       
                        <button className="navbar-toggler" aria-expanded={false}>
                            <span className="navbar-toggler-bar bar1" />
                            <span className="navbar-toggler-bar bar2" />
                            <span className="navbar-toggler-bar bar3" />
                        </button>
                    </div>

                    <Collapse navbar isOpen={false}>
                        <Nav className="ml-auto" navbar>
                            {/* <NavItem className="active">
                                <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                                    Discover
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                                    Profile
                                </NavLink>
                            </NavItem> */}
                            <NavItem>
                                <form className="form-inline ml-auto">
                                    <div className="form-group no-border">
                                        <Datetime 
                                            className="select_dt"
                                            value={selectDate}
                                            timeFormat={false}
                                            dateFormat="YYYY-MM-DD"
                                            inputProps={{ placeholder: "선택일" }}
                                            onChange={onChangeSelectDate}
                                        />
                                    </div>
                                </form>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/login" onClick={logoutNavLink}>
                                    Logout
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>

            <div className="wrapper">
                <div className="page-header header-filter" style={{ overflowY: 'scroll' }}>
                    <div className="squares square1" />
                    <div className="squares square2" />
                    <div className="squares square3" />
                    <div className="squares square4" />
                    <div className="squares square5" />
                    <div className="squares square6" />
                    <div className="squares square7" />
                    <div className="main">
                        <div className="section section-basic">
                            <Container>

                                <FullCalendar
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    dateClick={toggle}
                                    eventClick={eventClick}
                                    events={[
                                        { title: 'event 1', start: '2020-07-21', end: '2020-07-22', backgroundColor: 'aqua' },
                                        { title: 'event 2', start: '2020-07-22', end: '2020-07-31' },
                                        ...Events
                                    ]}
                                    ref={calendarRef}
                                />

                                <Modal isOpen={toggleModalDemo} toggle={toggle}>
                                    <ModalBody>
                                        <Card>
                                            <CardBody>
                                                <form>
                                                    <div className="form-row">
                                                        <FormGroup className="col-md-6">
                                                            <Label for="inputEmail4">시작일</Label>
                                                            <Datetime
                                                                className="start_dt"
                                                                value={startDate}
                                                                timeFormat="HH:mm:ss"
                                                                dateFormat="YYYY-MM-DD"
                                                                inputProps={{ placeholder: "시작일" }}
                                                                onChange={onChagneStart}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup className="col-md-6">
                                                            <Label for="inputPassword4">종료일</Label>
                                                            <Datetime
                                                                className="end_dt"
                                                                value={endDate}
                                                                timeFormat="HH:mm:ss"
                                                                dateFormat="YYYY-MM-DD"
                                                                inputProps={{ placeholder: "종료일" }}
                                                                onChange={onChagneEnd}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                    <FormGroup>
                                                        <Label for="inputAddress">일정 제목</Label>
                                                        <Input type="text" id="title" name="title" value={title} onChange={onChangeTitle} />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="inputAddress2">일정 내용</Label>
                                                        <Input type="text" id="content" name="content" value={content} onChange={onChangeContent} />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="inputAddress2">비고</Label>
                                                        <Input type="textarea" id="desc" name="desc" value={desc} onChange={onChangeDesc} />
                                                    </FormGroup>
                                                    <Button type="button" color="primary" onClick={createEvent}>작성</Button>
                                                    <Button color="secondary" onClick={toggle}>
                                                        닫기
                                                    </Button>
                                                </form>
                                            </CardBody>
                                        </Card>
                                    </ModalBody>
                                </Modal>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(MainPage)
