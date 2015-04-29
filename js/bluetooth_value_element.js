'use strict';

var createBluetoothValueElement = function CreateBluetoothValueElement(type, uuid, container)
{
  switch (type) {
    case 'characteristic':
      return createBluetoothCharacteristicValueElement(uuid, container);
    case 'descriptor':
      return createBluetoothDescriptorValueElement(uuid, container);
    default:
      return null;
  }
  return null;
}

var createBluetoothCharacteristicValueElement = function CreateBluetoothCharacteristicValueElement(uuid, container)
{
  switch (uuid) {
    case '00002a37-0000-1000-8000-00805f9b34fb':
      return new BluetoothHeartRateMeasurementCharacteristicViewElement(container);
    case '00002a38-0000-1000-8000-00805f9b34fb':
      return new BluetoothBodySensorLocationCharacteristicViewElement(container);
    default:
      return new BluetoothDefaultCharacteristicValueElement(container);
  }
  return null;
}

var createBluetoothDescriptorValueElement = function CreateBluetoothDescriptorValueElement(uuid, container)
{
  switch (uuid) {
    case '00002902-0000-1000-8000-00805f9b34fb':
      return new BluetoothClientCharacteristicConfigurationDescriptorValueElement(container);
    default:
      return new BluetoothDefaultDescriptorValueElement(container);
  }
  return null;
}

// Bluetooth Characteristic Value Element
function BluetoothDefaultCharacteristicValueElement(container)
{
  this._translate = navigator.mozL10n.get;
  this._container = container;
  this._selfContainer = document.createElement('div');
  this._container.appendChild(this._selfContainer);
  
  this._inputRead = document.createElement('input');
  this._inputRead.type = 'text';
  this._inputRead.readOnly = true;
  this._inputWrite = document.createElement('input');
  this._inputWrite.type = 'text';
  this._selfContainer.appendChild(this._inputRead);
  this._selfContainer.appendChild(this._inputWrite);
}

BluetoothDefaultCharacteristicValueElement.prototype = {
  setReadJson: function SetReadJson(json)
  {
    if (json) {
      this._inputRead.value = json.value;
    } else {
      this._inputRead.value = "";
    }
  },
  
  getWriteJson: function GetWriteJson()
  {
    var value = JSON.parse(this._inputWrite.value);
    var ab = new ArrayBuffer(value.length);
    var buffer = new Uint8Array(ab);
    for (var i in value) {
      buffer[i] = value[i];
    }
    return { value: ab };
  }
}

function BluetoothHeartRateMeasurementCharacteristicViewElement(container)
{
  this._translate = navigator.mozL10n.get;
  this._container = container;
  this._selfContainer = document.createElement('div');
  this._container.appendChild(this._selfContainer);
  
  var labelHeartRateFormat = document.createTextNode("Heart rate format: ");
  this._labelHeartRateFormat = document.createTextNode("");
  var labelSensorContactSupported = document.createTextNode("Sensor contact supported: ");
  this._labelSensorContactSupported = document.createTextNode("");
  var labelSensorContactDetected = document.createTextNode("Sensor contact detected: ");
  this._labelSensorContactDetected = document.createTextNode("");
  var labelEnergyExpendedPresent = document.createTextNode("Energy expended present: ");
  this._labelEnergyExpendedPresent = document.createTextNode("");
  var labelRrIntervalPresent = document.createTextNode("R-R interval present: ");
  this._labelRrIntervalPresent = document.createTextNode("");
  var labelHeartRateValue = document.createTextNode("Heart rate value: ");
  this._labelHeartRateValue = document.createTextNode("");
  var labelEnergyExpendedValue = document.createTextNode("Energy expended value: ");
  this._labelEnergyExpendedValue = document.createTextNode("");
  var labelRrIntervalValues = document.createTextNode("R-R interval values: ");
  this._labelRrIntervalValues = document.createTextNode("");
  
  this._selfContainer.appendChild(labelHeartRateFormat);
  this._selfContainer.appendChild(this._labelHeartRateFormat);
  this._selfContainer.appendChild(document.createElement('br'));
  this._selfContainer.appendChild(labelSensorContactSupported);
  this._selfContainer.appendChild(this._labelSensorContactSupported);
  this._selfContainer.appendChild(document.createElement('br'));
  this._selfContainer.appendChild(labelSensorContactDetected);
  this._selfContainer.appendChild(this._labelSensorContactDetected);
  this._selfContainer.appendChild(document.createElement('br'));
  this._selfContainer.appendChild(labelEnergyExpendedPresent);
  this._selfContainer.appendChild(this._labelEnergyExpendedPresent);
  this._selfContainer.appendChild(document.createElement('br'));
  this._selfContainer.appendChild(labelRrIntervalPresent);
  this._selfContainer.appendChild(this._labelRrIntervalPresent);
  this._selfContainer.appendChild(document.createElement('br'));
  this._selfContainer.appendChild(labelHeartRateValue);
  this._selfContainer.appendChild(this._labelHeartRateValue);
  this._selfContainer.appendChild(document.createElement('br'));
  this._selfContainer.appendChild(labelEnergyExpendedValue);
  this._selfContainer.appendChild(this._labelEnergyExpendedValue);
  this._selfContainer.appendChild(document.createElement('br'));
  this._selfContainer.appendChild(labelRrIntervalValues);
  this._selfContainer.appendChild(this._labelRrIntervalValues);
}

