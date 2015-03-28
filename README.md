# DroneScan-copter

## Drone configuration
La connection au wifi du drone peut être reconfigurée via telnet

```
telnet 192.168.1.1

killall udhcpd; iwconfig ath0 mode managed essid [ssid]; ifconfig ath0 [wanted ip] netmask 255.255.255.0 up;
```

Pour rétablir la configuration de base, il suffit d'enlever et remettre la batterie.