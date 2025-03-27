import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Array "mo:base/Array";

module User {
    public type Users = HashMap.HashMap<Principal, User>;

    public type User = {
        id : Principal;
        username : Text;
        bio : ?Text;
        followers : [Principal];
        following : [Principal];
        createdAt : Int;
        updatedAt : ?Int;
    };

    public func register(
        users : Users,
        userId : Principal,
        username : Text,
    ) : Result.Result<User, Text> {
        if (checkAnonymous(userId)) {
            return #err("Anonymous principals are not allowed");
        };

        let isUserExists = checkUserExists(users, userId);

        if (isUserExists) {
            return #err("User account already registered");
        };

        let isUsernameAvailable = checkUsername(users, userId, username);

        if (not isUsernameAvailable) {
            return #err("Username '" # username # "' already taken");
        };

        let newUser : User = {
            id = userId;
            username = username;
            bio = null;
            followers = [];
            following = [];
            createdAt = Time.now();
            updatedAt = null;
        };

        users.put(userId, newUser);

        return #ok(newUser);
    };

    public func getUser(users : Users, userId : Principal) : Result.Result<User, Text> {
        if (checkAnonymous(userId)) {
            return #err("Anonymous principals are not allowed");
        };

        switch (users.get(userId)) {
            case (null) { return #err("User not registered") };
            case (?user) { return #ok(user) };
        };
    };

    public type EditProfileData = {
        username : ?Text;
        bio : ?Text;
    };

    public func editProfile(users : Users, userId : Principal, data : EditProfileData) : Result.Result<User, Text> {
        if (checkAnonymous(userId)) {
            return #err("Anonymous principals are not allowed");
        };

        switch (users.get(userId)) {
            case (null) {
                return #err("User not found");
            };
            case (?user) {
                let username = switch (data.username) {
                    case (null) { user.username };
                    case (?newUsername) {
                        if (newUsername != user.username) {
                            let isUsernameAvailable = checkUsername(users, userId, newUsername);
                            if (not isUsernameAvailable) {
                                return #err("Username '" # newUsername # "' already taken");
                            };
                        };
                        newUsername;
                    };
                };

                let bio = switch (data.bio) {
                    case (null) { user.bio };
                    case (?newBio) { ?newBio };
                };

                let updatedUser : User = {
                    user with
                    username = username;
                    bio = bio;
                    updatedAt = ?Time.now();
                };

                users.put(userId, updatedUser);

                return #ok(updatedUser);
            };
        };
    };

    public func toggleFollow(users : Users, userId : Principal, targetUserId : Principal) : Result.Result<Text, Text> {
        if (checkAnonymous(userId)) {
            return #err("Anonymous principals are not allowed");
        };

        if (userId == targetUserId) {
            return #err("You cannot follow/unfollow yourself");
        };

        switch (users.get(userId), users.get(targetUserId)) {
            case (?user, ?targetUser) {
                let isFollowing = Array.indexOf(targetUserId, targetUser.following, Principal.equal);
                if (isFollowing == null) {
                    let updatedUser : User = {
                        user with
                        following = Array.append(user.following, [targetUserId]);
                        updatedAt = ?Time.now();
                    };
                    let updatedTargetUser : User = {
                        user with
                        followers = Array.append(targetUser.followers, [userId]);
                        updatedAt = ?Time.now();
                    };
                    users.put(userId, updatedUser);
                    users.put(targetUserId, updatedTargetUser);
                    return #ok("You are now following " # targetUser.username);
                } else {
                    let updatedUser : User = {
                        user with
                        following = Array.filter(user.following, func(id : Principal) : Bool { id != targetUserId });
                        updatedAt = ?Time.now();

                    };
                    let updatedTargetUser : User = {
                        user with
                        followers = Array.filter(user.followers, func(id : Principal) : Bool { id != userId });
                        updatedAt = ?Time.now();

                    };
                    users.put(userId, updatedUser);
                    users.put(targetUserId, updatedTargetUser);
                    return #ok("You have unfollowed " # targetUser.username);
                };
            };
            case (null, _) { return #err("Current user not registered") };
            case (_, null) { return #err("Target user not registered") };
        };
    };

    private func checkAnonymous(userId : Principal) : Bool {
        return Principal.isAnonymous(userId);
    };

    private func checkUsername(users : Users, userId : Principal, username : Text) : Bool {
        for ((id, user) in users.entries()) {
            if (Text.equal(user.username, username) and id != userId) {
                return false;
            };
        };
        return true;
    };

    private func checkUserExists(users : Users, userId : Principal) : Bool {
        switch (users.get(userId)) {
            case (null) { return false };
            case (?user) { return true };
        };
    };
};