BluetoothHeartRateMeasurementCharacteristicViewElement.prototype = {
  setReadJson: function SetReadJson(json)
  {
    if (json) {
      this._labelHeartRateFormat.textContent = json.format16 ? "UINT16" : "UINT8";
      this._labelSensorContactSupported.textContent = json.sensorContactSupported ? "supported" : "not supported";
      this._labelSensorContactDetected.textContent = json.sensorContactDetected ? "detected" : "not detected";
      this._labelEnergyExpendedPresent.textContent = json.energyExpendedPresent ? "present" : "not present";
      this._labelRrIntervalPresent.textContent = json.rrIntervalPresent ? "present" : "not present";
      this._labelHeartRateValue.textContent = json.heartRateValue;
      this._labelEnergyExpendedValue.textContent = json.energyExpendedPresent ? json.energyExpendedValue : "not present";
      this._labelRrIntervalValues.textContent = json.rrIntervalValues.length > 0 ? json.rrIntervalValues[0] + " (" + json.rrIntervalValues.length + " in total)" : "not present";
    } else {
      this._labelHeartRateFormat.textContent = "";
      this._labelSensorContactSupported.textContent = "";
      this._labelSensorContactDetected.textContent = "";
      this._labelEnergyExpendedPresent.textContent = "";
      this._labelRrIntervalPresent.textContent = "";
      this._labelHeartRateValue.textContent = "";
      this._labelEnergyExpendedValue.textContent = "";
      this._labelRrIntervalValues.textContent = "";
    }
  },
  
  getWriteJson: function GetWriteJson()
  {
    return { value: null };
  }
}

function BluetoothBodySensorLocationCharacteristicViewElement(container)
{
  this._translate = navigator.mozL10n.get;
  this._container = container;
  this._selfContainer = document.createElement('div');
  this._container.appendChild(this._selfContainer);
  
  var labelBodySensorLocation = document.createTextNode("Body sensor location: ");
  this._labelBodySensorLocation = document.createTextNode("");
  this._selfContainer.appendChild(labelBodySensorLocation);
  this._selfContainer.appendChild(this._labelBodySensorLocation);
}

BluetoothBodySensorLocationCharacteristicViewElement.prototype = {
  setReadJson: function SetReadJson(json)
  {
    if (json) {
      switch (json.position) {
        case 0:
          this._labelBodySensorLocation.textContent = "other";
          break;
        case 1:
          this._labelBodySensorLocation.textContent = "chest";
          break;
        case 2:
          this._labelBodySensorLocation.textContent = "wrist";
          break;
        case 3:
          this._labelBodySensorLocation.textContent = "finger";
          break;
        case 4:
          this._labelBodySensorLocation.textContent = "hand";
          break;
        case 5:
          this._labelBodySensorLocation.textContent = "ear lobe";
          break;
        case 6:
          this._labelBodySensorLocation.textContent = "foot";
          break;
        default:
          this._labelBodySensorLocation.textContent = "unkonwn";
          break;
      }
    } else {
      this._labelBodySensorLocation.textContent = "";
    }
  },
  
  getWriteJson: function GetWriteJson()
  {
    return { value: null };
  }
}

// Bluetooth Descriptor Value Element
function BluetoothDefaultDescriptorValueElement(container)
{
  this._translate = navigator.mozL10n.get;
  this._container = container;
  this._selfContainer = document.createElement('div');
  this._container.appendChild(this._selfContainer);
  
  this._inputRead = document.createElement('input');
  this._inputRead.type = 'text';
  this._inputRead.readOnly = true;
  this._inputWrite = document.createElement('input');
  this._inputWrite.type = 'text';
  this._selfContainer.appendChild(this._inputRead);
  this._selfContainer.appendChild(this._inputWrite);
}

BluetoothDefaultDescriptorValueElement.prototype = {
  setReadJson: function SetReadJson(json)
  {
    if (json) {
      this._inputRead.value = json.value;
    } else {
      this._inputRead.value = "";
    }
  },
  
  getWriteJson: function GetWriteJson()
  {
    var value = JSON.parse(this._inputWrite.value);
    var ab = new ArrayBuffer(value.length);
    var buffer = new Uint8Array(ab);
    for (var i in value) {
      buffer[i] = value[i];
    }
    return { value: ab };
  }
}

function BluetoothClientCharacteristicConfigurationDescriptorValueElement(container)
{
  this._translate = navigator.mozL10n.get;
  this._container = container;
  this._selfContainer = document.createElement('div');
  this._container.appendChild(this._selfContainer);
  
  this._checkboxNotification = document.createElement('input');
  this._checkboxNotification.type = 'checkbox';
  var labelNotification = document.createTextNode('Notification');
  this._checkboxIndication = document.createElement('input');
  this._checkboxIndication.type = 'checkbox';
  var labelIndication = document.createTextNode('Indication');
  this._selfContainer.appendChild(this._checkboxNotification);
  this._selfContainer.appendChild(labelNotification);
  this._selfContainer.appendChild(this._checkboxIndication);
  this._selfContainer.appendChild(labelIndication);
}

BluetoothClientCharacteristicConfigurationDescriptorValueElement.prototype = {
  setReadJson: function SetReadJson(json)
  {
    if (json) {
      this._checkboxNotification.checked = json.notification;
      this._checkboxIndication.checked = json.indication;
    } else {
      this._checkboxNotification.checked = false;
      this._checkboxIndication.checked = false;
    }
  },
  
  getWriteJson: function GetWriteJson()
  {
    return {
      notification: this._checkboxNotification.checked,
      indication: this._checkboxIndication.checked
    }
  }
}