import { v4 as uuid } from "uuid";

export const defaultUser = {
  id: uuid(),
  username: "enrique.png",
  name: "Enrique Sotomayor",
  profile_image:
  "https://source.unsplash.com/featured/?man"
};

export function getDefaultUser() {
  return {
    id: uuid(),
    username: "username",
    name: "name",
    profile_image:
    "https://source.unsplash.com/featured/?man"  
  };
}

export const defaultPost = {
  id: uuid(),
  likes: 10,
  caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
  user: defaultUser,
  media:
    "https://source.unsplash.com/random",
  comments: [],
  created_at: "2020-02-28T03:08:14.522421+00:00"
};

export function getDefaultPost() {
  return {
    id: uuid(),
    likes: 10,
    caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
    user: defaultUser,
    media:
      "https://source.unsplash.com/random",
    comments: [],
    created_at: "2020-02-28T03:08:14.522421+00:00"
  };
}

export const defaultNotifications = [
  {
    id: uuid(),
    type: "follow",
    user: defaultUser,
    created_at: "2020-02-29T03:08:14.522421+00:00"
  },
  {
    id: uuid(),
    type: "like",
    user: defaultUser,
    post: defaultPost,
    created_at: "2020-02-29T03:08:14.522421+00:00"
  }
];

export const defaultCurrentUser = {
  id: uuid(),
  username: "enrique.png",
  name: "Enrique Sotomayor",
  profile_image: "https://source.unsplash.com/featured/?man",
  website: "https://sotomaque.github.io/personal",
  email: "enrique@gmail.com",
  bio: "death, taxes, and the law of large numbers",
  phone_number: "817-555-1244",
  posts: Array.from({ length: 10 }, () => getDefaultPost()),
  followers: [defaultUser],
  following: [defaultUser]
};
