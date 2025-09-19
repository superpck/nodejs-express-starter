import dayjs from 'dayjs';
import express from 'express';
import { v4 } from 'uuid';
import si from "systeminformation";

const router = express.Router();

router.get('/client-access', async (req, res) => {
  res.json({
    status: 200,
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    "x-forwarded-for": req.headers["x-forwarded-for"] || '',
    "x-real-ip": req.headers["x-real-ip"] || '',
    "request-ip": req.ip || '',
    "user-agent": req.headers['user-agent'] || '',
  });
});

router.get('/information', async (req, res) => {
  const server_information = await getServerInformation();
  res.json({
    status: 200,
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    server_information
  });
});

router.get('/service', async (req, res) => {
  const server_service = await si.networkConnections();
  res.json({
    status: 200,
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    server_service
  });
});

router.get('/service-listen', async (req, res) => {
  const server_service = await si.networkConnections();
  res.json({
    status: 200,
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    server_service: server_service.filter(s => s.state === 'LISTEN')
  });
});

router.get('/application', async (req, res) => {
  const server_application = await si.versions();
  res.json({
    status: 200,
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    server_application
  });
});

router.get('/status', async (req, res) => {
  const server_status = await getServerStatus();
  res.json({
    status: 200,
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    server_status
  });
});

async function getServerInformation(): Promise<any> {
  const cpus = await si.cpu();
  const system = await si.system();
  const osInfo = await si.osInfo();
  const mem = await si.mem();
  const disk = await si.diskLayout();
  const fsSize = await si.fsSize();
  const diskBlockDevices = await si.blockDevices();
  const networkInterfaces = await si.networkInterfaces();
  const docker = await si.dockerInfo().catch(() => ({}));
  const usb = await si.usb();
  const wifiNetworks = await si.wifiNetworks();
  const wifiConnections = await si.wifiConnections();
  const graphics = await si.graphics();

  const ret = {
    cpus, system, osInfo, mem, graphics,
    disk, diskBlockDevices, fsSize,
    usb,
    networkInterfaces: networkInterfaces.filter(n => (n.ip4 || n.ip6) && ['lo', 'lo0'].indexOf(n.iface) === -1),
    wifiNetworks,
    wifiConnections,
    docker
  }
  return ret;
}

async function getServerStatus(): Promise<any> {
  const diskIO = await si.disksIO();
  let memory: any = await si.mem();
  const fsSize = await si.fsSize();
  const currentLoad = await si.currentLoad();
  const cpuTemp = await si.cpuTemperature();
  const uptimes = si.time();
  const uptimeSeconds = Math.floor(uptimes.uptime);
  const startDate = dayjs(uptimes.current - (uptimeSeconds * 1000)).format('YYYY-MM-DD HH:mm:ss');

  const uptimeDiff = { 
    seconds: dayjs().diff(dayjs(startDate), 'second') % 60,
    minutes: dayjs().diff(dayjs(startDate), 'minute') % 60,
    hours: dayjs().diff(dayjs(startDate), 'hour') % 24,
    days: dayjs().diff(dayjs(startDate), 'day') % 7,
    weeks: dayjs().diff(dayjs(startDate), 'week') % 4,
    months: dayjs().diff(dayjs(startDate), 'month') % 12,
    years: dayjs().diff(dayjs(startDate), 'year'),
  };

  memory = {
    totalGB: Number((memory.total / (1024 * 1024 * 1024)).toFixed(2)),
    usedGB: Number((memory.used / (1024 * 1024 * 1024)).toFixed(2)),
    freeGB: Number((memory.free / (1024 * 1024 * 1024)).toFixed(2)),
    activeGB: Number((memory.active / (1024 * 1024 * 1024)).toFixed(2)),
    availableGB: Number((memory.available / (1024 * 1024 * 1024)).toFixed(2)),
    swapTotalGB: Number((memory.swaptotal / (1024 * 1024 * 1024)).toFixed(2)),
    swapUsedGB: Number((memory.swapused / (1024 * 1024 * 1024)).toFixed(2)),
    swapFreeGB: Number((memory.swapfree / (1024 * 1024 * 1024)).toFixed(2)),
    usedPercent: Number(((memory.used / memory.total) * 100).toFixed(2))
  };
  let disk = fsSize.filter(d => ['/', '/home', '/var', '/boot'].includes(d.mount))
    .map(d => {
      return {
        mount: d.mount,
        sizeGB: Number((d.size / (1024 * 1024 * 1024)).toFixed(2)),
        usedGB: Number((d.used / (1024 * 1024 * 1024)).toFixed(2)),
        availableGB: Number(((d.size - d.used) / (1024 * 1024 * 1024)).toFixed(2)),
        usedPercent: Number(d.use.toFixed(2))
      };
    });  

  const ret = {
    uptime: {
      startDate,
      uptimeSeconds,
      years: uptimeDiff.years,
      months: uptimeDiff.months,
      days: uptimeDiff.days,
      hours: uptimeDiff.hours,
      minutes: uptimeDiff.minutes,
      seconds: uptimeDiff.seconds
    },
    currentLoad, cpuTemp,
    memory,
    disk,
    diskIO
  };
  return ret;
}

export default router;
