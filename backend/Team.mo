import Types "Types";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Order "mo:base/Order";
import Int "mo:base/Int";
import Utils "Utils";

module Team {
    public func registerTeam(
        users : Types.Users,
        userId : Principal,
        teams : Types.Teams,
        hackathons : Types.Hackathons,
        hackathonId : Text,
        data : Types.RegisterTeamData,
    ) : Result.Result<Types.Team, Text> {
        switch (users.get(userId)) {
            case (null) { return #err("You must register to use this feature") };
            case (?user) {
                switch (hackathons.get(hackathonId)) {
                    case (null) { return #err("Hackathon not found") };
                    case (?hackathon) {
                        let id = Utils.generateUUID(userId, data.name);

                        let newTeam : Types.Team = {
                            id = id;
                            name = data.name;
                            bio = data.bio;
                            members = [userId];
                            requestMembers = [];
                            maximumTeamSize = hackathon.maximumTeamSize;
                            isOpen = true;
                            projectId = null;
                            hackathonId = hackathonId;
                            createdAt = Time.now();
                            updatedAt = null;
                        };

                        teams.put(id, newTeam);

                        let updatedHackathon : Types.Hackathon = {
                            hackathon with
                            teams = Array.append(hackathon.teams, [id]);
                            updatedAt = ?Time.now();
                        };

                        hackathons.put(hackathon.id, updatedHackathon);

                        let updatedUser : Types.User = {
                            user with
                            teams = Array.append(user.teams, [id]);
                            updatedAt = ?Time.now();
                        };

                        users.put(userId, updatedUser);

                        return #ok(newTeam);
                    };
                };
            };
        };
    };

    public func joinTeam(users : Types.Users, userId : Principal, teams : Types.Teams, teamId : Text) : Result.Result<Text, Text> {
        let isRegistered = Utils.checkUserExists(users, userId);

        if (not isRegistered) {
            return #err("You must register to use this feature");
        };

        switch (teams.get(teamId)) {
            case (null) { return #err("Team not found") };
            case (?team) {
                let isAlreadyJoin = Array.indexOf(userId, team.members, Principal.equal);

                if (isAlreadyJoin != null) {
                    return #err("You already join this team");
                };

                let isFull = team.members.size() == team.maximumTeamSize;

                if (isFull) { return #err("Team already full") };

                let updatedTeam : Types.Team = {
                    team with
                    requestMembers = Array.append(team.members, [userId]);
                    updatedAt = ?Time.now();
                };

                teams.put(teamId, updatedTeam);

                return #ok("You have successfully join " # team.name);
            };
        };
    };

    public func approveMember(
        users : Types.Users,
        userId : Principal,
        teams : Types.Teams,
        teamId : Text,
        targetUserId : Principal,
    ) : Result.Result<Text, Text> {
        let isRegistered = Utils.checkUserExists(users, userId);

        if (not isRegistered) {
            return #err("You must register to use this feature");
        };

        switch (teams.get(teamId)) {
            case (null) { return #err("Team not found") };
            case (?team) {
                let userIndex = Array.indexOf(userId, team.members, Principal.equal);

                if (userIndex != ?0) {
                    return #err("You are not the creator of this team");
                };

                let isFull = team.members.size() == team.maximumTeamSize;

                if (isFull) { return #err("Team already full") };

                let targetUserIndex = Array.indexOf(targetUserId, team.requestMembers, Principal.equal);

                if (targetUserIndex == null) {
                    return #err("Target user id not exist in request members");
                };

                let updatedTeam : Types.Team = {
                    team with
                    members = Array.append(team.members, [targetUserId]);
                    requestMembers = Array.filter(team.requestMembers, func(id : Principal) : Bool { id != targetUserId });
                    updatedAt = ?Time.now();
                };

                teams.put(teamId, updatedTeam);

                return #ok("You have successfully join " # team.name);
            };
        };
    };

    public func getTeamDetail(
        teams : Types.Teams,
        teamId : Text,
    ) : Result.Result<Types.Team, Text> {
        switch (teams.get(teamId)) {
            case (null) { return #err("Team not found") };
            case (?team) { return #ok(team) };
        };
    };

    public func getTeams(
        teams : Types.Teams
    ) : Result.Result<[Types.Team], Text> {

        let array = Buffer.Buffer<Types.Team>(0);
        for (team in teams.vals()) {
            array.add(team);
        };
        let sorted = Array.sort(
            Buffer.toArray(array),
            func(a : Types.Team, b : Types.Team) : Order.Order {
                Int.compare(b.createdAt, a.createdAt);
            },
        );
        return #ok(sorted);
    };
};
