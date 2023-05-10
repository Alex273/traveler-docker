# If system is Windows
# Edit system environment variables
# System variables -> Path -> Edit -> Add C:\Users\Alex\AppData\Roaming\npm -> Save

# Install dependencies
npm i -g @nestjs/cli

yarn install
npm install


# Create tsconfig
npx tsconfig.json (choose node)

# Install Redis on your machine

# Install Postgresql
# On MACOS via terminal
createdb traveler

# On Windows terminal via SQL Shell
# Create new user
create user myuser with encrypted password 'mypass';
# Grant all privileges
grant all privileges on database mydb to myuser;
# Create new database (traveler)
CREATE DATABASE traveler ENCODING 'UTF8';
# connect to database traveler
\c traveler

# If your OS doesn't have createuser or createdb binaries
CREATE DATABASE yourdbname;
CREATE USER youruser WITH ENCRYPTED PASSWORD 'yourpass';
GRANT ALL PRIVILEGES ON DATABASE yourdbname TO youruser;
