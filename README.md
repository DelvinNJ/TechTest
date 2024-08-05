
# TestTech

This repository contains code for importing and managing XML data in a database using Laravel.


### Installation
- Clone the repository:
```http
git clone https://github.com/DelvinNJ/TechTest.git .
```
```http
cd Project-Management-App
```

- Install dependencies using Composer:
```http
composer install
npm install
```

- Copy the environment file and generate application key:
```http
cp .env.example .env
```
```http
php artisan key:generate
```
### Database Setup

- Configure the database in .env file.
- The database schema and stored procedures are included in the repository. You can find the SQL files in the database directory. Make sure to set up the database as described above.


Run database migrations to set up the database schema:
```http
php artisan migrate --seed
npm run dev
```

### Server Access

```http
php artisan serve
```
Then, navigate to the following URL in your web browser:
```http
http://127.0.0.1:8000
```
You can access the live server at:
```http
http://3.147.242.176/
```


Contact
If you have any questions or feedback, feel free to reach out:

Email: delvinnj02@gmail.com

Happy coding!