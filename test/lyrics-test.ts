import { FayeLyrics } from "../src/content/lyrics.ts";

const hardcodeLyrics = `
[00:15.49] 常請晚星請背影 不用替我太掛心
[00:23.32] 常勸心境應恬靜 別無事也帶淚痕
[00:31.18] 如近來共你相擁之時 常常略察覺你稍帶冷感
[00:39.05] 全因你身邊許多要事 暫時沒法興奮
[00:48.72] 常請眼睛不要醒 不用太過看得真
[00:56.61] 常勸哭聲稍冷靜 事情未算有裂痕
[01:04.32] 如日前為我恭祝生辰 是我冷的背影
[01:12.19] 全因你當天剛巧有事 辨完便送我火吻
[01:25.77] 常自我哄騙 也替你辛苦找藉口
[01:33.55] 如全沒有介意 卻暗孤單飲心裡苦酒
[01:41.44] 明知將分手 但若人未開口
[01:44.81] 我都會一再當我通通都擁有
[01:49.15] 仍然詐不知 雙眼內何事會濕透
[01:59.04]
[02:30.30] 常請眼睛不要醒 不用太過看得真
[02:38.18] 常勸哭聲稍冷靜 事情未算有裂痕
[02:45.96] 如日前望見她於街頭 共你靠得太緊
[02:53.78] 全因那一天風急雨暴 任誰亦會走近
[03:07.34] 常自我哄騙 也替你辛苦找藉口
[03:15.08] 如全沒有介意 卻暗孤單飲心裡苦酒
[03:22.92] 明知將分手 但若人未開口
[03:26.35] 我都會一再當我通通都擁有
[03:30.66] 我詐不知不須再過多久
[03:34.71] 你會走
[04:11.65] 尚當我擁有
[04:20.56]
`;

const html = FayeLyrics.parseLyrics(hardcodeLyrics);
console.log(html);