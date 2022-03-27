// community service
// req data with Parse
import Parse from "parse";
import { async } from "parse/lib/browser/Storage";

// CREATE NEW RELATION
export const joinCommunity = async (commId) => {
  let user = Parse.User.current();
  const Community = Parse.Object.extend("Community");
  let query = new Parse.Query(Community);
  let community;
  await query.get(commId).then((res) => {
    // return Lesson object with objectId: id
    console.log("THE ANSW: ", res);
    community = res;
    // return result;
  });
  let communityRelation = community.relation("users");
  let userQuery = communityRelation.query();
  userQuery
    .get(user.id)
    .then((res) => {
      // return Lesson object with objectId: id
      console.log("YES FOUND: ", res);
      // return result;
    })
    .then(() => {
      console.log("Already in query");
    })
    .catch(() => {
      console.log("comm", community);
      let userRelation = user.relation("communities");
      userRelation.add(community);
      user.save();
      communityRelation.add(user);
      community.save();
    });
};

// DELETE RELATION
export const leaveCommunity = async (commId) => {
  let user = Parse.User.current();
  const Community = Parse.Object.extend("Community");
  let query = new Parse.Query(Community);
  let community;
  await query.get(commId).then((res) => {
    // return Lesson object with objectId: id
    console.log("THE ANSW: ", res);
    community = res;
    // return result;
  });
  let communityRelation = community.relation("users");
  let userQuery = communityRelation.query();
  userQuery
    .get(user.id)
    .then((res) => {
      // return Lesson object with objectId: id
      console.log("YES FOUND: ", res);
      // return result;
    })
    .then(() => {
      console.log("comm", community);
      let userRelation = user.relation("communities");
      userRelation.remove(community);
      user.save();
      communityRelation.remove(user);
      community.save();
    })
    .catch(() => {
      console.log("Not in query");
    });
};

// READ operation - get all groups in Parse class Community
export const getAllComm = async () => {
  const Community = Parse.Object.extend("Community");
  const query = new Parse.Query(Community);
  return await query.find().then((results) => {
    console.log("getAllComm result: ", results);
    // returns array of Group objects
    return results;
  });
};

// READ operation - get all users from the relation
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
    },
  });
  console.log("communities: ", communities);
  return communities.map((comm) => {
    console.log("Community name: ", comm.attributes.name);
    // May return more here in the future, such as an image url, etc.
    return {
      id: comm.id,
      ...comm.attributes,
    };
  });
};
