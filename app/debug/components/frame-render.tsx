import { Frame } from "frames.js";
import { useState } from "react";

export type FrameRenderProps = {
  isLoggedIn: boolean;
  frame: Frame;
  url: string | null;
  submitOption: (args: {
    buttonIndex: number;
    inputText?: string;
  }) => Promise<void>;
};

export function FrameRender({
  frame,
  url,
  submitOption,
  isLoggedIn,
}: FrameRenderProps) {
  const [inputText, setInputText] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  return (
    <div style={{ width: "382px" }}>
      <img
        src={frame.image}
        alt="Description of the image"
        width={382}
        style={{ borderRadius: "4px", border: "1px solid #ccc" }}
        height={200}
      />
      {frame.inputText && (
        <input
          className="w-full p-2 border mt-1 border-gray-400 rounded"
          type="text"
          placeholder={frame.inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "4px",
          gap: "4px",
        }}
      >
        {frame.buttons?.map(({ label, action, target }, index: number) => (
          <button
            type="button"
            disabled={isWaiting}
            className={`bg-gray-200 p-2 hover:bg-gray-300 ${isWaiting ? "bg-gray-100 hover:bg-gray-100" : ""} border-gray-400 border text-sm text-gray-800 rounded`}
            style={{
              flex: "1 1 0px",
              cursor: isWaiting ? undefined : "pointer",
            }}
            onClick={async () => {
              if (!isLoggedIn) {
                alert(
                  "Choose an fid to impersonate or Sign in (costs warps) to use the frame buttons"
                );
                return;
              }
              if (action === "link") {
                if (
                  window.confirm("You are about to be redirected to " + target!)
                ) {
                  window.location.href = target!;
                }
              } else if (action === "mint") {
                alert(`Requested to mint NFT: ${target}`);
              } else {
                setIsWaiting(true);
                try {
                  await submitOption({
                    buttonIndex: index + 1,
                    inputText:
                      frame.inputText !== undefined ? inputText : undefined,
                  });
                } catch (err) {
                  alert("error: check the console");
                  console.error(err);
                }
                setIsWaiting(false);
              }
            }}
            key={index}
          >
            {action === "mint" ? `♦ ` : ""}
            {label}
            {action === "post_redirect" || action === "link" ? ` ↗` : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
