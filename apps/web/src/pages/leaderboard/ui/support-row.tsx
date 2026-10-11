import type { ReactNode } from "react";

import type { ModelResult, TaskResult } from "#/pages/leaderboard/model/summary";

import { failureRate } from "./format";

const UNSUPPORTED = "未対応";

const supportText = (result: Readonly<TaskResult>): string => {
  if (result.support === "unsupported") {
    return UNSUPPORTED;
  }
  return `失敗 ${failureRate(result.test)}`;
};

const SupportRow = ({ model }: Readonly<{ model: ModelResult }>): ReactNode => (
  <tr className="border-t">
    <th scope="row" className="py-2 pr-3 text-left font-medium">
      {model.label}
    </th>
    {model.tasks.map((result) => (
      <td key={result.task} className="py-2 pr-3 tabular-nums">
        {supportText(result)}
      </td>
    ))}
  </tr>
);

export { SupportRow };
