const xhrRequest = (action, { method, body }, onLoad) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => onLoad(xhr);
  xhr.open(method, action);
  xhr.send(body);
};

const response = (xhr) => {
  const messageElement = document.querySelector('#message');
  messageElement.innerText = xhr.response;
};

const signup = () => {
  const formElement = document.querySelector('#signup-form');
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData);
  xhrRequest('/signup', { method: 'POST', body }, response);
};
