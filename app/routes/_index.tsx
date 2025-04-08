import type { MetaFunction } from "@remix-run/node";
import MovableBox from '../components/MovableBox';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (<div className="flex justify-center h-screen bg-white">
        <MovableBox />
      </div>)
}
