export const getReactions = fetch(
  "https://artful-iudex.herokuapp.com/reactions"
).then((res) => res.json());

export const getContentReactions = (content_id, user_id, reaction_id) =>
  fetch(
    `https://artful-iudex.herokuapp.com/user_content_reactions${
      content_id ? `?content_id=${content_id}` : ""
    }${user_id ? `?user_id=${user_id}` : ""}${
      reaction_id ? `?reaction_id=${reaction_id}` : ""
    }`
  ).then((res) => res.json());

export const postContentReactions = ({ content_id, user_id, reaction_id }) =>
  fetch("https://artful-iudex.herokuapp.com/user_content_reactions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content_id,
      user_id,
      reaction_id,
    }),
  }).then((res) => res.json());

export const getUsers = fetch(
  "https://artful-iudex.herokuapp.com/users"
).then((res) => res.json());
