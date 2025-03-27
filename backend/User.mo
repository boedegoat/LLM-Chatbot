import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Types "Types";
import Utils "Utils";

module User {
    public func register(
        users : Types.Users,
        userId : Principal,
        username : Text,
    ) : Result.Result<Types.User, Text> {
        if (Utils.checkAnonymous(userId)) {
            return #err("Anonymous principals are not allowed");
        };

        let isUserExists = Utils.checkUserExists(users, userId);

        if (isUserExists) {
            return #err("User account already registered");
        };

        let isUsernameAvailable = Utils.checkUsername(users, userId, username);

        if (not isUsernameAvailable) {
            return #err("Username '" # username # "' already taken");
        };

        let newUser : Types.User = {
            id = userId;
            username = username;
            bio = null;
            followers = [];
            following = [];
            teams = [];
            posts = [];
            createdAt = Time.now();
            updatedAt = null;
        };

        users.put(userId, newUser);

        return #ok(newUser);
    };

    public func getUser(users : Types.Users, userId : Principal) : Result.Result<Types.User, Text> {
        if (Utils.checkAnonymous(userId)) {
            return #err("Anonymous principals are not allowed");
        };

        switch (users.get(userId)) {
            case (null) { return #err("User not registered") };
            case (?user) { return #ok(user) };
        };
    };

    public func editProfile(users : Types.Users, userId : Principal, data : Types.EditProfileData) : Result.Result<Types.User, Text> {
        switch (users.get(userId)) {
            case (null) {
                return #err("User not found");
            };
            case (?user) {
                let username = switch (data.username) {
                    case (null) { user.username };
                    case (?newUsername) {
                        if (newUsername != user.username) {
                            let isUsernameAvailable = Utils.checkUsername(users, userId, newUsername);
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

                let updatedUser : Types.User = {
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

    public func toggleFollow(users : Types.Users, userId : Principal, targetUserId : Principal) : Result.Result<Text, Text> {
        if (userId == targetUserId) {
            return #err("You cannot follow/unfollow yourself");
        };

        switch (users.get(userId), users.get(targetUserId)) {
            case (?user, ?targetUser) {
                let isFollowing = Array.indexOf(targetUserId, targetUser.following, Principal.equal);
                if (isFollowing == null) {
                    let updatedUser : Types.User = {
                        user with
                        following = Array.append(user.following, [targetUserId]);
                        updatedAt = ?Time.now();
                    };
                    let updatedTargetUser : Types.User = {
                        user with
                        followers = Array.append(targetUser.followers, [userId]);
                        updatedAt = ?Time.now();
                    };
                    users.put(userId, updatedUser);
                    users.put(targetUserId, updatedTargetUser);
                    return #ok("You are now following " # targetUser.username);
                } else {
                    let updatedUser : Types.User = {
                        user with
                        following = Array.filter(user.following, func(id : Principal) : Bool { id != targetUserId });
                        updatedAt = ?Time.now();

                    };
                    let updatedTargetUser : Types.User = {
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
};
