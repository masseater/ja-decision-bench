import type { ReactNode } from "react";

import { entriesOf, slowestP50, tasks } from "#/pages/leaderboard/model/ranking";

import { BarChart } from "./bar-chart";
import type { ChartRow } from "./chart-row";
import { ms } from "./format";
import { Section } from "./section";

const NOTE =
  "OpenRouter 経由で 1 件を判定するのにかかった時間の中央値（p50）です。棒の長さは全タスク共通の目盛りです。";
const UNSUPPORTED = "未対応";
const MIN_SCALE = 1;

const latencyRows = (task: string): readonly ChartRow[] =>
  entriesOf(task).map(({ model, result }): ChartRow => {
    if (result.support === "unsupported") {
      return { status: "unsupported", key: model.model, label: model.label, note: UNSUPPORTED };
    }
    return {
      status: "measured",
      key: model.model,
      label: model.label,
      ratio: result.p50Ms / Math.max(MIN_SCALE, slowestP50),
      value: ms(result.p50Ms),
    };
  });

const LatencySection = (): ReactNode => (
  <Section id="latency" title="レイテンシ" note={NOTE}>
    {tasks.map((task) => (
      <BarChart key={task.task} title={`${task.label} の p50`} rows={latencyRows(task.task)} />
    ))}
  </Section>
);

export { LatencySection };
