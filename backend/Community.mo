import Types "Types";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Order "mo:base/Order";
import Int "mo:base/Int";
import Utils "Utils";

module Community {
    public func postFeed(
        users : Types.Users,
        userId : Principal,
        feeds : Types.Feeds,
        data : Types.PostFeedData,
    ) : Result.Result<Types.Feed, Text> {
        switch (users.get(userId)) {
            case (null) { return #err("User not registered") };
            case (?user) {
                let id = Utils.generateUUID(userId, data.content);

                let newFeed : Types.Feed = {
                    id = id;
                    content = data.content;
                    likes = [];
                    comments = [];
                    userId = userId;
                    createdAt = Time.now();
                    updatedAt = null;
                };

                feeds.put(id, newFeed);

                let updatedUser : Types.User = {
                    user with
                    posts = Array.append(user.posts, [id]);
                    updatedAt = ?Time.now();
                };

                users.put(userId, updatedUser);

                return #ok(newFeed);
            };
        };
    };

    public func getFeeds(feeds : Types.Feeds) : Result.Result<[Types.Feed], Text> {
        let array = Buffer.Buffer<Types.Feed>(0);
        for (feed in feeds.vals()) {
            array.add(feed);
        };
        let sorted = Array.sort(
            Buffer.toArray(array),
            func(a : Types.Feed, b : Types.Feed) : Order.Order {
                Int.compare(b.createdAt, a.createdAt);
            },
        );
        return #ok(sorted);
    };

    public func toggleLikeFeed(
        users : Types.Users,
        userId : Principal,
        feeds : Types.Feeds,
        feedId : Text,
    ) : Result.Result<Text, Text> {
        let isUserExists = Utils.checkUserExists(users, userId);

        if (not isUserExists) {
            return #err("User must registered");
        };

        switch (feeds.get(feedId)) {
            case (null) { return #err("Feed not found") };
            case (?feed) {
                if (userId == feed.userId) {
                    return #err("You cannot like your own post");
                };

                let isLiking = Array.indexOf(userId, feed.likes, Principal.equal);
                if (isLiking == null) {
                    let updatedFeed : Types.Feed = {
                        feed with
                        likes = Array.append(feed.likes, [userId]);
                        updatedAt = ?Time.now();
                    };
                    feeds.put(feed.id, updatedFeed);
                    return #ok("You are now like this post");
                } else {
                    let updatedFeed : Types.Feed = {
                        feed with
                        likes = Array.filter(feed.likes, func(id : Principal) : Bool { id != userId });
                        updatedAt = ?Time.now();
                    };
                    feeds.put(feed.id, updatedFeed);
                    return #ok("You are now unlike this post");
                };
            };
        };
    };

};
