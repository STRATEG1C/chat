exports.handler = (event, context, callback) => {
  const { request: { codeParameter } } = event

  event.response.emailSubject = "Welcome to the service";
  event.response.emailMessage = "Thank you for signing up. " + codeParameter + " is your verification code";
  callback(null, event);
};