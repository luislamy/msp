const users = [
  {
    username: "admin",
    email: "admin@example.com",
    phone: "+1111111111",
    password: "admin123",
    permissions: {},
    preferences: {},
  },
  {
    username: "guest",
    email: "guest@example.com",
    phone: "+2222222222",
    password: "guest123",
    permissions: {},
    preferences: {},
  }
];

export const getUsers = () => users;

export const addUser = (user) => {
  users.push(user);
};

export const findUser = (identifier, password) => {
  return users.find(
    (user) =>
      (user.email === identifier || user.phone === identifier) &&
      user.password === password
  );
};

export const findUserByIdentifier = (method, identifier) => {
  if (method === "email") {
    return users.find((user) => user.email === identifier);
  } else if (method === "phone") {
    return users.find((user) => user.phone === identifier);
  } else {
    throw new Error(`Invalid method '${method}' for finding user`);
  }
};;
