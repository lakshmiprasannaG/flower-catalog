const createNextHandler = (handlers) => {
  let index = -1;
  const next = (request, response, next) => {
    index++;
    if (handlers[index]) {
      handlers[index](request, response, () => next(request, response, next));
    }
  };
  return next;
};

const router = (handlers) => {
  return (request, response) => {
    const next = createNextHandler(handlers);
    next(request, response, () => next(request, response, next));
  };
};

module.exports = { router };
