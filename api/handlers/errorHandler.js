export const errorHandler = (statusCode, message, name) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  error.name = name;
  return error;
};
