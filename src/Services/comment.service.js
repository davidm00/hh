// comment service
// req data with Parse
import Parse from "parse";

// GET ALL COMMENTS UNDER A SPECIFIC POST
export const getAllComments = async (postId) => {
  console.log("PostID in getALL: ", postId);
  const Comment = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comment);
  await query.equalTo("post", {
    __type: "Pointer",
    className: "Post",
    objectId: postId,
  });
  return await query.find().then((res) => {
    console.log("getAllComments result: ", res);
    return res.map((comment) => {
      return {
        id: comment.id,
        ...comment.attributes,
      };
    });
  });
};

// CREATE NEW COMMENT
export const createNewComment = async (currentUser, postId, data) => {
  console.log("cur user:", currentUser);
  console.log("commId:", postId);
  console.log("skfosnv: ", data);
  const Comment = Parse.Object.extend("Comment");
  const newComment = new Comment();
  newComment.set("body", data.body);
  newComment.set("post", {
    __type: "Pointer",
    className: "Post",
    objectId: postId,
  });
  newComment.set("authorLastName", currentUser.get("lastName"));
  newComment.set("authorFirstName", currentUser.get("firstName"));
  newComment.set("createdBy", {
    __type: "Pointer",
    className: "_User",
    objectId: currentUser.id,
  });

  await newComment.save().then(
    (newComment) => {
      // Execute any logic that should take place after the object is saved.
      console.log("New object created with objectId: " + newComment.id);
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

// DELETE COMMENT
export const deleteComment = async (commentId) => {
  const Comment = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comment);
  return await query.get(commentId).then((res) => {
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