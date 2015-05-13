'use strict';

// Bluetooth Element Handler
function BluetoothElementHandler(container, controller)
{
  this._translate = navigator.mozL10n.get;
  this._convert = convert;
  this._container = container;
  this._controller = controller;
  
  this._selfContainer = document.createElement('div');
  this._container.appendChild(this._selfContainer);
  
  this._elements = [];
  
  this._initEvents();
}

BluetoothElementHandler.prototype = {
  _initEvents: function InitEvents()
  {
    this._controller.addObserver('adapteradded', this, this._onAdapterAdded);
    this._controller.addObserver('adapterremoved', this, this._onAdapterRemoved);
  },
  
  _onAdapterAdded: function OnAdapterAdded(adapter)
  {
    this._elements.push(new BluetoothAdapterElement(this._selfContainer, adapter));
  },
  
  _onAdapterRemoved: function OnAdapterRemoved(address)
  {
    removeAllMatched(this._elements,
                     address,
                     function(element, address) {
                       return element.address == address;
                     }.bind(this),
                     function(element) {
                       element.cleanup();
                     }.bind(this));
  },
  
  cleanup: function Cleanup()
  {
    this._controller.removeObserver('adapteradded', this, this._onAdapterAdded);
    this._controller.removeObserver('adapterremoved', this, this._onAdapterRemoved);
    
    this._container.removeChild(this._selfContainer);
  }
}

// Bluetooth Adapter Element
function BluetoothAdapterElement(container, adapter)
{
  this._translate = navigator.mozL10n.get;
  this._convert = convert;
  this._container = container;
  this._adapter = adapter;
 
  this._selfContainer = document.createElement('div');
  this._container.appendChild(this._selfContainer);
  
  // Bluetooth Name & Address
  this._informationContainer = document.createElement('div');
  var nameContainer = document.createElement('div');
  this._labelName = document.createTextNode(this._adapter.name);
  nameContainer.appendChild(document.createTextNode(this._translate('bluetooth_device_name') + ": "));
  nameContainer.appendChild(this._labelName);
  nameContainer.appendChild(document.createElement('br'));
  var addressContainer = document.createElement('div');
  this._labelAddress = document.createTextNode(this._adapter.address);
  addressContainer.appendChild(document.createTextNode(this._translate('bluetooth_device_address') + ": "));
  addressContainer.appendChild(this._labelAddress);
  addressContainer.appendChild(document.createElement('br'));
  this._informationContainer.appendChild(nameContainer);
  this._informationContainer.appendChild(addressContainer);
  this._selfContainer.appendChild(this._informationContainer);
  
  // Bluetooth Enable
  this._enableContainer = document.createElement('div');
  this._checkboxEnable = document.createElement('input');
  this._checkboxEnable.type = 'checkbox';
  this._labelEnable = document.createTextNode(this._convert('BluetoothAdapterState', this._adapter.state));
  this._enableContainer.appendChild(this._checkboxEnable);
  this._enableContainer.appendChild(this._labelEnable);
  this._selfContainer.appendChild(this._enableContainer);
  
  // Bluetooth Discoverable
  this._discoverableContainer = document.createElement('div');
  this._checkboxDiscoverable = document.createElement('input');
  this._checkboxDiscoverable.type = 'checkbox';
  this._labelDiscoverable = document.createTextNode(this._convert('BluetoothAdapterDiscoverable', this._adapter.discoverable));
  this._discoverableContainer.appendChild(this._checkboxDiscoverable);
  this._discoverableContainer.appendChild(this._labelDiscoverable);
//  hideElement(this._discoverableContainer); // setting discoverable is not so useful in GATT client cases
  this._discoverableContainer.disable = true;
  this._selfContainer.appendChild(this._discoverableContainer);
  
  // Bluetooth Discovery
  this._discoveryContainer = document.createElement('div');
  this._checkboxDiscovery = document.createElement('input');
  this._checkboxDiscovery.type = 'checkbox';
  this._labelDiscovering = document.createTextNode(this._convert('BluetoothAdapterDiscovering', this._adapter.discovering));
  this._discoveryContainer.appendChild(this._checkboxDiscovery);
  this._discoveryContainer.appendChild(this._labelDiscovering);
//  hideElement(this._discoveryContainer); // general discovery is not so useful in GATT client cases
  this._discoveryContainer.disable = true;
  this._selfContainer.appendChild(this._discoveryContainer);
  
  // Bluetooth Low Energy Scan
  this._leScanContainer = document.createElement('div');
  this._checkboxLeScan = document.createElement('input');
  this._checkboxLeScan.type = 'checkbox';
  this._labelLeScan = document.createTextNode(this._convert('BluetoothAdapterLeScanning', 'stopped'));
  this._leScanContainer.appendChild(this._checkboxLeScan);
  this._leScanContainer.appendChild(this._labelLeScan);
  this._leScanContainer.disable = true;
  this._selfContainer.appendChild(this._leScanContainer);
  
  // Bluetooth Found Device List
  this._foundDeviceListContainer = document.createElement('div');
  var labelFoundDeviceList = document.createTextNode(this._translate('bluetooth_found_device_list') + ": ");
  this._foundDeviceListContainer.appendChild(labelFoundDeviceList);
  this._foundDeviceListContainer.appendChild(document.createElement('br'));
  this._listFoundDeviceList = document.createElement('ul');
  this._foundDeviceListContainer.appendChild(this._listFoundDeviceList);
  this._selfContainer.appendChild(this._foundDeviceListContainer);
  hideElement(this._foundDeviceListContainer);
  
  this._devices = [];
  this._leScanHandle = null;

  this._initEvents();
  
  this.address = this._adapter.address;
}

