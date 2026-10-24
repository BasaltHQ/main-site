import BasaltLanding from "@/components/basalt-marketing/BasaltLanding";
import { PortalSection } from "@/components/sections/portal-section";

export default function Home() {
  return <BasaltLanding productId="hq" portal={<PortalSection embedded />} />;
}
