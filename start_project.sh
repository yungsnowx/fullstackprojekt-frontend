#!/bin/bash

# Skript zum Starten des gesamten Projekts für MacOS und Linux

# Navigiere zum Homeveerzeichnis
cd ~

# Erstelle Vereichnis für das ganze Projekt
mkdir Fullstack-Projekt

# Navigiere zum Projektordner
cd Fullstack-Projekt

# Backend-Repository clonen
git clone "https://github.com/yungsnowx/fullstackprojekt-backend.git"

# Frontend-Repository clonen
git clone "https://github.com/yungsnowx/fullstackprojekt-frontend.git"

# Starte die Datenbank
bash fullstackprojekt-backend/start_database_for_mac.sh

# Backend starten
cd fullstackprojekt-backend && npm install && npm start &
wait

# Frontend starten
cd ../fullstackprojekt-frontend && npm install && "ng serve --open --proxy-config proxy.conf.json" &
wait