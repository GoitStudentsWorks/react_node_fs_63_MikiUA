import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from 'styled-components';

const CalendarHeadBox = styles.div`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 14px;
  background: #ffffff;
  border: 1px solid rgba(220, 227, 229, 0.5);
  border-radius: 8px;
`;
const CalendarHeadList = styles.ul`
padding:0;
  display: flex;
  justify-content: space-around;
  margin: 14px, 19, 5px;
`;
const CalendarHeadItem = styles.li`
  text-align: center;
  list-style: none;
`;

const CalendarDay = styles.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  text-transform: uppercase;
  text-align: center;
  overflow: hidden;


  @media screen and (max-width:767px) {
    font-size: 0;
    &:first-letter {
      font-size: 16px;
    }
  }
`;
const CalendarDayBtn = styles.button`
border-radius: 6px;
background-color: ${props => (props.isCurrentBtn ? `#3E85F3` : `#FFF`)};
border:none;
padding:0;
text-align:center;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 1.17;
color: #343434;
color: ${props => (props.isCurrentBtn ? `#FFF` : `#343434`)};
width: 20px;
height: 22px;

  :hover,
  focus
   {
    color: #FFFFFF;
    background: #3E85F3;
    border-radius: 6px;
  }
`;

const daysName = ['mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun'];

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const DayCalendarHead = () => {
  const { currentDate } = useParams();
  const [dateStr, setDateStr] = useState(currentDate);

  //   const [preDays, setPreDays] = useState([]);
  //   const [postDays, setpostDays] = useState([]);
  //   const [year, month, day] = currentDate.split('-');
  //   console.log(currentDate)
  useEffect(() => {
    setDateStr(currentDate);
  }, [currentDate]);
  const date = new Date(dateStr);
  const americanWeekDay = date.getDay();

  const monthDate = date;
  const weekDay = americanWeekDay === 0 ? 7 : americanWeekDay;

  const pre = [];
  const post = [];
  for (let i = weekDay - 1; i >= 1; i--) {
    pre.push(addDays(dateStr, -i));
  }
  let diff = 1;
  let dayOfWeek = weekDay + 1;
  while (dayOfWeek <= 7) {
    post.push(addDays(dateStr, diff));
    dayOfWeek++;
    diff++;
  }

  // console.log(addDays(dateStr, 40))
  const navigate = useNavigate();
  const handleNavigate = calendarDay => {
    const paddedNumber = calendarDay.getDate().toString().padStart(2, '0');
    const formarDay = calendarDay.length === 2 ? calendarDay : paddedNumber;
    // console.log(formarDay)
    // console.log(calendarDay.getFullYear())
    const month = calendarDay.getMonth() + 1;
    //    const adsfsdfsd  = calendarDay.getDate()
    const newURLDay = `${calendarDay.getFullYear()}-${
      month < 10 ? `0${month}` : month
    }-${formarDay}`;
    console.log(newURLDay);
    const newPath = `/calendar/day/${newURLDay}`;
    setDateStr(newURLDay);
    navigate(newPath);

    // console.log(newPath)
  };
  console.log(date.getDate())
  const allDays = [...pre, monthDate, ...post];
  // console.log(allDays)

  return (
    <CalendarHeadBox>
      <CalendarHeadList>
        {allDays.map((data, index) => (
          <CalendarHeadItem key={index}>
            <CalendarDay>{daysName[index]}</CalendarDay>
            <CalendarDayBtn 
            type="button" 
            onClick={() => handleNavigate(data)}
            
            isCurrentBtn={data.getDate() === date.getDate()}
            >
              {data.getDate()}
            </CalendarDayBtn>
          </CalendarHeadItem>
        ))}
      </CalendarHeadList>
    </CalendarHeadBox>
  );
};

export default DayCalendarHead;

// let currentDay = 1
// const daysInMonth = 28
// const initialDates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
// const weeks = [];
// const daysPerPage = 7; // Кількість днів на сторінці
// let week = [];
// let previousLastDigit = null;

// initialDates.forEach((date, index) => {
//     if (week.length === 0 && previousLastDigit !== null) {
//         week.push(previousLastDigit); // Додаємо останнє число попереднього масиву до нового масиву
//       }

//       week.push(date);

//       if (week.length === daysPerPage || index === initialDates.length - 1) {
//         weeks.push(week);
//         week = [];
//       }

//       if (index === initialDates.length - 1 && week.length < daysPerPage) {
//         while (week.length < daysPerPage) {
//           week.push(null); // Додаємо null, якщо останній тиждень не заповнений повністю
//         }
//         weeks.push(week);
//       }

//       previousLastDigit = date;
//   });

// const startDay = 8
// const DayCalendarHead = () => {
// const [selectedDate, setSelectedDate] = useState(null);
// const [currentPage, setCurrentPage] = useState(0);

// useEffect(() => {
//     let normalizedStartDay = startDay % daysPerPage;
//     if (normalizedStartDay === 0) {
//         normalizedStartDay = daysPerPage;
//     }
//     const startIndex = normalizedStartDay - 1;
//     setCurrentPage(Math.floor(startIndex / daysPerPage));
// }, [startDay, daysPerPage]);

// const [currentData, setCurrentData] = useState(1);
// const [year, month, day] = currentDate.split('-')
// const { currentDate } = useParams()
// console.log(currentDate)
// const navigate = useNavigate();
//   const newdate = new Date(currentDate).getDate()
// console.log(newdate + 20)

// const handleNavigate = (date) => {
//     setSelectedDate(date);
// const newPath = '/calendar/day//2023-06-04'
// navigate(newPath)

// const currentPageIndex = weeks.findIndex((week) => week.includes(date + 1));
// if (currentPageIndex !== -1) {
//     setCurrentPage(currentPageIndex);
// } else if (date > weeks[currentPage][weeks[currentPage].length - 1]) {
//     setCurrentPage(currentPage + 1);
// }
// }