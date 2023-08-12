const locateDevicesButton = document.getElementById("locate");

locateDevicesButton.addEventListener("click", () => {
  navigator.bluetooth
    .requestDevice({ acceptAllDevices: true })
    .then((device) => {
      console.log(device);
    })
    .catch((e) => {
      console.error(e);
    });
});

function cancelRequest() {
  window.electronAPI.cancelBluetoothRequest();
}

document.getElementById("cancel").addEventListener("click", cancelRequest);

window.electronAPI.bluetoothPairingRequest((event, details) => {
  const response = {};

  switch (details.pairingKind) {
    case "confirm": {
      response.confirmed = window.confirm(
        `Do you want to connect to device ${details.deviceId}?`
      );
      break;
    }
    case "confirmPin": {
      response.confirmed = window.confirm(
        `Does the pin ${details.pin} match the pin displayed on device ${details.deviceId}?`
      );
      break;
    }
    case "providePin": {
      const pin = window.prompt(
        `Please provide a pin for ${details.deviceId}.`
      );
      if (pin) {
        response.pin = pin;
        response.confirmed = true;
      } else {
        response.confirmed = false;
      }
    }
  }

  window.electronAPI.bluetoothPairingResponse(response);
});
