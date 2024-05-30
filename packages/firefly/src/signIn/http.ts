import schedule from 'node-schedule'
import { signInApi } from '../utils/https'
import { readFile } from '../utils/fileEditing'
const init = async () => {
  const data:any = await readFile()
  var rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, new schedule.Range(1, 6)];
  rule.hour = +data.hour || 8;
  rule.minute = +data.minute || 0;
  console.log(rule);
  schedule.scheduleJob(rule, () => {
    signInApi(data)
    console.log(new Date().toString());
  });
}
init()
