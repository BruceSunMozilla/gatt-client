'use strict';

var lookup = function Lookup(type, uuid)
{
  switch (type) {
    case 'service':
      return lookupService(uuid);
    case 'characteristic':
      return lookupCharacteristic(uuid);
    case 'descriptor':
      return lookupDescriptor(uuid);
    default:
      return null;
  }
  return null;
}

var lookupService = function LookupService(uuid)
{
  switch (uuid) {
    case '00001800-0000-1000-8000-00805f9b34fb':
      return 'Generic Access Service';
    case '00001801-0000-1000-8000-00805f9b34fb':
      return 'Generic Attribute Service';
    case '00001802-0000-1000-8000-00805f9b34fb':
      return 'Immediate Alert Service';
    case '00001803-0000-1000-8000-00805f9b34fb':
      return 'Link Loss Service';
    case '00001804-0000-1000-8000-00805f9b34fb':
      return 'Tx Power Service';
    case '00001805-0000-1000-8000-00805f9b34fb':
      return 'Current Time Service';
    case '00001806-0000-1000-8000-00805f9b34fb':
      return 'Reference Time Update Service';
    case '00001807-0000-1000-8000-00805f9b34fb':
      return 'Next DST Change Service';
    case '00001808-0000-1000-8000-00805f9b34fb':
      return 'Glucose Service';
    case '00001809-0000-1000-8000-00805f9b34fb':
      return 'Health Thermometer Service';
    case '0000180a-0000-1000-8000-00805f9b34fb':
      return 'Device Information Service';
    case '0000180d-0000-1000-8000-00805f9b34fb':
      return 'Heart Rate Service';
    case '0000180e-0000-1000-8000-00805f9b34fb':
      return 'Phone Alert Status Service';
    case '0000180f-0000-1000-8000-00805f9b34fb':
      return 'Battery Service';
    case '00001810-0000-1000-8000-00805f9b34fb':
      return 'Blood Pressure Service';
    case '00001811-0000-1000-8000-00805f9b34fb':
      return 'Alert Notification Service';
    case '00001812-0000-1000-8000-00805f9b34fb':
      return 'Human Interface Device Service';
    case '00001813-0000-1000-8000-00805f9b34fb':
      return 'Scan Parameters Service';
    case '00001814-0000-1000-8000-00805f9b34fb':
      return 'Running Speed and Cadence Service';
    case '00001816-0000-1000-8000-00805f9b34fb':
      return 'Cycling Speed and Cadence Service';
    case '00001818-0000-1000-8000-00805f9b34fb':
      return 'Cycling Power Service';
    case '00001819-0000-1000-8000-00805f9b34fb':
      return 'Location and Navigation Service';
    case '0000181a-0000-1000-8000-00805f9b34fb':
      return 'Environmental Sensing Service';
    case '0000181b-0000-1000-8000-00805f9b34fb':
      return 'Body Composition Service';
    case '0000181c-0000-1000-8000-00805f9b34fb':
      return 'User Data Service';
    case '0000181d-0000-1000-8000-00805f9b34fb':
      return 'Weight Scale Service';
    case '0000181e-0000-1000-8000-00805f9b34fb':
      return 'Bond Management Service';
    case '0000181f-0000-1000-8000-00805f9b34fb':
      return 'Continuous Glucose Monitoring Service';
    case '00001820-0000-1000-8000-00805f9b34fb':
      return 'Internet Protocol Support Service';
    default:
      return 'Unknown Customed Service';
  }
  return null;
}

