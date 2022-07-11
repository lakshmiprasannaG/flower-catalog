const createGuestBook = (comments) => {
  const commentList = [];
  commentList.push(`
  <th>
  <th> date </th>
  <th> name </th>
  <th> comment </th>
  </th>`
  );

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

const xhrRequest = (method, action, body, onLoad) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => onLoad(xhr);
  xhr.open(method, action);
  xhr.send(body.toString());
};

const guestBook = () => {
  const formElement = document.querySelector('#submit');
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData).toString();

  xhrRequest('POST', '/add-guest', body, (xhr) => {
    if (xhr.status === 200) {
      const commentList = createGuestBook(JSON.parse(xhr.response));
      const commentsElement = document.querySelector('#comments');
      commentsElement.innerHTML = commentList;
    }
  });
};
