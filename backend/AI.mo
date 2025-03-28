import LLM "mo:llm";

module AI {
    public func chat(messages : [LLM.ChatMessage]) : async Text {
        await LLM.chat(#Llama3_1_8B, messages);
    };
};
