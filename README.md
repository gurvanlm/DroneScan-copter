# DroneScan-copter

## Drone configuration
La connection au wifi du drone peut Ãªtre reconfigurÃ©e via telnet

```
telnet 192.168.1.1

killall udhcpd; iwconfig ath0 mode managed essid [ssid]; ifconfig ath0 [wanted ip] netmask 255.255.255.0 up;
```

Pour rÃ©tablir la configuration de base, il suffit d'enlever et remettre la batterie.

## img2ply (config pour Windows)

2 outils à télécharger et à mettre dans PATH 

VisualSFM :
http://ccwu.me/vsfm/

PMVS/CMVS for dense reconstruction
http://francemapping.free.fr/Portfolio/Prog3D/CMVS.html

puis :
cmd /c VisualSFM sfm+pmvs D:\photos D:\test
