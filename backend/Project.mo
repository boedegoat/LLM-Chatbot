import Types "Types";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Utils "Utils";

module Project {
    public func postProject(
        users : Types.Users,
        userId : Principal,
        teams : Types.Teams,
        teamId : Text,
        projects : Types.Projects,
        data : Types.PostProjectData,
    ) : Result.Result<Types.Project, Text> {
        let isRegistered = Utils.checkUserExists(users, userId);

        if (not isRegistered) {
            return #err("You must register to use this feature");
        };

        switch (teams.get(teamId)) {
            case (null) { return #err("Team not found") };
            case (?team) {
                let isAlreadyJoin = Array.indexOf(userId, team.members, Principal.equal);

                if (isAlreadyJoin == null) {
                    return #err("You are not member of this team");
                };

                let id = Utils.generateUUID(userId, data.title);

                let newProject : Types.Project = {
                    id = id;
                    title = data.title;
                    description = data.description;
                    repositoryLink = data.repositoryLink;
                    createdAt = Time.now();
                    updatedAt = null;
                };

                projects.put(id, newProject);

                let updatedTeam : Types.Team = {
                    team with
                    projectId = ?id;
                    updatedAt = ?Time.now();
                };

                teams.put(teamId, updatedTeam);

                return #ok(newProject);
            };
        };
    };
};
