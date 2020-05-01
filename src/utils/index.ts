import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTimePlugin);

const timeToX = (v: number | Date | string) => dayjs().to(v);


const calcRest = (rest: number, total: number) : number =>
  Math.round((rest / total) * 100);

const isEmpty = (obj: object) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

const request = async ({ endpoint, opts, payload }: {endpoint: string; payload?:any; opts?: object;}) : Promise<any> => {
  console.log(endpoint, opts, payload);
  const serverUrl = process.env.SERVER_URL || 'http://localhost:8000';
  const response = await fetch(`${serverUrl}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(payload),
    ...opts
  });
  return {
    data: response.json(),
    status: response.status
  };
};

export {
  calcRest,
  isEmpty,
  timeToX,
  request
}
