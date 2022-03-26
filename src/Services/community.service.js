// community service
// req data with Parse
import Parse from "parse";

// READ operation - get all group members from the Group relation
export const getAllCommunities = async (userId) => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);
  query.equalTo("objectId", userId);
  const user = await query.find();
  console.log("user in getAllCommunities: ", user);
  const relation = user[0].relation("communities");
  const communities = await relation.query().find({
    success: function (persons) {
      return persons;
    }
  })
  console.log("communities: ", communities);
  return communities.map((comm) => {
    console.log("Community name: ", comm.attributes.name);
    // May return more here in the future, such as an image url, etc.
    return {
      id: comm.id,
      ...comm.attributes
    };
  });
};
