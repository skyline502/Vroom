import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


function UsersList() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [display, setDisplay] = useState(false);
  let history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (showResult) {
      setDisplay('show-results');
    } else {
      setDisplay(false);
    }
  },[showResult])

  let results = users.filter(user => user.username.toLowerCase().startsWith(query.toLowerCase()));

  const goToResult = (id) => {
    setQuery('');
    history.push(`/users/${id}`);
    setShowResult(!showResult);
  }

  return (
    <div className='search-bar'>
      <input
        type='text'
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder='...search'
        onClick={() => setShowResult(!showResult)}
      />
      <div className={`results-box ${display}`}>
        {results?.map(result => (
          <div key={result.id}>
            <div className='result-user-info' onClick={() => goToResult(result.id)}>
              <img src={result.profile_url} alt='profile' />
              {result.username}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsersList;
