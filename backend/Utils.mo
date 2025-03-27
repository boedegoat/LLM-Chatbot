import Types "Types";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Nat32 "mo:base/Nat32";
import Time "mo:base/Time";

module Utils {
    public func checkAnonymous(userId : Principal) : Bool {
        return Principal.isAnonymous(userId);
    };

    public func checkUsername(users : Types.Users, userId : Principal, username : Text) : Bool {
        for ((id, user) in users.entries()) {
            if (Text.equal(user.username, username) and id != userId) {
                return false;
            };
        };
        return true;
    };

    public func checkUserExists(users : Types.Users, userId : Principal) : Bool {
        switch (users.get(userId)) {
            case (null) { return false };
            case (?user) { return true };
        };
    };

    public func generateUUID(userPrincipal : Principal, content : Text) : Text {
        let principalText = Principal.toText(userPrincipal);
        let timestamp = Int.toText(Time.now());
        let contentHash = Nat32.toText(Text.hash(content));

        let combined = principalText # timestamp # contentHash;
        let finalHash = Text.hash(combined);
        return Nat32.toText(finalHash);
    };
};
