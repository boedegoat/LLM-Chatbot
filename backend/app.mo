import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import User "User";

actor Hacktrilize {
  var users = HashMap.HashMap<Principal, User.User>(0, Principal.equal, Principal.hash);
  stable var usersEntries : [(Principal, User.User)] = [];

  system func preupgrade() {
    usersEntries := Iter.toArray(users.entries());
  };

  system func postupgrade() {
    users := HashMap.fromIter<Principal, User.User>(usersEntries.vals(), 0, Principal.equal, Principal.hash);
    usersEntries := [];
  };

  public shared (msg) func register(username : Text) : async Result.Result<User.User, Text> {
    return User.register(users, msg.caller, username);
  };

  public shared (msg) func login() : async Result.Result<User.User, Text> {
    return User.login(users, msg.caller);
  };
};
