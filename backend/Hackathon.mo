import Result "mo:base/Result";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import Array "mo:base/Array";
import Order "mo:base/Order";
import Int "mo:base/Int";
import Types "Types";
import Utils "Utils";

module Hackathon {
    public func postHackathon(
        users : Types.Users,
        userId : Principal,
        hackathons : Types.Hackathons,
        data : Types.PostHackathonData,
    ) : Result.Result<Types.Hackathon, Text> {
        let isUserExists = Utils.checkUserExists(users, userId);

        if (not isUserExists) {
            return #err("User must registered");
        };

        let id = Utils.generateUUID(userId, data.title);

        let newHackathon : Types.Hackathon = {
            id = id;
            title = data.title;
            description = data.description;
            startDate = data.startDate;
            endDate = data.endDate;
            totalPrizePool = data.totalPrizePool;
            maximumTeamSize = data.maximumTeamSize;
            teams = [];
            createdBy = userId;
            createdAt = Time.now();
            updatedAt = null;
        };

        hackathons.put(id, newHackathon);
        return #ok(newHackathon);
    };

    public func getHackathons(hackathons : Types.Hackathons) : Result.Result<[Types.Hackathon], Text> {
        let array = Buffer.Buffer<Types.Hackathon>(0);
        for (hackathon in hackathons.vals()) {
            array.add(hackathon);
        };
        let sorted = Array.sort(
            Buffer.toArray(array),
            func(a : Types.Hackathon, b : Types.Hackathon) : Order.Order {
                Int.compare(b.createdAt, a.createdAt);
            },
        );
        return #ok(sorted);
    };

    public func getHackathonDetail(hackathons : Types.Hackathons, hackathonId : Text) : Result.Result<Types.Hackathon, Text> {
        switch (hackathons.get(hackathonId)) {
            case (null) { return #err("Hackathon not found") };
            case (?hackathon) { return #ok(hackathon) };
        };
    };
};
