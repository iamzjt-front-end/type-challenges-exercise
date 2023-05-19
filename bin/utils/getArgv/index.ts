import minimist from "minimist";
import { IMinimistOps, IOps, IPropsRules } from "./interface";

export default function (argvs: string[], rules: IPropsRules[], ops: IOps = {}): minimist.ParsedArgs {
  let minimistOps: IMinimistOps = {
    string: [],
    boolean: [],
    alias: {},
    default: {}
  };

  let helpArr: string[] = [];

  ops.usage && helpArr.push("", `usage: ${ ops.usage }`, "");
  ops.describe && helpArr.push(ops.describe, "");
  rules.length > 0 && helpArr.push("options:");

  let rulesHelp: string[][] = [];
  let ruleMaxLength = 11;
  // help 长度为12
  rules.forEach(ruleItem => {
    if (ruleItem.direct) {
      ruleItem.type === "boolean"
      ? minimistOps.boolean.push(ruleItem.direct)
      : minimistOps.string.push(ruleItem.direct);

      minimistOps.default[ruleItem.direct] = typeof ruleItem.default === undefined ? "" : ruleItem.default;

      if (ruleItem.alias) {
        minimistOps.alias[ruleItem.direct] = ruleItem.alias;
        rulesHelp.push([`-${ ruleItem.alias },  --${ ruleItem.direct }`]);
      } else {
        rulesHelp.push([`--${ ruleItem.direct }`]);
      }

      let lastIndex = rulesHelp.length - 1;
      if (ruleMaxLength < rulesHelp[lastIndex][0].length) {
        ruleMaxLength = rulesHelp[lastIndex][0].length;
      }

      rulesHelp[lastIndex].push(`${ ruleItem.describe || "" }`);
    }
  });

  rulesHelp.push([""]);
  rulesHelp.push(["-h,  --help", "Print this list and exit."]);

  rulesHelp.forEach(item => {
    item[0] = item[0] || "";
    helpArr.push(`   ${ item[0] }${ Array(ruleMaxLength - item[0].length + 5).join(" ") }${ item[1] || "" }`);
  });

  const fullArgvs = minimist(argvs, minimistOps);

  if (fullArgvs.h || fullArgvs.help) {
    console.log(helpArr.join("\n"));
    process.exit();
  }

  return fullArgvs;
}
