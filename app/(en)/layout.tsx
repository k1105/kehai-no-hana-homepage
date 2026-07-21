import type {Metadata} from "next";
import BaseLayout from "../components/BaseLayout";
import {dictionaries} from "../dictionaries";

export const metadata: Metadata = {
  title: dictionaries.en.metadata.title,
  description: dictionaries.en.metadata.description,
};

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BaseLayout lang="en">{children}</BaseLayout>;
}
