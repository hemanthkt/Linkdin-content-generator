import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { useState } from "react";
import { AIChatSession } from "./../service/AIModal";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";

function App() {
  const prompt =
    "Imagine you are a professional Linkdin content creator. Now transform {content}  into a professtional Linkdn content ";

  const [content, setContent] = useState("");
  const [link, setLink] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
    console.log(content);
  };
  const { toast } = useToast();

  const GenerateSummeryFromAI = async () => {
    toast({
      title: "LinkdIn Proffesional Content",
      description: "Your Content is being generated",
    });
    const PROMPT = prompt.replace("{content}", content);
    const result = await AIChatSession.sendMessage(PROMPT);
    const aiResponse = result.response.text();
    console.log(aiResponse);
    setLink(
      aiResponse
        .replace("post", " ")
        .replace("{", " ")
        .replace(":", " ")
        .replace('"', " ")
        .replace('"', " ")
        .replace("}", " ")
    );
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-7 my-5">
      <h1>Linkdin Content Generator</h1>
      <h2>
        Type a content of your choice and transform it into a profssional
        Linkdin Write-Up!!
      </h2>
      <Textarea
        onChange={handleChange}
        placeholder="Type your content here"
        className="w-full h-80  border rounded p-5 my-5"
      />
      <Button
        className="p-5 my-5"
        type="submit"
        onClick={() => GenerateSummeryFromAI()}
      >
        Convert to a LinkedIn Post
      </Button>
      <Toaster className="p-5 my-5"></Toaster>
      <Textarea value={link}></Textarea>
    </div>
  );
}

export default App;
