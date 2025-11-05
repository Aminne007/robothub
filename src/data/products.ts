export type Product = {
  id: string;
  name: string;
  sku: string;
  category: "Controllers" | "Sensors" | "Actuators" | "Power";
  price: number;
  stock: number;
  rating: number;
  shortDescription: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
};

export const products: Product[] = [
  {
    id: "mcu-esp32-devkit",
    name: "ESP32 DevKit C",
    sku: "RBH-ESP32-01",
    category: "Controllers",
    price: 18.5,
    stock: 32,
    rating: 4.7,
    shortDescription: "Dual-core Wi-Fi + Bluetooth MCU ready for IoT and robotics prototypes.",
    description:
      "The ESP32 DevKit C is ideal for rapid prototyping, featuring dual-core processing, integrated Wi-Fi/Bluetooth, and plenty of GPIO for sensors and actuators.",
    features: [
      "Dual-core Xtensa® 32-bit LX6 CPU",
      "Integrated Wi-Fi 802.11 b/g/n and Bluetooth 4.2",
      "30 GPIO pins with capacitive touch support",
      "Micro-USB programming interface",
    ],
    specs: {
      "Clock speed": "240 MHz",
      Flash: "4 MB",
      "Operating voltage": "3.0 - 3.6 V",
      "Dimensions": "54 x 28 x 13 mm",
    },
  },
  {
    id: "sensor-lidar-lite",
    name: "LIDAR-Lite v4 LED Sensor",
    sku: "RBH-LIDAR-04",
    category: "Sensors",
    price: 129,
    stock: 12,
    rating: 4.6,
    shortDescription: "Compact high-precision distance sensing up to 10 meters.",
    description:
      "The LIDAR-Lite v4 delivers reliable ranging for autonomous navigation with easy I2C integration and low power consumption.",
    features: [
      "Up to 10 m range with ±2.5 cm accuracy",
      "I2C or PWM interface",
      "Low power consumption for battery-powered builds",
      "Integrated signal processing",
    ],
    specs: {
      "Range": "10 m",
      Accuracy: "±2.5 cm",
      Interface: "I2C / PWM",
      Weight: "24 g",
    },
  },
  {
    id: "motor-nema17-hs",
    name: "NEMA 17 High Torque Stepper",
    sku: "RBH-STEP-17",
    category: "Actuators",
    price: 42.75,
    stock: 58,
    rating: 4.8,
    shortDescription: "1.8° stepper motor delivering 59Ncm holding torque for precise motion.",
    description:
      "A reliable stepper motor for CNC, 3D printing, and robotic joints with smooth operation and long-life bearings.",
    features: [
      "1.8° step angle",
      "59 Ncm holding torque",
      "Long-life bearings",
      "4-wire bipolar configuration",
    ],
    specs: {
      Voltage: "2.8 V",
      Current: "1.68 A",
      "Holding torque": "59 Ncm",
      "Lead length": "1 m",
    },
  },
  {
    id: "power-lipo-3s",
    name: "3S 5200mAh LiPo Pack",
    sku: "RBH-LIPO-3S",
    category: "Power",
    price: 64.9,
    stock: 21,
    rating: 4.5,
    shortDescription: "High-discharge lithium polymer battery ideal for mobile robots.",
    description:
      "A balanced 3-cell LiPo battery with XT60 connector that keeps mobile bases powered for hours while maintaining a compact footprint.",
    features: [
      "5200 mAh capacity",
      "35C continuous discharge",
      "Pre-installed XT60 connector",
      "Silicone balance leads",
    ],
    specs: {
      Cells: "3S",
      Voltage: "11.1 V",
      Weight: "380 g",
      Dimensions: "138 x 46 x 25 mm",
    },
  },
  {
    id: "sensor-imu-9dof",
    name: "9-DoF IMU Fusion Board",
    sku: "RBH-IMU-09",
    category: "Sensors",
    price: 54.3,
    stock: 40,
    rating: 4.4,
    shortDescription: "Combines accelerometer, gyroscope, and magnetometer with sensor fusion.",
    description:
      "Capture precise orientation data with onboard sensor fusion delivering quaternions, Euler angles, and linear acceleration in real time.",
    features: [
      "I2C and SPI interfaces",
      "200 Hz sensor fusion output",
      "Integrated temperature compensation",
      "3.3 V logic level compatible",
    ],
    specs: {
      "Gyro range": "±2000 dps",
      "Accel range": "±16 g",
      "Mag range": "±4900 µT",
      Footprint: "27 x 20 mm",
    },
  },
];

export const categories = ["All", ...new Set(products.map(product => product.category))] as const;

export const findProductById = (id: string) =>
  products.find(product => product.id === id);