BluetoothAdapterElement.prototype = {
  _initEvents: function InitEvents()
  {
    this._checkboxEnable.addEventListener('click', this._onEnableClick.bind(this));
    this._checkboxDiscoverable.addEventListener('click', this._onDiscoverableClick.bind(this));
    this._checkboxDiscovery.addEventListener('click', this._onDiscoveryClick.bind(this));
    this._checkboxLeScan.addEventListener('click', this._onLeScanClick.bind(this));
    
    this._adapter.addObserver('adapterstatechanged', this, this._onAdapterStateChanged);
    this._adapter.addObserver('adapteraddresschanged', this, this._onAdapterAddressChanged);
    this._adapter.addObserver('adapternamechanged', this, this._onAdapterNameChanged);
    this._adapter.addObserver('adapterdiscoverablechanged', this, this._onAdapterDiscoverableChanged);
    this._adapter.addObserver('adapterdiscoveringchanged', this, this._onAdapterDiscoveringChanged);
    this._adapter.addObserver('generaldevicefound', this, this._onGeneralDeviceFound);
    this._adapter.addObserver('ledevicefound', this, this._onLeDeviceFound);
  },
  
  _onEnableClick: function OnEnableClick()
  {
    this._checkboxEnable.disable = true;
    this._discoverableContainer.disable = true;
    this._discoveryContainer.disable = true;
    this._leScanContainer.disable = true;
    if (this._checkboxEnable.checked) {
      this._adapter.enable().then(function onResolve() {
        showElement(this._foundDeviceListContainer);
        this._checkboxEnable.disable = false;
        this._discoverableContainer.disable = false;
        this._discoveryContainer.disable = false;
        this._leScanContainer.disable = false;
      }.bind(this), function onReject(reason) {
        this._checkboxEnable.disable = false;
      }.bind(this));
    } else {
      hideElement(this._foundDeviceListContainer);
      for (var i in this._devices) {
        this._devices[i].cleanup();
      }
      this._devices = [];
      
      this._adapter.disable().then(function onResolve() {
        this._checkboxEnable.disable = false;
        this._checkboxDiscoverable.checked = false;
        this._checkboxDiscovery.checked = false;
        this._checkboxLeScan.checked = false;
      }.bind(this), function onReject(reason) {
        this._checkboxEnable.disable = false;
      }.bind(this));
    }
  },
  
  _onDiscoverableClick: function OnDiscoverableClick()
  {
    this._checkboxDiscoverable.disable = true;
    this._adapter.setDiscoverable(this._checkboxDiscoverable.checked).then(function onResolve() {
      // no-op
    }.bind(this), function onReject(reason) {
      this._checkboxDiscoverable.disable = false;
    }.bind(this));
  },
  
  _onDiscoveryClick: function OnDiscoveryClick()
  {
    this._checkboxDiscovery.disable = true;
    if (this._checkboxDiscovery.checked) {
      for (var i in this._devices) {
        this._devices[i].cleanup();
      }
      this._devices = [];
      
      this._adapter.startDiscovery().then(function onResolve() {
        // no-op
      }.bind(this), function onReject(reason) {
        this._checkboxDiscovery.disable = false;
      }.bind(this));
    } else {
      this._adapter.stopDiscovery().then(function onResolve() {
        // no-op
      }.bind(this), function onReject(reason) {
        this._checkboxDiscovery.disable = false;
      }.bind(this));
    }
  },
  
  _onLeScanClick: function OnLeScanClick()
  {
    this._checkboxLeScan.disable = true;
    if (this._checkboxLeScan.checked) {
      for (var i in this._devices) {
        this._devices[i].cleanup();
      }
      this._devices = [];
      this._leScanHandle = null;
      
      this._labelLeScan.textContent = this._convert('BluetoothAdapterLeScanning', 'starting');
      this._adapter.startLeScan([]).then(function onResolve(handle) {
        this._leScanHandle = handle;
        this._labelLeScan.textContent = this._convert('BluetoothAdapterLeScanning', 'started');
        this._checkboxLeScan.disable = true;
      }.bind(this), function onReject(reason) {
        this._labelLeScan.textContent = this._convert('BluetoothAdapterLeScanning', 'stopped');
        this._checkboxLeScan.disable = false;
      }.bind(this));
    } else {
      this._labelLeScan.textContent = this._convert('BluetoothAdapterLeScanning', 'stopping');
      this._adapter.stopLeScan(this._leScanHandle).then(function onResolve() {
        this._leScanHandle = null;
        this._labelLeScan.textContent = this._convert('BluetoothAdapterLeScanning', 'stopped');
        this._checkboxLeScan.disable = true;
      }.bind(this), function onReject(reason) {
        this._labelLeScan.textContent = this._convert('BluetoothAdapterLeScanning', 'started');
        this._checkboxLeScan.disable = false;
      }.bind(this));
    }
  },
  
  _onAdapterStateChanged: function OnAdapterStateChanged(adapter)
  {
    if (adapter.state == 'disabled' || adapter.state == 'enabled') {
      this._checkboxEnable.disable = false;
    } else {
      this._checkboxEnable.disable = true;
    }
    this._labelEnable.textContent = this._convert('BluetoothAdapterState', adapter.state);
    if (adapter.state == 'enabled') {
      this._discoverableContainer.disable = false;
      this._discoveryContainer.disable = false;
      this._leScanContainer.disable = false;
    }
  },
  
  _onAdapterAddressChanged: function OnAdapterAddressChanged(adapter)
  {
    this._labelAddress.textContent = adapter.address;
  },
  
  _onAdapterNameChanged: function OnAdapterNameChanged(adapter)
  {
    this._labelName.textContent = adapter.name;
  },
  
  _onAdapterDiscoverableChanged: function OnAdapterDiscoverableChanged(adapter)
  {
    this._checkboxDiscoverable.disable = false;
    this._checkboxDiscoverable.checked = adapter.discoverable;
    this._labelDiscoverable.textContent = this._convert('BluetoothAdapterDiscoverable', adapter.discoverable);
  },
  
  _onAdapterDiscoveringChanged: function OnAdapterDiscoveringChanged(adapter)
  {
    this._checkboxDiscovery.disable = false;
    this._checkboxDiscovery.checked = adapter.discovering;
    this._labelDiscovering.textContent = this._convert('BluetoothAdapterDiscovering', adapter.discovering);
  },
  
  _onGeneralDeviceFound: function OnGeneralDeviceFound(device)
  {
    this._devices.push(new BluetoothDeviceElement(this._listFoundDeviceList, this._adapter, device));
  },
  
  _onLeDeviceFound: function OnLeDeviceFound(device, rssi, record)
  {
    this._devices.push(new BluetoothDeviceElement(this._listFoundDeviceList, this._adapter, device));
  },
  
  cleanup: function Cleanup()
  {
    this._adapter.removeObserver('adapterstatechanged', this, this._onAdapterStateChanged);
    this._adapter.removeObserver('adapteraddresschanged', this, this._onAdapterAddressChanged);
    this._adapter.removeObserver('adapternamechanged', this, this._onAdapterNameChanged);
    this._adapter.removeObserver('adapterdiscoverablechanged', this, this._onAdapterDiscoverableChanged);
    this._adapter.removeObserver('adapterdiscoveringchanged', this, this._onAdapterDiscoveringChanged);
    this._adapter.removeObserver('generaldevicefound', this, this._onGeneralDeviceFound);
    this._adapter.removeObserver('ledevicefound', this, this._onLeDeviceFound);
    
    this._container.removeChild(this._selfContainer);
  }
}

