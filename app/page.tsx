import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";
import Link from "next/link";
import { appURL } from "./utils";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "frames.js",
    description: "frames.js is the fastest way to make Frames",
    other: {
      ...(await fetchMetadata(new URL("/frames", appURL()))),
    },
  };
}

function DebugLink() {
  const debugUrl = new URL("http://localhost:3010");

  debugUrl.searchParams.set("url", appURL());

  return <Link href={debugUrl.toString()}>Debug</Link>;
}

// This is a react server component only
export default async function Home() {
  return (
    <div>
      <a href="https://framesjs.org">frames.js</a> homeframe{" "}
      {process.env.NODE_ENV === "development" ? <DebugLink /> : null}
    </div>
  );
}
