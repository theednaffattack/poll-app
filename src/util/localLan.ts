// testing for local environment ip
// from: https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
var os = require("os");
var ifaces = os.networkInterfaces();

export let ipStore = () => {
  let addresses = [];
  Object.keys(ifaces).forEach(function(ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function(iface) {
      if ("IPv4" !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        addresses.push(iface.address);
        // console.log(`${ifname}, ${alias} ${iface.address}`);
      } else {
        // this interface has only one ipv4 adress
        addresses.push(iface.address);
        // console.log(`${ifname}, ${iface.address}`);
      }
      ++alias;
    });
  });
  return addresses;
};