// Bluetooth Device Item Element
function BluetoothDeviceElement(container, adapter, device)
{
  this._translate = navigator.mozL10n.get;
  this._convert = convert;
  this._container = container;
  this._adapter = adapter;
  this._device = device;
 
  this._selfContainer = document.createElement('li');
  this._container.appendChild(this._selfContainer);
  
  // Bluetooth Device Name & Address & Type
  this._summaryContainer = document.createElement('div');
  this._labelDeviceName = document.createTextNode(this._device.name);
  this._labelDeviceAddress = document.createTextNode("[" + this._device.address + "]");
  this._labelDeviceCod = document.createTextNode(this._convertCodMajorService(this._device.cod) + ", {" + this._convert('BluetoothClassOfDeviceMajorDevice', this._device.cod.majorDeviceClass) + "}, {" + this._device.cod.minorDeviceClass + "}");
  this._labelDeviceType = document.createTextNode(this._convert('BluetoothDeviceType', this._device.type));
  this._summaryContainer.appendChild(this._labelDeviceName);
  this._summaryContainer.appendChild(document.createElement('br'));
  this._summaryContainer.appendChild(this._labelDeviceAddress);
  this._summaryContainer.appendChild(document.createElement('br'));
  this._summaryContainer.appendChild(this._labelDeviceCod);
  this._summaryContainer.appendChild(document.createElement('br'));
  this._summaryContainer.appendChild(this._labelDeviceType);
  this._selfContainer.appendChild(this._summaryContainer);
  
  // Bluetooth Device Information
  this._deviceInformationContainer = document.createElement('div');
  this._deviceInformation = new BluetoothDeviceInformationElement(this._deviceInformationContainer, this._adapter, this._device);
  this._selfContainer.appendChild(this._deviceInformationContainer);
  
  this._initEvents();
}

BluetoothDeviceElement.prototype = {
  _initEvents: function InitEvents()
  {
    this._summaryContainer.addEventListener('click', this._onClick.bind(this));
    
    this._device.addObserver('devicecodchanged', this, this._onDeviceCodChanged);
    this._device.addObserver('devicenamechanged', this, this._onDeviceNameChanged);
    this._device.addObserver('devicepairedchanged', this, this._onDevicePairedChanged);
    this._device.addObserver('deviceuuidschanged', this, this._onDeviceUuidsChanged);
  },
  
  _onClick: function OnClick()
  {
    this._deviceInformation.toggle();
  },
  
  _onDeviceCodChanged: function OnDeviceCodChanged(device)
  {
    this._labelDeviceCod.textContent = this._convertCodMajorService(this._device.cod.majorServiceClass) + ", {" + this._convert('BluetoothClassOfDeviceMajorDevice', this._device.cod.majorDeviceClass) + "}, {" + this._device.cod.minorDeviceClass + "}";
  },
  
  _onDeviceNameChanged: function OnDeviceNameChanged(device)
  {
    this._labelDeviceName.textContent = this._device.name;
  },
  
  _onDevicePairedChanged: function OnDevicePairedChanged(device)
  {
    
  },
  
  _onDeviceUuidsChanged: function OnDeviceUuidsChanged(device)
  {
    
  },
  
  _convertCodMajorService: function ConvertCodMajorService(majorServiceClass)
  {
    var text = "";
    var prefix = "{";
    if (majorServiceClass & BluetoothClassOfDevice.LIMITED_DISCOVERABILITY) {
      text += prefix + this._convert('BluetoothClassOfDeviceMajorService', BluetoothClassOfDevice.LIMITED_DISCOVERABILITY);
      prefix = ",";
    }
    if (majorServiceClass & BluetoothClassOfDevice.POSITIONING) {
      text += prefix + this._convert('BluetoothClassOfDeviceMajorService', BluetoothClassOfDevice.POSITIONING);
      prefix = ",";
    }
    if (majorServiceClass & BluetoothClassOfDevice.NETWORKING) {
      text += prefix + this._convert('BluetoothClassOfDeviceMajorService', BluetoothClassOfDevice.NETWORKING);
      prefix = ",";
    }
    if (majorServiceClass & BluetoothClassOfDevice.RENDERING) {
      text += prefix + this._convert('BluetoothClassOfDeviceMajorService', BluetoothClassOfDevice.RENDERING);
      prefix = ",";
    }
    if (majorServiceClass & BluetoothClassOfDevice.CAPTURING) {
      text += prefix + this._convert('BluetoothClassOfDeviceMajorService', BluetoothClassOfDevice.CAPTURING);
      prefix = ",";
    }
    if (majorServiceClass & BluetoothClassOfDevice.OBJECT_TRANSFER) {
      text += prefix + this._convert('BluetoothClassOfDeviceMajorService', BluetoothClassOfDevice.OBJECT_TRANSFER);
      prefix = ",";
    }
    if (majorServiceClass & BluetoothClassOfDevice.AUDIO) {
      text += prefix + this._convert('BluetoothClassOfDeviceMajorService', BluetoothClassOfDevice.AUDIO);
      prefix = ",";
    }
    if (majorServiceClass & BluetoothClassOfDevice.TELEPHONY) {
      text += prefix + this._convert('BluetoothClassOfDeviceMajorService', BluetoothClassOfDevice.TELEPHONY);
      prefix = ",";
    }
    if (majorServiceClass & BluetoothClassOfDevice.INFORMATION) {
      text += prefix + this._convert('BluetoothClassOfDeviceMajorService', BluetoothClassOfDevice.INFORMATION);
      prefix = ",";
    }
    if (text) {
      text += "}";
    } else {
      text = "{}";
    }
    return text;
  },
  
  cleanup: function Cleanup()
  {
    this._device.removeObserver('devicecodchanged', this, this._onDeviceCodChanged);
    this._device.removeObserver('devicenamechanged', this, this._onDeviceNameChanged);
    this._device.removeObserver('devicepairedchanged', this, this._onDevicePairedChanged);
    this._device.removeObserver('deviceuuidschanged', this, this._onDeviceUuidsChanged);
    
    this._container.removeChild(this._selfContainer);
  }
}

