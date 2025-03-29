import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import LLM "mo:llm";
import Types "Types";
import User "User";
import Hackathon "Hackathon";
import Team "Team";
import Project "Project";
import Community "Community";
import AI "AI";

actor Hacktrilize {
  var users = HashMap.HashMap<Principal, Types.User>(0, Principal.equal, Principal.hash);
  stable var usersEntries : [(Principal, Types.User)] = [];
  var hackathons = HashMap.HashMap<Text, Types.Hackathon>(0, Text.equal, Text.hash);
  stable var hackathonsEntries : [(Text, Types.Hackathon)] = [];
  var teams = HashMap.HashMap<Text, Types.Team>(0, Text.equal, Text.hash);
  stable var teamsEntries : [(Text, Types.Team)] = [];
  var projects = HashMap.HashMap<Text, Types.Project>(0, Text.equal, Text.hash);
  stable var projectsEntries : [(Text, Types.Project)] = [];
  var feeds = HashMap.HashMap<Text, Types.Feed>(0, Text.equal, Text.hash);
  stable var feedsEntries : [(Text, Types.Feed)] = [];

  system func preupgrade() {
    usersEntries := Iter.toArray(users.entries());
    hackathonsEntries := Iter.toArray(hackathons.entries());
    teamsEntries := Iter.toArray(teams.entries());
    projectsEntries := Iter.toArray(projects.entries());
    feedsEntries := Iter.toArray(feeds.entries());
  };

  system func postupgrade() {
    users := HashMap.fromIter<Principal, Types.User>(usersEntries.vals(), 0, Principal.equal, Principal.hash);
    usersEntries := [];
    hackathons := HashMap.fromIter<Text, Types.Hackathon>(hackathonsEntries.vals(), 0, Text.equal, Text.hash);
    hackathonsEntries := [];
    teams := HashMap.fromIter<Text, Types.Team>(teamsEntries.vals(), 0, Text.equal, Text.hash);
    teamsEntries := [];
    projects := HashMap.fromIter<Text, Types.Project>(projectsEntries.vals(), 0, Text.equal, Text.hash);
    projectsEntries := [];
    feeds := HashMap.fromIter<Text, Types.Feed>(feedsEntries.vals(), 0, Text.equal, Text.hash);
    feedsEntries := [];
  };

  public shared (msg) func getUser() : async Result.Result<Types.User, Text> {
    return User.getUser(users, msg.caller);
  };

  public func getUserByUsername(username : Text) : async Result.Result<Types.User, Text> {
    return User.getUserByUsername(users, username);
  };

  public func getUserById(userId : Principal) : async Result.Result<Types.User, Text> {
    return User.getUser(users, userId);
  };

  public shared (msg) func register(username : Text) : async Result.Result<Types.User, Text> {
    return User.register(users, msg.caller, username);
  };

  public shared (msg) func editProfile(data : Types.EditProfileData) : async Result.Result<Types.User, Text> {
    return User.editProfile(users, msg.caller, data);
  };

  public shared (msg) func toggleFollow(targetUserId : Principal) : async Result.Result<Text, Text> {
    return User.toggleFollow(users, msg.caller, targetUserId);
  };

  public shared (msg) func postHackathon(data : Types.PostHackathonData) : async Result.Result<Types.Hackathon, Text> {
    return Hackathon.postHackathon(users, msg.caller, hackathons, data);
  };

  public func getHackathons() : async Result.Result<[Types.Hackathon], Text> {
    return Hackathon.getHackathons(hackathons);
  };

  public func getHackathonDetail(hackathonId : Text) : async Result.Result<Types.Hackathon, Text> {
    return Hackathon.getHackathonDetail(hackathons, hackathonId);
  };

  public shared (msg) func registerTeam(hackathonId : Text, data : Types.RegisterTeamData) : async Result.Result<Types.Team, Text> {
    return Team.registerTeam(users, msg.caller, teams, hackathons, hackathonId, data);
  };

  public shared (msg) func joinTeam(teamId : Text) : async Result.Result<Text, Text> {
    return Team.joinTeam(users, msg.caller, teams, teamId);
  };

  public shared (msg) func approveMember(teamId : Text, targetUserId : Principal) : async Result.Result<Text, Text> {
    return Team.approveMember(users, msg.caller, teams, teamId, targetUserId);
  };

  public func getTeamDetail(teamId : Text) : async Result.Result<Types.Team, Text> {
    return Team.getTeamDetail(teams, teamId);
  };

  public shared (msg) func postProject(teamId : Text, data : Types.PostProjectData) : async Result.Result<Types.Project, Text> {
    return Project.postProject(users, msg.caller, teams, teamId, projects, data);
  };

  public shared (msg) func postFeed(data : Types.PostFeedData) : async Result.Result<Types.Feed, Text> {
    return Community.postFeed(users, msg.caller, feeds, data);
  };

  public func getFeeds() : async Result.Result<[Types.Feed], Text> {
    return Community.getFeeds(feeds);
  };

  public shared (msg) func toggleLikeFeed(feedId : Text) : async Result.Result<Text, Text> {
    return Community.toggleLikeFeed(users, msg.caller, feeds, feedId);
  };

  public func chat(messages : [LLM.ChatMessage]) : async Text {
    return await AI.chat(messages);
  };
};
