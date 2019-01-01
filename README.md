# Pillars

Pillars is a web application to help schools optimise the usage of ICT in the classroom. The four pillars that are measured are hardware, software, competence (of teachers) and management (support roles). Schools must input all information on each pillar, and then a score is calculated based on a standard that can be set by school management. Schools that score well on each pillar have an optimal support structure to implement ICT in their classrooms, because they will have the hardware infrastructure, good software, competent teachers and a good support structure. Schools that are not performing on one or more pillars can focus their investment efforts on the area that needs the most attention.

## Installation

Use the npm package manager to install all node modules belonging to the project.

## Usage

The app requires the following environment variables to be set:
DATABASEURL is the MongoDB database connection
AZURE and GOOGLE are needed to enable the login with Office365 and Google
MJ is needed for the email service (Mailjet)
SESSION_SECRET is to enable the passport session


"DATABASEURL":"mongodb://localhost/xxx",
"AZURE_CALLBACK_URL":"http://localhost:8080/auth/azureadoauth2/callback",
"AZURE_CLIENT_ID": "xxxxxxx"
"AZURE_CLIENT_SECRET" "xxxxxxx"
"GOOGLE_CALLBACK_URL":"http://localhost:8080/auth/google/callback"
"GOOGLE_CLIENT_ID": "xxxxxxx"
"GOOGLE_CLIENT_SECRET": "xxxxxxx"
"MJ_APIKEY_PRIVATE": "xxxxxxx"
"MJ_APIKEY_PUBLIC": "xxxxxxxx"
"SESSION_SECRET": "xxxxxxx"

## Contributing
For major changes, please open an issue first to discuss what you would like to change.

## License
[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)