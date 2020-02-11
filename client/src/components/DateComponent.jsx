import React from 'react'

const nameOfDayReturner = dayIndex => {
    
    switch(dayIndex){
        case 0: return "Sunday"
        case 1: return "Monday"
        case 2: return "Tuesday"
        case 3: return "Wednesday"
        case 4: return "Thursday"
        case 5: return "Sriday"
        case 6: return "Saturday"
        default: return ""
    }
}

const nameOfMonthReturner = monthIndex => {
    switch(monthIndex){
        case 0: return "Jan"
        case 1: return "Feb"
        case 2: return "Mar"
        case 3: return "Apr"
        case 4: return "May"
        case 5: return "Jun"
        case 6: return "Jul"
        case 7: return "Aug"
        case 8: return "Sept"
        case 9: return "Oct"
        case 10: return "Nov"
        case 11: return "Dec"
        default: return ""
}
}

const DateComponent = props => {
    const date = new Date(props.date)
    
    if(isNaN(date.getTime())){
        return ""
    }

    const dayOfWeek = nameOfDayReturner(date.getDay())
    const dayOfMonth = date.getDate()
    const month = nameOfMonthReturner(date.getMonth())
    const year = date.getFullYear()
    const finalDateString = [dayOfWeek,dayOfMonth,month,year].join(" ")
    
    return <small style={{marginLeft:".5rem",color:"grey"}}>{finalDateString}</small>
}

export default DateComponent