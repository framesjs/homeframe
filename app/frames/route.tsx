import { Button } from "frames.js/next";
import { frames } from "./frames";

const lastPage = 6;

const pageHandler = frames(async (ctx) => {
  const page = parseInt(ctx.searchParams.page || "1");

  return {
    image:
      page === 1
        ? "https://framesjs.org/og.png"
        : `https://framesjs.org/frames/frame${page}.png`,
    buttons: [
      page !== 1 ? (
        <Button
          action="post"
          target={{ query: { page: Math.max(1, page - 1) } }}
        >
          ←
        </Button>
      ) : (
        <Button action="link" target="https://framesjs.org/">
          Open docs
        </Button>
      ),
      page < lastPage ? (
        <Button
          action="post"
          target={{ query: { page: Math.min(lastPage, page + 1) } }}
        >
          →
        </Button>
      ) : (
        <Button action="link" target="https://framesjs.org">
          Open frames.js
        </Button>
      ),
    ],
  };
});

export const GET = pageHandler;
export const POST = pageHandler;
