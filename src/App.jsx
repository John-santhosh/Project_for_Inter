import styled from "styled-components";
import { useGlobalContext } from "./Context";
import TaskEditor from "./components/TaskEditor";
import TaskAdd from "./components/Taskadd";

function App() {
  // const { data } = useGlobalContext();
  // console.log(data);
  return (
    <>
      <nav></nav>
      <Wrapper>
        <TaskAdd />
      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  background-color: var(--clr-bg-primary-1);
  min-height: calc(100vh - 4rem);
`;