// Bluetooth Device Information Element
function BluetoothDeviceInformationElement(container, adapter, device)
{
  this._translate = navigator.mozL10n.get;
  this._convert = convert;
  this._container = container;
  this._adapter = adapter;
  this._device = device;
  
  this._selfContainer = document.createElement('div');
  this._container.appendChild(this._selfContainer);
  
  this._gattServices = [];
 
  // Bluetooth Device Classic Information
  this._classicContainer = document.createElement('div');
  this._selfContainer.appendChild(this._classicContainer);
  // Pair
  this._classicPairContainer = document.createElement('div');
  this._checkboxClassicPair = document.createElement('input');
  this._checkboxClassicPair.type = 'checkbox';
  this._labelClassicPair = document.createTextNode(this._convert('BluetoothDevicePaired', this._device.paired));
  this._classicPairContainer.appendChild(this._checkboxClassicPair);
  this._classicPairContainer.appendChild(this._labelClassicPair);
  this._classicContainer.appendChild(this._classicPairContainer);
  // Visibility
  if (this._device.type != 'classic' && this._device.type != 'dual') {
    hideElement(this._classicContainer);
  }
  
  // Bluetooth Device Gatt Information
  this._gattContainer = document.createElement('div');
  this._selfContainer.appendChild(this._gattContainer);
  // Connect
  this._gattConnectContainer = document.createElement('div');
  this._checkboxGattConnect = document.createElement('input');
  this._checkboxGattConnect.type = 'checkbox';
  this._labelGattConnect = document.createTextNode(this._device.gatt ? this._convert('BluetoothDeviceGattConnection', this._device.gatt.connectionState) : "");
  this._gattConnectContainer.appendChild(this._checkboxGattConnect);
  this._gattConnectContainer.appendChild(this._labelGattConnect);
  this._gattContainer.appendChild(this._gattConnectContainer);
  // Discover Services
  this._gattDiscoverServicesContainer = document.createElement('div');
  this._checkboxDiscoverServices = document.createElement('input');
  this._checkboxDiscoverServices.type = 'checkbox';
  this._labelDiscoverServices = document.createTextNode(this._device.gatt ? this._convert('BluetoothDeviceGattDiscoverServices', this._checkboxDiscoverServices.checked) : "");
  this._gattDiscoverServicesContainer.appendChild(this._checkboxDiscoverServices);
  this._gattDiscoverServicesContainer.appendChild(this._labelDiscoverServices);
  this._gattContainer.appendChild(this._gattDiscoverServicesContainer);
  // Service List
  this._gattServiceListContainer = document.createElement('div');
  var labelGattServiceList = document.createTextNode(this._translate('bluetooth_gatt_service_list') + ": ");
  this._gattServiceListContainer.appendChild(labelGattServiceList);
  this._gattServiceListContainer.appendChild(document.createElement('br'));
  this._listGattServiceList = document.createElement('ul');
  this._gattServiceListContainer.appendChild(this._listGattServiceList);
  this._gattContainer.appendChild(this._gattServiceListContainer);
  // Visibility
  if (this._device.type != 'le' && this._device.type != 'dual') {
    hideElement(this._gattContainer);
  }
  
  this._initEvents();
  
  this.hide();
}

