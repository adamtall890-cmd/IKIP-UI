<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>iKIP — Prototype UI</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="phone">
    <div class="status-bar">
      <div class="time">12:34</div>
      <div class="icons">• IKIP</div>
    </div>

    <div class="screen">
      <header class="header">
        <h1>Contacts</h1>
        <p class="subtitle">Freedom · Security · Professional</p>
      </header>

      <ul class="contacts" id="contacts">
        <li class="contact" data-name="Alice">Alice</li>
        <li class="contact" data-name="Bob">Bob</li>
        <li class="contact" data-name="Dr. Smith">Dr. Smith</li>
        <li class="contact" data-name="Hotel Lobby">Hotel Lobby</li>
      </ul>

      <div id="radialMenu" class="radial-menu hidden">
        <div class="radial-center" id="radialCenter"></div>
        <button class="radial-item gsm" data-mode="GSM">GSM</button>
        <button class="radial-item voip" data-mode="VoIP">VoIP</button>
        <button class="radial-item mesh" data-mode="Mesh">Mesh</button>
      </div>

      <div id="info" class="info">Sélectionnez un contact</div>
    </div>

    <div class="footer">iKIP Prototype</div>
  </div>

  <script src="app.js"></script>
</body>
</html>