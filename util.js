export const getResponse = (message, data = "") => {
  return {
    SUCCESS: {
      status: 200,
      message,
      isSuccess: true,
      data,
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
  }
}

export const modals = {
  add_group: "add_group",
  edit_group: "edit_group",
  add_expense: "add_expense",
  edit_user: "edit_user",
  remove_user: "remove_user",
  success_message: "success_message",
  email_and_pass: "email_and_pass",
  phone: "phone",
}

export const defaultUserImageUrl = "user/1/profile.png"
//
export const getUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION
}
