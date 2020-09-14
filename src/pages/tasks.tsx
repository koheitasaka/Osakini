import React from 'react';
import Layout from '../components/Layout/Layout';
import { auth, functions } from '../config';

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);

  const fetchTasks = async () => {
    const fetchTasks = functions.httpsCallable('fetchTasks');
    const result = await fetchTasks();
    return result.data;
  };

  // React.useEffect(() => {
  // let unmounted = false;

  // (async () => {
  //   const result = await fetchTasks();

  //   if (!unmounted) {
  //     setTasks(result);
  //   }
  // })();

  // return () => {
  //   unmounted = true;
  // };
  // });

  return (
    <Layout>
      <div>
        <h2>Tasks</h2>
      </div>
    </Layout>
  );
};

export default Tasks;
