// post service
// req data with Parse
import Parse from "parse";

// GET ALL POSTS FOR A COMMUNITY
export const getAllPosts = async (commId) => {
  console.log("CommunityID in getALL: ", commId);
  const Post = Parse.Object.extend("Post");
  const query = new Parse.Query(Post);
  await query.equalTo("community", {
    __type: "Pointer",
    className: "Community",
    objectId: commId,
  });
  return await query.find().then((res) => {
    console.log("getAllPosts result: ", res);
    return res.map((post) => {
      return {
        id: post.id,
        ...post.attributes,
      };
    });
  });
};

// CREATE NEW POST
export const createNewPost = async (currentUser, commId, data) => {
  console.log("cur user:", currentUser);
  console.log("commId:", commId);
  console.log("skfosnv: ", data);
  const Post = Parse.Object.extend("Post");
  const newPost = new Post();
  newPost.set("body", data.body);
  if (data.image) {
    let parseFile = new Parse.File(data.image.name, data.image);
    newPost.set("image", parseFile);
  }
  newPost.set("community", {
    __type: "Pointer",
    className: "Community",
    objectId: commId,
  });
  newPost.set("authorLastName", currentUser.get("lastName"));
  newPost.set("authorFirstName", currentUser.get("firstName"));
  newPost.set("createdBy", {
    __type: "Pointer",
    className: "_User",
    objectId: currentUser.id,
  });

  await newPost.save().then(
    (newPost) => {
      // Execute any logic that should take place after the object is saved.
      console.log("New object created with objectId: " + newPost.id);
    },
    (error) => {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      console.log(
        "Failed to create new object, with error code: " + error.message
      );
    }
  );
};

// DELETE POST
export const deletePost = async (postId) => {
  const Post = Parse.Object.extend("Post");
  const query = new Parse.Query(Post);
  return await query.get(postId).then((res) => {
    // return Lesson object with objectId: id
    console.log("THE ANSW: ", res);
    res.destroy()
    .then((res) => {
      console.log("deleted successfully: ", res)
    })
    .catch((e) => {
      console.log("Error: ", e);
    });
    // return result;
  });
};
