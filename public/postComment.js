const writeComments = (comments) => {
  const commentList = [];
  comments.forEach(({ date, name, comment }) => {
    commentList.push(`
    <tr>
    <td> ${date} </td>
    <td> ${name} </td>
    <td> ${comment} </td>
    </tr>`
    )
  });
  return commentList.join('');
};

const xhrRequest = (action, { method, body }, onLoad) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => onLoad(xhr);
  xhr.open(method, action);
  // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send(body);
};

const displayGuestBook = (xhr) => {
  if (xhr.status === 200) {
    xhrRequest('/api/comments', { method: 'GET' }, (xhr) => {
      const commentList = writeComments(JSON.parse(xhr.response));
      const commentsElement = document.querySelector('#commentList');
      commentsElement.innerHTML = commentList;
    });
  }
};

const guestBook = () => {
  const formElement = document.querySelector('#comment-form');
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData).toString();

  xhrRequest('/add-guest', { method: 'POST', body }, (xhr) => {
    displayGuestBook(xhr);
  });
};
