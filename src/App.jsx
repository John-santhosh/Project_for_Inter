import styled from "styled-components";
import { useGlobalContext } from "./Context";
import TaskEditor from "./components/TaskEditor";
import TaskAdd from "./components/Taskadd";
import { ToastContainer } from "react-toastify";

function App() {
  // const { data } = useGlobalContext();
  // console.log(data);
  return (
    <>
      <ToastContainer position="bottom-center"></ToastContainer>
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
