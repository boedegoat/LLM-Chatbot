import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";

module User {
    public type Users = HashMap.HashMap<Principal, User>;

    public type User = {
        id : Principal;
        username : Text;
        bio : ?Text;
        followers : [Principal];
        following : [Principal];
        createdAt : Int;
    };

    public func register(
        users : Users,
        userId : Principal,
        username : Text,
    ) : Result.Result<User, Text> {
        for ((id, user) in users.entries()) {
            if (Text.equal(user.username, username)) {
                return #err("Username '" # username # "' already taken");
            };
        };

        let newUser : User = {
            id = userId;
            username = username;
            bio = null;
            followers = [];
            following = [];
            createdAt = Time.now();
        };

        users.put(userId, newUser);

        #ok(newUser);
    };

    public func login(
        users : Users,
        userId : Principal,
    ) : Result.Result<User, Text> {
        switch (users.get(userId)) {
            case (null) {
                #err("User not registered");
            };
            case (?user) {
                #ok(user);
            };
        };
    };

};