var lookupCharacteristic = function LookupCharacteristic(uuid)
{
  switch (uuid) {
    case '00002a00-0000-1000-8000-00805f9b34fb':
      return 'Device Name';
    case '00002a01-0000-1000-8000-00805f9b34fb':
      return 'Appearance';
    case '00002a02-0000-1000-8000-00805f9b34fb':
      return 'Peripheral Privacy Flag';
    case '00002a03-0000-1000-8000-00805f9b34fb':
      return 'Reconnection Address';
    case '00002a04-0000-1000-8000-00805f9b34fb':
      return 'Peripheral Preferred Connection Parameters';
    case '00002a05-0000-1000-8000-00805f9b34fb':
      return 'Service Changed';
    case '00002a06-0000-1000-8000-00805f9b34fb':
      return 'Alert Level';
    case '00002a07-0000-1000-8000-00805f9b34fb':
      return 'Tx Power Level';
    case '00002a08-0000-1000-8000-00805f9b34fb':
      return 'Date Time';
    case '00002a09-0000-1000-8000-00805f9b34fb':
      return 'Day of Week';
    case '00002a0a-0000-1000-8000-00805f9b34fb':
      return 'Day Date Time';
    case '00002a0c-0000-1000-8000-00805f9b34fb':
      return 'Exact Time 256';
    case '00002a0d-0000-1000-8000-00805f9b34fb':
      return 'DST Offset';
    case '00002a0e-0000-1000-8000-00805f9b34fb':
      return 'Time Zone';
    case '00002a0f-0000-1000-8000-00805f9b34fb':
      return 'Local Time Information';
    case '00002a11-0000-1000-8000-00805f9b34fb':
      return 'Time with DST';
    case '00002a12-0000-1000-8000-00805f9b34fb':
      return 'Time Accuracy';
    case '00002a13-0000-1000-8000-00805f9b34fb':
      return 'Time Source';
    case '00002a14-0000-1000-8000-00805f9b34fb':
      return 'Reference Time Information';
    case '00002a16-0000-1000-8000-00805f9b34fb':
      return 'Time Update Control Point';
    case '00002a17-0000-1000-8000-00805f9b34fb':
      return 'Time Update State';
    case '00002a18-0000-1000-8000-00805f9b34fb':
      return 'Glucose Measurement';
    case '00002a19-0000-1000-8000-00805f9b34fb':
      return 'Battery Level';
    case '00002a1c-0000-1000-8000-00805f9b34fb':
      return 'Temperature Measurement';
    case '00002a1d-0000-1000-8000-00805f9b34fb':
      return 'Temperature Type';
    case '00002a1e-0000-1000-8000-00805f9b34fb':
      return 'Intermediate Temperature';
    case '00002a21-0000-1000-8000-00805f9b34fb':
      return 'Measurement Interval';
    case '00002a22-0000-1000-8000-00805f9b34fb':
      return 'Boot Keyboard Input Report';
    case '00002a23-0000-1000-8000-00805f9b34fb':
      return 'System ID';
    case '00002a24-0000-1000-8000-00805f9b34fb':
      return 'Model Number String';
    case '00002a25-0000-1000-8000-00805f9b34fb':
      return 'Serial Number String';
    case '00002a26-0000-1000-8000-00805f9b34fb':
      return 'Firmware Revision String';
    case '00002a27-0000-1000-8000-00805f9b34fb':
      return 'Hardware Revision String';
    case '00002a28-0000-1000-8000-00805f9b34fb':
      return 'Software Revision String';
    case '00002a29-0000-1000-8000-00805f9b34fb':
      return 'Manufacturer Name String';
    case '00002a2a-0000-1000-8000-00805f9b34fb':
      return 'IEEE 11073-20601 Regulatory Certification Data List';
    case '00002a2b-0000-1000-8000-00805f9b34fb':
      return 'Current Time';
    case '00002a2c-0000-1000-8000-00805f9b34fb':
      return 'Magnetic Declination';
    case '00002a31-0000-1000-8000-00805f9b34fb':
      return 'Scan Refresh';
    case '00002a32-0000-1000-8000-00805f9b34fb':
      return 'Boot Keyboard Output Report';
    case '00002a33-0000-1000-8000-00805f9b34fb':
      return 'Boot Mouse Input Report';
    case '00002a34-0000-1000-8000-00805f9b34fb':
      return 'Glucose Measurement Context';
    case '00002a35-0000-1000-8000-00805f9b34fb':
      return 'Blood Pressure Measurement';
    case '00002a36-0000-1000-8000-00805f9b34fb':
      return 'Intermediate Cuff Pressure';
    case '00002a37-0000-1000-8000-00805f9b34fb':
      return 'Heart Rate Measurement';
    case '00002a38-0000-1000-8000-00805f9b34fb':
      return 'Body Sensor Location';
    case '00002a39-0000-1000-8000-00805f9b34fb':
      return 'Heart Rate Control Point';
    case '00002a3f-0000-1000-8000-00805f9b34fb':
      return 'Alert Status';
    case '00002a40-0000-1000-8000-00805f9b34fb':
      return 'Ringer Control Point';
    case '00002a41-0000-1000-8000-00805f9b34fb':
      return 'Ringer Setting';
    case '00002a42-0000-1000-8000-00805f9b34fb':
      return 'Alert Category ID Bit Mask';
    case '00002a43-0000-1000-8000-00805f9b34fb':
      return 'Alert Category ID';
    case '00002a44-0000-1000-8000-00805f9b34fb':
      return 'Alert Notification Control Point';
    case '00002a45-0000-1000-8000-00805f9b34fb':
      return 'Unread Alert Status';
    case '00002a46-0000-1000-8000-00805f9b34fb':
      return 'New Alert';
    case '00002a47-0000-1000-8000-00805f9b34fb':
      return 'Supported New Alert Category';
    case '00002a48-0000-1000-8000-00805f9b34fb':
      return 'Supported Unread Alert Category';
    case '00002a49-0000-1000-8000-00805f9b34fb':
      return 'Blood Pressure Feature';
    case '00002a4a-0000-1000-8000-00805f9b34fb':
      return 'HID Information';
    case '00002a4b-0000-1000-8000-00805f9b34fb':
      return 'Report Map';
    case '00002a4c-0000-1000-8000-00805f9b34fb':
      return 'HID Control Point';
    case '00002a4d-0000-1000-8000-00805f9b34fb':
      return 'Report';
    case '00002a4e-0000-1000-8000-00805f9b34fb':
      return 'Protocol Mode';
    case '00002a4f-0000-1000-8000-00805f9b34fb':
      return 'Scan Interval Window';
    case '00002a50-0000-1000-8000-00805f9b34fb':
      return 'PnP ID';
    case '00002a51-0000-1000-8000-00805f9b34fb':
      return 'Glucose Feature';
    case '00002a52-0000-1000-8000-00805f9b34fb':
      return 'Record Access Control Point';
    case '00002a53-0000-1000-8000-00805f9b34fb':
      return 'RSC Measurement';
    case '00002a54-0000-1000-8000-00805f9b34fb':
      return 'RSC Feature';
    case '00002a55-0000-1000-8000-00805f9b34fb':
      return 'SC Control Point';
    case '00002a56-0000-1000-8000-00805f9b34fb':
      return 'Digital';
    case '00002a58-0000-1000-8000-00805f9b34fb':
      return 'Analog';
    case '00002a5a-0000-1000-8000-00805f9b34fb':
      return 'Aggregate';
    case '00002a5b-0000-1000-8000-00805f9b34fb':
      return 'CSC Measurement';
    case '00002a5c-0000-1000-8000-00805f9b34fb':
      return 'CSC Feature';
    case '00002a5d-0000-1000-8000-00805f9b34fb':
      return 'Sensor Location';
    case '00002a63-0000-1000-8000-00805f9b34fb':
      return 'Cycling Power Measurement';
    case '00002a64-0000-1000-8000-00805f9b34fb':
      return 'Cycling Power Vector';
    case '00002a65-0000-1000-8000-00805f9b34fb':
      return 'Cycling Power Feature';
    case '00002a66-0000-1000-8000-00805f9b34fb':
      return 'Cycling Power Control Point';
    case '00002a67-0000-1000-8000-00805f9b34fb':
      return 'Location and Speed';
    case '00002a67-0000-1000-8000-00805f9b34fb':
      return 'Navigation';
    case '00002a69-0000-1000-8000-00805f9b34fb':
      return 'Position Quality';
    case '00002a6a-0000-1000-8000-00805f9b34fb':
      return 'LN Feature';
    case '00002a6b-0000-1000-8000-00805f9b34fb':
      return 'LN Control Point';
    case '00002a6c-0000-1000-8000-00805f9b34fb':
      return 'Elevation';
    case '00002a6d-0000-1000-8000-00805f9b34fb':
      return 'Pressure';
    case '00002a6e-0000-1000-8000-00805f9b34fb':
      return 'Temperature';
    case '00002a6f-0000-1000-8000-00805f9b34fb':
      return 'Humidity';
    case '00002a70-0000-1000-8000-00805f9b34fb':
      return 'True Wind Speed';
    case '00002a71-0000-1000-8000-00805f9b34fb':
      return 'True Wind Direction';
    case '00002a72-0000-1000-8000-00805f9b34fb':
      return 'Apparent Wind Speed';
    case '00002a73-0000-1000-8000-00805f9b34fb':
      return 'Apparent Wind Direction ';
    case '00002a74-0000-1000-8000-00805f9b34fb':
      return 'Gust Factor';
    case '00002a75-0000-1000-8000-00805f9b34fb':
      return 'Pollen Concentration';
    case '00002a76-0000-1000-8000-00805f9b34fb':
      return 'UV Index';
    case '00002a77-0000-1000-8000-00805f9b34fb':
      return 'Irradiance';
    case '00002a78-0000-1000-8000-00805f9b34fb':
      return 'Rainfall';
    case '00002a79-0000-1000-8000-00805f9b34fb':
      return 'Wind Chill';
    case '00002a7a-0000-1000-8000-00805f9b34fb':
      return 'Heat Index';
    case '00002a7b-0000-1000-8000-00805f9b34fb':
      return 'Dew Point';
    case '00002a7d-0000-1000-8000-00805f9b34fb':
      return 'Descriptor Value Changed';
    case '00002a7e-0000-1000-8000-00805f9b34fb':
      return 'Aerobic Heart Rate Lower Limit';
    case '00002a7f-0000-1000-8000-00805f9b34fb':
      return 'Aerobic Threshold';
    case '00002a80-0000-1000-8000-00805f9b34fb':
      return 'Age';
    case '00002a81-0000-1000-8000-00805f9b34fb':
      return 'Anaerobic Heart Rate Lower Limit';
    case '00002a82-0000-1000-8000-00805f9b34fb':
      return 'Anaerobic Heart Rate Upper Limit';
    case '00002a83-0000-1000-8000-00805f9b34fb':
      return 'Anaerobic Threshold';
    case '00002a84-0000-1000-8000-00805f9b34fb':
      return 'Aerobic Heart Rate Upper Limit';
    case '00002a85-0000-1000-8000-00805f9b34fb':
      return 'Date of Birth';
    case '00002a86-0000-1000-8000-00805f9b34fb':
      return 'Date of Threshold Assessment ';
    case '00002a87-0000-1000-8000-00805f9b34fb':
      return 'Email Address';
    case '00002a88-0000-1000-8000-00805f9b34fb':
      return 'Fat Burn Heart Rate Lower Limit';
    case '00002a89-0000-1000-8000-00805f9b34fb':
      return 'Fat Burn Heart Rate Upper Limit';
    case '00002a8a-0000-1000-8000-00805f9b34fb':
      return 'First Name';
    case '00002a8b-0000-1000-8000-00805f9b34fb':
      return 'Five Zone Heart Rate Limits';
    case '00002a8c-0000-1000-8000-00805f9b34fb':
      return 'Gender';
    case '00002a8d-0000-1000-8000-00805f9b34fb':
      return 'Heart Rate Max';
    case '00002a8e-0000-1000-8000-00805f9b34fb':
      return 'Height';
    case '00002a8f-0000-1000-8000-00805f9b34fb':
      return 'Hip Circumference';
    case '00002a90-0000-1000-8000-00805f9b34fb':
      return 'Last Name';
    case '00002a91-0000-1000-8000-00805f9b34fb':
      return 'Maximum Recommended Heart Rate';
    case '00002a92-0000-1000-8000-00805f9b34fb':
      return 'Resting Heart Rate';
    case '00002a93-0000-1000-8000-00805f9b34fb':
      return 'Sport Type for Aerobic and Anaerobic Thresholds';
    case '00002a94-0000-1000-8000-00805f9b34fb':
      return 'Three Zone Heart Rate Limits';
    case '00002a95-0000-1000-8000-00805f9b34fb':
      return 'Two Zone Heart Rate Limit';
    case '00002a96-0000-1000-8000-00805f9b34fb':
      return 'VO2 Max';
    case '00002a97-0000-1000-8000-00805f9b34fb':
      return 'Waist Circumference ';
    case '00002a98-0000-1000-8000-00805f9b34fb':
      return 'Weight';
    case '00002a99-0000-1000-8000-00805f9b34fb':
      return 'Database Change Increment';
    case '00002a9a-0000-1000-8000-00805f9b34fb':
      return 'User Index';
    case '00002a9b-0000-1000-8000-00805f9b34fb':
      return 'Body Composition Feature';
    case '00002a9c-0000-1000-8000-00805f9b34fb':
      return 'Body Composition Measurement';
    case '00002a9d-0000-1000-8000-00805f9b34fb':
      return 'Weight Measurement';
    case '00002a9e-0000-1000-8000-00805f9b34fb':
      return 'Weight Scale Feature';
    case '00002a9f-0000-1000-8000-00805f9b34fb':
      return 'User Control Point';
    case '00002aa0-0000-1000-8000-00805f9b34fb':
      return 'Magnetic Flux Density - 2D';
    case '00002aa1-0000-1000-8000-00805f9b34fb':
      return 'Magnetic Flux Density - 3D';
    case '00002aa2-0000-1000-8000-00805f9b34fb':
      return 'Language';
    case '00002aa3-0000-1000-8000-00805f9b34fb':
      return 'Barometric Pressure Trend';
    case '00002aa4-0000-1000-8000-00805f9b34fb':
      return 'Bond Management Control Point';
    case '00002aa5-0000-1000-8000-00805f9b34fb':
      return 'Bond Management Feature';
    case '00002aa6-0000-1000-8000-00805f9b34fb':
      return 'Central Address Resolution';
    case '00002aa7-0000-1000-8000-00805f9b34fb':
      return 'CGM Measurement';
    case '00002aa8-0000-1000-8000-00805f9b34fb':
      return 'GM Feature';
    case '00002aa9-0000-1000-8000-00805f9b34fb':
      return 'CGM Status';
    case '00002aaa-0000-1000-8000-00805f9b34fb':
      return 'CGM Session Start Time';
    case '00002aab-0000-1000-8000-00805f9b34fb':
      return 'CGM Session Run Time';
    case '00002aac-0000-1000-8000-00805f9b34fb':
      return 'CGM Specific Ops Control Point';
    default:
      return 'Unknown Customed Characteristic';
  }
  return null;
}

