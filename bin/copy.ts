import child from "child_process";
import fs from "fs";
import path from "path";
import getArgv from "./utils/getArgv";
import { IPropsRules } from "./utils/getArgv/interface";

const argvsRule: IPropsRules[] = [
  {
    direct: "source",
    alias: "s",
    type: "string",
    describe: "源文件入口",
    default: "../type-challenges",
    title: "源文件入口"
  },
  {
    direct: "out",
    alias: "o",
    type: "string",
    describe: "出口文件",
    default: "./type-challenges",
    title: "出口文件"
  },
  {
    direct: "id",
    alias: "i",
    type: "string",
    describe: "需要复制的题目ID",
    default: false,
    title: "题目ID"
  }
];

const argv = getArgv(process.argv.slice(2), argvsRule, {
  usage: " [name] [options]"
});

function fillZero(id: string) {
  let minLength = 5;
  let idLength = id.length;
  if (idLength === minLength) {
    return id;
  }
  return new Array(minLength - idLength).fill("0").join("") + id;
}

function fullPath(entry: string, id: string) {
  return path.resolve(__dirname, "../", entry, "questions");
}

function isFolder(filePath: string) {
  if (fs.existsSync(filePath)) {
    let stat = fs.statSync(filePath);
    return stat && stat.isDirectory();
  }
  return false;
}

function getQuestionFolder(
  questionEntry: string,
  questionId: string
): {
  filePath: string
  folderName: string
} {
  if (isFolder(questionEntry)) {
    const files = fs.readdirSync(questionEntry);
    // console.log(files, '文件列表')
    for (let i = 0; i < files.length; i++) {
      const folderName = files[i];
      if (folderName.indexOf(questionId) !== -1) {
        let resultPath = path.join(questionEntry, folderName);
        if (isFolder(resultPath)) {
          return {
            filePath: resultPath,
            folderName: folderName
          };
        }
      }
    }
  }
  console.error("题目不存在");
  process.exit(0);
}

function mkdir(dirname: string) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdir(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

function copyQuestion(entry: string, output: string, files = ["README.zh-CN.md", "template.ts", "test-cases.ts"]) {
  mkdir(output);
  files.forEach(item => {
    let itemPath = path.join(output, item);
    if (fs.existsSync(itemPath)) {
      console.log(item, "已存在，跳过该文件");
      // child.exec("code " + itemPath);
    } else if (fs.existsSync(path.join(entry, item))) {
      fs.copyFileSync(path.join(entry, item), itemPath);
      // child.exec("code " + itemPath);
    }
  });
  console.log("复制完成:" + output);
}

function run() {
  if (!argv.id || !argv.source) {
    console.error("题目ID/项目路径必填");
    process.exit(0);
  }

  console.log("开始复制...");
  const questionEntry = fullPath(argv.source, argv.id);
  const outputPath = path.resolve(__dirname, "../", argv.out);
  const questionId = fillZero(argv.id);
  const { filePath = "", folderName = "" } = getQuestionFolder(questionEntry, questionId);
  copyQuestion(filePath, path.join(outputPath, folderName));
}

run();
