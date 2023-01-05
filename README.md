Project: Football-Rest-API

Description: This Football-REST-API project is built off my recent SQL Football-Database (https://github.com/Logans99/Football-Database). Using this 
KoaJS I developed a REST API to access and manage said database. The purpose of this API is to act as a football database that can be manipulated to 
display data of players, coaches, and players associated with games. These interactions are shown with a small four-team football league in mind with 
only a handful of players on each team to demonstrate the API’s interactions. The main objective of this API is to create controllers that would prove 
to be beneficial to a real football team. An important part of real life applications are the CRUD operators, which in this database allow games, 
players, and coaches to be created, displayed, updated, and removed. To get more specific, these operators can be used to schedule more games in the 
future and move players and coaches to new teams or fire them completely.

a few CRUD Examples:

- Shows all scheduled games.
  - curl -X GET localhost:8067/api/v1/games/

- Used to remove a player from all future games. This is helpful for when a season ending injury occurs.
  - curl -X DELETE localhost:8067/api/v1/203981203

- Used to display any player in the league just by their id number.
  - curl -X GET localhost:8067/api/v1/players/203981203

- Updates coaches information.
  - curl -X PUT -H 'Content-type: application/json' -d '{
"coach_id_number": 450034853,
"job_title": "Head Coach",
"name": "Brandon Staley",
"DOB": "1984-02-10T08:00:00.000Z",
"team": "Los Angeles Chargers"}' localhost:8067/api/v1/coaches/450034853
