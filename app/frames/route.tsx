import { Button } from "frames.js/next";
import { frames } from "./frames";

const lastPage = 6;

const pageHandler = frames(async (ctx) => {
  let page = ctx.state.page;

  if ("action" in ctx.searchParams) {
    switch (ctx.searchParams.action) {
      case "prev":
        page = Math.max(1, page - 1);
        break;
      case "next":
        page = Math.min(lastPage, page + 1);
        break;
    }
  }

  return {
    image:
      page === 1
        ? "https://framesjs.org/og.png"
        : `https://framesjs.org/frames/frame${page}.png`,
    buttons: [
      page !== 1 ? (
        <Button action="post" target={{ query: { action: "prev" } }}>
          ←
        </Button>
      ) : (
        <Button action="link" target="https://framesjs.org/">
          Open docs
        </Button>
      ),
      page < lastPage ? (
        <Button action="post" target={{ query: { action: "next" } }}>
          →
        </Button>
      ) : (
        <Button action="link" target="https://framesjs.org">
          Open frames.js
        </Button>
      ),
    ],
    state: {
      page: page,
    },
  };
});

export const GET = pageHandler;
export const POST = pageHandler;
