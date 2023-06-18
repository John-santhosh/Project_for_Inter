import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../Context";
import { hoursToSeconds } from "../helper/helper";
import { MdDelete } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";

function TaskEditor({ id, deleteIcon, setTaskOpen }) {
  const { createTask, updateTask, deleteTask, users } = useGlobalContext();
  const [formData, setFormData] = useState({
    assigned_user: "user_8c2ff2128e70493fa4cedd2cab97c492",
    task_date: "2023-06-15",
    task_time: 0,
    is_completed: 0,
    time_zone: 19800,
    task_msg: "",
  });

  //get a single task
  const getSingleTask = async (id) => {
    try {
      const { data } = await axios(
        `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=${
          import.meta.env.VITE_COMPANY_ID
        }`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const {
        assigned_user,
        task_date,
        task_time,
        is_completed,
        time_zone,
        task_msg,
      } = data.results;
      const currentTaskDetails = {
        assigned_user,
        task_date,
        task_time,
        is_completed,
        time_zone,
        task_msg,
      };
      // console.log(currentTaskDetails);
      if (deleteIcon) {
        setFormData(currentTaskDetails);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getSingleTask(id);
  }, []);

  // update local Task(from) details
  const updateFormData = (e) => {
    if (e.target.name === "task_time") {
      setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // creating time for select menu
  const time = Array.from({ length: 22.5 }, (_, ind) => {
    return `${Math.floor(ind * 0.5 + 1)}:${
      (ind * 0.5 + ind * 0.5) % 2 === 0 ? "00" : "30"
    }`;
  });

  return (
    <Wrapper>
      <form
        onSubmit={(e) => {
          console.log(id);
          e.preventDefault();
          {
            deleteIcon ? updateTask(id, formData) : createTask(formData),
              setTaskOpen(false);
          }
        }}
      >
        <div>
          <label>Task Description</label>
          <br />
          <input
            type="text"
            placeholder="Task"
            name="task_msg"
            required
            value={formData.task_msg}
            onChange={updateFormData}
          />
        </div>
        <div className="date flex-center">
          <span>
            <label htmlFor="">Date</label>
            <br />
            <div className="sd-container">
              <input
                name="task_date"
                value={formData.task_date}
                onChange={updateFormData}
                className="sd"
                type="date"
              />
              <span className="open-button">
                <button type="button">
                  <FcCalendar />
                </button>
              </span>
            </div>
          </span>

          <span className="time">
            <label htmlFor="">Time</label>
            <br />
            <select
              name="task_time"
              value={formData.task_time}
              className="time"
              onChange={updateFormData}
            >
              <option value="0">12:00am</option>
              <option value={hoursToSeconds(["00", "30"])}>12:30am</option>
              {time.map((clock, index) => {
                return (
                  <option key={index} value={hoursToSeconds(clock.split(":"))}>
                    {clock}am
                  </option>
                );
              })}
              <option value={hoursToSeconds(["12", "00"])}>12:00pm</option>
              <option value={hoursToSeconds(["12", "30"])}>12:30pm</option>
              {time.map((clock, index) => {
                const time = [
                  `${Number(clock.split(":")[0]) + 12}`,
                  clock.split(":")[1],
                ];

                return (
                  <option key={index} value={hoursToSeconds(time)}>
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
          value={formData.assigned_user}
          name="assigned_user"
          onChange={updateFormData}
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
          style={{ justifyContent: deleteIcon ? "space-between" : "end" }}
        >
          {deleteIcon && (
            <button
              type="button"
              className="deleteBtn"
              onClick={() => deleteTask(id)}
            >
              <MdDelete />
            </button>
          )}
          <div>
            <button type="button" onClick={() => setTaskOpen(false)}>
              Cancel
            </button>
            <button className="saveBtn" type="submit">
              Save
            </button>
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
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin-top: 5px;
      }

      .sd-container {
        position: relative;
        float: left;
        width: 100%;
      }

      .sd {
        padding: 5px 10px;
        height: 30px;
      }

      .open-button {
        position: absolute;
        top: 7px;
        right: 4px;
        width: 25px;
        height: 25px;
        background-color: #fff;
        pointer-events: none;
      }

      .open-button button {
        border: none;
        background: transparent;
      }
    }
  }
  select.user {
    width: 100%;
    padding: 5px 0.625rem;
    margin-top: 0.625rem;
    outline: none;
    border: 1px solid var(--clr-grey-50);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAkCAYAAACXOioTAAAAAXNSR0IArs4c6QAAAZhJREFUSEvtlk3LgkAUhY99Uv0+F7mIitonEhSBlX1QQf8gBCEIN/63iAiJ8OUOBC/lOHdctPKCIDhzHufMmcsYSZIk+EEZBSivy4V1eZ1DLuvoRBiGoQXVAsVxjMvlgkqlgna7jXK5zIaxQQRZr9fYbDao1WrifTQaCSinWKDn84ntdovVaoXX6yV0q9UqPM+Dbduo1+tKlhJEwrvdDsvlEgT8X2TdYrGA4zhoNBqZsEwQbfrhcMB8PgdZl1YUCtd1MR6P0Wq1pLBM0PF4FJD7/a60ZjabYTqdSmFSUBRF6Pf7uF6vSggNoJWdTid0u12USqWvOVJQGIYYDoe43W5fk0iI0vZ+KBjNZlPYbJpmauyloMfjISC04SRIYm/htD9WLVuZOpUA93sB4jrFT935fMZgMJAe1E8lakO+78OyrPSDLbucBEEgzoRO0ZxOp6MHotH7/R6TyYTFop5HXURWytRxYCqI6Byce10WjANhg2Q2ciFaoE+YDkQbRBMowtSpe70eKyTvQaw90lKUDC5AuV0srMtt3R88bhakXJJLzwAAAABJRU5ErkJggg==");
    /* background: url("https://img.icons8.com/?size=512&id=41198&format=png"); */
    background-repeat: no-repeat;
    background-position: right 15px center;
    background-size: 1rem;
    background-color: #fff;
  }
  .time {
    select {
      width: 100%;
      font-size: 1rem;
      padding-left: 2.5rem;
      border: 1px solid var(--clr-grey-50);
      height: 2.2rem;
      margin-top: 5px;
      background-color: #fff;
      /** for the dropdown indicator */
      appearance: none;
      background-image: url("https://img.icons8.com/?size=512&id=3160&format=png");
      background-repeat: no-repeat;
      background-position: left 7px center;
      background-size: 1rem;
    }
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
