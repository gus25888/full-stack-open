export const uniqueData = (a) => {
  let seen = new Set()
  return a.filter((item) => {
    let k = item.title
    return seen.has(k) ? false : seen.add(k)
  })
}

export const updateCache = (cache, query, addedBook) => {
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueData(allBooks.concat(addedBook)),
    }
  })
}