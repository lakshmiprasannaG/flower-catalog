const xhrRequest = (action, { method, body }, onLoad) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => onLoad(xhr);
  xhr.open(method, action);
  xhr.send(body);
};

const response = (xhr) => {
  const messageElement = document.querySelector('#message');
  if (xhr.status === 200) {
    messageElement.innerText = 'Registration successful!';
    return;
  }

  console.log(xhr.status, 'status code');

  if (xhr.status === 400 || xhr.status === 409) {
    messageElement.innerText = xhr.response;
    return;
  }
};

const signup = () => {
  const formElement = document.querySelector('#signup-form');
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData);
  xhrRequest('/signup', { method: 'POST', body }, response);
};
