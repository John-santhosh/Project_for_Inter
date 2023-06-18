import { useState } from "react";
import { useGlobalContext } from "../Context";
import styled from "styled-components";
import { HiPencil } from "react-icons/hi";
import { HiBellSnooze } from "react-icons/hi2";
import { MdDone } from "react-icons/md";
import TaskEditor from "./TaskEditor";

const AllTask = ({ id, task_msg, task_date, is_completed }) => {
  const [taskOpen, setTaskOpen] = useState(false);
  const { allTask, updateTask } = useGlobalContext();
  const currentTask = allTask.find((task) => task.id === id);
  // console.log(allTask);
  return (
    <Wrapper>
      <div>
        <div>
          {!taskOpen ? (
            <div className="flex-center flex-between">
              <div className="flex-center ">
                <div className="img"></div>
                <span>
                  <p className="taskMsg">{task_msg}</p>
                  <p className="taskDate">{task_date}</p>
                </span>
              </div>
              <div className="btn-container">
                <button onClick={() => setTaskOpen(!taskOpen)}>
                  <HiPencil />
                </button>
                <button>
                  <HiBellSnooze />
                </button>
                <button
                  onClick={() => {
                    const {
                      assigned_user,
                      task_date,
                      task_time,
                      task_msg,
                      time_zone,
                    } = currentTask;
                    const data = {
                      task_date,
                      assigned_user,
                      task_time,
                      is_completed: 1,
                      task_msg,
                      time_zone,
                    };
                    updateTask(id, data);
                  }}
                >
                  <MdDone />
                </button>
              </div>
            </div>
          ) : (
            <TaskEditor deleteIcon id={id} setTaskOpen={setTaskOpen} />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default AllTask;

const Wrapper = styled.div`
  .img {
    width: 30px;
    aspect-ratio: 1/1;
    background-color: dodgerblue;
    border-radius: 50%;
  }
  .taskMsg {
    font-weight: 500;
  }
  .taskDate {
    color: red;
    font-size: 0.8rem;
  }

  div.flex-between {
    padding: 10px 1rem;
    border: 1px solid var(--clr-grey-50);
    > div.flex-center {
      gap: 0.5rem;
    }
  }

  .btn-container {
    /* min-width: 100px; */
    button {
      margin: 0 5px;
      svg {
        font-size: 1rem;
        color: #525252;
      }
    }
  }
`;
