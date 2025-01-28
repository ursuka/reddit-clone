"use server";

import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db/index";
import paths from "@/paths";

const TopicList = async () => {
  const topics = await db.topic.findMany();
  const renderedTopics = topics.map((item) => {
    return (
      <div key={item.id} className="overflow-hidden">
        <Link href={paths.topicShowPath(item.slug)}>
          <Chip color="warning" variant="shadow">
            {item.slug}
          </Chip>
        </Link>
      </div>
    );
  });

  return <div className="flex flex-row flex-wrap gap-2">{renderedTopics}</div>;
};

export default TopicList;
