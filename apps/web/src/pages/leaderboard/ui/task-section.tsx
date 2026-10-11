import type { ReactNode } from "react";

import { entriesOf, tasks } from "#/pages/leaderboard/model/ranking";

import { BarChart } from "./bar-chart";
import type { ChartRow } from "./chart-row";
import { percent } from "./format";
import { Section } from "./section";

const NOTE =
  "test 分割の skill（0〜100）です。正解率そのもの（raw）は下の全数値の表にあります。Noul のタスクの raw は「はい」と「いいえ」それぞれの正解率の平均（balanced accuracy）です。";
const UNSUPPORTED = "未対応（この形式を受け付けない）";

const skillRows = (task: string): readonly ChartRow[] =>
  entriesOf(task).map(({ model, result }): ChartRow => {
    if (result.support === "unsupported") {
      return { status: "unsupported", key: model.model, label: model.label, note: UNSUPPORTED };
    }
    return {
      status: "measured",
      key: model.model,
      label: model.label,
      ratio: result.test.skill,
      value: percent(result.test.skill),
    };
  });

const TaskSection = (): ReactNode => (
  <Section id="tasks" title="タスク別のスコア" note={NOTE}>
    {tasks.map((task) => (
      <BarChart key={task.task} title={`${task.label} の skill`} rows={skillRows(task.task)} />
    ))}
  </Section>
);

export { TaskSection };
