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

  let results = users.filter(user => user.username.toLowerCase().includes(query.toLowerCase()));

  const goToResult = (id) => {
    setQuery('');
    history.push(`/users/${id}`);
    setShowResult(!showResult);
  }

  const onSubmit = (e) => {
    if (e.keyCode === 13) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }

  const cancelSearch = () => {
    setShowResult(false);
    setQuery('');
  }

  return (
    <div className='search-bar'>
      <input
        type='text'
        id='search'
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder='...search'
        onKeyDown={onSubmit}
      />
      <div className='search-cancel'>{!showResult? <label htmlFor='search'><i className="fas fa-search"></i></label>:<i onClick={cancelSearch} className="fas fa-window-close"></i>}</div>
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
