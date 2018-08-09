import { db } from './firebase';

// USER API

export const doCreateUser = (id, name, email, idNumber, phoneNumber) => {
  db.ref(`users/${id}`).set({
    name,
    email,
    idNumber,
    phoneNumber,
  });
};

export const onGetUsers = () => {
  return db.ref('users').once('value');
};

// Device Entity
export const doCreateUserDevice = (id, deviceName, serialNumber, manufacturer, qrString) => {
  db.ref(`devices/${id}`).push().set({
    deviceName,
    serialNumber,
    manufacturer,
    qrString,
  });
};

export const getAllDevices = () => {
  db.ref('devices/').once('value');
}
