import * as React from 'react';
import './style.css';
import { useState } from 'react';
import { data } from './Users.js';

export default function App() {
  const [users, setUsers] = useState(data);
  const [sorted, setSorted] = useState({ reversed: false, type: '' });
  const [value, setValue] = useState('');

  const search = (searchVal) => {
    const usersCopy = data.filter((user) => {
      const fullName = user.first_name + '' + user.last_name;
      return fullName.toLowerCase().includes(searchVal.toLowerCase());
    });
    setUsers(usersCopy);
    setValue(searchVal);
  };

  const getUsers = () => {
    return users.map((user) => {
      return (
        <tr>
          <td>{user.id}</td>
          <td>{`${user.first_name} ${user.last_name}`}</td>
          <td>{user.email}</td>
          <td>{user.gender}</td>
        </tr>
      );
    });
  };
  const idSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sorted.reversed) {
        return b.id - a.id;
      }
      return a.id - b.id;
    });
    setUsers(sortedUsers);
    setSorted({ reversed: !sorted.reversed, type: 'id' });
  };
  const nameSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const fullNameA = `${a.first_name} ${a.last_name}`;
      const fullNameB = `${b.first_name} ${b.last_name}`;
      if (sorted.reversed) {
        return fullNameB.localeCompare(fullNameA);
      }
      return fullNameA.localeCompare(fullNameB);
    });
    setUsers(sortedUsers);
    setSorted({ reversed: !sorted.reversed, type: 'name' });
  };

  const emailSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sorted.reversed) {
        return a.email.localeCompare(b.email);
      }
      return b.email.localeCompare(a.email);
    });
    setUsers(sortedUsers);
    setSorted({ reversed: !sorted.reversed, type: 'email' });
  };
  const genderSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sorted.reversed) {
        if (a.gender > b.gender) return 1;
        if (a.gender < b.gender) return -1;
      } else {
        if (a.gender > b.gender) return -1;
        if (a.gender < b.gender) return 1;
      }
      if (a.gender == b.gender) return 0;
    });
    setUsers(sortedUsers);
    setSorted({ reversed: !sorted.reversed, type: 'gender' });
  };
  return (
    <div>
      <input value={value} onChange={(e) => search(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th onClick={idSort}>id</th>
            <th onClick={nameSort}>name</th>
            <th onClick={emailSort}>email</th>
            <th onClick={genderSort}>gender</th>
          </tr>
        </thead>
        <tbody>{getUsers()}</tbody>
      </table>
    </div>
  );
}
