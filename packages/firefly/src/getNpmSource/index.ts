import { execSync } from "child_process";
import chalk from 'chalk';
export const getNpmSourceInfo = () => {
  const profilesInfo = execSync("npm config get registry").toString().trim();
  console.log(chalk.greenBright(profilesInfo))
  process.exit()
}