BluetoothDeviceInformationElement.prototype = {
  _initEvents: function InitEvents()
  {
    this._checkboxClassicPair.addEventListener('click', this._onClassicPairClick.bind(this));
    this._checkboxGattConnect.addEventListener('click', this._onGattConnectClick.bind(this));
    this._checkboxDiscoverServices.addEventListener('click', this._onDiscoverServicesClick.bind(this));
    
    this._adapter.addObserver('devicepaired', this, this._onDevicePaired);
    this._adapter.addObserver('deviceunpaired', this, this._onDeviceUnpaired);
    this._adapter.addObserver('devicepairingaborted', this, this._onDevicePairingAborted);
    if (this._device.gatt) {
      this._device.gatt.addObserver('characteristicupdated', this, this._onGattCharacteristicUpdated);
      this._device.gatt.addObserver('connectionstatechanged', this, this._onGattConnectionStateChanged);
    }
  },
  
  _onClassicPairClick: function OnClassicPairClick()
  {
    this._checkboxClassicPair.disable = true;
    if (this._checkboxClassicPair.checked) {
      this._adapter.pair(this._device.address).then(function onResolve() {
        // no-op
      }.bind(this), function onReject(reason) {
        this._checkboxClassicPair.disable = false;
      }.bind(this));
    } else {
      this._adapter.unpair(this._device.address).then(function onResolve() {
        // no-op
      }.bind(this), function onReject(reason) {
        this._checkboxClassicPair.disable = false;
      }.bind(this));
    }
  },
  
  _onGattConnectClick: function OnGattConnectClick()
  {
    this._checkboxGattConnect.disable = true;
    if (this._checkboxGattConnect.checked) {
      this._device.gatt.connect().then(function onResolve() {
        showElement(this._gattServiceListContainer);
      }.bind(this), function onReject(reason) {
        this._checkboxGattConnect.disable = false;
      }.bind(this));
    } else {
      for (var i in this._gattServices) {
        this._gattServices[i].cleanup();
      }
      this._gattServices = [];
      hideElement(this._gattServiceListContainer);
      this._device.gatt.disconnect().then(function onResolve() {
        // no-op
      }.bind(this), function onReject(reason) {
        this._checkboxGattConnect.disable = false;
      }.bind(this));
    }
  },
  
  _onDiscoverServicesClick: function OnDiscoverServiceClick()
  {
    this._checkboxDiscoverServices.disable = true;
    this._labelDiscoverServices.textContent = this._device.gatt ? this._convert('BluetoothDeviceGattDiscoverServices', this._checkboxDiscoverServices.checked) : "";
    for (var i in this._gattServices) {
      this._gattServices[i].cleanup();
    }
    this._gattServices = [];
    this._device.gatt.discoverServices().then(function onResolve() {
      this._checkboxDiscoverServices.checked = false;
      this._checkboxDiscoverServices.disable = false;
      this._labelDiscoverServices.textContent = this._device.gatt ? this._convert('BluetoothDeviceGattDiscoverServices', this._checkboxDiscoverServices.checked) : "";
      for (var i in this._device.gatt.services) {
        this._gattServices.push(new BluetoothGattClientServiceElement(this._listGattServiceList, this._device.gatt, this._device.gatt.services[i]));
      }
    }.bind(this), function onReject(reason) {
      this._checkboxDiscoverServices.checked = false;
      this._checkboxDiscoverServices.disable = false;
      this._labelDiscoverServices.textContent = this._device.gatt ? this._convert('BluetoothDeviceGattDiscoverServices', this._checkboxDiscoverServices.checked) : "";
    }.bind(this));
  },
  
  _onDevicePaired: function OnDevicePaired(device)
  {
    this._checkboxClassicPair.disable = false;
    this._labelClassicPair.textContent = this._convert('BluetoothDevicePaired', this._device.paired);
  },
  
  _onDeviceUnpaired: function OnDeviceUnpaired(address)
  {
    this._checkboxClassicPair.disable = false;
    this._labelClassicPair.textContent = this._convert('BluetoothDevicePaired', this._device.paired);
  },
  
  _onDevicePairingAborted: function OnDevicePairingAborted(address)
  {
    this._checkboxPair.disable = false;
    this._labelClassicPair.textContent = this._convert('BluetoothDevicePaired', this._device.paired);
  },
    
  _onGattCharacteristicUpdated: function OnGattCharacteristicUpdated(characteristic)
  {
    for (var i in this._gattServices) {
      this._gattServices[i].onCharacteristicUpdated(characteristic);
    }
  },
  
  _onGattConnectionStateChanged: function OnGattConnectionStateChanged(gatt)
  {
    if (gatt.connectionState == 'disconnected') {
      this._checkboxGattConnect.checked = false;
    } else {
      this._checkboxGattConnect.checked = true;
    }
    this._labelGattConnect.textContent = this._convert('BluetoothDeviceGattConnection', gatt.connectionState);
  },
  
  cleanup: function Cleanup()
  {
    this._adapter.removeObserver('devicepaired', this, this._onDevicePaired);
    this._adapter.removeObserver('deviceunpaired', this, this._onDeviceUnpaired);
    this._adapter.removeObserver('devicepairingaborted', this, this._onDevicePairingAborted);
    
    this._container.removeChild(this._selfContainer);
  },
  
  show: function Show()
  {
    showElement(this._selfContainer);
  },
  
  hide: function Hide()
  {
    hideElement(this._selfContainer);
  },
  
  toggle: function Toggle()
  {
    toggleElement(this._selfContainer);
  }
}

function BluetoothGattClientServiceElement(container, gatt, service)
{
  this._translate = navigator.mozL10n.get;
  this._convert = convert;
  this._lookup = lookup;
  this._container = container;
  this._gatt = gatt;
  this._service = service;
  
  this._selfContainer = document.createElement('li');
  this._container.appendChild(this._selfContainer);
  
  // Service Information
  this._summaryContainer = document.createElement('div');
  var labelServiceName = document.createTextNode(this._lookup('service', this._service.uuid));
  var labelServiceUuid = document.createTextNode("[" + this._service.uuid + "]");
  var labelServiceInformation = document.createTextNode(this._service.instanceId + ", " + this._convert('BluetoothGattServiceIsPrimary', this._service.isPrimary));
  this._summaryContainer.appendChild(labelServiceName);
  this._summaryContainer.appendChild(document.createElement('br'));
  this._summaryContainer.appendChild(labelServiceUuid);
  this._summaryContainer.appendChild(document.createElement('br'));
  this._summaryContainer.appendChild(labelServiceInformation);
  this._selfContainer.appendChild(this._summaryContainer);
  
  // Characteristic List
  this._gattCharacteristicListContainer = document.createElement('div');
  var labelGattCharacteristicList = document.createTextNode(this._translate('bluetooth_gatt_characteristic_list') + ": ");
  this._gattCharacteristicListContainer.appendChild(labelGattCharacteristicList);
  this._gattCharacteristicListContainer.appendChild(document.createElement('br'));
  this._characteristicListContainer = document.createElement('ul');
  this._gattCharacteristicListContainer.appendChild(this._characteristicListContainer);
  this._selfContainer.appendChild(this._gattCharacteristicListContainer);
  
  this._characteristics = [];
  for (var i in this._service.characteristics) {
    this._characteristics.push(new BluetoothGattClientCharacteristicElement(this._characteristicListContainer, this._gatt, this._service.characteristics[i]));
  }
  hideElement(this._gattCharacteristicListContainer);
  
  this._initEvents();
  
  this.uuid = this._service.uuid;
}

