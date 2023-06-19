// import { useState } from "react";
// import styled from "styled-components";

// const CustomDatePicker = () => {
//   const [date1, setDate] = useState("06/3/2023");
//   const date_picker_element = document.querySelector(".date-picker");
//   const selected_date_element = document.querySelector(
//     ".date-picker .selected-date"
//   );
//   const dates_element = document.querySelector(".date-picker .dates");
//   const mth_element = document.querySelector(".date-picker .dates .month .mth");
//   const next_mth_element = document.querySelector(
//     ".date-picker .dates .month .next-mth"
//   );
//   const prev_mth_element = document.querySelector(
//     ".date-picker .dates .month .prev-mth"
//   );
//   const days_element = document.querySelector(".date-picker .dates .days");

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   // console.log(dates_element);
//   // date_picker_element.addEventListener("click", toggleDatePicker);

//   // functions
//   function toggleDatePicker(e) {
//     console.log(e);
//     dates_element.classList.toggle("active");
//   }

//   // helper function
//   function checkEventPathForClass(path, selector) {
//     for (let i = 0; i < path.length; i++) {
//       if (path[i].classList && path[i].classList.contains(selector)) {
//         return true;
//       }
//     }

//     return false;
//   }
//   return (
//     <Wrapper>
//       <div className="date-picker" onClick={toggleDatePicker}>
//         <div className="selected-date">{date1}</div>

//         <div className="dates">
//           <div className="month">
//             <div className="arrows prev-mth">&lt;</div>
//             <div className="mth"></div>
//             <div className="arrows next-mth">&gt;</div>
//           </div>

//           <div className="days"></div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default CustomDatePicker;

// const Wrapper = styled.div`
//   .date-picker {
//     position: relative;
//     /* width: 100%;
//     max-width: 320px; */
//     /* height: 60px; */
//     background-color: #fff;
//     margin: 30px auto;
//     /* box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2); */

//     cursor: pointer;
//     user-select: none;
//   }

//   /* .date-picker:hover {
//     background-color: #f3f3f3;
//   } */

//   .date-picker .selected-date {
//     width: 100%;
//     height: 100%;

//     display: flex;
//     justify-content: center;
//     align-items: center;

//     /* color: #313131; */
//     /* font-size: ; */
//   }

//   .date-picker .dates {
//     display: none;
//     position: absolute;
//     top: 100%;
//     left: 0;
//     right: 0;

//     background-color: #fff;
//   }

//   .date-picker .dates.active {
//     display: block;
//   }

//   .date-picker .dates .month {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     border-bottom: 2px solid #eee;
//   }

//   .date-picker .dates .month .arrows {
//     width: 35px;
//     height: 35px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     color: #313131;
//     font-size: 20px;
//   }

//   .date-picker .dates .month .arrows:hover {
//     background-color: #f3f3f3;
//   }

//   .date-picker .dates .month .arrows:active {
//     background-color: #00ca85;
//   }

//   .date-picker .dates .days {
//     display: grid;
//     grid-template-columns: repeat(7, 1fr);
//     height: 200px;
//   }
//   .date-picker .dates .days .day {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     color: #313131;
//   }
//   .date-picker .dates .days .day.selected {
//     background-color: #00ca85;
//   }
// `;

import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import styled from "styled-components";
import { SlCalender } from "react-icons/sl";

const CustomDatePicker = () => {
  const [calendar, setCalendar] = useState("2023/06/10");
  // useEffect(() => {
  //   console.log(calendar);
  // }, [calendar]);
  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // set current date on component load
    setCalendar(format(new Date(), "yyyy/MM/dd"));
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // on date change, store date in state
  const handleSelect = (date) => {
    console.log(format(date, "yyyy/MM/dd"));
    setCalendar(format(date, "yyyy/MM/dd"));
  };

  return (
    <Wrapper className="calendarWrap">
      <div
        className="d-flex flex-center"
        onClick={() => setOpen((open) => !open)}
      >
        <SlCalender />
        <input value={calendar} readOnly className="inputBox" />
      </div>

      <div ref={refOne}>
        {open && (
          <Calendar
            date={new Date()}
            onChange={handleSelect}
            className="calendarElement"
          />
        )}
      </div>
    </Wrapper>
  );
};

export default CustomDatePicker;

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  cursor: pointer;
  /* overflow: scroll; */

  .d-flex {
    padding-left: 1rem;
  }
  .inputBox {
    border: none;
    outline: none;
    cursor: pointer;
  }
  input.inputBox {
    width: 100px;
    border-radius: 3px;
    /* border: 1px solid #666; */
  }

  .calendarElement {
    position: absolute;
    left: 81%;
    transform: translateX(-50%);
    top: 40px;
    border: 1px solid #ccc;
    z-index: 999;
    min-height: 100px;
  }
`;
