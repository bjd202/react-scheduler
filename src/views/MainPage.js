import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from 'reactstrap';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Input, Label, Card, CardBody
} from 'reactstrap';
import Datetime from 'react-datetime';

function MainPage() {

    const [toggleModalDemo, setToggleModalDemo] = useState(false);
    const [startDate, setstartDate] = useState("")
    const [endDate, setendDate] = useState("")
    const [Events, setEvents] = useState([])

    useEffect(() => {
        document.body.classList.toggle("index-page");
    }, [])

    const toggle = (arg) => {
        setToggleModalDemo(!toggleModalDemo)
        setstartDate(arg.dateStr);
        setendDate(arg.dateStr);
    };

    const eventClick = (arg) => {
        setToggleModalDemo(!toggleModalDemo)

        setstartDate(arg.event.startStr);
        setendDate(arg.event.endStr);
        document.getElementById('title').value = arg.event.title
        document.getElementById('content').value = arg.event.extendedProps.content
        document.getElementById('desc').value = arg.event.extendedProps.desc

    }
    
    const createEvent = () => {
        const start_dt = document.getElementsByClassName('start_dt')[0].children[0].value
        const end_dt = document.getElementsByClassName('end_dt')[0].children[0].value
        const title = document.getElementById('title').value
        const content = document.getElementById('content').value
        const desc = document.getElementById('desc').value

        setEvents([
            ...Events,
            {
                title : title,
                start : start_dt,
                end : end_dt,
                content : content,
                desc : desc
            }
        ])

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
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        dateClick={toggle}
                        eventClick={eventClick}
                        events={[
                            { title: 'event 1', date: '2020-07-21' },
                            { title: 'event 2', date: '2020-07-22' },
                            ...Events
                        ]}
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
                                                    timeFormat={false}
                                                    dateFormat="YYYY-MM-DD"
                                                    inputProps={{placeholder:"시작일"}}
                                                    onChange={setstartDate}
                                                />
                                            </FormGroup>
                                            <FormGroup className="col-md-6">
                                                <Label for="inputPassword4">종료일</Label>
                                                <Datetime
                                                    className="end_dt"
                                                    value={endDate}
                                                    timeFormat={false}
                                                    dateFormat="YYYY-MM-DD"
                                                    inputProps={{placeholder:"종료일"}}
                                                    onChange={setendDate}
                                                />
                                            </FormGroup>
                                        </div>
                                        <FormGroup>
                                            <Label for="inputAddress">일정 제목</Label>
                                            <Input type="text" id="title" name="title" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="inputAddress2">일정 내용</Label>
                                            <Input type="text" id="content" name="content" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="inputAddress2">비고</Label>
                                            <Input type="textarea" id="desc" name="desc" />
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
    )
}

export default withRouter(MainPage)
