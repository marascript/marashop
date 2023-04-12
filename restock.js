'use strict'

const FRESH_INTERVAL = 20;
const UPCOMING_INTERVAL = 20;

const SHOPS_OFF = '#f9f9fa';
const SHOPS_SOON = '#5ca4da';
const SHOPS_NOW = '#65cb9b';

function beginClock() {
    setInterval(() => {
        updateTimeDisplay();
        updateTableDisplays();
    }, 1000);
}

const shopLinks = document.querySelectorAll('.shop');
shopLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        window.open(link.href, 'marapets');
    });
});

function updateTimeDisplay() {
    const d = new Date();
    const addZero = (x, n) => x.toString().padStart(n, '0')
    const hours = addZero(d.getHours(), 2);
    const minutes = addZero(d.getMinutes(), 2);
    const seconds = addZero(d.getSeconds(), 2);
    const timestring = `${hours}:${minutes}:${seconds}`;
    document.getElementById('time').textContent = timestring;
}

function updateTableDisplays() {
    initTables();
    styleTables();
}

function initTables() {
    const tables = Array.from(document.getElementsByClassName('shops'));
    tables.forEach(table => {
        table.style.backgroundColor = SHOPS_OFF;
        table.style.border = `2px solid ${SHOPS_OFF}`;
    });
}

function styleTables() {
    const tableToStyle = getTableToStyle();
    const seconds = new Date().getSeconds();

    tableToStyle.forEach(({ table, color, interval, start }) => {
        if (seconds >= start && seconds <= start + interval) {
            const percent = (seconds - start) / interval;
            const gradient = getGradient(color, SHOPS_OFF, percent);
            const tableElement = document.getElementById(table);

            tableElement.style.backgroundColor = gradient;
            tableElement.style.border = `2px solid ${color}`;
        }
    });
}

function getTableToStyle() {
    const d = new Date();
    const upcomingTable = (d.getMinutes() + 1) % 5;
    const freshTable = d.getMinutes() % 5;

    return [
        { table: `table${upcomingTable}`, color: SHOPS_SOON, interval: UPCOMING_INTERVAL, start: 60 - UPCOMING_INTERVAL },
        { table: `table${freshTable}`, color: SHOPS_NOW, interval: FRESH_INTERVAL, start: 0 },
    ];
}

function getGradient(color1, color2, percent) {
    const rgb1 = color1.slice(1).match(/.{2}/g).map(c => parseInt(c, 16));
    const rgb2 = color2.slice(1).match(/.{2}/g).map(c => parseInt(c, 16));
    const newrgb = rgb1.map((c1, i) => Math.floor((1 - percent) * c1 + percent * rgb2[i]));
    return `#${newrgb.map(c => c.toString(16).padStart(2, '0')).join('')}`;
}

