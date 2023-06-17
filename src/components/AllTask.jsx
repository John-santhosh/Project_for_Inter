import { useState } from "react";
import { useGlobalContext } from "../Context";
import styled from "styled-components";
import { HiPencil } from "react-icons/hi";
import { HiBellSnooze } from "react-icons/hi2";
import { MdDone } from "react-icons/md";
import TaskEditor from "./TaskEditor";
import axios from "axios";
import { useEffect } from "react";

const AllTask = ({ id, task_msg, task_date }) => {
  const { allTask } = useGlobalContext();
  const [taskOpen, setTaskOpen] = useState(false);
  // getSingle Task

  const getSingleTask = async (id) => {
    try {
      const res = await axios(
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
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getSingleTask(id);
  }, []);

  return (
    <Wrapper>
      <div>
        {/* {allTask.map((task) => {
          const { id, task_msg, task_date } = task;
          // console.log(task); */}
        {/* return ( */}
        <div>
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
              <button>
                <MdDone />
              </button>
            </div>
          </div>
          {taskOpen && <TaskEditor delete={true} id={id} />}
        </div>
        {/* );
        })} */}
        {/* {taskOpen && <TaskEditor />} */}
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
