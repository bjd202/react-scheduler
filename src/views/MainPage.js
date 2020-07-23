import React, { useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from 'reactstrap';

function MainPage() {

    useEffect(() => {
        document.body.classList.toggle("index-page");
    }, [])

    const handleDateClick = (arg) => { 
        alert(arg.dateStr)
    }

    const eventClick = (arg) => {
        console.dir(arg)
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
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        dateClick={handleDateClick}
                        eventClick={eventClick}
                        events={[
                            { title: 'event 1', date: '2020-07-21' },
                            { title: 'event 2', date: '2020-07-22' }
                        ]}
                    />
                </Container>
                
            </div>
        </div>
    )
}

export default withRouter(MainPage)
