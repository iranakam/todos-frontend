import Axios from 'axios';

const session = JSON.parse(localStorage.getItem('todoapp/session'));

if (session) {
  Axios.defaults.headers.common.Authorization = `${session.session.token}`;
}

Axios.setAuthorization = () => {
  const ssession = JSON.parse(localStorage.getItem('todoapp/session'));
  Axios.defaults.headers.common.Authorization = `${ssession.session.token}`;
};

export default Axios;
