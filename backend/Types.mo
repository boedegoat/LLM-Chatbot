import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

module Types {
    public type Users = HashMap.HashMap<Principal, User>;

    public type User = {
        id : Principal;
        username : Text;
        bio : ?Text;
        followers : [Principal];
        following : [Principal];
        teams : [Text];
        posts : [Text];
        createdAt : Int;
        updatedAt : ?Int;
    };

    public type EditProfileData = {
        username : ?Text;
        bio : ?Text;
    };

    public type Hackathons = HashMap.HashMap<Text, Hackathon>;

    public type Hackathon = {
        id : Text;
        title : Text;
        description : Text;
        startDate : Int;
        endDate : Int;
        totalPrizePool : Nat;
        maximumTeamSize : Nat;
        teams : [Text];
        createdAt : Int;
        updatedAt : ?Int;
    };

    public type PostHackathonData = {
        title : Text;
        description : Text;
        startDate : Int;
        endDate : Int;
        totalPrizePool : Nat;
        maximumTeamSize : Nat;
    };

    public type Teams = HashMap.HashMap<Text, Team>;

    public type Team = {
        id : Text;
        name : Text;
        bio : ?Text;
        members : [Principal];
        requestMembers : [Principal];
        maximumTeamSize : Nat;
        isOpen : Bool;
        projectId : ?Text;
        hackathonId : Text;
        createdAt : Int;
        updatedAt : ?Int;
    };

    public type RegisterTeamData = {
        name : Text;
        bio : ?Text;
    };

    public type Projects = HashMap.HashMap<Text, Project>;

    public type Project = {
        id : Text;
        title : Text;
        description : Text;
        repositoryLink : Text;
        createdAt : Int;
        updatedAt : ?Int;
    };

    public type PostProjectData = {
        title : Text;
        description : Text;
        repositoryLink : Text;
    };

    public type Feeds = HashMap.HashMap<Text, Feed>;

    public type Feed = {
        id : Text;
        content : Text;
        likes : [Principal];
        comments : [Text];
        userId : Principal;
        createdAt : Int;
        updatedAt : ?Int;
    };

    public type PostFeedData = {
        content : Text;
    };
};
