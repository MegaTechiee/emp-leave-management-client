// Need to move this file to any other suitable folder location

// Returns true if NODE_ENV is 'production'
export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};


// Returns true if NODE_ENV is 'development'
export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};
