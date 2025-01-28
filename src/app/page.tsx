import BrowseByStyle from "./component/browsebystyle";
import Hero from "./component/hero";
import { NewArrival } from "./component/newArivals";
import OurHappyCustomers from "./component/ourhappycostumer";
import { TopSelling } from "./component/topSelling";

export default function Home() {
  return (
    <div>
      <Hero />
      <NewArrival />
      <TopSelling />
      <BrowseByStyle />
      <OurHappyCustomers />
    </div>
  );
}
