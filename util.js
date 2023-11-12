export const getResponse = (message) => {
  return {
    SUCCESS: {
      status: 200,
      message,
      isSuccess: true,
    },
    PERMISSION: {
      status: 401,
      message,
      isSuccess: false,
    },
    BAD_REQUEST: {
      status: 400,
      message,
      isSuccess: false,
    },
    NOT_FOUND: {
      status: 404,
      message,
      isSuccess: false,
    },
    GENERAL_ERROR: {
      status: 500,
      message,
      isSuccess: false,
    },
  };
};

export const modals = {
  add_group: "add_group",
  remove: "remove",
};
