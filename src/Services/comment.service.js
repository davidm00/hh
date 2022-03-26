// comment service
// req data with Parse
import Parse from "parse";

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