BluetoothGattClientServiceElement.prototype = {
  _initEvents: function InitEvents()
  {
    this._summaryContainer.addEventListener('click', this._onSummaryClick.bind(this));
  },
  
  _onSummaryClick: function OnSummaryClick()
  {
    toggleElement(this._gattCharacteristicListContainer);
  },
  
  onCharacteristicUpdated: function OnCharacteristicUpdated(characteristic)
  {
    for (var i in this._characteristics) {
      if (this._characteristics[i].uuid == characteristic.uuid) {
        this._characteristics[i].onCharacteristicUpdated(characteristic);
      }
    }
  },
  
  cleanup: function Cleanup()
  {
    for (var i in this._characteristics) {
      this._characteristics[i].cleanup();
    }
    this._characteristics = [];
    this._container.removeChild(this._selfContainer);
  },
  
  show: function Show()
  {
    showElement(this._selfContainer);
  },
  
  hide: function Hide()
  {
    hideElement(this._selfContainer);
  },
  
  toggle: function Toggle()
  {
    toggleElement(this._selfContainer);
  }
}

// Bluetooth Gatt Client Characteristic Element
function BluetoothGattClientCharacteristicElement(container, gatt, characteristic)
{
  this._translate = navigator.mozL10n.get;
  this._convert = convert;
  this._lookup = lookup;
  this._v2j = gattValueToJson;
  this._j2v = gattJsonToValue;
  this._container = container;
  this._gatt = gatt;
  this._characteristic = characteristic;
  
  this._selfContainer = document.createElement('li');
  this._container.appendChild(this._selfContainer);
  
  // Characteristic Information
  this._summaryContainer = document.createElement('div');
  var labelCharacteristicName = document.createTextNode(this._lookup('characteristic', this._characteristic.uuid));
  var labelCharacteristicUuid = document.createTextNode("[" + this._characteristic.uuid + "]");
  var labelCharacteristicInformation = document.createTextNode(this._characteristic.instanceId + ", " + this._convertWriteType(this._characteristic.writeType) + ", " + this._convertPermissions(this._characteristic.permissions) + ", " + this._convertProperties(this._characteristic.properties));
  this._summaryContainer.appendChild(labelCharacteristicName);
  this._summaryContainer.appendChild(document.createElement('br'));
  this._summaryContainer.appendChild(labelCharacteristicUuid);
  this._summaryContainer.appendChild(document.createElement('br'));
  this._summaryContainer.appendChild(labelCharacteristicInformation);
  this._selfContainer.appendChild(this._summaryContainer);
  
  // Characteristic Value
  this._valueContainer = document.createElement('div');
  this._valueCharacteristic = createBluetoothValueElement('characteristic', this._characteristic.uuid, this._valueContainer);
  var labelCharacteristicUpdate = document.createTextNode(this._translate('bluetooth_gatt_characteristic_update'));
  var labelCharacteristicLastUpdate = document.createTextNode(this._translate('bluetooth_gatt_characteristic_last_update') + ": ");
  this._labelCharacteristicUpdateTime = document.createTextNode("");
  this._buttonCharacteristicRead = document.createElement('button');
  this._buttonCharacteristicRead.textContent = this._translate('bluetooth_gatt_characteristic_read');
  this._buttonCharacteristicWrite = document.createElement('button');
  this._buttonCharacteristicWrite.textContent = this._translate('bluetooth_gatt_characteristic_write');
  this._checkboxCharacteristicUpdate = document.createElement('input');
  this._checkboxCharacteristicUpdate.type = 'checkbox';
  this._valueContainer.appendChild(labelCharacteristicLastUpdate);
  this._valueContainer.appendChild(this._labelCharacteristicUpdateTime);
  this._valueContainer.appendChild(document.createElement('br'));
  this._valueContainer.appendChild(this._buttonCharacteristicRead);
  this._valueContainer.appendChild(this._buttonCharacteristicWrite);
  this._valueContainer.appendChild(this._checkboxCharacteristicUpdate);
  this._valueContainer.appendChild(labelCharacteristicUpdate);
  this._valueContainer.appendChild(document.createElement('br'));
  this._selfContainer.appendChild(this._valueContainer);
  
  // Descriptor List
  this._gattDescriptorListContainer = document.createElement('div');
  var labelGattDescriptorList = document.createTextNode(this._translate('bluetooth_gatt_descriptor_list') + ": ");
  this._gattDescriptorListContainer.appendChild(labelGattDescriptorList);
  this._gattDescriptorListContainer.appendChild(document.createElement('br'));
  this._descriptorListContainer = document.createElement('ul');
  this._gattDescriptorListContainer.appendChild(this._descriptorListContainer);
  this._selfContainer.appendChild(this._gattDescriptorListContainer);
  
  this._descriptors = [];
  for (var i in this._characteristic.descriptors) {
    this._descriptors.push(new BluetoothGattClientDescriptorElement(this._descriptorListContainer,  this._gatt, this._characteristic.descriptors[i]));
  }
  hideElement(this._gattDescriptorListContainer);
  
  this._initEvents();
  
  this.uuid = this._characteristic.uuid;
}

