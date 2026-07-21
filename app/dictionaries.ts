export type Lang = "ja" | "en";

interface CommentPersona {
  titleSegments: string[];
  image: string;
  alt: string;
  text: string;
}

export interface Dictionary {
  metadata: {
    title: string;
    description: string;
  };
  initialTagline: string[];
  heroLead: string;
  statement: {
    early: string[][]; // 行 → セグメントの配列
    late: string[][];
  };
  imageLines: string[];
  movie: {
    watchLabel: string;
  };
  usage: {
    headline: string;
  };
  comment: {
    headline: string;
    left: CommentPersona;
    right: CommentPersona;
  };
  contact: {
    label: string;
    address: string;
  };
}

export const dictionaries: Record<Lang, Dictionary> = {
  ja: {
    metadata: {
      title: "気配の花",
      description:
        "離れて暮らす、大切な人とのあいだにお互いの気配を気軽に感じるきっかけができました。「おはよう」「いってきます」「ただいま」. 3つの声に反応して、香りを届けます。",
    },
    initialTagline: ["離れて暮らす、", "大切な人へ。"],
    heroLead: "元気だよ、のかわりに",
    statement: {
      early: [
        ["ちゃんと元気でいるか、気になる。"],
        ["けれど、毎日連絡をとるのは", "なかなか難しい。"],
        ["離れて暮らす、大切な人とのあいだに"],
        ["お互いの気配を気軽に感じる", "きっかけができました。"],
      ],
      late: [
        ["「おはよう」「いってきます」「ただいま」"],
        ["3つの声に反応して、", "香りを届けます。"],
      ],
    },
    imageLines: ["私たちは", "ゆるやかに", "でもたしかに", "つながっている。"],
    movie: {
      watchLabel: "動画を見る",
    },
    usage: {
      headline: "使い方",
    },
    comment: {
      headline: "例えば、こんな方に",
      left: {
        titleSegments: ["家族と", "離れて", "暮らす", "お子さん", "ご夫婦"],
        image: "/img/otaki_family.png",
        alt: "otaki",
        text: `「あと何回会えるんだろう」と思うことが増えました。\n上京してもうすぐ20年。実家に帰るのはお盆とお正月の2回程度で、仕事が忙しく帰れない年もあったりします。もっと頻繁に帰れたらいいけれど、それも難しい。LINEや電話も、なかなかできなかったり、用もないのにするのは照れくさかったり。\n「気配の花」は、毎日の挨拶の延長線上で両親に自分の気配を送れるところが気軽でいいと思いました。朝起きて花が香っていると、「あ、母さん今日も早起きだな」とか。両親が元気でいることがわかるのも安心します。`,
      },
      right: {
        titleSegments: ["子どもと", "離れて", "暮らす", "ご両親"],
        image: "/img/otaki_parents.png",
        alt: "otaki-parents",
        text: `正直に言えば「もっと帰ってきてくれたら嬉しいな」とは思います。でも東京で家庭を持って、向こうの生活があるのもわかるから口うるさく言うのはやめようと思っていました。\nLINEも用があるとき以外は送らないですね、返信がこなかったら寂しいので（笑）\n「気配の花」は、子どもとの毎日のちょっとしたコミュニケーションのようになっています。\n一緒に暮らしていた頃みたいに「おはよう」とか「ただいま」が言えて、それが香りで残るのはけっこう嬉しいものですね。`,
      },
    },
    contact: {
      label: "お問い合わせ",
      address: "東京都中央区銀座7-14-16 太陽銀座ビル1階",
    },
  },
  en: {
    metadata: {
      title: "Kehai no Hana",
      description:
        "A gentle way to feel the presence of loved ones living far away. Responding to three everyday greetings — “Good morning,” “I’m off,” and “I’m home” — Kehai no Hana delivers a soft scent.",
    },
    initialTagline: ["For the ones you love,", "living far away."],
    heroLead: "In place of “I’m doing fine,”",
    statement: {
      early: [
        ["You wonder how they’re doing."],
        ["But keeping in touch every day", "isn’t always easy."],
        ["Now, with the ones you love from afar,"],
        ["there’s a simple way to feel", "each other’s presence."],
      ],
      late: [
        ["“Good morning.” “I’m off.” “I’m home.”"],
        ["Responding to these three phrases,", "it delivers a gentle scent."],
      ],
    },
    imageLines: ["We are", "gently,", "yet surely,", "connected."],
    movie: {
      watchLabel: "Watch the video",
    },
    usage: {
      headline: "How to Use",
    },
    comment: {
      headline: "For people like you",
      left: {
        titleSegments: ["Children and couples", "living away from", "their families"],
        image: "/img/otaki_family.png",
        alt: "otaki",
        text: `Lately I find myself thinking, “How many more times will I get to see them?”\nIt’s been almost 20 years since I moved to Tokyo. I only make it back home around twice a year, for Obon and New Year’s — and some years work keeps me from going at all. I wish I could visit more often, but it isn’t easy. Messages and phone calls don’t happen as often as they should, and reaching out for no particular reason feels a little awkward.\nWhat I like about Kehai no Hana is that it lets me send my presence to my parents as a natural extension of everyday greetings. When I wake up and the flower is giving off its scent, I think, “Ah, Mom’s up early again today.” Knowing they’re doing well puts me at ease.`,
      },
      right: {
        titleSegments: ["Parents", "living away from", "their children"],
        image: "/img/otaki_parents.png",
        alt: "otaki-parents",
        text: `To be honest, I do wish they’d come home more often. But they have their own family and life in Tokyo, so I decided not to nag them about it.\nI don’t message them unless there’s a reason — it feels lonely when no reply comes. (laughs)\nKehai no Hana has become a small daily way of keeping in touch with our children.\nJust like when we lived together, we can say “good morning” and “I’m home” — and having it linger as a scent makes us quietly happy.`,
      },
    },
    contact: {
      label: "Contact",
      address: "1F Taiyo Ginza Bldg., 7-14-16 Ginza, Chuo-ku, Tokyo",
    },
  },
};
