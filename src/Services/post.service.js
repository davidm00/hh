// post service
// req data with Parse
import Parse from "parse";

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
