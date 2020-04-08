import { v4 as uuid } from "uuid";

export const defaultUser = {
  id: uuid(),
  username: "enrique.png",
  name: "Enrique Sotomayor",
  profile_image:
  "https://scontent-sea1-1.cdninstagram.com/v/t51.2885-19/s320x320/72873649_496638094222254_1079803740841574400_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_ohc=t1gSAoH8q4EAX-D70LL&oh=6b37dcf73305f88e81a6bb4112ad46c9&oe=5EB61702"
};

export function getDefaultUser() {
  return {
    id: uuid(),
    username: "username",
    name: "name",
    profile_image:
    "https://scontent-sea1-1.cdninstagram.com/v/t51.2885-19/s320x320/72873649_496638094222254_1079803740841574400_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_ohc=t1gSAoH8q4EAX-D70LL&oh=6b37dcf73305f88e81a6bb4112ad46c9&oe=5EB61702"  
  };
}

export const defaultPost = {
  id: uuid(),
  likes: 10,
  caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
  user: defaultUser,
  media:
    "https://scontent-ort2-2.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/80126161_2456912044637768_8188145638093587415_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_cat=108&_nc_ohc=GAkCBeSLLnwAX_Xn25U&oh=58af570f5ad051b24583c388b946784a&oe=5EA44484",
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
      "https://scontent-ort2-2.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/80126161_2456912044637768_8188145638093587415_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_cat=108&_nc_ohc=GAkCBeSLLnwAX_Xn25U&oh=58af570f5ad051b24583c388b946784a&oe=5EA44484",
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
  profile_image:
  "https://scontent-sea1-1.cdninstagram.com/v/t51.2885-19/s320x320/72873649_496638094222254_1079803740841574400_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_ohc=t1gSAoH8q4EAX-D70LL&oh=6b37dcf73305f88e81a6bb4112ad46c9&oe=5EB61702",
  website: "https://sotomaque.github.io/personal",
  email: "enrique@gmail.com",
  bio: "death, taxes, and the law of large numbers",
  phone_number: "817-555-1244",
  posts: Array.from({ length: 10 }, () => getDefaultPost()),
  followers: [defaultUser],
  following: [defaultUser]
};
