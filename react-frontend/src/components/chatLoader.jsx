import { LoaderIcon } from "lucide-react";

function ChatLoader() {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center p-4">
      <LoaderIcon className="text-primary spinner-border" style={{ width: "40px", height: "40px" }} />
      <p className="mt-3 text-center fs-5 font-monospace">Connecting to chat...</p>
    </div>
  );
}

export default ChatLoader;