BluetoothGattClientCharacteristicElement.prototype = {
  _initEvents: function InitEvents()
  {
    this._summaryContainer.addEventListener('click', this._onSummaryClick.bind(this));
    this._buttonCharacteristicRead.addEventListener('click', this._onReadClick.bind(this));
    this._buttonCharacteristicWrite.addEventListener('click', this._onWriteClick.bind(this));
    this._checkboxCharacteristicUpdate.addEventListener('click', this._onUpdateClick.bind(this));
  },
  
  _onSummaryClick: function OnSummaryClick()
  {
    toggleElement(this._gattDescriptorListContainer);
  },
  
  _onReadClick: function OnReadClick()
  {
    this._labelCharacteristicUpdateTime.textContent = "";
    this._valueCharacteristic.setReadJson();
    this._characteristic.readValue().then(function onResolve() {
      this._valueCharacteristic.setReadJson(this._v2j('characteristic', this._characteristic.uuid, this._characteristic.value));
    }.bind(this), function onReject(reason) {
      // no-op
    }.bind(this));
  },
  
  _onWriteClick: function OnWriteClick()
  {
    this._labelCharacteristicUpdateTime.textContent = "";
    var json = this._valueCharacteristic.getWriteJson();
    this._characteristic.writeValue(this._j2v('characteristic', this._characteristic.uuid, json)).then(function onResolve() {
      // no-op
    }.bind(this), function onReject(reason) {
      // no-op
    }.bind(this));
  },
  
  _onUpdateClick: function OnUpdateClick()
  {
    if (this._checkboxCharacteristicUpdate.checked) {
      this._characteristic.startNotifications().then(function onResolve() {
        // no-op
      }.bind(this), function onReject(reason) {
        // no-op
      }.bind(this));
    } else {
      this._characteristic.stopNotifications().then(function onResolve() {
        // no-op
      }.bind(this), function onReject(reason) {
        // no-op
      }.bind(this));
    }
  },
  
  _convertWriteType: function ConvertWriteType(writeType)
  {
    if (!writeType) {
      // no writeType exposed currently
      return "{}";
    }
    var text = "";
    var prefix = "{";
    if (writeType.noResponse) {
      text += prefix + this._convert('BluetoothGattCharacteristicWriteType', 'noResponse');
      prefix = ",";
    }
    if (writeType.default) {
      text += prefix + this._convert('BluetoothGattCharacteristicWriteType', 'default');
      prefix = ",";
    }
    if (writeType.signed) {
      text += prefix + this._convert('BluetoothGattCharacteristicWriteType', 'signed');
      prefix = ",";
    }
    if (text) {
      text += "}";
    } else {
      text = "{}";
    }
    return text;
  },
  
  _convertPermissions: function ConvertPermissions(permissions)
  {
    if (!permissions) {
      // no permissions exposed currently
      return "{}";
    }
    var text = "";
    var prefix = "{";
    if (permissions.read) {
      text += prefix + this._convert('BluetoothGattCharacteristicPermission', 'read');
      prefix = ",";
    }
    if (permissions.readEncrypted) {
      text += prefix + this._convert('BluetoothGattCharacteristicPermission', 'readEncrypted');
      prefix = ",";
    }
    if (permissions.readEncryptedMITM) {
      text += prefix + this._convert('BluetoothGattCharacteristicPermission', 'readEncryptedMITM');
      prefix = ",";
    }
    if (permissions.write) {
      text += prefix + this._convert('BluetoothGattCharacteristicPermission', 'write');
      prefix = ",";
    }
    if (permissions.writeEncrypted) {
      text += prefix + this._convert('BluetoothGattCharacteristicPermission', 'writeEncrypted');
      prefix = ",";
    }
    if (permissions.writeEncryptedMITM) {
      text += prefix + this._convert('BluetoothGattCharacteristicPermission', 'writeEncryptedMITM');
      prefix = ",";
    }
    if (permissions.writeSigned) {
      text += prefix + this._convert('BluetoothGattCharacteristicPermission', 'writeSigned');
      prefix = ",";
    }
    if (permissions.writeSignedMITM) {
      text += prefix + this._convert('BluetoothGattCharacteristicPermission', 'writeSignedMITM');
      prefix = ",";
    }
    if (text) {
      text += "}";
    } else {
      text = "{}";
    }
    return text;
  },
  
  _convertProperties: function ConvertProperties(properties)
  {
    if (!properties) {
      // no properties exposed currently
      return "{}";
    }
    var text = "";
    var prefix = "{";
    if (properties.broadcast) {
      text += prefix + this._convert('BluetoothGattCharacteristicProperty', 'broadcast');
      prefix = ",";
    }
    if (properties.read) {
      text += prefix + this._convert('BluetoothGattCharacteristicProperty', 'read');
      prefix = ",";
    }
    if (properties.writeNoResponse) {
      text += prefix + this._convert('BluetoothGattCharacteristicProperty', 'writeNoResponse');
      prefix = ",";
    }
    if (properties.write) {
      text += prefix + this._convert('BluetoothGattCharacteristicProperty', 'write');
      prefix = ",";
    }
    if (properties.notify) {
      text += prefix + this._convert('BluetoothGattCharacteristicProperty', 'notify');
      prefix = ",";
    }
    if (properties.indicate) {
      text += prefix + this._convert('BluetoothGattCharacteristicProperty', 'indicate');
      prefix = ",";
    }
    if (properties.signedWrite) {
      text += prefix + this._convert('BluetoothGattCharacteristicProperty', 'signedWrite');
      prefix = ",";
    }
    if (properties.extendedProps) {
      text += prefix + this._convert('BluetoothGattCharacteristicProperty', 'extendedProps');
      prefix = ",";
    }
    if (text) {
      text += "}";
    } else {
      text = "{}";
    }
    return text;
  },
  
  onCharacteristicUpdated: function OnCharacteristicUpdated(characteristic)
  {
    this._valueCharacteristic.setReadJson(this._v2j('characteristic', this._characteristic.uuid, this._characteristic.value));
    var d = new Date();
    this._labelCharacteristicUpdateTime.textContent = d.toString();
  },
  
  cleanup: function Cleanup()
  {
    this._container.removeChild(this._selfContainer);
  },
  
  show: function Show()
  {
    showElement(this._selfContainer);
  },
  
  hide: function Hide()
  {
    hideElement(this._selfContainer);
  },
  
  toggle: function Toggle()
  {
    toggleElement(this._selfContainer);
  }
}

