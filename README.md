<br>
<br>
<p align="center">
  <img src="https://cdn.discordapp.com/attachments/1012701830809141329/1092165177610338404/logo.svg" height="64">
</p>
<br>
<br>

<p aling="center">
  <img src="https://cdn.discordapp.com/attachments/1012701830809141329/1092183815822245978/Slide_16_9_-_1.jpg">
</p>

<br>

# Table of Contents
<details open>
  <summary>(click to expand or hide)</summary>
  <ol>
    <li>
      <a href="#requirements">Requirements</a>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#tests">Tests</a>
    </li>
    <li>
      <a href="#run">Run</a>
    </li>
  </ol>
</details>

<br>

## Requirements
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" alt="Git" title="Git" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker" title="Docker" /></code>
 
<br>

## Installation
1. Clone the repository
   ```sh
   git clone https://github.com/michalgolda/cashly.git
   ```
2. Go to cashly_web folder and install web client packages
   ```sh
   pnpm install
   ```
3. Go to root folder and pull all images defined in compose files
   ```sh
   docker-compose pull
   ```
4. Go to cashly_web folder and create .env.development file based on .env.template file
   ```sh
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=qwerty
   ```
5. Go to cashly_api folder and create .env.development file based on .env.template file
   ```sh
   SECRET_KEY=123
   DATABASE_URL=sqlite:///cashly.sqlite
   MAIL_USERNAME=noreply@cashly.com
   MAIL_PASSWORD=
   MAIL_PORT=1025
   MAIL_FROM=noreply@cashly.com
   MAIL_SERVER=mail
   MAIL_STARTTLS=False
   MAIL_SSL_TLS=False
   MAIL_USE_CREDENTIALS=False
   MAIL_VALIDATE_CERTS=False
   ```
   
<br>

## Tests
You can run tests using pytest module.
   ```sh
   python -m pytest
   ```

## Run
When you done previous steps you can run the project using a docker-compose command
   ```sh
   docker-compose up api mail
   ```
After perform this action you can go to the few locations below 
* http://localhost:3000 - Web client
* http://localhost:8000 - REST API
* http://localhost:8025 - Web email client
