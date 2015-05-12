'use strict'

var convert = function Convert(type, value)
{
  var translate = navigator.mozL10n.get;
  switch (type) {
    case 'BluetoothAdapterState':
      switch (value) {
        case 'disabled':
          return translate('bluetooth_adapter_disabled');
        case 'disabling':
          return translate('bluetooth_adapter_disabling');
        case 'enabled':
          return translate('bluetooth_adapter_enabled');
        case 'enabling':
          return translate('bluetooth_adapter_enabling');
        default:
          return null;
      }
      break;
    case 'BluetoothAdapterDiscoverable':
      if (value) {
        return translate('bluetooth_adapter_discoverable');
      } else {
        return translate('bluetooth_adapter_not_discoverable');
      }
      break;
    case 'BluetoothAdapterDiscovering':
      if (value) {
        return translate('bluetooth_adapter_discovering');
      } else {
        return translate('bluetooth_adapter_not_discovering');
      }
      break;
    case 'BluetoothAdapterLeScanning':
      switch (value) {
        case 'starting':
          return translate('bluetooth_adapter_lescan_starting');
        case 'started':
          return translate('bluetooth_adapter_lescan_started');
        case 'stopping':
          return translate('bluetooth_adapter_lescan_stopping');
        case 'stopped':
          return translate('bluetooth_adapter_lescan_stopped');
        default:
          return null;
      }
    case 'BluetoothDeviceType':
      switch (value) {
        case 'unknown':
          return translate('bluetooth_device_type_unknown');
        case 'classic':
          return translate('bluetooth_device_type_classic');
        case 'le':
          return translate('bluetooth_device_type_le');
        case 'dual':
          return translate('bluetooth_device_type_dual');
        default:
          return null;
      }
      break;
    case 'BluetoothClassOfDeviceMajorService':
      switch (value) {
        case BluetoothClassOfDevice.LIMITED_DISCOVERABILITY:
          return translate('bluetooth_device_cod_major_service_limited_discoverability');
        case BluetoothClassOfDevice.POSITIONING:
          return translate('bluetooth_device_cod_major_service_positioning');
        case BluetoothClassOfDevice.NETWORKING:
          return translate('bluetooth_device_cod_major_service_networking');
        case BluetoothClassOfDevice.RENDERING:
          return translate('bluetooth_device_cod_major_service_rendering');
        case BluetoothClassOfDevice.CAPTURING:
          return translate('bluetooth_device_cod_major_service_capturing');
        case BluetoothClassOfDevice.OBJECT_TRANSFER:
          return translate('bluetooth_device_cod_major_service_object_transfer');
        case BluetoothClassOfDevice.AUDIO:
          return translate('bluetooth_device_cod_major_service_audio');
        case BluetoothClassOfDevice.TELEPHONY:
          return translate('bluetooth_device_cod_major_service_telephony');
        case BluetoothClassOfDevice.INFORMATION:
          return translate('bluetooth_device_cod_major_service_information');
        default:
          return null;
      }
      break;
    case 'BluetoothClassOfDeviceMajorDevice':
      switch (value) {
        case BluetoothClassOfDevice.MISC:
          return translate('bluetooth_device_cod_major_device_misc');
        case BluetoothClassOfDevice.COMPUTER:
          return translate('bluetooth_device_cod_major_device_computer');
        case BluetoothClassOfDevice.PHONE:
          return translate('bluetooth_device_cod_major_device_phone');
        case BluetoothClassOfDevice.NETWORK:
          return translate('bluetooth_device_cod_major_device_network');
        case BluetoothClassOfDevice.AUDIO_VIDEO:
          return translate('bluetooth_device_cod_major_device_audio_video');
        case BluetoothClassOfDevice.PERIPHERAL:
          return translate('bluetooth_device_cod_major_device_peripheral');
        case BluetoothClassOfDevice.IMAGING:
          return translate('bluetooth_device_cod_major_device_imaging');
        case BluetoothClassOfDevice.WEARABLE:
          return translate('bluetooth_device_cod_major_device_wearable');
        case BluetoothClassOfDevice.TOY:
          return translate('bluetooth_device_cod_major_device_toy');
        case BluetoothClassOfDevice.HEALTH:
          return translate('bluetooth_device_cod_major_device_health');
        case BluetoothClassOfDevice.UNCATEGORIZED:
          return translate('bluetooth_device_cod_major_device_uncategorized');
        default:
          return null;
      }
      break;
    case 'BluetoothDevicePaired':
      if (value) {
        return translate('bluetooth_device_paired');
      } else {
        return translate('bluetooth_device_not_paired');
      }
      break;
    case 'BluetoothDeviceGattConnection':
      switch (value) {
        case 'disconnected':
          return translate('bluetooth_device_gatt_disconnected');
        case 'disconnecting':
          return translate('bluetooth_device_gatt_disconnecting');
        case 'connected':
          return translate('bluetooth_device_gett_connected');
        case 'connecting':
          return translate('bluetooth_device_gatt_connecting');
        default:
          return null;
      }
      break;
    case 'BluetoothDeviceGattDiscoverServices':
      if (value) {
        return translate('bluetooth_device_gatt_discovering');
      } else {
        return translate('bluetooth_device_gatt_not_discovering');
      }
      break;
    case 'BluetoothGattServiceIsPrimary':
      if (value) {
        return translate('bluetooth_gatt_service_is_primary');
      } else {
        return translate('bluetooth_gatt_service_is_secondary');
      }
      break;
    case 'BluetoothGattCharacteristicWriteType':
      switch (value) {
        case 'noResponse':
          return translate('bluetooth_gatt_characteristic_write_type_no_response');
        case 'default':
          return translate('bluetooth_gatt_characteristic_write_type_default');
        case 'signed':
          return translate('bluetooth_gatt_characteristic_write_type_signed');
        default:
          return null;
      }
      break;
    case 'BluetoothGattCharacteristicPermission':
      switch (value) {
        case 'read':
          return translate('bluetooth_gatt_characteristic_permission_read');
        case 'readEncrypted':
          return translate('bluetooth_gatt_characteristic_permission_readEncrypted');
        case 'readEncryptedMITM':
          return translate('bluetooth_gatt_characteristic_permission_readEncryptedMITM');
        case 'write':
          return translate('bluetooth_gatt_characteristic_permission_write');
        case 'writeEncrypted':
          return translate('bluetooth_gatt_characteristic_permission_writeEncrypted');
        case 'writeEncryptedMITM':
          return translate('bluetooth_gatt_characteristic_permission_writeEncryptedMITM');
        case 'writeSigned':
          return translate('bluetooth_gatt_characteristic_permission_writeSigned');
        case 'writeSignedMITM':
          return translate('bluetooth_gatt_characteristic_permission_writeSignedMITM');
        default:
          return null;
      }
      break;
    case 'BluetoothGattCharacteristicProperty':
      switch (value) {
        case 'broadcast':
          return translate('bluetooth_gatt_characteristic_property_broadcast');
        case 'read':
          return translate('bluetooth_gatt_characteristic_property_read');
        case 'writeNoResponse':
          return translate('bluetooth_gatt_characteristic_property_writeNoResponse');
        case 'write':
          return translate('bluetooth_gatt_characteristic_property_write');
        case 'notify':
          return translate('bluetooth_gatt_characteristic_property_notify');
        case 'indicate':
          return translate('bluetooth_gatt_characteristic_property_indicate');
        case 'signedWrite':
          return translate('bluetooth_gatt_characteristic_property_signedWrite');
        case 'extendedProps':
          return translate('bluetooth_gatt_characteristic_property_extendedProps');
        default:
          return null;
      }
      break;
    case 'BluetoothGattDescriptorPermission':
      switch (value) {
        case 'read':
          return translate('bluetooth_gatt_descriptor_permission_read');
        case 'readEncrypted':
          return translate('bluetooth_gatt_descriptor_permission_readEncrypted');
        case 'readEncryptedMITM':
          return translate('bluetooth_gatt_descriptor_permission_readEncryptedMITM');
        case 'write':
          return translate('bluetooth_gatt_descriptor_permission_write');
        case 'writeEncrypted':
          return translate('bluetooth_gatt_descriptor_permission_writeEncrypted');
        case 'writeEncryptedMITM':
          return translate('bluetooth_gatt_descriptor_permission_writeEncryptedMITM');
        case 'writeSigned':
          return translate('bluetooth_gatt_descriptor_permission_writeSigned');
        case 'writeSignedMITM':
          return translate('bluetooth_gatt_descriptor_permission_writeSignedMITM');
        default:
          return null;
      }
      break;
    default:
      return null;
  }
  return null;
}
