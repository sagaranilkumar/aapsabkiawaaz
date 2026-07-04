import { Metadata } from "next";
import GetInvolvedClient from "@/components/GetInvolvedClient";

export const metadata: Metadata = {
  title: "Get Involved | Aap Sab Ki Awaaz",
  description: "Join hands with Aap Sab Ki Awaaz NGO. Volunteer for traffic awareness, mentor athletes, sponsor medical camps, or support community developments.",
};

export default function GetInvolved() {
  return <GetInvolvedClient />;
}
