import React from 'react'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import './acCalendar.scss'

function AcCalendar(props) {
  console.log(props.eventData)

  let events = []
  if (props.eventData) {
    events = props.eventData.map(v => {
      return {
        title: v.title,
        start: v.date.substr(0, 10),
        url: "javascript: window.open('../activities/offline/" + v.acId + "')",
      }
    })
  }

  React.useEffect(() => {
    var calendarEl = document.getElementById('calendar')
    if (!events.length) return
    if (!calendarEl) return
    if (document.querySelector('.acCalendarContainer .fc-toolbar')) return
    var calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, bootstrapPlugin],
      themeSystem: 'bootstrap',
      header: {
        left: 'prev',
        center: 'title',
        right: 'today ,next',
      },
      height: 500,
      titleFormat: { year: 'numeric', month: 'short' },
      events,
    })

    calendar.render()
  }, [events])
  return (
    <>
      <section className="acCalendarContainer py-5 mt-5">
        <div id="calendar"></div>
      </section>
    </>
  )
}
export default AcCalendar
