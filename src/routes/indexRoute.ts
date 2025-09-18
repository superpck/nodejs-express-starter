import dayjs from 'dayjs';
import express from 'express';
import os from 'os';
import { v4 } from 'uuid';
import si from "systeminformation";

const router = express.Router();

// Default route
router.get('/', (req, res) => {
  res.json({
    date: dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
    message: 'Welcome to NodeJS API',
    version: '5.1.0',
    uuid: v4(),
    endpoints: [
      'GET /',
      'GET /test',
      'GET /health',
      'GET /auth/login',
    ]
  });
});

// Test route
router.get('/test', (req, res) => {
  res.json({
    message: 'Test route is working!',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

// Health check route
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Chat API'
  });
});

router.get('/client', async (req, res) => {
  res.json({
    status: 200,
    time: new Date().toISOString(),
    "x-forwarded-for": req.headers["x-forwarded-for"] || '',
    "x-real-ip": req.headers["x-real-ip"] || '',
    "request-ip": req.ip || '',
    "user-agent": req.headers['user-agent'] || '',
  });
});

router.get('/server-status', async (req, res) => {
  const server = await getServerInformation();
  res.json({
    status: 200,
    time: new Date().toISOString(),
    server
  });
});

async function getServerInformation(): Promise<any> {
  const cpus = await si.cpu();
  const system = await si.system();
  const osInfo = await si.osInfo();
  const mem = await si.mem();
  const disk = await si.diskLayout();
  const diskIO = await si.disksIO();
  const fsSize = await si.fsSize();
  const diskBlockDevices = await si.blockDevices();
  const networkInterfaces = await si.networkInterfaces();
  const networkConnections = await si.networkConnections();
  const docker = await si.dockerInfo().catch(() => ({}));
  // const uptimeSeconds = os.uptime();
  const currentLoad = await si.currentLoad();
  const cpuTemp = await si.cpuTemperature();
  const usb = await si.usb();
  const wifiNetworks = await si.wifiNetworks();
  const wifiConnections = await si.wifiConnections();
  const graphics = await si.graphics();
  const version = await si.versions();
  const uptimes = si.time();
  const uptimeSeconds = Math.floor(uptimes.uptime);

  const ret = {
    cpus, system, osInfo, mem, graphics,
    disk, diskBlockDevices, fsSize,
    usb,
    networkInterfaces, networkConnections, wifiNetworks, wifiConnections,
    docker,
    version,
    status: {
      uptime: {
        ...uptimes,
        date: dayjs(uptimes.current - (uptimeSeconds * 1000)).format('YYYY-MM-DD HH:mm:ss'),
        days: Math.floor(uptimeSeconds / 86400),
        hours: Math.floor(uptimeSeconds / 3600) % 24,
        minutes: Math.floor(uptimeSeconds / 60) % 60,
        seconds: uptimeSeconds % 60
      },
      currentLoad, cpuTemp, diskIO
    }
  };
  return ret;
}

export default router;
