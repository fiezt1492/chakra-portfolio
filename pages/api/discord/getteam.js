// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getGuildMember } from "../../../lib/discord";

const team = [
  {
    discordId: "445102575314927617",
    name: "Fiezt",
    quote: "I sit for at least 24 hours a day...",
    rank: "Founder & Developer",
    email: "fiezt@pm.me",
    tags: ["Founder", "Developer"],
  },
  {
    discordId: "748095156103938119",
    name: "Schjr",
    quote: "I sit for at least 23 hours a day...",
    rank: "Co-Founder & Developer",
    email: "huynhnhattruonglt@gmail.com",
    tags: ["Co-Founder", "Developer"],
  },
  {
    discordId: "481228754547376128",
    name: "Tyui",
    quote: "I sit for at least 22 hours a day...",
    rank: "Developer",
    email: "tyuipham@gmail.com",
    tags: ["Developer"],
  },
  {
    discordId: "776473766308872233",
    name: "MeiMei",
    quote: "I sit for at least 21 hours a day...",
    rank: "Manager",
    email: "misatruong1242@gmail.com",
    tags: ["Manager", "Developer"],
  },
  {
    discordId: "441438270061150208",
    name: "Slimaeus",
    quote: "I sit for at least 20 hours a day...",
    rank: "Developer",
    email: "nguyenhongthai28042002@gmail.com",
    tags: ["Developer"],
  },
  {
    discordId: "686462089484566534",
    name: "Meelow",
    quote: "I sit for at least 19 hours a day...",
    rank: "Moderator & Tester",
    email: "quockha081122@gmail.com",
    tags: ["Developer"],
  },
  {
    discordId: "759995173651480586",
    name: "Shiro",
    quote: "I sit for at least 18 hours a day...",
    rank: "Tester",
    email: "kebaothu1213@gmail.com",
    tags: ["Developer"],
  },
];

export default async function handler(req, res) {
  const data = await getGuildMember();
  const members = data
    .filter((member) => {
      const discordIds = team.map((m) => m.discordId);
      return !member.user.bot && discordIds.includes(member.user.id);
    })
    .map((member) => {
      return {
        ...member,
        more: team.find((tm) => tm.discordId === member.user.id),
      };
    });
  res.json(members);
}
