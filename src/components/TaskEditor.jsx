import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../Context";
import { hoursToSeconds } from "../helper/helper";
import { MdDelete } from "react-icons/md";

function TaskEditor(props) {
  console.log(props.delete);
  // const {delete} = props
  // console.log(props);
  const { createTask, updateTask, deleteTask } = useGlobalContext();
  const fetchdata = async () => {
    const { data } = await axios.post(
      "https://stage.api.sloovi.com/login?product=outreach",
      {
        email: "smithwills1989@gmail.com",
        password: "12345678",
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
  };
  useEffect(() => {
    // fetchdata();
  }, []);

  // create task

  const { users } = useGlobalContext();
  const time = Array.from({ length: 22.5 }, (_, ind) => {
    return `${Math.floor(ind * 0.5 + 1)}:${
      (ind * 0.5 + ind * 0.5) % 2 === 0 ? "00" : "30"
    }`;
  });
  return (
    <Wrapper>
      <form
        onSubmit={(e) => {
          console.log(props.id);
          e.preventDefault();
          props?.delete
            ? updateTask(props.id, {
                assigned_user: "user_8c2ff2128e70493fa4cedd2cab97c492",
                task_date: "2023-12-01",
                task_time: 5500,
                is_completed: 0,
                time_zone: 19800,
                task_msg: "checking2 John",
              })
            : createTask();
        }}
      >
        <div>
          <label>Task Description</label>
          <br />
          <input type="text" placeholder="Task" />
        </div>
        <div className="date flex-center">
          <span>
            <label htmlFor="">Date</label>
            <br />
            <input
              type="date"
              name=""
              id=""
              onChange={(e) => console.log(e.target.value)}
            />
          </span>

          <span className="time">
            <label htmlFor="">Time</label>
            <br />
            <select name="task_time" className="time">
              <option value="0">12:00am</option>
              <option value={hoursToSeconds(["00", "30"])}>12:30am</option>
              {time.map((clock, index) => {
                return (
                  <option key={index} value={hoursToSeconds(clock.split(":"))}>
                    {clock}am
                  </option>
                );
              })}
              <option value="0">12:00pm</option>
              <option value={hoursToSeconds(["00", "30"])}>12:30pm</option>
              {time.map((clock, index) => {
                return (
                  <option key={index} value={hoursToSeconds(clock.split(":"))}>
                    {/* {console.log(clock.split(":")[0] * 12 - index * 0.5)}
                    {console.log((index * 0.5) / 0.5)}
                    {console.log(clock)} */}
                    {clock}pm
                  </option>
                );
              })}
            </select>
          </span>
        </div>
        <label>Assign user</label>
        <select
          className="user"
          name="assigned_user"
          onChange={(e) => console.log(e.target.value)}
        >
          {users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
        <div
          className="btn-container flex-center "
          style={{ justifyContent: props.delete ? "space-between" : "end" }}
        >
          {props.delete && (
            <button
              type="button"
              className="deleteBtn"
              onClick={() => deleteTask(props.id)}
            >
              <MdDelete />
            </button>
          )}
          <div>
            <button type="button">Cancel</button>
            <button className="saveBtn">Save</button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default TaskEditor;

const Wrapper = styled.div`
  background-color: var(--clr-bg-1);
  padding: 0.625rem;
  input {
    border: 1px solid var(--clr-grey-50);
    border-radius: 2px;
    padding: 5px 0.625rem;
    margin-top: 0.625rem;
    width: 100%;
  }

  /* date and time styles */
  .date {
    justify-content: space-between;
    margin: 0.625rem 0;
    > span {
      width: 45%;
      label {
        font-weight: 500;
      }
      input {
        width: 100%;
        margin-top: 5px;
      }
    }
  }
  select.user {
    width: 100%;
    padding: 5px 0.625rem;
    margin-top: 0.625rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* background: url("http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png")
      white no-repeat 98.5% !important; */
  }

  /* buttons */
  .btn-container {
    margin: 0.625rem 0;

    .saveBtn {
      background-color: dodgerblue;
      padding: 5px 1.5rem;
      border-radius: 1rem;
      transition: var(--transition);
      color: #fff;
      margin-left: 1rem;
      :hover {
        background-color: #1a69b7;
      }
    }
  }
`;
