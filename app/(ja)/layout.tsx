import type {Metadata} from "next";
import BaseLayout from "../components/BaseLayout";
import {dictionaries} from "../dictionaries";

export const metadata: Metadata = {
  title: dictionaries.ja.metadata.title,
  description: dictionaries.ja.metadata.description,
};

export default function JaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BaseLayout lang="ja">{children}</BaseLayout>;
}
