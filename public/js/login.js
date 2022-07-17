const xhrRequest = (action, { method, body }, onLoad) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => onLoad(xhr);
  xhr.open(method, action);
  xhr.send(body);
};

const response = (xhr) => {
  if (xhr.status === 400 || xhr.status === 401) {
    const messageElement = document.querySelector('#message');
    messageElement.innerText = xhr.response;
    return;
  }
  if (xhr.status === 200) {
    window.location.href = '/guest-book';
  }
};

const login = () => {
  const formElement = document.querySelector('#login-form');
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData);
  xhrRequest('/login', { method: 'POST', body }, response);
};
