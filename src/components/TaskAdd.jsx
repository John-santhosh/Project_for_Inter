import styled from "styled-components";
import TaskEditor from "./TaskEditor";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { useGlobalContext } from "../Context";
import AllTask from "./AllTask";
const TaskAdd = () => {
  const [taskOpen, setTaskOpen] = useState(false);
  const { allTask } = useGlobalContext();

  return (
    <Wrapper className="section-center">
      <h2>Test</h2>
      <p className="">Sloovi.com</p>
      <em>Add description</em>
      <div>
        <div className="addTask flex-center">
          <p className="flex-center">TASKS {0}</p>
          <button
            className="flex-center"
            onClick={() => setTaskOpen(!taskOpen)}
          >
            <IoMdAdd />
          </button>
        </div>
        {taskOpen && <TaskEditor delete={false} />}
      </div>
      {allTask.map((task) => {
        return <AllTask key={task.id} {...task} />;
      })}
    </Wrapper>
  );
};

export default TaskAdd;
const Wrapper = styled.div`
  .addTask {
    background-color: #a9a9a918;
    border-bottom: 1px solid var(--clr-grey-50);
    padding-left: 10px;
    height: 2.5rem;
    justify-content: space-between;

    button {
      border-left: 1px solid var(--clr-grey-50);
      padding: 0 10px;
      height: 100%;
    }
  }
  > div {
    border-radius: 5px;
    border: 1px solid var(--clr-grey-50);
    width: 500px;
  }
`;
