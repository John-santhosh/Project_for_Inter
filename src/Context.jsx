import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer/Reducer";
import { SELECT_USERS, SET_ALL_TASK } from "./actions";
import { deleteURL, updateURL } from "./helper/data";

const GlobalContext = createContext();

// C-Hook
export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  // console.log(import.meta.env.VITE_COMPANY_ID);

  // initial state
  const initialState = {
    users: [],
    task: {
      assigned_user: "",
      task_date: "2023-12-01",
      task_time: 0,
      is_completed: false,
      task_msg: "",
      time_zone: "",
    },
    allTask: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // set select options users
  const setSelectUsers = (users) => {
    dispatch({ type: SELECT_USERS, payload: users });
  };
  // set All task
  const setAllTask = (task) => {
    dispatch({ type: SET_ALL_TASK, payload: task });
  };

  // const getAll task from API
  const getAllTask = async () => {
    try {
      const { data } = await axios(
        `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${
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

      const task = data.results;
      console.log(task);
      setAllTask(task);
    } catch (error) {
      console.log(error.message);
    }
  };

  // fetch select options
  async function fetchData() {
    try {
      const { data } = await axios.get(
        `https://stage.api.sloovi.com/team?product=outreach&company_id=${
          import.meta.env.VITE_COMPANY_ID
        }`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          },
        }
      );
      const users = data.results.data;

      setSelectUsers(users);
    } catch (error) {
      console.log(error.message);
    }
  }

  // createTask
  const createTask = async () => {
    try {
      const res = await axios.post(
        `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${
          import.meta.env.VITE_COMPANY_ID
        }`,
        {
          assigned_user: "user_8c2ff2128e70493fa4cedd2cab97c492",
          task_date: "2023-12-01",
          task_time: 5500,
          is_completed: 0,
          time_zone: 19800,
          task_msg: "checking123 John",
        },
        {
          headers: {
            Authorization: `Bearer  ${import.meta.env.VITE_ACCESS_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      getAllTask();
    } catch (error) {
      console.log(error.message);
    }
  };

  // update existing task
  const updateTask = async (id, body) => {
    try {
      const res = await axios.put(updateURL(id), body, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      getAllTask();
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete task
  const deleteTask = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        ` https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=${
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
      getAllTask();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    getAllTask();
  }, []);
  return (
    <GlobalContext.Provider
      value={{ ...state, createTask, updateTask, deleteTask }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default AppContext;