var lookupDescriptor = function LoopupDescriptor(uuid)
{
  switch (uuid) {
    case '00002900-0000-1000-8000-00805f9b34fb':
      return 'Characteristic Extended Properties';
    case '00002901-0000-1000-8000-00805f9b34fb':
      return 'Characteristic User Description';
    case '00002902-0000-1000-8000-00805f9b34fb':
      return 'Client Characteristic Configuration';
    case '00002903-0000-1000-8000-00805f9b34fb':
      return 'Server Characteristic Configuration';
    case '00002904-0000-1000-8000-00805f9b34fb':
      return 'Characteristic Presentation Format';
    case '00002905-0000-1000-8000-00805f9b34fb':
      return 'Characteristic Aggregate Format';
    case '00002906-0000-1000-8000-00805f9b34fb':
      return 'Valid Range';
    case '00002907-0000-1000-8000-00805f9b34fb':
      return 'External Report Reference';
    case '00002908-0000-1000-8000-00805f9b34fb':
      return 'Report Reference';
    case '00002909-0000-1000-8000-00805f9b34fb':
      return 'Number of Digitals';
    case '0000290a-0000-1000-8000-00805f9b34fb':
      return 'Value Trigger Setting';
    case '0000290b-0000-1000-8000-00805f9b34fb':
      return 'Environmental Sensing Configuration';
    case '0000290c-0000-1000-8000-00805f9b34fb':
      return 'Environmental Sensing Measurement	';
    case '0000290d-0000-1000-8000-00805f9b34fb':
      return 'Environmental Sensing Trigger Setting	';
    case '0000290e-0000-1000-8000-00805f9b34fb':
      return 'Time Trigger Setting';
    default:
      return 'Unknown Customed Descriptor';
  }
  return null;
}