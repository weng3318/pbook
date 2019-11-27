import React from 'react'

export function Search(props) {
  const { data, changeHandler, s_result } = props
  return (
    <div>
      <input
        value={data.text}
        onChange={changeHandler}
        className="reviews_search"
        type="search"
        placeholder="搜尋書名"
      />
      {data.getData ? (
        <ul className="reviews_search_result">
          {s_result.map(res => (
            <li>
              <a
                target=" _blank "
                href={`http://localhost:3000/book_reviews/${res.sid}`}
              >
                {res.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  )
}

export default Search