// Bluetooth Gatt Client Descriptor Element
function BluetoothGattClientDescriptorElement(container, gatt, descriptor)
{
  this._translate = navigator.mozL10n.get;
  this._convert = convert;
  this._lookup = lookup;
  this._v2j = gattValueToJson;
  this._j2v = gattJsonToValue;
  this._container = container;
  this._gatt = gatt;
  this._descriptor = descriptor;
  
  this._selfContainer = document.createElement('li');
  this._container.appendChild(this._selfContainer);
  
  // Descriptor Information
  this._summaryContainer = document.createElement('div');
  var labelDescriptorName = document.createTextNode(this._lookup('descriptor', this._descriptor.uuid));
  var labelDescriptorUuid = document.createTextNode("[" + this._descriptor.uuid + "]");
  var labelDescriptorInformation = document.createTextNode(this._convertPermissions(this._descriptor.permissions));
  this._summaryContainer.appendChild(labelDescriptorName);
  this._summaryContainer.appendChild(document.createElement('br'));
  this._summaryContainer.appendChild(labelDescriptorUuid);
  this._summaryContainer.appendChild(document.createElement('br'));
  this._summaryContainer.appendChild(labelDescriptorInformation);
  this._selfContainer.appendChild(this._summaryContainer);
  
  // Descriptor Value
  this._valueContainer = document.createElement('div');
  this._valueDescriptor = createBluetoothValueElement('descriptor', this._descriptor.uuid, this._valueContainer);
  this._buttonDescriptorRead = document.createElement('button');
  this._buttonDescriptorRead.textContent = this._translate('bluetooth_gatt_descriptor_read');
  this._buttonDescriptorWrite = document.createElement('button');
  this._buttonDescriptorWrite.textContent = this._translate('bluetooth_gatt_descriptor_write');
  this._valueContainer.appendChild(this._buttonDescriptorRead);
  this._valueContainer.appendChild(this._buttonDescriptorWrite);
  this._selfContainer.appendChild(this._valueContainer);
  
  this._initEvents();
  
  this.uuid = this._descriptor.uuid;
}

BluetoothGattClientDescriptorElement.prototype = {
  _initEvents: function InitEvents()
  {
    this._buttonDescriptorRead.addEventListener('click', this._onReadClick.bind(this));
    this._buttonDescriptorWrite.addEventListener('click', this._onWriteClick.bind(this));
  },
  
  _onReadClick: function OnReadClick()
  {
    this._valueDescriptor.setReadJson();
    this._descriptor.readValue().then(function onResolve() {
      this._valueDescriptor.setReadJson(this._v2j('descriptor', this._descriptor.uuid, this._descriptor.value));
    }.bind(this), function onReject(reason) {
      // no-op
    }.bind(this));
  },
  
  _onWriteClick: function OnWriteClick()
  {
    var json = this._valueDescriptor.getWriteJson();
    this._descriptor.writeValue(this._j2v('descriptor', this._descriptor.uuid, json)).then(function onResolve() {
      // no-op
    }.bind(this), function onReject(reason) {
      // no-op
    }.bind(this));
  },
  
  _convertPermissions: function ConvertPermissions(permissions)
  {
    if (!permissions) {
      // no permissions exposed currently
      return "{}";
    }
    var text = "";
    var prefix = "{";
    if (permissions.read) {
      text += prefix + this._convert('BluetoothGattDescriptorPermission', 'read');
      prefix = ",";
    }
    if (permissions.readEncrypted) {
      text += prefix + this._convert('BluetoothGattDescriptorPermission', 'readEncrypted');
      prefix = ",";
    }
    if (permissions.readEncryptedMITM) {
      text += prefix + this._convert('BluetoothGattDescriptorPermission', 'readEncryptedMITM');
      prefix = ",";
    }
    if (permissions.write) {
      text += prefix + this._convert('BluetoothGattDescriptorPermission', 'write');
      prefix = ",";
    }
    if (permissions.writeEncrypted) {
      text += prefix + this._convert('BluetoothGattDescriptorPermission', 'writeEncrypted');
      prefix = ",";
    }
    if (permissions.writeEncryptedMITM) {
      text += prefix + this._convert('BluetoothGattDescriptorPermission', 'writeEncryptedMITM');
      prefix = ",";
    }
    if (permissions.writeSigned) {
      text += prefix + this._convert('BluetoothGattDescriptorPermission', 'writeSigned');
      prefix = ",";
    }
    if (permissions.writeSignedMITM) {
      text += prefix + this._convert('BluetoothGattDescriptorPermission', 'writeSignedMITM');
      prefix = ",";
    }
    if (text) {
      text += "}";
    } else {
      text = "{}";
    }
    return text;
  },
  
  cleanup: function Cleanup()
  {
    this._container.removeChild(this._selfContainer);
  },
  
  show: function Show()
  {
    showElement(this._selfContainer);
  },
  
  hide: function Hide()
  {
    hideElement(this._selfContainer);
  },
  
  toggle: function Toggle()
  {
    toggleElement(this._selfContainer);
  }
}
